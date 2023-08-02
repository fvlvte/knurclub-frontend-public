import { GenerycznyWielkiPolak } from "../keyframes/GenerycznyWielkiPolak";
import PolakLoader from "./PolakLoader";

interface AgregatPolakówProps {
  polaki: Record<string, GenerycznyWielkiPolak>;
  onNewAssetLoaded: () => void;
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
        );
      })}
    </span>
  );
}
