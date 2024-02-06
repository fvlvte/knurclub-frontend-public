import { OAuthHandler } from "./components/OAuthHandler";
import PolakWidget from "./components/PolakWidget";
import { Home } from "./components/Home";
import { useNavigation } from "./hooks/useNavigation";
import TournamentView from "./TournamentView";
import { SR } from "./components/SR";
import { V2WidgetWrapper } from "./components/V2WidgetWrapper";

export const App: React.FC = () => {
  const [path] = useNavigation();

  if (path.includes("/v1/widget")) {
    return <PolakWidget />;
  } else if (path.includes("/oauth-flow")) {
    return <OAuthHandler />;
  } else if (path.includes("/v2/widget")) {
    return <V2WidgetWrapper />;
  } else if (path.includes("/tournament")) {
    return <TournamentView />;
  } else if (path.includes("/sr")) {
    return <SR />;
  } else {
    return <Home />;
  }
};
