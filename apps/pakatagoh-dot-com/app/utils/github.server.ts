import { Octokit } from "@octokit/rest";

const authToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN ?? "";

const octokit = new Octokit({ auth: authToken });

const isProduction = process.env.NODE_ENV === "production";

export const getBlogContentList = async () => {
  const foundBlogContentList = await octokit.repos.getContent({
    owner: "pakatagoh",
    repo: "pakatagoh.com",
    path: "apps/pakatagoh-dot-com/content/blog",
    ref: "pakatagoh-dot-com/v2", // TODO: remove for after first deployment
    // ref: process.env.VERCEL_GIT_COMMIT_REF,
  });

  if (!Array.isArray(foundBlogContentList.data)) {
    throw new Error(
      "No list of blog content found. Weird. Check the repo and make sure the paths are correct."
    );
  }

  const blogListDetail = await Promise.all(
    foundBlogContentList.data.map(async (blogContent) => {
      const blogDetailResponse = (await octokit.repos.getContent({
        owner: "pakatagoh",
        repo: "pakatagoh.com",
        path: `${blogContent.path}/index.mdx`,
        ref: "pakatagoh-dot-com/v2", // TODO: remove for after first deployment
        // ref: process.env.VERCEL_GIT_COMMIT_REF,
      })) as { data: { content: string; encoding: BufferEncoding } };

      const blogDetail = blogDetailResponse.data;

      const blogContentString = Buffer.from(
        blogDetail.content,
        blogDetail.encoding
      ).toString();

      return {
        slug: blogContent.name,
        rawString: blogContentString,
      };
    })
  );

  return blogListDetail;
};
