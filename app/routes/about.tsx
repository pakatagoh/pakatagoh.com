import type { HeadersFunction } from "remix";
import { Layout } from "../components/layout/Layout";
import { Nav } from "../components/Nav";

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
        <h1 className="text-3xl font-bold">About me</h1>
        <p>Pakata Goh</p>
        <p>Singaporean</p>
      </main>
    </Layout>
  );
};

export default About;
