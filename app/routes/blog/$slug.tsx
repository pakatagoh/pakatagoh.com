import { useCatch, useLoaderData, json, Link } from "remix";
import type {
  ErrorBoundaryComponent,
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
  LinksFunction,
} from "remix";
import { getOneBlogPost } from "../../blog";
import React, { forwardRef, useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import highlightStyles from "highlight.js/styles/nord.css";

type LoaderData = {
  slug: string;
  title: string;
  description?: string;
  code: string;
};

export const headers: HeadersFunction = () => {
  return {
    "cache-control":
      "max-age=1800, s-maxage=3600, stale-while-revalidate=31536000",
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: highlightStyles }];
};
export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title,
    description: data.description,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    throw new Response("Slug must be provided", {
      status: 400,
    });
  }

  const { description, title, code } = await getOneBlogPost(slug);

  return json(
    {
      slug,
      title,
      description,
      code,
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

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const BlogDetail = () => {
  const { code, title } = useLoaderData<LoaderData>();

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="prose w-full max-w-none dark:prose-invert">
      <h1>{title}</h1>
      <Component
        components={{
          // @ts-ignore
          a: forwardRef<HTMLAnchorElement, AnchorProps>(function AnchorOrLink(
            props,
            ref
          ) {
            const { href, children, ...rest } = props;

            const isUseInternalLink = href?.startsWith("/");
            const isHeaderLink = href?.startsWith("#");

            if (isHeaderLink) {
              return (
                <a
                  className="text-blue-700 no-underline hover:underline dark:text-orange-200"
                  href={href}
                  {...rest}
                  ref={ref}
                >
                  {children}
                </a>
              );
            }

            if (isUseInternalLink) {
              return (
                <Link
                  className="text-blue-600 no-underline hover:underline dark:text-orange-300"
                  to={href ?? ""}
                  {...rest}
                  ref={ref}
                >
                  {children}
                </Link>
              );
            }

            return (
              <a
                className="text-blue-600 no-underline hover:underline dark:text-orange-300"
                href={href}
                {...rest}
                ref={ref}
              >
                {children}
              </a>
            );
          }),
        }}
      />
    </div>
  );
};

export default BlogDetail;

export const CatchBoundary = () => {
  const caught = useCatch();
  const caughtStatus = caught.status;

  switch (caughtStatus) {
    case 404:
      return <div>No such blog post</div>;
    default:
      throw new Error(`Unhandled Error: ${caughtStatus}`);
  }
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
};
