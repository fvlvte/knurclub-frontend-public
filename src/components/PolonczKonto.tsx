import { useRef } from "react";
import {
  Features,
  TwitchHelixScopeHelper,
} from "../util/TwitchHelixScopeHelper";

export const PolonczKonto: React.FC = () => {
  const KLIENT_ID = "z4ngv8hovfeaq7rstf7egijqn351wu";
  const REDIRECT_URL = "http://localhost:3000/oauth-flow";

  const fullWypasRef = useRef<HTMLInputElement>(null);
  const srRef = useRef<HTMLInputElement>(null);
  const saRef = useRef<HTMLInputElement>(null);

  const makeRedirectUrl = (clientId: string, redirectUrl: string) => {
    const scopes = [];
    if (fullWypasRef.current?.checked) {
      scopes.push(Features.ALL);
    }
    if (srRef.current?.checked) {
      scopes.push(Features.SONG_REQUEST);
    }
    if (srRef.current?.checked) {
      scopes.push(Features.SOUND_ALERTS);
    }
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${TwitchHelixScopeHelper.getHelixScopesForFeature(
      scopes,
    ).join("+")}`;
  };
  const doTwitchAuth = () => {
    window.location.href = makeRedirectUrl(KLIENT_ID, REDIRECT_URL);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>KNURSKA AUTORYZACJA</h1>
      <h2>MUSISZ BYC WHITELISTED ZEBY ZADZIALALO</h2>
      <p>
        <input ref={fullWypasRef} type={"checkbox"} /> FULL WYPAS OPCJA
      </p>
      <p> albo </p>
      <p>
        <input ref={srRef} type={"checkbox"} /> SONG REQUEST
      </p>
      <p>
        <input ref={saRef} type={"checkbox"} /> SOUND ALERTS
      </p>
      <h3>WHITELISTED ZIUTKI: NIKT</h3>
      <button onClick={doTwitchAuth}>POŁONCZ KONTO TWICZ</button>
    </div>
  );
};
