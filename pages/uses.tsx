import Head from "next/head"
import { HeadWithMetaTags } from "../components/HeadWithMetaTags"
import { Layout } from "../components/Layout"
import { Nav } from "../components/Nav"

const UseItem = (props: { category: string; content: string }) => {
  return (
    <>
      <span className="font-bold">{props.category}:</span> {props.content}
    </>
  )
}

const UsesPage = () => {
  return (
    <>
      <HeadWithMetaTags
        title="Uses - Pakata Goh"
        description="A list of stuff I use on a daily basis in my work and my
                    personal life"
        imageUrl="/images/uses/overhead-shot.jpeg"
      />
      <Layout>
        <Nav />
        <main>
          <h1 className="mb-6 text-3xl font-bold">Uses</h1>
          <div className="prose w-full max-w-none space-y-4 dark:prose-invert">
            <section className="text-gray-700 dark:text-gray-300">
              <h2 className="">Hardware</h2>
              <ul>
                <li>
                  <UseItem
                    category="Computer"
                    content='14" Macbook Pro - M1 Pro,
                32GB RAM'
                  />
                </li>
                <li>
                  <UseItem category="Monitor" content="LG 27UD88-W" />
                </li>
                <li>
                  <UseItem
                    category="Keyboard"
                    content="Happy Hacking Keyboard (HHKB) Professional Hybrid Type-S"
                  />
                </li>
                <li>
                  <UseItem
                    category="External Trackpad"
                    content="Magic Trackpad 2 - Space Grey"
                  />
                </li>
                <li>
                  <UseItem category="Camera" content="Fujifilm X100V - Black" />
                </li>
                <li>
                  <UseItem
                    category="Phone"
                    content="iPhone 13 Pro - Sierra Blue"
                  />
                </li>
                <li>
                  <UseItem category="Watch" content="Apple Watch Series 3" />
                </li>
              </ul>
            </section>
            <section className="text-gray-700 dark:text-gray-300">
              <h2 className="">Software</h2>
              <ul>
                <li>
                  <UseItem
                    category="Code Editor"
                    content="Visual Studio Code"
                  />
                </li>
                <li>
                  <UseItem
                    category="VS Code Theme"
                    content="Monokai++ or Andromeda(Colorizer), depends on my mood"
                  />
                </li>
                <li>
                  <UseItem
                    category="Font"
                    content="Fira Code (with ligatures)"
                  />
                </li>
              </ul>
            </section>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default UsesPage
