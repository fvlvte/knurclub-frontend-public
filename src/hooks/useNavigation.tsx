import { useState } from "react";

export const useNavigation: () => [string, (xd: string) => void] = () => {
  const [path, setPath] = useState(window.location.href);

  window.addEventListener("popstate", () => {
    setPath(window.location.href);
  });

  const doNavigation = (xxx: string) => {
    window.history.pushState({}, "", xxx);
  };

  return [path, doNavigation];
};
