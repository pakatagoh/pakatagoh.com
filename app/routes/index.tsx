import type { HeadersFunction } from "remix";
import Footer from "../components/Footer";
import { Nav } from "../components/Nav";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "max-age=43200, s-maxage=86400, stale-while-revalidate=31536000",
  };
};

export default function Index() {
  return (
    <div className="flex h-screen flex-col px-4 py-3 md:mx-auto md:max-w-3xl">
      <Nav />
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full text-base md:text-lg">
          <h1 className="mb-3 text-5xl font-bold leading-tight md:text-6xl">
            Pakata Goh
          </h1>
          <p>Software developer from sunny Singapore</p>
          <p>Currently working as a Fullstack Developer at Pixibo Pte Ltd</p>
        </div>
      </main>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
