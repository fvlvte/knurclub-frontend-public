import { Home } from "./Home";
import { PersistentStore } from "../util/PersistentStore";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Config } from "../Config";
import { ConfigContainer } from "../sharedTypes/ConfigTypes";
import { ConfigKey } from "./configEditor/ConfigKey";

export const HomeUser = () => {
  const token = PersistentStore.getKey("token");
  const backendUrl = Config.getNewBackendURL();
  const [isSettingsViewEnabled, setIsSettingsViewEnabled] = useState(false);

  const [configData, setConfigData] = useState<ConfigContainer | null>(null);
  useEffect(() => {
    axios
      .get<ConfigContainer>(`${backendUrl}/v1/config`, {
        headers: { "X-Knur-Key": token },
      })
      .then((d) => {
        setConfigData(d.data);
      })
      .catch(console.error);
  }, []);

  const onConfigChange = useCallback(
    (k: string, v: unknown) => {
      setConfigData((currentData) => {
        if (currentData === null) return null;
        const keySplits = k.split(".");
        let target: Record<string, unknown> = currentData?.data as Record<
          string,
          unknown
        >;
        while (keySplits.length > 1) {
          target = target[keySplits.shift() ?? 0] as Record<string, unknown>;
        }
        target[keySplits[0]] = v;

        return { ...currentData };
      });
    },
    [configData],
  );

  const onSave = () => {
    axios
      .post<ConfigContainer>(`${backendUrl}/v1/config`, configData, {
        headers: { "X-Knur-Key": token, "Content-Type": "application/json" },
      })
      .then(() => {
        alert("OK ZAPISANED");
      })
      .catch(() => alert("AHA ERROR"))
      .finally(() => setIsSettingsViewEnabled(false));
  };

  const onLogOut = () => {
    PersistentStore.removeKey("token");
    window.location.href = "/";
  };

  useEffect(() => {
    console.log(configData);
  }, [configData]);

  return (
    <Home>
      <div style={{ width: "100%", backgroundColor: "pink" }}>
        {!isSettingsViewEnabled && (
          <h2>
            <p>
              <button onClick={() => setIsSettingsViewEnabled(true)}>
                EDYTUJ USTAWIENIA
              </button>
              <button onClick={onLogOut}>WYLOGUJ</button>
            </p>
            Instalacja SR/SA: Dodaj se BrowserSource (Width 960 / Height 540) i
            zaznacz opcje Control audio via OBS/Shutdown/Refresh do OBS-a source
            na ten link
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  Config.getWidgetWithTokenURL(token ?? ""),
                );
                alert("OK SKOPIOWANED");
              }}
            >
              SKOPIUJ LINK
            </button>
          </h2>
        )}
        {isSettingsViewEnabled && (
          <>
            <h1>Ustawienia</h1>
            <button onClick={onSave}>ZAPISZ</button>
            <div style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
              {configData &&
                Object.keys(configData.data).map((key) => (
                  <ConfigKey
                    onConfigChange={onConfigChange}
                    key={key}
                    k={key}
                    v={(configData.data as Record<string, unknown>)[key]}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </Home>
  );
};
