import type {
  ErrorBoundaryComponent,
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { getOneBlogPost } from "../../blog";
import highlightStyles from "highlight.js/styles/nord.css";
import { useMdxComponent } from "../../hooks/useMdxComponent";
import { getHostByHostname } from "../../utils/misc";

type LoaderData = {
  slug: string;
  title: string;
  description?: string;
  keywords?: string[];
  code: string;
  hostname: string;
};

export const headers: HeadersFunction = () => {
  return {
    "cache-control":
      "max-age=7200, s-maxage=432000, stale-while-revalidate=31536000", // 2hours, 5 days, 1 year
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: highlightStyles }];
};
export const meta: MetaFunction = ({ data }) => {
  const hostname = (data as LoaderData)?.hostname;
  const host = getHostByHostname(hostname);

  return {
    title: data?.title ? `${data.title} - Pakata Goh` : "Not Found",
    ...(host
      ? {
          image: `${host}/assets/resize/images/writing-article.jpg?w=400`,
          "og:image": `${host}/assets/resize/images/writing-article.jpg?w=400`,
          "twitter:image": `${host}/assets/resize/images/writing-article.jpg?w=400`,
        }
      : {}),
    "og:title": data?.title ? `${data.title} - Pakata Goh` : "Not Found",
    "og:type": "article",
    "og:article:author": "Pakata Goh",
    ...(data?.description
      ? {
          description: data.description,
          "og:description": data.description,
          "twitter:description": data.description,
        }
      : {}),
    ...(data?.createdAt ? { "og:article:published_time": data.createdAt } : {}),
    ...(data?.keywords?.length > 0 ? { "og:article:tag": data.keywords } : {}),

    // twitter tags
    "twitter:title": data?.title ? `${data.title} - Pakata Goh` : "Not Found",
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);

  const slug = params.slug;

  if (!slug) {
    throw new Response("Slug must be provided", {
      status: 400,
    });
  }

  const blogPostData = await getOneBlogPost(slug);

  return json(
    {
      slug,
      code: blogPostData.code,
      title: blogPostData.title,
      description: blogPostData.description,
      createdAt: blogPostData.createdAt,
      keywords: blogPostData.keywords,
      hostname: url.hostname,
    },
    {
      status: 200,
      headers: {
        "cache-control":
          "max-age=1800, s-maxage=3600, stale-while-revalidate=31536000",
      },
    }
  );
};

const BlogDetail = () => {
  const { code, title } = useLoaderData<LoaderData>();

  const Component = useMdxComponent({ code });

  return (
    <div className="prose w-full max-w-none break-words dark:prose-invert">
      <h1>{title}</h1>
      <Component />
    </div>
  );
};

export default BlogDetail;

export const CatchBoundary = () => {
  const caught = useCatch();
  const caughtStatus = caught.status;

  switch (caughtStatus) {
    case 404:
      return (
        <div className="prose dark:prose-invert">
          <h1 className="text-3xl">Not Found</h1>
          <p>Unfortunately, /blog/{caught.data} doesn&apos;t exist</p>
        </div>
      );
    default:
      throw new Error(`Unhandled Error: ${caughtStatus}`);
  }
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <div className="prose dark:prose-invert">
      <h1 className="text-3xl">Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
};
