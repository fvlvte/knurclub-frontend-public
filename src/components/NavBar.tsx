import { Logo } from "./Logo";
import { SVGIcon } from "./SVGIcon";
import Hamburger from "./icons/Hamburger";
import React from "react";

import "./NavBar.css";

export const NavBar: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--nav-bg-color)",
        height: "4rem",
      }}
    >
      <div className={"NavBar"}>
        <Logo style={{ marginTop: "0.1rem" }} size={"3.8rem"} />
        <SVGIcon
          onClick={() => {
            alert("BENDZIE DZIAŁAC NIEDLUGO OK SRY DZK");
          }}
          iconStyle={{ width: "3rem", height: "3rem" }}
          className={"NavBarMenu"}
          Icon={Hamburger}
        />
      </div>
    </div>
  );
};
