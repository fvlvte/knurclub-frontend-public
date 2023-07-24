import { useCallback, useEffect, useRef, useState } from "react";

import { useWindowSize } from "../hooks/useWindowSize";
import axios from "axios";
import { PapiezKopter } from "../keyframes/PapiezKopter";

enum StanyMarszałka {
  WJAZD,
  BACZNOŚĆ,
  WYJAZD,
  SPOCZYNEK,
}

let animationState = {
  orzełX: -100,
  orzełY: window.innerHeight + 100,
  orzełVelocity: 0.05,
  lastFrameTime: new Date().getTime(),
  marszałekY: 2000,
  marszałekVelocity: 0.25,
  marszałekX: 0,
  marszałekStan: StanyMarszałka.WJAZD,
  skalaMarszałka: 0.666,
  mariuszX: -1000,
  mariuszVelocity: 0.25,
  mariuszY: 250,
  mariuszStan: StanyMarszałka.WJAZD,
  skalaMariusza: 0.666,
};

let testoKontroler = {
  x: 0,
  y: 500,

  amimationSpeed: 0.005,
  animationFrame: 0,

  init: 0,
};

const stanRobercika = {
  x: -500,
  velocity: 1.5,
  skalaRobercika: 0.666 * 0.666,
};

const globalnyStanxDd = {
  czyPapiezJestZalaczony: true,
  czyMarszalekJestZalaczony: true,
  czyRobercikJestZalaczony: true,
  czyMariuszJestZalaczony: true,
  czyTestoJestZalaczony: true,
  czyMalyszJestZalaczony: true,
};

export default function PolakWidget() {
  const windowSize = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const adamRef = useRef<HTMLImageElement>(null);
  const tekscikRef = useRef<HTMLImageElement>(null);
  const mariuszRef = useRef<HTMLImageElement>(null);

  const daveRef = useRef<HTMLAudioElement>(null);

  const papsonRef = useRef<HTMLSpanElement>(null);

  const [papiezKopter] = useState<PapiezKopter>(new PapiezKopter());

  const testoRef = [
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
  ];
  const robercikRef = useRef<HTMLImageElement>(null);

  const odniesienieDoMarszałka = useRef<HTMLImageElement>(null);

  const kontrolerWysigowy = () => {
    const context = canvasRef.current?.getContext("2d");
    const robercikImg = robercikRef.current;
    const d3lta = new Date().getTime() - animationState.lastFrameTime;

    stanRobercika.x += stanRobercika.velocity * d3lta;

    if (context && robercikImg) {
      context.drawImage(
        robercikImg,
        stanRobercika.x,
        window.innerHeight - robercikImg.height * stanRobercika.skalaRobercika,
        robercikImg.width * stanRobercika.skalaRobercika,
        robercikImg.height * stanRobercika.skalaRobercika,
      );
    }
  };

  const papaDom = useCallback(() => {
    if (papiezKopter) {
      const papiezaki = [];
      for (let i = 0; i < papiezKopter.getFrameCount(); i++) {
        papiezaki.push(
          <img key={i} src={`papiez${i}.png`} style={{ display: "none" }} />,
        );
      }
      return papiezaki;
    }
    return [];
  }, [papiezKopter]);

  const dyspenserPomarańczy = () => {
    const context = canvasRef.current?.getContext("2d");

    if (context && testoRef.every((img) => img)) {
      const d3lta = new Date().getTime() - animationState.lastFrameTime;

      if (testoKontroler.init === 0) {
        const testoFrejm =
          testoRef[Math.floor(testoKontroler.animationFrame)].current;
        if (testoFrejm !== null) {
          testoKontroler.y = window.innerHeight / 2 - 200;
          testoKontroler.x = window.innerWidth / 2 - testoFrejm.width / 2;
        }

        testoKontroler.init = 1;
      }

      testoKontroler.animationFrame += testoKontroler.amimationSpeed * d3lta;

      if (testoKontroler.animationFrame > 39) {
        testoKontroler.animationFrame = 0;
      }

      const testoFrame = Math.floor(testoKontroler.animationFrame);
      const testoObrazek = testoRef[testoFrame].current;
      if (testoObrazek != null) {
        context.drawImage(testoObrazek, testoKontroler.x, testoKontroler.y);
      }
    }
  };

  const animujMarszałka = () => {
    const context = canvasRef.current?.getContext("2d");
    const marszałekImg = odniesienieDoMarszałka.current;

    if (context && marszałekImg) {
      const d3lta = new Date().getTime() - animationState.lastFrameTime;

      switch (animationState.marszałekStan) {
        case StanyMarszałka.WJAZD: {
          animationState.marszałekY -= animationState.marszałekVelocity * d3lta;
          if (
            window.innerHeight -
              marszałekImg.width * animationState.skalaMarszałka >=
            animationState.marszałekY
          ) {
            animationState.marszałekStan = StanyMarszałka.BACZNOŚĆ;
            animationState.marszałekVelocity = 0;
          }
          break;
        }
        case StanyMarszałka.BACZNOŚĆ: {
          animationState.marszałekVelocity += 0.0009 * d3lta;
          if (animationState.marszałekVelocity >= 0.5) {
            animationState.marszałekStan = StanyMarszałka.WYJAZD;
          }
          break;
        }
        case StanyMarszałka.WYJAZD: {
          animationState.marszałekY += animationState.marszałekVelocity * d3lta;
          if (animationState.marszałekY <= -1000) {
            animationState.marszałekStan = StanyMarszałka.SPOCZYNEK;
          }
          break;
        }
      }

      context.drawImage(
        marszałekImg,
        animationState.marszałekX,
        animationState.marszałekY,
        marszałekImg.width * animationState.skalaMarszałka,
        marszałekImg.height * animationState.skalaMarszałka,
      );
    }
  };

  const animujMariusza = () => {
    const context = canvasRef.current?.getContext("2d");
    const mariuszImg = mariuszRef.current;

    if (context && mariuszImg) {
      const d3lta = new Date().getTime() - animationState.lastFrameTime;

      switch (animationState.mariuszStan) {
        case StanyMarszałka.WJAZD: {
          animationState.mariuszX += animationState.mariuszVelocity * d3lta;
          if (animationState.mariuszX >= 0) {
            animationState.mariuszStan = StanyMarszałka.BACZNOŚĆ;
            animationState.mariuszVelocity = 0;
          }
          break;
        }
        case StanyMarszałka.BACZNOŚĆ: {
          animationState.mariuszVelocity += 0.0009 * d3lta;
          if (animationState.mariuszVelocity >= 0.5) {
            animationState.mariuszStan = StanyMarszałka.WYJAZD;
          }
          break;
        }
        case StanyMarszałka.WYJAZD: {
          animationState.mariuszX -= animationState.mariuszVelocity * d3lta;
          if (animationState.mariuszX > 2000) {
            animationState.mariuszStan = StanyMarszałka.SPOCZYNEK;
          }
          break;
        }
      }

      context.drawImage(
        mariuszImg,
        animationState.mariuszX,
        animationState.mariuszY,
        mariuszImg.width * animationState.skalaMariusza,
        mariuszImg.height * animationState.skalaMariusza,
      );
    }
  };

  // eslint-disable-next-line complexity
  const animujOrłaPolski = () => {
    const context = canvasRef.current?.getContext("2d");

    if (context) {
      const d3lta = new Date().getTime() - animationState.lastFrameTime;

      animationState.orzełX += animationState.orzełVelocity * d3lta;
      animationState.orzełY -= animationState.orzełVelocity * d3lta;

      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;

      context.clearRect(0, 0, windowSize.height, windowSize.width);

      if (globalnyStanxDd.czyMarszalekJestZalaczony) animujMarszałka();
      if (globalnyStanxDd.czyMariuszJestZalaczony) animujMariusza();
      if (globalnyStanxDd.czyRobercikJestZalaczony) kontrolerWysigowy();
      if (globalnyStanxDd.czyTestoJestZalaczony) dyspenserPomarańczy();

      if (papiezKopter) {
        papiezKopter.onUpdate(d3lta);
        papiezKopter.onDraw(context);
      }

      animationState.lastFrameTime = new Date().getTime();

      context.save();

      const adamImg = adamRef.current;
      if (adamImg) {
        if (globalnyStanxDd.czyMalyszJestZalaczony) {
          const przeszkalowanyAdamX = adamImg.width * 0.666 * 0.666;
          const przeszkalowanyAdamY = adamImg.height * 0.666 * 0.666;

          context.translate(
            animationState.orzełX + przeszkalowanyAdamX / 2,
            animationState.orzełY + przeszkalowanyAdamY / 2,
          );

          // Apply the rotation
          const rotationAngleInDegrees = animationState.orzełX % 360;
          const rotationAngleInRadians =
            rotationAngleInDegrees * (Math.PI / 180);
          context.rotate(rotationAngleInRadians);
          context.drawImage(
            adamImg,
            -przeszkalowanyAdamX / 2,
            -przeszkalowanyAdamY / 2,
            przeszkalowanyAdamX,
            przeszkalowanyAdamY,
          );
        }
      }
      context.resetTransform();
      context.restore();
    }

    if (!papiezKopter || papiezKopter.getY() > -500)
      requestAnimationFrame(animujOrłaPolski);
    else {
      const cx = canvasRef.current?.getContext("2d");
      if (cx) {
        cx.clearRect(0, 0, windowSize.height, windowSize.width);
      }

      daveRef.current?.pause();
      const style = tekscikRef.current?.style;
      if (style) style.display = "none";
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setTimeout(papaStarter, 1000);
    }
  };

  const lotNarodowy = (czyToBogacz?: boolean) => {
    const rx: HTMLImageElement[] = [];
    papsonRef.current?.childNodes.forEach((node) => {
      rx.push(node as HTMLImageElement);
    });

    papiezKopter.setRefArray(rx);
    papiezKopter?.reset();

    if (czyToBogacz) {
      globalnyStanxDd.czyTestoJestZalaczony = true;
    } else {
      globalnyStanxDd.czyTestoJestZalaczony = false;
    }
    const img = odniesienieDoMarszałka.current;
    if (!img) return;
    animationState = {
      orzełX: -100,
      orzełY: window.innerHeight + 100,
      orzełVelocity: 0.33,
      lastFrameTime: new Date().getTime(),
      marszałekX:
        (Math.random() *
          (window.innerWidth - img.width * animationState.skalaMarszałka * 2) +
          img.width * animationState.skalaMarszałka) /
        window.devicePixelRatio,
      marszałekY: 2000,
      marszałekVelocity: 0.5,
      marszałekStan: StanyMarszałka.WJAZD,
      skalaMarszałka: 0.666,
      mariuszX: -1000,
      mariuszVelocity: 0.25,
      mariuszY: 250,
      mariuszStan: StanyMarszałka.WJAZD,
      skalaMariusza: 0.666,
    };

    requestAnimationFrame(animujOrłaPolski);
  };

  const papaStarter = async () => {
    try {
      const duxpo = await axios.get<{ kicia: string | null }>(
        "http://localhost:80/twitch/folowekMeow",
      );
      if (duxpo.data.kicia) {
        const xppp = tekscikRef.current;
        if (xppp) {
          xppp.innerText = duxpo.data.kicia;
          xppp.style.display = "block";
        }

        stanRobercika.x = -500;

        testoKontroler = {
          x: 0,
          y: 500,

          amimationSpeed: 0.01,
          animationFrame: 0,

          init: 0,
        };
        daveRef.current?.pause();
        daveRef.current?.load();
        daveRef.current?.play();
        lotNarodowy(
          duxpo.data.kicia.includes(`sypukcji w prezencie`) ||
            duxpo.data.kicia.includes(`dzięki za sypukcje`),
        );
      } else setTimeout(papaStarter, 1000);
    } catch (e) {
      console.log(e);
      setTimeout(papaStarter, 1000);
    }
  };

  useEffect(() => {
    setTimeout(papaStarter, 1000);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#00000000",
        position: "relative",
      }}
    >
      {/* @ts-expect-error type is not on audio element in typedef but is required */}
      <audio ref={daveRef} type="audio/mpeg" src="polskahehe.mp3" />
      <p
        style={{
          position: "absolute",
          margin: "auto auto",
          color: "pink",
          fontSize: "calc(21.37em * 0.666 * 0.666 * 0.666 * 0.666)",
          fontFamily: "Comic Sans MS",
          textShadow: "#FC0 1px 0 10px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span ref={tekscikRef}></span>
      </p>
      <img ref={adamRef} src="adam.png" style={{ display: "none" }} />
      <img ref={mariuszRef} src={"mariusz.png"} style={{ display: "none" }} />
      <img ref={robercikRef} src={"robercik.png"} style={{ display: "none" }} />
      <span ref={papsonRef}>{papaDom()}</span>
      {(() => {
        const tesciak = [];
        for (let i = 0; i < 40; i++) {
          tesciak.push(
            <img
              key={i}
              ref={testoRef[i]}
              src={`testo${i}.png`}
              style={{ display: "none" }}
            />,
          );
        }
        return tesciak;
      })()}
      <img
        ref={odniesienieDoMarszałka}
        src="marszalek.png"
        style={{ display: "none" }}
      />
      <canvas ref={canvasRef} id="canvas" />
    </div>
  );
}
