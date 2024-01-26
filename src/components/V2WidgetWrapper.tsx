import { default as axios } from "axios";
import { Config } from "../Config";
import { useEffect, useState } from "react";

export const V2WidgetWrapper: React.FC = () => {
  const u = new URLSearchParams(window.location.search);
  const token = u.get("token");

  const backendUrl = Config.getNewBackendURL();

  // Keep alive handler.
  useEffect(() => {
    const interval = window.setInterval(() => {
      axios
        .get(`${backendUrl}/core/keep-alive`)
        .then((d) => {
          console.log(d.data);
        })
        .catch((e) => console.error(e));
    }, 60000);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {!token && <h2>GOWNO NIE MA TOKENA AOK</h2>}
      {token && <h2>TOKEN ZAŁADOWANY W DU</h2>}
    </div>
  );
};
