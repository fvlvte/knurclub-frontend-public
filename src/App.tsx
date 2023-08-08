import { OAuthHandler } from "./components/OAuthHandler";
import PolakWidget from "./components/PolakWidget";
import { PołonczKonto } from "./components/PołonczKonto";
import { useNavigation } from "./hooks/useNavigation";

export const App: React.FC = () => {
  const [path] = useNavigation();

  if (path.includes("/login")) {
    return <PołonczKonto />;
  } else if (path.includes("/oauth-handler")) {
    return <OAuthHandler />;
  } else {
    return <PolakWidget />;
  }
};
