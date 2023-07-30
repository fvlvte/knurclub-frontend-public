import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import PolakLoader from "./PolakLoader";

interface AgregatPolakówProps {
  polaki: GenerycznyWielkiPolak[];
}

export default function AgregatPolaków(props: AgregatPolakówProps) {
  return (
    <span>
      {props.polaki.map((polak) => {
        return <PolakLoader key={polak.getName()} polak={polak} />;
      })}
    </span>
  );
}
