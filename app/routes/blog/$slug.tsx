import { useCatch, useLoaderData, json, useParams } from "remix";
import type {
  ErrorBoundaryComponent,
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
  LinksFunction,
} from "remix";
import { getOneBlogPost } from "../../blog";
import highlightStyles from "highlight.js/styles/nord.css";
import { useMdxComponent } from "../../hooks/useMdxComponent";
import { components } from "../../components/mdx";

type LoaderData = {
  slug: string;
  title: string;
  description?: string;
  // code?: string;
  component: any;
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

  const { description, title, component } = await getOneBlogPost(slug);

  console.log("the component in loader: ", component);

  return json(
    {
      slug,
      title,
      description,
      component,
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
  const { component: Component, title } = useLoaderData<LoaderData>();

  // const Component = useMdxComponent({ code });

  console.log("the component type", typeof Component);
  console.log("the component", Component);

  return (
    <div className="prose w-full max-w-none dark:prose-invert">
      <h1>{title}</h1>
      <Component
        // @ts-ignore
        components={{ ...components }}
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
