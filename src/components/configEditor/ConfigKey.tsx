import { ChangeEvent } from 'react'
import { ConfigTranslation } from '../../translations/ConfigTranslation.ts'

type ConfigKeyProps = {
  k: string
  v: unknown
  onConfigChange: (key: string, change: unknown) => void
}
export const ConfigKey = ({ k, v, onConfigChange }: ConfigKeyProps) => {
  if (!k.startsWith('data')) return null
  if (typeof v === 'object' && v !== null) {
    return (
      <div>
        <h2>{ConfigTranslation.translateKey(k)}</h2>{' '}
        <span>{ConfigTranslation.translateKeyTooltip(k) ? 'ⓘ' : ''}</span>
        <>
          {Object.keys(v).map((ck) => {
            return (
              <ConfigKey
                onConfigChange={onConfigChange}
                key={`${k}.${ck}`}
                k={`${k}.${ck}`}
                v={(v as Record<string, unknown>)[ck]}
              />
            )
          })}
        </>
      </div>
    )
  }
  if (typeof v === 'boolean') {
    const handleBooleanChange = (e: ChangeEvent<HTMLInputElement>) => {
      onConfigChange(k, e.target.checked)
    }
    return (
      <div>
        <span>
          {ConfigTranslation.translateKey(k)} ={' '}
          <input onChange={handleBooleanChange} type={'checkbox'} checked={v} />{' '}
          <span>{ConfigTranslation.translateKeyTooltip(k) ? 'ⓘ' : ''}</span>
        </span>
      </div>
    )
  } else if (typeof v === 'string') {
    const handleStringChange = (e: ChangeEvent<HTMLInputElement>) => {
      onConfigChange(k, e.target.value)
    }
    return (
      <div>
        <span>
          {ConfigTranslation.translateKey(k)} ={' '}
          <input onChange={handleStringChange} value={v} />{' '}
          <span>{ConfigTranslation.translateKeyTooltip(k) ? 'ⓘ' : ''}</span>
        </span>
      </div>
    )
  } else if (typeof v === 'number') {
    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
      onConfigChange(k, parseFloat(e.target.value))
    }
    return (
      <div>
        <span>
          {ConfigTranslation.translateKey(k)} ={' '}
          <input type={'number'} value={v} onChange={handleNumberChange} />{' '}
          <span>{ConfigTranslation.translateKeyTooltip(k) ? 'ⓘ' : ''}</span>
        </span>
      </div>
    )
  }

  return (
    <div>
      UNSUPPORTED TYPE {k} = {JSON.stringify(v)}
    </div>
  )
}
