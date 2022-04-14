import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { MetaFunction, LoaderFunction, LinksFunction } from "remix";
import styles from "./styles/app.css";
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from "./utils/theme-provider";
import NavNotification from "./components/NavNotification";
import faviconIco from "../public/favicon.ico";
import faviconSvg from "../public/favicon.svg";
import { getHostByHostname } from "./utils/misc";
import { Layout } from "./components/layout/Layout";
import { Nav } from "./components/Nav";
import { useLocalStorageTheme } from "./hooks/useLocalStorageTheme";

type LoaderData = {
  hostname: string;
  gaId: string;
};

export const meta: MetaFunction = ({ location, data }) => {
  const hostname = (data as LoaderData)?.hostname;
  const host = getHostByHostname(hostname);

  return {
    title: "Pakata Goh",
    description: "Software developer from sunny Singapore",
    ...(host
      ? {
          image: `${host}/assets/resize/images/pakata-headshot.jpg?w=400`,
          "og:url": `${host}${location.pathname}`,
          "og:image": `${host}/assets/resize/images/pakata-headshot.jpg?w=400`,
          "twitter:image": `${host}/assets/resize/images/pakata-headshot.jpg?w=400`,
        }
      : {}),
    //opengraph tags
    "og:title": "Pakata Goh",
    "og:description": "Software developer from sunny Singapore",
    "og:type": "website",
    //twitter tags
    "twitter:title": "Pakata Goh",
    "twitter:description": "Software developer from sunny Singapore",
    "twitter:card": `summary_large_image`,
    "twitter:creator": `GohPakata`,
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: faviconIco },
    { rel: "icon", href: faviconSvg, type: "image/svg+xml" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const gaId = process.env.GA_ID ?? "";

  return json({ hostname: url.hostname, gaId });
};

function App() {
  const data = useLoaderData<LoaderData>();
  const gaId = data.gaId;

  const { theme } = useTheme();
  const isDarkTheme = theme === Theme.DARK;
  return (
    <html lang="en" className={isDarkTheme ? "dark" : undefined}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls />
      </head>
      <body className="w-full transition duration-150 dark:bg-gray-800 dark:text-white">
        <Outlet />
        <NavNotification />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
        {gaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', '${gaId}');
  `,
              }}
            ></script>
          </>
        ) : null}
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const theme = useLocalStorageTheme();

  return (
    <ThemeProvider specifiedTheme={theme as Theme}>
      <App />
    </ThemeProvider>
  );
}
export function CatchBoundary(data: { error: Error }) {
  const caught = useCatch();

  const isFourOhFour = caught.status === 404;

  const theme = useLocalStorageTheme();
  return (
    <ThemeProvider specifiedTheme={theme as Theme}>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="utf-8" />
          <title>Not Found</title>
          <Meta />
          <Links />
          <NonFlashOfWrongThemeEls />
        </head>
        <body className="w-full transition duration-150 dark:bg-gray-800 dark:text-white">
          <Layout>
            <Nav />
            <div className="prose dark:prose-invert">
              {isFourOhFour ? (
                <>
                  <h1 className="text-3xl">Not Found</h1>
                  <p>
                    Oops! We are not able to find the resource you were looking
                    for
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl">App Error</h1>
                  <section>
                    <h2>Error Message</h2>
                    <pre className="p-3">
                      {data?.error?.message ?? "Something went wrong"}
                    </pre>
                  </section>
                </>
              )}
            </div>
          </Layout>
          <NavNotification />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const theme = useLocalStorageTheme();
  return (
    <ThemeProvider specifiedTheme={theme as Theme}>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="utf-8" />
          <title>Uh-oh!</title>
          <Meta />
          <Links />
          <NonFlashOfWrongThemeEls />
        </head>
        <body className="w-full transition duration-150 dark:bg-gray-800 dark:text-white">
          <Layout>
            <Nav />
            <div className="prose dark:prose-invert">
              <h1 className="text-3xl">App Error</h1>
              <p>
                This shouldn&apos;t be your fault. Kindly refresh and try again
                or open an issue on Github
              </p>
              <section>
                <h2>Error Message</h2>
                <pre className="p-3">
                  {error?.message ?? "Something went wrong"}
                </pre>
              </section>
            </div>
          </Layout>
          <NavNotification />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    </ThemeProvider>
  );
}
