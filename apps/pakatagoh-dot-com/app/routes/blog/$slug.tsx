import { useCatch, useLoaderData, useParams, json } from 'remix';
import type {
  ErrorBoundaryComponent,
  LoaderFunction,
  MetaFunction,
} from 'remix';
import { getOneBlogPost } from '../../blog';
// import { useMemo } from 'react';
// import { getMDXComponent } from 'mdx-bundler/client';

type LoaderData = {
  slug: string;
  title: string;
  description?: string;
  code: string;
};

// export const meta: MetaFunction = ({ data }) => {
//   return {
//     title: data.title,
//     description: data.description,
//   };
// };

// export const loader: LoaderFunction = async ({ params }) => {
//   const slug = params.slug;

//   if (!slug) {
//     throw new Response('Slug must be provided', {
//       status: 400,
//     });
//   }

//   const { description, title, code } = await getOneBlogPost(slug);

//   return json(
//     {
//       slug,
//       title,
//       description,
//       code,
//     },
//     {
//       status: 200,
//       headers: {
//         'cache-control':
//           'max-age=1800, s-maxage=3600, stale-while-revalidate=31536000',
//       },
//     }
//   );
// };

const BlogDetail = () => {
  // const { code, title, description } = useLoaderData<LoaderData>();

  // const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      hi from blog detail page
      {/* <h1>{title}</h1> */}
      {/* <Component /> */}
    </>
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
