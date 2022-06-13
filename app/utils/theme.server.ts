import { createCookieSessionStorage } from "@remix-run/node";
import { Theme, isTheme } from "./theme-provider";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "paka_theme",
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date("2090-12-13"),
    httpOnly: true,
    secrets: ["boomz"],
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : Theme.DARK;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
