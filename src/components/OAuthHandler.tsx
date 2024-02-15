import { default as axios } from "axios";
import { Config } from "../Config";
import { useEffect, useState } from "react";
import { Settings } from "./Settings";
import { Home } from "./Home";
import { PersistentStore } from "../util/PersistentStore";

// eslint-disable-next-line complexity
export const OAuthHandler: React.FC = () => {
  const u = new URLSearchParams(window.location.search);
  const [result, setResult] = useState<string | null>(null);
  const code = u.get("code");

  const backendUrl = Config.getNewBackendURL();

  useEffect(() => {
    if (code) {
      axios
        .get(
          `${backendUrl}/auth/login/twitch?authCode=${code}&redirectUrl=${encodeURIComponent(
            Config.getTwitchOAuthRedirectUrl(),
          )}`,
        )
        .then((d) => {
          setResult(d.data.token);
          console.log(d);
        })
        .catch((e) => {
          setResult("ERROR");
          console.error(e);
        });
    }
  }, []);

  useEffect(() => {
    if (result !== null && result !== "ERROR") {
      PersistentStore.setKey("token", result);
      window.location.href = "/";
    }
  }, [result]);

  return (
    <Home>
      <div style={{ textAlign: "center" }}>
        {!code && !result && <h2>NIE MA KODA NIE MA LODA</h2>}
        {code && !result && <h2>ZARA - DAJ MI MOMENT OK PROCESUJE SE</h2>}
        {result === "ERROR" && <h2>SORY GUWNO NIE MASZ DOSTEMPU MISIU</h2>}
      </div>
    </Home>
  );
};
