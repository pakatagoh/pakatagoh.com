import { json, useLoaderData, Link } from "remix";
import type {
  HeadersFunction,
  LoaderFunction,
  ErrorBoundaryComponent,
  MetaFunction,
} from "remix";
import { getBlogPosts } from "../../blog";
import { getHostByHostname } from "../../utils/misc";

export const meta: MetaFunction = ({ data }) => {
  const hostname = (data as LoaderData)?.hostname;
  const host = getHostByHostname(hostname);

  return {
    title: `Blog - Pakata Goh`,
    ...(host
      ? {
          image: `${host}/assets/resize/images/writing-article.jpg?w=400`,
          "og:image": `${host}/assets/resize/images/writing-article.jpg?w=400`,
          "twitter:image": `${host}/assets/resize/images/writing-article.jpg?w=400`,
        }
      : {}),
    description: `Blog posts`,
    // opengraph tags
    "og:title": `Blog - Pakata Goh`,
    "og:description": `Blog posts`,
    // twitter tags
    "twitter:title": "Blog - Pakata Goh",
    "twitter:description": "Blog posts",
  };
};

export const headers: HeadersFunction = () => {
  // console.log('loaderHeaders: ', loaderHeaders.get('cache-control'));

  // BUG: loader headers aren't working
  return {
    "cache-control":
      "max-age=3600, s-maxage=604800, stale-while-revalidate=31536000", // 1 hour, 1 week, 1 year
  };
};

type Post = {
  slug: string;
  title: string;
  description?: string;
  createdAt: string;
};
type LoaderData = {
  posts: Post[];
  hostname: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const posts = await getBlogPosts();

  return json(
    { posts, hostname: url.hostname },
    {
      status: 200,
      headers: {
        "cache-control":
          "max-age=1800, s-maxage=86400, stale-while-revalidate=31536000",
      },
    }
  );
};

const BlogIndex = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <main>
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-6 flex flex-col gap-6">
        {data.posts.map((postItem) => {
          return (
            <Link
              prefetch="intent"
              key={postItem.slug}
              to={postItem.slug}
              className="rounded-lg border border-gray-200 border-opacity-40 py-3 px-4 shadow-lg transition-shadow hover:shadow-md dark:border-gray-700 dark:border-opacity-30 dark:shadow-gray-900 sm:py-3 sm:px-4"
            >
              <div className="mb-3 flex flex-wrap items-center gap-1 sm:mb-2 sm:flex-nowrap sm:gap-3">
                <h4 className="font-medium ">{postItem.title}</h4>
                <div className="flex w-full items-center gap-1 text-sm text-gray-700 dark:text-gray-400 sm:w-auto sm:gap-3">
                  <span> - </span>
                  <span>{postItem.createdAt}</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                {postItem.description}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default BlogIndex;

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <main className="prose dark:prose-invert">
      <h1 className="text-3xl">App Error</h1>
      <p>Something went wrong when retrieving blog posts.</p>
      <p>Kindly refresh and try again or open an issue on Github</p>
      <section>
        <h2>Error Message</h2>
        <pre className="p-3">{error?.message ?? "Something went wrong"}</pre>
      </section>
    </main>
  );
};
