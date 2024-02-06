import { CSSProperties } from "react";

type LogoProps = {
  size?: string;
  style?: CSSProperties;
};
export const Logo = ({ size, style }: LogoProps) => {
  return (
    <img
      alt={"logo"}
      style={{ ...style, width: size, height: size }}
      src={"assets/logo/927x927.png"}
    />
  );
};
