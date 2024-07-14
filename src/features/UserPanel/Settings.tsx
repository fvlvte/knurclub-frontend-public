import { PersistentStore } from '../../util/PersistentStore.ts'
import { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Config } from '../../util/Config.ts'
import { ConfigContainer } from '../../sharedTypes/ConfigTypes.ts'
import { ConfigKey } from './configEditor/ConfigKey.tsx'
import { RouterContext } from '../../contexts/RouterContext.ts'

export const Settings = () => {
  const { navigate } = useContext(RouterContext)

  const token = PersistentStore.getKey('token')
  const backendUrl = Config.getBackendEndpoint()

  const [configData, setConfigData] = useState<ConfigContainer | null>(null)

  useEffect(() => {
    axios
      .get<ConfigContainer>(`${backendUrl}/v1/config`, {
        headers: { 'X-Knur-Key': token },
      })
      .then((d) => {
        function sortDataNested(
          o: Record<string, unknown>
        ): Record<string, unknown> {
          const tmpArray: { key: string; value: unknown }[] = []

          for (const key in o) {
            tmpArray.push({
              key: key,
              value:
                typeof o[key] === 'object'
                  ? sortDataNested(o[key] as Record<string, unknown>)
                  : o[key],
            })
          }

          const newObject: Record<string, unknown> = {}

          tmpArray.sort((a, b) => {
            if (typeof a.value === 'object' && typeof b.value === 'object')
              return 0
            if (typeof a.value !== 'object' && typeof b.value === 'object')
              return -1
            if (typeof a.value === 'object' && typeof b.value !== 'object')
              return 1
            return 0
          })

          for (const item of tmpArray) {
            newObject[item.key] = item.value
          }

          return newObject
        }
        setConfigData(sortDataNested(d.data) as ConfigContainer)
      })
      .catch(console.error)
  }, [])

  const onConfigChange = useCallback(
    (k: string, v: unknown) => {
      setConfigData((currentData) => {
        if (currentData === null) return null
        const keySplits = k.split('.')
        let target: Record<string, unknown> = currentData as Record<
          string,
          unknown
        >
        while (keySplits.length > 1) {
          target = target[keySplits.shift() ?? 0] as Record<string, unknown>
        }
        target[keySplits[0]] = v

        return { ...currentData }
      })
    },
    [configData]
  )

  const onSave = () => {
    axios
      .post<ConfigContainer>(`${backendUrl}/v1/config`, configData, {
        headers: { 'X-Knur-Key': token, 'Content-Type': 'application/json' },
      })
      .then(() => {
        alert('OK ZAPISANED')
      })
      .catch(() => alert('AHA ERROR'))
      .finally(() => navigate('/'))
  }

  useEffect(() => {
    console.log(configData)
  }, [configData])

  const [currentConfigPath, setCurrentConfigPath] = useState('data.songRequest')

  return (
    <>
      <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <button onClick={onSave}>ZAPISZ</button>
        {configData &&
          Object.keys(configData).map((key) => (
            <ConfigKey
              currentPath={currentConfigPath}
              setCurrentPath={setCurrentConfigPath}
              root={true}
              onConfigChange={onConfigChange}
              key={key}
              k={key}
              v={(configData as Record<string, unknown>)[key]}
            />
          ))}
      </div>
    </>
  )
}
