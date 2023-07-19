import { useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  window.addEventListener("resize", () => {
    setWindowSize((oldValue) => {
      if (
        oldValue.width === window.innerWidth &&
        oldValue.height === window.innerHeight
      ) {
        return oldValue;
      } else {
        return { width: window.innerWidth, height: window.innerHeight };
      }
    });
  });

  return windowSize;
};
