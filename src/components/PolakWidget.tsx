import { useEffect, useRef, useState } from "react";

import { useWindowSize } from "../hooks/useWindowSize";
import { GenerycznyWielkiPolak } from "../keyframes/GenerycznyWielkiPolak";
import { Marszałek } from "../keyframes/Marszałek";
import AgregatPolaków from "./AgregatPolaków";
import { default as axios } from "axios";
import { AlertInfo, Entitsy } from "../types/API";
import { PapiezKopter } from "../keyframes/PapiezKopter";
import { GiftedKonon } from "../keyframes/GiftedKonon";
import { Robercik } from "../keyframes/Robercik";
import { OrzełPolski } from "../keyframes/OrzełPolski";
import { Testo } from "../keyframes/Testo";
import { Pudzian } from "../keyframes/Pudzian";
import { KoloKnurskie } from "./KoloKnurskie";
import { TTSComponent } from "./TTSComponent";
import { Premier } from "../keyframes/Premier";
import { Zonk } from "../keyframes/Zonk";
import { Config } from "../Config";

const ZebranieNarodowe: Record<string, GenerycznyWielkiPolak> = {
  [Entitsy.MARSHALL]: new Marszałek(),
  [Entitsy.PREZENTKONON]: new GiftedKonon(),
  [Entitsy.KUBICA]: new Robercik(),
  [Entitsy.MAŁYSZ]: new OrzełPolski(),
  [Entitsy.TESTO]: new Testo(),
  [Entitsy.MARIUSZ]: new Pudzian(),
  [Entitsy.PREMIER]: new Premier(),
  [Entitsy.ZONK]: new Zonk(),
  [Entitsy.PAPIEŻKOPTER]: new PapiezKopter(),
};

let Time = new Date().getTime();

enum Alerciaki {
  NIE_MA_ALERTA_XD,
  ALERT_O_KURWA,
}

export default function PolakWidget() {
  const windowSize = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [secondsLeft, setSecondsLeft] = useState(0);

  const [tekscikAlerta, setTekscikAlerta] = useState("");
  const [renderState, setRenderState] = useState(Alerciaki.NIE_MA_ALERTA_XD);
  const [alertDuration, setAlertDuration] = useState(0);
  const [alertStart, setAlertStart] = useState(0);
  const [showWheel, setShowWheel] = useState(false);
  const daveRef = useRef<HTMLAudioElement>(null);

  const [entitsy, setEntitsy] = useState<Entitsy[]>([]);

  const backendUrl = Config.getNewBackendURL();

  const u = new URLSearchParams(window.location.search);
  const token = u.get("token");

  const UpdateChain = () => {
    axios
      .get<{ event: AlertInfo | null }>(`${backendUrl}/v1/event`, {
        headers: { "X-Knur-Key": token },
      })
      .then((r) => {
        if (r.data.event !== null) {
          setAlertStart(new Date().getTime());
          setRenderState(Alerciaki.ALERT_O_KURWA);
          setTekscikAlerta(r.data.event.innerHtml);
          setAlertDuration(r.data.event.duration);
          setEntitsy(r.data.event.entities);
          setShowWheel(true);
        } else {
          setTimeout(UpdateChain, 1000);
        }
      })
      .catch(() => {
        setTimeout(UpdateChain, 1000);
      });
  };

  const onUpdate = () => {
    const deltaT = new Date().getTime() - Time;
    Time = new Date().getTime();
    const ctx = canvasRef.current?.getContext("2d");

    ctx?.clearRect(0, 0, windowSize.width, windowSize.height);

    if (ctx) {
      for (const key in ZebranieNarodowe) {
        if (entitsy.includes(key as Entitsy)) {
          ZebranieNarodowe[key].onUpdate(deltaT);
          ZebranieNarodowe[key].onDraw(ctx);
        }
      }
    }

    if (new Date().getTime() - alertStart > alertDuration) {
      setRenderState(Alerciaki.NIE_MA_ALERTA_XD);
      setTekscikAlerta("");
      setShowWheel(false);
      ctx?.clearRect(0, 0, windowSize.width, windowSize.height);
    } else if (renderState === Alerciaki.ALERT_O_KURWA)
      requestAnimationFrame(onUpdate);
  };

  const onNewAssetLoaded = () => {
    for (const key in ZebranieNarodowe) {
      if (ZebranieNarodowe[key].isLoaded() === false) {
        return;
      }
    }

    setTekscikAlerta("");
    UpdateChain();
  };

  const renderController = () => {
    onUpdate();
  };

  useEffect(() => {
    if (renderState === Alerciaki.ALERT_O_KURWA) {
      for (const key in ZebranieNarodowe) {
        ZebranieNarodowe[key].reset();
      }
      daveRef.current?.load();
      daveRef.current?.play();
      Time = new Date().getTime();
      requestAnimationFrame(renderController);
    } else if (renderState === Alerciaki.NIE_MA_ALERTA_XD) {
      setTimeout(UpdateChain, 1000);
    }
  }, [renderState]);

  useEffect(() => {
    setTekscikAlerta("ŁADUJE ALERTY UWU OWO MEOW");
    const interval = setInterval(() => {
      axios
        .get<{ seconds: number }>(`${backendUrl}/v1/timer`, {
          headers: { "X-Knur-Key": token },
        })
        .then((r) => {
          setSecondsLeft(r.data.seconds);
        })
        .catch(() => {
          setSecondsLeft(0);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const secondsToStamp = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const sp = seconds - hours * 3600 - minutes * 60;
    if (seconds <= 0) return "";
    return `${hours > 0 ? hours + ":" : ""}${
      minutes < 10 ? "0" + minutes : minutes
    }:${sp < 10 ? "0" + sp : sp}`;
  };

  return (
    <center style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ position: "absolute", top: "69px", left: "69px" }}>
        <h1>{secondsToStamp(secondsLeft)}</h1>
      </div>
      <TTSComponent text={"für deutschland"} />
      {/* @ts-expect-error type is not on audio element in typedef but is required */}
      <audio ref={daveRef} type="audio/mpeg" src="polskahehe.mp3" />
      <h1
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -35%)",
          textShadow: "5px 5px #558ABB",
          color: "pink",
          fontFamily: "Comic Sans MS",
          fontSize: "calc(21.37px * 2.666)",
        }}
      >
        {tekscikAlerta}
      </h1>
      <center>{/*<KoloKnurskie></KoloKnurskie>*/ null}</center>

      <canvas
        ref={canvasRef}
        style={{
          width: `${windowSize.width}px`,
          height: `${windowSize.height}px`,
        }}
        width={windowSize.width}
        height={windowSize.height}
      />
      <AgregatPolaków
        onNewAssetLoaded={onNewAssetLoaded}
        polaki={ZebranieNarodowe}
      />
      {1 !== 1 && showWheel && (
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            bottom: 0,
            right: 0,
          }}
        >
          <KoloKnurskie></KoloKnurskie>
        </div>
      )}
    </center>
  );
}
