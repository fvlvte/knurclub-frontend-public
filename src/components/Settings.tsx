import { default as axios } from "axios";
import { Config } from "../Config";
import { useEffect } from "react";
import { V2SR } from "./V2SR";

export const Settings: React.FC = () => {
  const u = new URLSearchParams(window.location.search);

  return (
    <>
      <button>TRANSLACJE</button>
      <button>USTAWIENIA SR</button>
      <button>USTAWIENIA SA</button>
    </>
  );
};
