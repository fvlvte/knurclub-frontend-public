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

const ZebranieNarodowe: Record<string, GenerycznyWielkiPolak> = {
  [Entitsy.MARSHALL]: new Marszałek(),
  [Entitsy.PREZENTKONON]: new GiftedKonon(),
  [Entitsy.KUBICA]: new Robercik(),
  [Entitsy.MAŁYSZ]: new OrzełPolski(),
  [Entitsy.TESTO]: new Testo(),
  [Entitsy.MARIUSZ]: new Pudzian(),
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

  const [tekscikAlerta, setTekscikAlerta] = useState("");
  const [renderState, setRenderState] = useState(Alerciaki.NIE_MA_ALERTA_XD);
  const [alertDuration, setAlertDuration] = useState(0);
  const [alertStart, setAlertStart] = useState(0);
  const daveRef = useRef<HTMLAudioElement>(null);

  const [entitsy, setEntitsy] = useState<Entitsy[]>([]);

  const UpdateChain = () => {
    axios
      .get<{ event: AlertInfo | null }>(`http://localhost/twitch/v2/event`)
      .then((r) => {
        if (r.data.event !== null) {
          setAlertStart(new Date().getTime());
          setRenderState(Alerciaki.ALERT_O_KURWA);
          setTekscikAlerta(r.data.event.innerHtml);
          setAlertDuration(r.data.event.duration);
          setEntitsy(r.data.event.entities);
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
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
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
    </div>
  );
}
