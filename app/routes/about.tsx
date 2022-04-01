import type { HeadersFunction, MetaFunction } from "remix";
import { Layout } from "../components/layout/Layout";
import { AnchorOrLink } from "../components/mdx/AnchorOrLinkComponent";
import { Nav } from "../components/Nav";

export const meta: MetaFunction = () => {
  return {
    title: `About - Pakata Goh`,
    description:
      "Software developer from sunny Singapore. Find out more about me here!",
    //opengraph tags
    "og:title": "About - Pakata Goh",
    "og:description":
      "Software developer from sunny Singapore. Find out more about me here!",
    //twitter tags
    "twitter:title": "About - Pakata Goh",
    "twitter:description":
      "Software developer from sunny Singapore. Find out more about me here!",
  };
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=43200, s-maxage=86400, stale-while-revalidate=31536000",
  };
};

const About = () => {
  return (
    <Layout>
      <Nav />
      <main>
        <h1 className="mb-6 text-3xl font-bold">About me</h1>
        <div className="prose w-full max-w-none space-y-4 dark:prose-invert">
          <section className="text-gray-700 dark:text-gray-300">
            <h2 className="">Pakata Goh</h2>
            <p>
              Born in 1990 and raised in sunny Singapore. If you&apos;re
              wondering why my name sounds strange, it&apos;s because it&apos;s
              a Buddhist name. I&apos;m Singaporean Chinese. I attended the
              National University of Singapore (NUS) and graduated with a degree
              in mechanical engineering in 2015. During university, I was part
              of the NUS Formula Student team competing in the Formula Student
              (FSAE) Michigan competiton.
            </p>
            <p>
              In July 2018, I decided to leave my job as a technical sales
              engineer in the industrial sector to pursue software development
              as a career. As I was learning, I completed the #100DaysOfCode
              challenge and managed to secure an internship as a junior
              developer. In Feb 2019, I joined a bootcamp conducted by
              ThoughtWorks (Singapore).
            </p>
            <p>
              I&apos;ve learnt a lot, both during my time of self-learning and
              during the bootcamp. I decided to create this website to further
              document my journey as a developer and to also share the knowledge
              I have gained thus far.
            </p>
            <p>
              In my free time, I dabble in a little photography. I love cars and
              I keep up with Formula 1 during race weekends.
            </p>
          </section>

          <section>
            <h2>Talks</h2>
            <ul>
              <li>
                <AnchorOrLink
                  href="https://www.youtube.com/watch?v=7tcf20ItkA0"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hooked on Hooks: Intro to React Hooks"
                >
                  Hooked on Hooks: Intro to React Hooks
                </AnchorOrLink>
              </li>
            </ul>
          </section>

          <section className="text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
              Education
            </h2>
            <ul className="list-disc">
              <li>
                Bachelors of Engineering (Mechanical Engineering) - National
                University of Singapore
              </li>
            </ul>
          </section>
          <section className="text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
              Hobbies
            </h2>
            <ul className="list-disc">
              <li>Photography</li>
              <li>Formula 1</li>
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default About;
