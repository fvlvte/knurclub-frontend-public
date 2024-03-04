import { useEffect, useState } from "react";
import AudioController, { AudioState } from "./AudioController.tsx";
import { MOCK_DATA } from "./UOKIK.ts";

const Progress = () => {
  //time w sekundach

  const MOCKUP = MOCK_DATA;

  const [playerState, setPlayerState] = useState<AudioState | null>(null);

  const [progressWidth, setProgressWidth] = useState(0);

  const calculateProgressBarWidth = () => {
    const currTime: number = playerState?.time.current ?? 0;
    const maxTime: number = playerState?.time.duration ?? 0;
    console.log(currTime, maxTime);
    setProgressWidth((currTime / maxTime) * 100);
  };

  useEffect(() => {
    calculateProgressBarWidth();
  }, [playerState]);

  const secToTime = (secIn: number) => {
    secIn = Math.round(secIn); //nie wiem na chuj połówki sekund xdd
    const h: number = Math.floor(secIn / 3600);
    secIn -= Math.floor(h * 3600);
    const m: number = Math.floor(secIn / 60);
    secIn -= Math.floor(m * 60);
    const s: number = secIn;
    const hString: string = h > 9 ? `${h}` : `0${h}`;
    const mString: string = m > 9 ? `${m}` : `0${m}`;
    const sString: string = s > 9 ? `${s}` : `0${s}`;
    let timeString: string = "";
    timeString += h > 0 ? `${hString}:` : "";
    timeString += `${mString}:`;
    timeString += `${sString}`;

    return timeString;
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: "0.5rem",
    alignSelf: "stretch",
  };

  const timestampStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
  };

  const timestampParagraphStyle = {
    color: "var(--base-white, #FFF)",
    fontFamily: "Inter",
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  };

  const progressBarContainerStyle = {
    display: "flex",
    height: "0.3125rem",
    width: "100%",
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: "0.25rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  };

  return (
    <div className={"player-progress"} style={containerStyle}>
      <AudioController
        source={MOCKUP.playerAudioSource}
        onTimeUpdate={(as: AudioState) => setPlayerState(as)}
      />
      <div className={"player-progress-timestamp"} style={timestampStyle}>
        <span style={timestampParagraphStyle}>
          {secToTime(playerState?.time.current ?? 0)}
        </span>
        <span style={timestampParagraphStyle}>
          {secToTime(playerState?.time.duration ?? 0)}
        </span>
      </div>
      <div
        className={"player-progress-bar-container"}
        style={progressBarContainerStyle}
      >
        <span
          className={"player-progress-bar-progress"}
          style={{
            height: "0.3125rem",
            backgroundColor: "var(--base-white, #FFF)",
            width: `${progressWidth}%`,
          }}
        ></span>
      </div>
    </div>
  );
};

export default Progress;
