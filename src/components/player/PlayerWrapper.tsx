/*import { useEffect, useState } from "react";

import { css } from "@linaria/core";
import { modularScale, hiDPI } from "polished";*/

/*const container = css`
  width: 100%;
  height: 100%;
`;*/
import {useEffect} from "react";
import { Container } from "./Container.tsx";

/*type NewPlayerProps = {
  token?: string;
};*/
const PlayerWrapper = () => {
  const u = new URLSearchParams(window.location.search);
  const token = u.get("token") ?? "";

  //const DATA = MOCK_DATA;


  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

    ws.onopen = () => {
      console.log("opened");

      ws.send(JSON.stringify({ type: "event.subscribe", param: ["songrequest.queue"]}));
    }

    return () => { ws.close(); }
  }, [token]);




  return (
    <>
      <Container/>
    </>
  );
};

export default PlayerWrapper;
