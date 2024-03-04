import { WielkiPolak } from '../interfaces/WielkiPolak'

interface PolakLoaderProps {
  polak: WielkiPolak
  onNewAssetLoaded: () => void
}

export default function PolakLoader(props: PolakLoaderProps) {
  const polackieAssety = props.polak.getAssetList()
  const onLoadHook = (id: string) => {
    props.polak.onAssetLoaded(
      id,
      document.getElementById(
        `${props.polak.getName()}_${id}`
      ) as HTMLImageElement
    )
    props.onNewAssetLoaded()
  }

  return (
    <span
      id={props.polak.getName()}
      style={{
        display: 'none',
      }}
    >
      {polackieAssety.map((emement) => {
        return (
          <img
            onLoad={onLoadHook.bind(null, emement.id)}
            id={`${props.polak.getName()}_${emement.id}`}
            src={emement.path}
            key={`${props.polak.getName()}_${emement.id}`}
          />
        )
      })}
    </span>
  )
}
