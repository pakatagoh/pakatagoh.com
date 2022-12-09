import Head from "next/head"
import { PropsWithChildren } from "react"

const PAGE_ORIGIN =
  process.env.NEXT_PUBLIC_ORIGIN ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? ""

export const HeadWithMetaTags = ({
  title,
  description,
  imagePath,
  children,
}: PropsWithChildren<{
  title: string
  description?: string
  imagePath?: string
}>) => {
  const imageUrl = imagePath && PAGE_ORIGIN ? `${PAGE_ORIGIN}${imagePath}` : ""

  return (
    <Head>
      <title>{title}</title>

      <meta property="og:title" content={title} />

      <meta name="twitter:title" content={title} />

      {description ? (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      ) : null}

      {imageUrl ? (
        <>
          <meta name="image" content={imageUrl} />
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      ) : null}
      {children}
    </Head>
  )
}
