import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect, useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSP, setIsSP] = useState<boolean>(false);

  function viewportSet() {
    const wsw = window.screen.width;
    if (wsw < 768) {
      setIsSP(true);
    } else {
      setIsSP(false);
    }
  }

  useEffect(() => {
    viewportSet();
    window.addEventListener('resize', viewportSet);
  }, []);

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content={isSP ? 'width=device-width, initial-scale=1' : 'width=1280'} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration getKey={location => location.pathname} />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
