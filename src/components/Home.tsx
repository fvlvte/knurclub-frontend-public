import {
  Features,
  TwitchHelixScopeHelper,
} from "../util/TwitchHelixScopeHelper";
import { Config } from "../Config";
import { NavBar } from "./NavBar";

import "./Home.css";
import Footer from "./Footer";
import { Logo } from "./Logo";

export const Home: React.FC = () => {
  const makeRedirectUrl = (clientId: string, redirectUrl: string) => {
    const scopes: Features[] = [
      Features.SOUND_ALERTS,
      Features.SONG_REQUEST,
      Features.EVENT_ALERTS,
    ];
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${TwitchHelixScopeHelper.getHelixScopesForFeature(
      scopes,
    ).join("+")}`;
  };
  const doTwitchAuth = () => {
    window.location.href = makeRedirectUrl(
      Config.getTwitchAppClientID(),
      Config.getTwitchOAuthRedirectUrl(),
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <NavBar />
      <div className={"HomeContainer"}>
        <Logo
          style={{ display: "block", paddingTop: "4rem", margin: "auto" }}
          size={"20rem"}
        />
        <p className={"HomeSloganHeader"}>WITAJ W KNUR CLUB</p>
        <p className={"HomeSloganHeader HomeSloganSub"}>
          OPEN SOURCE ZESTAW STREAMERSKI
        </p>
        <p className={"HomeSloganHeader HomeSloganSub"}>
          TYLKO DLA PRAWDZIWYCH SIGM
        </p>
        <button className={"LoginButton"} onClick={doTwitchAuth}>
          ZALOGUJ
        </button>
      </div>
      <Footer />
    </div>
  );
};
