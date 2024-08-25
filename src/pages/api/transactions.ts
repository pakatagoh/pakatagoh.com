import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();

      const name = body.name;

      return new Response(
        JSON.stringify({
          greeting: "Hello " + name ?? "No name",
        }),
      );
    } catch (error) {
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
};
