import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import PolakWidget from "./compontents/PolakWidget";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <PolakWidget />
  </React.StrictMode>,
);
