import {
  Features,
  TwitchHelixScopeHelper,
} from "../util/TwitchHelixScopeHelper";
import { Config } from "../Config";
import { NavBar } from "./NavBar";

import "./Home.css";
import Footer from "./Footer";
import { Logo } from "./Logo";
import { ReactNode } from "react";

type HomeProps = {
  children?: ReactNode;
};
export const Home = ({ children }: HomeProps) => {
  const makeRedirectUrl = (clientId: string, redirectUrl: string) => {
    const scopes: Features[] = [Features.ALL];
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
        {children && children}
        {!children && (
          <>
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
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};
