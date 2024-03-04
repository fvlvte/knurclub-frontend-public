import { MOCK_DATA } from "./UOKIK.ts";
import Title from "./Title.tsx";
import { Info } from "./Info.tsx";
import Subtitle from "./Subtitle.tsx";
import Progress from "./Progress.tsx";

function Container() {
  const DATA = MOCK_DATA;

  return (
    <div
      style={{
        display: "flex",
        width: "60rem",
        height: "19.375rem",
        paddingRight: "1.5rem",
        alignItems: "flex-start",
        gap: "3rem",
        borderRadius: "1.5rem",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        background:
          "linear-gradient(90deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.47) 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "19.375rem",
          height: "19.375rem",
          flexDirection: "column",
          flexShrink: "0",
          borderRadius: "1.5rem",
          background: `lightgray 50% / cover no-repeat url(${DATA.playerIconSource})`,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          height: "15.375rem",
          padding: "2rem 0rem",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flex: "1 0 0",
        }}
      >
        <Title title={DATA.title} />
        <Subtitle content={DATA.subtitle} />
        <Info
          requesterName={DATA.user.name}
          pointsBalance={DATA.user.reputation}
          pointsDelta={0} // TODO: DODAC DANE
        />
        <Progress />
      </div>
    </div>
  );
}
export { Container };
