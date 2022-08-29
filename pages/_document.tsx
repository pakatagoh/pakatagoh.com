import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body className="transition duration-150 dark:bg-gray-800 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
