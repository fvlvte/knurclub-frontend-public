import { useEffect, useRef } from "react";

import { useWindowSize } from "../hooks/useWindowSize";
import { GenerycznyWielkiPolak } from "./GenerycznyWielkiPolak";
import { Marszałek } from "../keyframes/Marszałek";
import AgregatPolaków from "./AgregatPolaków";

let Time = new Date().getTime();

export default function PolakWidget() {
  const windowSize = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ZebranieNarodowe: GenerycznyWielkiPolak[] = [new Marszałek()];

  const onUpdate = () => {
    const deltaT = new Date().getTime() - Time;
    Time = new Date().getTime();
    const ctx = canvasRef.current?.getContext("2d");

    ctx?.clearRect(0, 0, windowSize.width, windowSize.height);

    if (ctx) {
      ZebranieNarodowe[0].onUpdate(deltaT);
      ZebranieNarodowe[0].onDraw(ctx);
    }
  };

  useEffect(() => {
    Time = new Date().getTime();
    let rqAnimationFrame: typeof requestAnimationFrame | null =
      requestAnimationFrame;
    const renderController = () => {
      onUpdate();

      if (rqAnimationFrame) rqAnimationFrame(renderController);
    };
    requestAnimationFrame(renderController);

    return () => {
      rqAnimationFrame = null;
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: `${windowSize.width}px`,
          height: `${windowSize.height}px`,
        }}
        width={windowSize.width}
        height={windowSize.height}
      />
      <AgregatPolaków polaki={ZebranieNarodowe} />
    </div>
  );
}
