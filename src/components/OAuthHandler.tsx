import { default as axios } from "axios";
import { Config } from "../Config";
import { useEffect, useState } from "react";

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

  return (
    <div style={{ textAlign: "center" }}>
      <h1>KNUR CLUB WIDGET</h1>
      {!code && !result && <h2>NIE MA KODA NIE MA LODA</h2>}
      {code && !result && <h2>ZARA - DAJ MI MOMENT OK PROCESUJE SE</h2>}
      {result === "ERROR" && <h2>SORY GUWNO NIE MASZ DOSTEMPU MISIU</h2>}
      {result !== "ERROR" && result !== null && (
        <h2>
          SongRequest/SoundAlert: Dodaj se BrowserSource (Width 960 / Height
          540) i zaznacz opcje Control audio via OBS/Shutdown/Refresh do OBS-a
          source na{" "}
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                Config.getWidgetWithTokenURL(result),
              );
              alert("OK SKOPIOWANED");
            }}
          >
            SKOPIUJ LINK
          </button>
          <span>
            {" "}
            ALBO PRZECIĄGNIJ SE TEN{" "}
            <a href={Config.getWidgetWithTokenURL(result)}>LINK</a> NA OBS
          </span>
        </h2>
      )}
    </div>
  );
};
