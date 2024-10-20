import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();

      const name = body.name;
      const email = body.email;
      const content = body.content;
      const sender = body.sender;
      const subject = body.subject;

      console.log("the name: ", name);
      console.log("the email: ", email);
      console.log("the content: ", content);
      console.log("the sender: ", sender);
      console.log("the subject: ", subject);

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
