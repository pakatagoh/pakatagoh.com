import type { NextPage } from "next"
import { Footer, HeadWithMetaTags, Nav } from "../components"

const HomePage: NextPage = () => {
  return (
    <>
      <HeadWithMetaTags
        title="Pakata Goh"
        description="Software developer from sunny Singapore"
        imageUrl="/images/meta/pakata-headshot.jpeg"
      >
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="GohPakata" />
      </HeadWithMetaTags>
      <div className="relative flex min-h-screen flex-col items-stretch px-4 py-3 md:mx-auto md:max-w-3xl">
        <div className="flex flex-1 flex-col items-stretch pb-[90px]">
          <Nav />
          <main className="flex flex-1 flex-col justify-center">
            <h1 className="mb-3 text-5xl font-bold leading-tight md:text-6xl">
              Pakata Goh
            </h1>
            <p>Software developer from sunny Singapore</p>
            <p>Currently working as a Frontend Engineer at foodpanda</p>
          </main>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default HomePage
