import type { HeadersFunction, MetaFunction } from "remix";
import { Layout } from "../components/layout/Layout";
import { Nav } from "../components/Nav";

export const meta: MetaFunction = () => {
  return {
    title: `About - Pakata Goh`,
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
        <div className="space-y-4">
          <section className="text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
              Pakata Goh
            </h2>
            <p>Born and raised in sunny Singapore</p>
          </section>
          {/* 
        <section>
          <h2>Experiences</h2>
        </section> */}

          <section className="text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
              Education
            </h2>
            <ul className="list-inside list-disc">
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
            <ul className="list-inside list-disc">
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
