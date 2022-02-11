import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LinksFunction,
  useCatch,
} from 'remix';
import type { MetaFunction } from 'remix';
import styles from './styles/app.css';

export const meta: MetaFunction = () => {
  return { title: 'Pakata Goh' };
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary({ error }: { error: Error }) {
  const caught = useCatch();

  const isFourOhFour = caught.status === 404;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Not Found</title>
        <Meta />
        <Links />
      </head>
      <body>
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
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Uh-oh!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="error-container">
          <h1>App Error</h1>
          <pre>{error.message}</pre>
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
