import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  useRef,
} from "react";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

type ThemeContextType = {
  theme?: Theme | null;
  setTheme?: Dispatch<React.SetStateAction<Theme | null | undefined>>;
};

const ThemeContext = createContext<ThemeContextType>({});

const themes: Array<Theme> = Object.values(Theme);

const prefersLightMQ = "(prefers-color-scheme: light)";
// const getPreferredTheme = () =>
//   window.matchMedia(prefersLightMQ).matches ? Theme.LIGHT : Theme.DARK;

export function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: React.ReactNode;
  specifiedTheme?: Theme | null;
}) {
  const [theme, setTheme] = useState<Theme | null | undefined>(specifiedTheme);

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }

    if (theme) {
      window.localStorage.setItem("pakata-theme", theme);
      if (theme === Theme.DARK) {
        document.documentElement.classList.add(Theme.DARK);
      } else {
        document.documentElement.classList.remove(Theme.DARK);
      }
    }

    // persistThemeRef.current.submit(
    //   { theme },
    //   { action: "action/set-theme", method: "post" }
    // );
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMQ);
    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.LIGHT : Theme.DARK);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (themeContext === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return themeContext;
};

const clientThemeCode = `
(function(){
  const isBrowser = typeof window !== "undefined";

  if(isBrowser) {
    const persistedTheme = window.localStorage.getItem('pakata-theme')
    console.log('hello persistedTheme:', persistedTheme)
  
    const systemTheme = window.matchMedia(${JSON.stringify(
      prefersLightMQ
    )}).matches
      ? 'light'
      : 'dark';
  
    const htmlClassList = document.documentElement.classList;
    
    if (persistedTheme) {
      if(persistedTheme === 'dark') {
        htmlClassList.add('dark');
        return;
      } else {
        htmlClassList.remove('dark');
        return;
      }
    }
  
    if(systemTheme !== 'light') {
      htmlClassList.add('dark');
    } else {
      htmlClassList.remove('dark');
    }
  }
})()
`;

export function NonFlashOfWrongThemeEls() {
  return (
    <>
      <script
        // NOTE: we cannot use type="module" because that automatically makes
        // the script "defer". That doesn't work for us because we need
        // this script to run synchronously before the rest of the document
        // is finished loading.
        dangerouslySetInnerHTML={{ __html: clientThemeCode }}
      />
    </>
  );
}

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}
