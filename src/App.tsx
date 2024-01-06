//import { KoloKnurskie } from "./components/KoloKnurskie";
import { OAuthHandler } from "./components/OAuthHandler";
import PolakWidget from "./components/PolakWidget";
import { PołonczKonto } from "./components/PołonczKonto";
import { useNavigation } from "./hooks/useNavigation";
import TournamentView from "./TournamentView";
import { Songrequest } from "./components/Songrequest";

export const App: React.FC = () => {
  const [path] = useNavigation();

  if (path.includes("/login")) {
    return <PołonczKonto />;
  } else if (path.includes("/oauth-handler")) {
    return <OAuthHandler />;
  } /*else if (path.includes("/kolo-test")) {
    //return <KoloKnurskie />;
  } */ else if (path.includes("/tournament")) {
    return <TournamentView />;
  } else if (path.includes("/sr")) {
    return <Songrequest />;
  } else {
    return <PolakWidget />;
  }
};
