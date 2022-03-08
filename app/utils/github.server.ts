import { Octokit } from "@octokit/rest";
import { json } from "remix";

const authToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN ?? "";

export const getOctokit = () => new Octokit({ auth: authToken });

const octokit = getOctokit();

const isProduction = process.env.NODE_ENV === "production";

export const getBlogContentList = async () => {
  const foundBlogContentList = await octokit.repos.getContent({
    owner: "pakatagoh",
    repo: "pakatagoh.com",
    path: "content/blog",
    ref: "pakatagoh-dot-com/v2", // TODO: remove for after first deployment
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

export const getOneBlogContent = async (slug: string) => {
  try {
    const foundBlogIndex = await octokit.repos.getContent({
      owner: "pakatagoh",
      repo: "pakatagoh.com",
      path: `content/blog/${slug}/index.mdx`,
      ref: "pakatagoh-dot-com/v2", // TODO: remove for after first deployment
    });

    if (!foundBlogIndex.data) {
      throw json(`${slug}`, { status: 404 });
    }

    const blogDetail = foundBlogIndex.data as {
      content: string;
      encoding: BufferEncoding;
    };

    const blogContentString = Buffer.from(
      blogDetail.content,
      blogDetail.encoding
    ).toString();

    return {
      rawString: blogContentString,
    };
  } catch (error: any) {
    if (error.status === 404) {
      return;
    }
    console.error(error);
    throw json(`error getting blog data for ${slug}`, { status: 500 });
  }
};

export const getOneBlogComponentContent = async (slug: string) => {
  try {
    const foundBlogComponentContentList = await octokit.repos.getContent({
      owner: "pakatagoh",
      repo: "pakatagoh.com",
      path: `content/blog/${slug}/components`,
      ref: "pakatagoh-dot-com/v2", // TODO: remove for after first deployment
    });

    if (!Array.isArray(foundBlogComponentContentList.data)) {
      return {};
    }

    const blogListDetail = await Promise.all(
      foundBlogComponentContentList.data.map(async (blogContent) => {
        const blogDetailResponse = (await octokit.repos.getContent({
          owner: "pakatagoh",
          repo: "pakatagoh.com",
          path: `${blogContent.path}`,
          ref: "pakatagoh-dot-com/v2", // TODO: remove for after first deployment
          // ref: process.env.VERCEL_GIT_COMMIT_REF,
        })) as { data: { content: string; encoding: BufferEncoding } };

        const blogDetail = blogDetailResponse.data;

        const blogContentString = Buffer.from(
          blogDetail.content,
          blogDetail.encoding
        ).toString();

        return {
          file: `.${blogContent.path.split(`content/blog/${slug}`)[1]}`,
          rawString: blogContentString,
        };
      })
    );

    return blogListDetail.reduce<Record<string, string>>((accum, current) => {
      accum[current.file] = current.rawString;

      return accum;
    }, {});
  } catch (error: any) {
    console.log("in the error:", error);
    if (error.status === 404) {
      return {};
    }
    console.error(error);
    throw json(`error getting blog data for ${slug}`, { status: 500 });
  }
};

export const getOneBlogImages = async ({
  slug,
  fileName,
}: {
  slug: string;
  fileName: string;
}) => {
  try {
    const foundBlogImage = await octokit.repos.getContent({
      owner: "pakatagoh",
      repo: "pakatagoh.com",
      path: `content/blog/${slug}/images/${fileName}`,
      ref: "pakatagoh-dot-com/v2", // TODO: remove for after first deployment
      // ref: process.env.VERCEL_GIT_COMMIT_REF,
    });

    if (!foundBlogImage.data) {
      throw new Error(`No image found`);
    }

    const imageDownloadUrl = (foundBlogImage.data as { download_url: string })
      ?.download_url;

    return {
      imageDownloadUrl,
    };
  } catch (error) {
    console.error(error);
    throw new Error("error getting blog data");
  }
};
