import { GenerycznyWielkiPolak } from './keyframes/GenerycznyWielkiPolak.ts'
import PolakLoader from './PolakLoader.tsx'

interface AgregatPolakówProps {
  polaki: Record<string, GenerycznyWielkiPolak>
  onNewAssetLoaded: () => void
}

export default function AgregatPolaków(props: AgregatPolakówProps) {
  return (
    <span>
      {Object.values(props.polaki).map((polak: GenerycznyWielkiPolak) => {
        return (
          <PolakLoader
            onNewAssetLoaded={props.onNewAssetLoaded}
            key={polak.getName()}
            polak={polak}
          />
        )
      })}
    </span>
  )
}
