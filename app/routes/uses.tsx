import type { HeadersFunction, MetaFunction } from "remix";
import { Layout } from "../components/layout/Layout";
import { Nav } from "../components/Nav";

export const meta: MetaFunction = () => {
  return {
    title: `Uses - Pakata Goh`,
    description:
      "A list of stuff I use on a daily basis in my work and my personal life",
    //opengraph tags
    "og:title": "Uses - Pakata Goh",
    "og:description":
      "A list of stuff I use on a daily basis in my work and my personal life",
    //twitter tags
    "twitter:title": "Uses - Pakata Goh",
    "twitter:description":
      "A list of stuff I use on a daily basis in my work and my personal life",
  };
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=43200, s-maxage=86400, stale-while-revalidate=31536000",
  };
};

const UseItem = (props: { category: string; content: string }) => {
  return (
    <>
      <span className="font-bold">{props.category}:</span> {props.content}
    </>
  );
};

const Uses = () => {
  return (
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
                  content="Macbook Air M1,
                16GB RAM (2020)"
                />
              </li>
              <li>
                <UseItem category="Monitor" content="LG 27UD88-W" />
              </li>
              <li>
                <UseItem category="Keyboard" content="Anne Pro2" />
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
                <UseItem category="Code Editor" content="Visual Studio Code" />
              </li>
              <li>
                <UseItem
                  category="VS Code Theme"
                  content="Monokai++ or Andromeda(Colorizer), depends on my mood"
                />
              </li>
              <li>
                <UseItem category="Font" content="Fira Code (with ligatures)" />
              </li>
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Uses;
