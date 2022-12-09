import Head from "next/head"
import { PropsWithChildren } from "react"

const PAGE_HOSTNAME =
  process.env.NEXT_PUBLIC_HOSTNAME ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? ""

const getImageUrl = (path?: string) => {
  const protocol = PAGE_HOSTNAME.includes("localhost") ? "http://" : "https://"

  return path ? `${protocol}${PAGE_HOSTNAME}${path}` : ""
}

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
  const imageUrl = getImageUrl(imagePath)
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
