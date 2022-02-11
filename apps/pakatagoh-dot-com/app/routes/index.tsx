import { HeadersFunction } from "remix";
import { Layout } from "../components/layout/Layout";
import { Nav } from "../components/Nav";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=43200, s-maxage=86400, stale-while-revalidate=31536000",
  };
};

export default function Index() {
  return (
    <Layout>
      <Nav />
      <main>
        <h1 className="text-2xl font-bold">Pakata Goh</h1>
        <p>Fullstack developer at Pixibo Pte Ltd</p>
        <p>
          Documenting my journey as a software developer from sunny Singapore
        </p>
      </main>
    </Layout>
  );
}
