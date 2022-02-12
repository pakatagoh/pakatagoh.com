import { json, useLoaderData, Link } from "remix";
import type {
  HeadersFunction,
  LoaderFunction,
  ErrorBoundaryComponent,
} from "remix";
import { getBlogPosts } from "../../blog";

// export const headers: HeadersFunction = ({ loaderHeaders }) => {
//   // console.log('loaderHeaders: ', loaderHeaders.get('cache-control'));

//   // BUG: loader headers aren't working
//   return {
//     'cache-control':
//       'max-age=1800, s-maxage=86400, stale-while-revalidate=31536000',
//   };
// };

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
      <h1 className="text-xl font-bold">Blog</h1>
      <div className="mt-6 flex flex-col gap-4">
        {data.map((postItem) => {
          return (
            <div key={postItem.slug}>
              <div className="flex items-center gap-3">
                <Link to={postItem.slug} className="font-medium">
                  {postItem.title}
                </Link>
                <span> - </span>
                <span className="text-sm text-gray-700">
                  {postItem.createdAt}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-700">
                {postItem.description}
              </p>
            </div>
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
