import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import PolakLoader from "./PolakLoader";

interface AgregatPolakówProps {
  polaki: Record<string, GenerycznyWielkiPolak>;
}

export default function AgregatPolaków(props: AgregatPolakówProps) {
  return (
    <span>
      {Object.values(props.polaki).map((polak: GenerycznyWielkiPolak) => {
        return <PolakLoader key={polak.getName()} polak={polak} />;
      })}
    </span>
  );
}
