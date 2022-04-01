import { json, useLoaderData, Link } from "remix";
import type {
  HeadersFunction,
  LoaderFunction,
  ErrorBoundaryComponent,
  MetaFunction,
} from "remix";
import { getBlogPosts } from "../../blog";

export const meta: MetaFunction = () => {
  return {
    title: `Blog - Pakata Goh`,
  };
};

export const headers: HeadersFunction = () => {
  // console.log('loaderHeaders: ', loaderHeaders.get('cache-control'));

  // BUG: loader headers aren't working
  return {
    "cache-control":
      "max-age=1800, s-maxage=86400, stale-while-revalidate=31536000",
  };
};

type LoaderData = {
  slug: string;
  title: string;
  description?: string;
  createdAt: string;
};

export const loader: LoaderFunction = async () => {
  const posts = await getBlogPosts();

  return json(posts, {
    status: 200,
    headers: {
      "cache-control":
        "max-age=1800, s-maxage=86400, stale-while-revalidate=31536000",
    },
  });
};

const BlogIndex = () => {
  const data = useLoaderData<LoaderData[]>();

  return (
    <main>
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-6 flex flex-col gap-6">
        {data.map((postItem) => {
          return (
            <Link
              prefetch="intent"
              key={postItem.slug}
              to={postItem.slug}
              className="rounded-lg border border-gray-200 border-opacity-40 py-3 px-4 shadow-lg transition-shadow hover:shadow-md dark:border-gray-700 dark:border-opacity-30 dark:shadow-gray-900 sm:py-3 sm:px-4"
            >
              <div className="flex items-center gap-3">
                <h4 className="font-medium ">{postItem.title}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-400">
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
    <main>
      <h1 className="text-bold text-xl">
        Something went wrong retreiving blog posts
      </h1>
      <p>{error.message}</p>
    </main>
  );
};
