import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();

      const name = body.name;
      const email = body.email;

      console.log("the name: ", name);
      console.log("the email: ", email);

      return new Response(
        JSON.stringify({
          greeting: "Hello " + name ?? "No name",
          email: email ?? "No email data",
        }),
      );
    } catch (error) {
      return new Response(null, { status: 400 });
    }
  }
  return new Response(null, { status: 400 });
};
