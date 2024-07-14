import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Bluetooth,
  BluetoothDevice,
  BluetoothRemoteGATTCharacteristic,
} from '../../types/Bluetooth'

declare global {
  interface Navigator {
    bluetooth?: Bluetooth
  }
}

type Register = {
  pump: boolean
  heating: boolean
}

enum Action {
  ACTION_HEAT_ON = 'heat_on',
  ACTION_HEAT_OFF = 'heat_off',
  ACTION_PUMP_ON = 'pump_on',
  ACTION_PUMP_OFF = 'pump_off',
  ACTION_TEMPERATURE = 'write_temperature',
  ACTION_READ_TEMPERATURE = 'read_temperature',
  ACTION_READ_REGISTER = 'read_register',
}

type ActionTableEntry = {
  type?: 'duplex' | 'readonly'
  characteristicId: string
  paramEncoder?: (param: unknown) => Uint8Array
  paramDecoder?: (data: DataView) => unknown
}

const ActionTable: Record<string, ActionTableEntry> = {
  [Action.ACTION_HEAT_ON]: {
    characteristicId: '1011000f-5354-4f52-5a26-4249434b454c',
    paramEncoder: () => {
      return new Uint8Array([0x00])
    },
  },
  [Action.ACTION_HEAT_OFF]: {
    characteristicId: '10110010-5354-4f52-5a26-4249434b454c',
    paramEncoder: () => {
      return new Uint8Array([0x00])
    },
  },
  [Action.ACTION_PUMP_ON]: {
    characteristicId: '10110013-5354-4f52-5a26-4249434b454c',
    paramEncoder: () => {
      return new Uint8Array([0x00])
    },
  },
  [Action.ACTION_PUMP_OFF]: {
    characteristicId: '10110014-5354-4f52-5a26-4249434b454c',
    paramEncoder: () => {
      return new Uint8Array([0x00])
    },
  },
  [Action.ACTION_TEMPERATURE]: {
    type: 'duplex',
    characteristicId: '10110003-5354-4f52-5a26-4249434b454c',
    paramEncoder: (temp: unknown) => {
      const buffer = new ArrayBuffer(4)
      const dv = new DataView(buffer)
      dv.setInt32(0, temp as number, true)
      return new Uint8Array(buffer)
    },
    paramDecoder: (data) => {
      return data.getUint32(0, true)
    },
  },
  [Action.ACTION_READ_TEMPERATURE]: {
    type: 'readonly',
    characteristicId: '10110001-5354-4f52-5a26-4249434b454c',
    paramDecoder: (data) => {
      return data.getUint32(0, true)
    },
  },
  [Action.ACTION_READ_REGISTER]: {
    type: 'readonly',
    characteristicId: '1010000c-5354-4f52-5a26-4249434b454c',
    paramDecoder: (data) => {
      const HEATING = 0x0020
      const FAN = 0x2000
      return {
        heating: data.getUint16(0, true) & HEATING ? 1 : 0,
        pump: data.getUint16(0, true) & FAN ? 1 : 0,
      }
    },
  },
}

export const Wulkanizator = () => {
  const [status, setStatus] = useState<string>('')
  const [device, setDevice] = useState<BluetoothDevice | null>(null)
  const [discoveredCharacteristics, setDiscoveredCharacteristics] = useState<
    BluetoothRemoteGATTCharacteristic[]
  >([])

  const [currentTemperature, setCurrentTemperature] = useState<number | null>(
    null
  )
  const [targetTemperature, setTargetTemperature] = useState<number | null>(
    null
  )
  const [heaterOn, setHeaterOn] = useState<boolean>(false)
  const [pumpOn, setPumpOn] = useState<boolean>(false)

  const temperatureSetterRef = useRef<HTMLInputElement>(null)
  const timeSetterRef = useRef<HTMLInputElement>(null)

  const onGATTDisconnect = useCallback(() => {
    setStatus('Disconnected')
    setDevice(null)
  }, [device, setDevice, setStatus])

  const subscribeToDuplexAction = useCallback(
    async (
      action: Action,
      callback: (data: unknown) => void
    ): Promise<(() => void) | undefined> => {
      const a = ActionTable[action]
      if (!a || (a.type !== 'duplex' && a.type !== 'readonly')) {
        setStatus('Invalid action')
        return
      }

      const characteristic = discoveredCharacteristics.find(
        (c) => c.uuid === a.characteristicId
      )
      if (!characteristic) {
        setStatus('Characteristic not found')
        return
      }

      const listener = () => {
        callback(a.paramDecoder!(characteristic.value!))
      }

      await characteristic.startNotifications()
      characteristic.addEventListener('characteristicvaluechanged', listener)
      const value = await characteristic.readValue()
      callback(a.paramDecoder!(value))
      return () => {
        characteristic.removeEventListener(
          'characteristicvaluechanged',
          listener
        )
        characteristic.stopNotifications()
      }
    },
    [discoveredCharacteristics, setStatus, ActionTable]
  )

  const sendAction = useCallback(
    async (action: Action, param: unknown) => {
      try {
        if (!device) {
          setStatus('No device')
          return
        }

        const entry = ActionTable[action]
        if (!entry || entry.paramEncoder === undefined) {
          setStatus('Unknown action')
          return
        }

        const characteristic = discoveredCharacteristics.find(
          (c) => c.uuid === entry.characteristicId
        )
        if (!characteristic) {
          setStatus('Characteristic not found')
          return
        }

        const value = entry.paramEncoder(param)
        await characteristic.writeValue(new Uint8Array(value))
      } catch (e) {
        console.error(e)
        setStatus('Error')
      }
    },
    [device, setStatus, ActionTable, discoveredCharacteristics]
  )

  useEffect(() => {
    if (discoveredCharacteristics.length > 0) {
      let ret: (() => void) | undefined
      let ret2: (() => void) | undefined
      let ret3: (() => void) | undefined

      subscribeToDuplexAction(Action.ACTION_TEMPERATURE, (data) => {
        setTargetTemperature(data as number)
      })
        .then((r) => {
          ret = r
        })
        .catch((e) => {
          setStatus('Error')
          console.error(e)
        })

      subscribeToDuplexAction(Action.ACTION_READ_TEMPERATURE, (data) => {
        setCurrentTemperature(data as number)
      })
        .then((r) => {
          ret2 = r
        })
        .catch((e) => {
          setStatus('Error')
          console.error(e)
        })

      subscribeToDuplexAction(Action.ACTION_READ_REGISTER, (data) => {
        const d = data as Register
        setHeaterOn(d.heating)
        setPumpOn(d.pump)
      })
        .then((r) => {
          ret3 = r
        })
        .catch((e) => {
          setStatus('Error')
          console.error(e)
        })

      return () => {
        if (ret) {
          ret()
        }
        if (ret2) {
          ret2()
        }
        if (ret3) {
          ret3()
        }
      }
    }
  }, [discoveredCharacteristics])

  const doConnect = useCallback(() => {
    const bt = window.navigator.bluetooth
    if (!bt) {
      setStatus('Bluetooth not supported')
      return
    }

    setStatus('Getting availability...')
    bt.getAvailability()
      .then(async (available) => {
        if (available) {
          setStatus('Bluetooth available')

          const device = await bt.requestDevice({
            filters: [{ namePrefix: 'S&B VOLCANO' }],
            optionalServices: [
              '00000001-1989-0108-1234-123456789abc',
              '01000002-1989-0108-1234-123456789abc',
              '10100000-5354-4f52-5a26-4249434b454c',
              '10110000-5354-4f52-5a26-4249434b454c',
              '10130000-5354-4f52-5a26-4249434b454c',
            ],
          })
          setDevice(device)
          if (device.gatt) {
            // @ts-expect-error missing type
            device.gatt.ongattserverdisconnected = onGATTDisconnect
            await device.gatt.connect()
            setStatus('Connected')
            const characteristics: BluetoothRemoteGATTCharacteristic[] = []
            const service = await device.gatt.getPrimaryServices()
            for (const s of service) {
              const c = await s.getCharacteristics()
              characteristics.push(...c)
            }
            setDiscoveredCharacteristics(characteristics)
          } else {
            setStatus('No GATT')
          }
        } else {
          setStatus('Bluetooth not available')
        }
      })
      .catch((e) => {
        console.error(e)
        setStatus('Bluetooth not available')
      })
  }, [status, setStatus])

  return (
    <div>
      <h1>Wulkanizator</h1>
      <div>
        <p>Status: {status}</p>
        <p>
          Current temperature:{' '}
          {currentTemperature ? currentTemperature / 10 : null} °C{' '}
        </p>
        <p>
          Target temperature:{' '}
          {targetTemperature ? targetTemperature / 10 : null} °C{' '}
        </p>
        <p>Heater: {heaterOn ? 'ON' : 'OFF'}</p>
        <p>Pump: {pumpOn ? 'ON' : 'OFF'}</p>
      </div>
      <div>
        <button onClick={doConnect}>INIT</button>
      </div>
      <div>
        <button onClick={() => sendAction(Action.ACTION_HEAT_ON, null)}>
          ODPAL GRZAŁE
        </button>
        <button onClick={() => sendAction(Action.ACTION_HEAT_OFF, null)}>
          ZGAŚ GRZAŁE
        </button>
      </div>
      <div>
        <button onClick={() => sendAction(Action.ACTION_PUMP_ON, null)}>
          ODPAL POMPE
        </button>
        <button onClick={() => sendAction(Action.ACTION_PUMP_OFF, null)}>
          ZGAŚ POMPE
        </button>
      </div>
      <div>
        <input type={'number'} ref={temperatureSetterRef} />
        <button
          onClick={() => {
            if (temperatureSetterRef.current) {
              if (
                parseInt(temperatureSetterRef.current.value) >= 40 &&
                parseInt(temperatureSetterRef.current.value) <= 230
              ) {
                const temp = parseInt(
                  (parseInt(temperatureSetterRef.current.value) * 10).toFixed(0)
                )
                sendAction(Action.ACTION_TEMPERATURE, temp)
                setTargetTemperature(temp)
              } else {
                alert('Temperatura musi być w zakresie 40-230')
              }
            }
          }}
        >
          USTAW TEMPERATURE
        </button>
      </div>
      <div>
        <input type={'number'} ref={timeSetterRef} />
        <button
          onClick={() => {
            if (timeSetterRef.current) {
              setTimeout(
                () => {
                  sendAction(Action.ACTION_PUMP_OFF, null)
                  sendAction(Action.ACTION_HEAT_OFF, null)
                },
                parseInt(timeSetterRef.current.value) * 1000
              )
              sendAction(Action.ACTION_PUMP_ON, null)
            }
          }}
        >
          ODPAL POMPEf + TIMER DO WYŁĄCZENIA (w sek)
        </button>
      </div>
    </div>
  )
}
