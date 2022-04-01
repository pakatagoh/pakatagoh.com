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
import NavNotification from "./components/NavNotification";
import { useMemo } from "react";

type LoaderData = {
  hostname: string;
};

export const meta: MetaFunction = ({ location, data }) => {
  const { hostname } = data as LoaderData;
  const host = hostname === "localhost" ? "http://localhost:3000" : hostname;

  return {
    title: "Pakata Goh",
    description: "Software developer from sunny Singapore",
    image: `${host}/assets/resize/images/pakata-headshot.jpg?w=400`,
    //opengraph tags
    "og:title": "Pakata Goh",
    "og:description": "Software developer from sunny Singapore",
    "og:url": `${host}${location.pathname}`,
    "og:image": `${host}/assets/resize/images/pakata-headshot.jpg?w=400`,
    "og:type": "website",
    //twitter tags
    "twitter:title": "Pakata Goh",
    "twitter:description": "Software developer from sunny Singapore",
    "twitter:image": `${host}/assets/resize/images/pakata-headshot.jpg?w=400`,
    "twitter:card": `summary_large_image`,
    "twitter:creator": `GohPakata`,
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  return json({ hostname: url.hostname });
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
