import { useState } from "react";

export const useTutorial = () => {
  const initial = JSON.parse(
    localStorage.getItem("tutorial") || "true"
  ) as boolean;

  const [isOpened, setIsOpened] = useState<boolean>(initial);

  const closeTutorial = () => {
    setIsOpened(false);
    localStorage.setItem("tutorial", "false");
  };
  return { isOpened, closeTutorial };
};
