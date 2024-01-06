import React, { useEffect } from "react";

//import "./KoloKnurskie.css";

export const KoloKnurskie: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      const sectors = [
        { color: "#f82", label: "C", odds: 20 },
        { color: "#0bf", label: "JS/TS" },
        { color: "#fb0", label: "PYTHON" },
        { color: "#0fb", label: "RUST" },
        { color: "#b0f", label: "GO" },
        { color: "#f0b", label: "CLOJURE" },
        { color: "#bf0", label: "PHP" },
      ];

      const rand = (m: any, M: any) => Math.random() * (M - m) + m;
      const tot = sectors.length;
      const spinEl = document.querySelector("#spin");
      const ctx = (
        document.querySelector("#wheel") as HTMLCanvasElement
      ).getContext("2d");
      const dia = ctx?.canvas.width;
      if (!dia) return <></>;
      const rad = dia / 2;
      const PI = Math.PI;
      const TAU = 2 * PI;
      const arc = TAU / sectors.length;

      const friction = 0.98; // 0.995=soft, 0.99=mid, 0.98=hard
      let angVel = 0; // Angular velocity
      let ang = 0; // Angle in radians

      const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

      function drawSector(sector: any, i: any) {
        if (!ctx) return;
        const xang = arc * i;

        ctx.save();

        // COLOR
        ctx.beginPath();
        ctx.fillStyle = sector.color;
        ctx.moveTo(rad, rad);
        ctx.arc(rad, rad, rad, xang, xang + arc);
        ctx.lineTo(rad, rad);
        ctx.fill();
        // TEXT
        ctx.translate(rad, rad);
        ctx.rotate(xang + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 30px sans-serif";
        ctx.fillText(sector.label, rad - 10, 10);
        //
        ctx.restore();
      }

      function rotate() {
        if (angVel < 0.002) return;

        const sector = sectors[getIndex()];
        if (!ctx) return;
        ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
      }

      function frame() {
        if (angVel < 0.002) {
          angVel = 0;
          const selected = sectors[getIndex()];
          const text = encodeURIComponent(selected.label);
          console.log(text);
          const url = "http://localhost:80/srepetto?data=" + text;
          const ttsAudio = document.getElementById(
            "audioTts",
          ) as HTMLAudioElement;

          if (ttsAudio) ttsAudio.src = url;
          ttsAudio.play();

          return;
        }
        angVel *= friction; // Decrement velocity by friction
        // Bring to stop
        ang += angVel; // Update angle
        ang %= TAU; // Normalize angle
        rotate();
      }

      function engine() {
        if (angVel <= 0) return;
        frame();
        requestAnimationFrame(engine);
      }

      function init() {
        if (!angVel) angVel = rand(0.15, 0.3);
        sectors.forEach(drawSector);
        rotate(); // Initial rotation
        engine(); // Start engine
      }
      init();
    }, 1000);
  }, []);

  return (
    <div id="wheelOfFortune">
      <audio id={"audioTts"}></audio>
      <canvas id="wheel" width="600" height="600"></canvas>
      <div id="spin">SPIN</div>
    </div>
  );
};
