import { useMemo } from "react";
import { Theme } from "../utils/theme-provider";

export const useLocalStorageTheme = () => {
  const theme = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const theme = window.localStorage.getItem("pakata-theme");

    return theme ?? Theme.DARK;
  }, []);

  return theme;
};
