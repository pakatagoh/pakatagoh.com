import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { MetaFunction, LoaderFunction, LinksFunction } from "remix";
import styles from "./styles/app.css";
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
} from "./utils/theme-provider";
import { getThemeSession } from "./utils/theme.server";
import NavNotification from "./components/NavNotification";
import { useMemo } from "react";

export const meta: MetaFunction = ({ location }) => {
  const isProduction = process.env.NODE_ENV !== "development";
  const isStaging = process.env.ENV === "staging";

  const host = isStaging
    ? "https://dev.pakatagoh.com"
    : isProduction
    ? "https://pakatagoh.com"
    : "http://localhost:3000";

  return {
    title: "Pakata Goh",
    description: "hello world",
    image: `${host}/assets/resize/images/pakata-headshot.jpg?w=400`,
    charset: "utf-8",
    "og:title": "Pakata Goh",
    "og:description": "hello world",
    "og:url": `${host}${location.pathname}`,
    "og:image": `${host}/assets/resize/images/pakata-headshot.jpg?w=400`,
    "og:type": "website",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

type LoaderData = {
  theme: Theme;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return json(data);
};

function App() {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls />
      </head>
      <body className="transition duration-150 dark:bg-gray-800 dark:text-white">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <NavNotification />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const theme = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const theme = window.localStorage.getItem("pakata-theme");

    return theme ?? Theme.DARK;
  }, []);

  return (
    <ThemeProvider specifiedTheme={theme as Theme}>
      <App />
    </ThemeProvider>
  );
}
export function CatchBoundary({ error }: { error: Error }) {
  const caught = useCatch();

  const isFourOhFour = caught.status === 404;
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <title>Not Found</title>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls />
      </head>
      <body className="dark:bg-gray-800 dark:text-white">
        <div>
          {isFourOhFour ? (
            <>
              <h1>Resource not found</h1>
              <p>
                Oops! We are not able to find the resource you were looking for
              </p>
            </>
          ) : (
            <>
              <h1>App Error</h1>
              <pre>{error.message}</pre>
            </>
          )}
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <title>Uh-oh!</title>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls />
      </head>
      <body className="dark:bg-gray-800 dark:text-white">
        <div className="error-container">
          <h1>App Error</h1>
          <pre>{error.message}</pre>
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
