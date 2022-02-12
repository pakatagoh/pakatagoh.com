import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
// import { getBundledMdx } from "./utils/mdx.server";
import mdxBundler from "mdx-bundler";

import { getBlogContentList, getOneBlogContent } from "./utils/github.server";

type FilePath = {
  path: string;
};

type PostMarkdownAttributes = {
  title: string;
  description?: string;
  createdAt: string;
  slug: string;
  isPublished?: boolean;
  filePaths?: FilePath[];
};

const validatePostAttributes = (
  attributes: any
): attributes is PostMarkdownAttributes => {
  return attributes?.title && attributes?.createdAt;
};

// const isProduction = process.env.NODE_ENV === "production";

type PostData = {
  body: string;
  title: string;
};

export const getBlogPosts = async () => {
  const foundBlogContentList = await getBlogContentList();

  const blogPosts = foundBlogContentList
    .map((contentItem) => {
      const { slug, rawString } = contentItem;

      const { attributes } = parseFrontMatter(rawString);

      invariant(
        validatePostAttributes(attributes),
        `Invalid post attributes for ${slug}. Attributes: ${JSON.stringify(
          attributes
        )}`
      );

      return {
        slug,
        description: attributes.description,
        createdAt: dayjs(attributes.createdAt).format("DD/MM/YYYY"),
        isPublished: attributes.isPublished,
        title: attributes.title,
      };
    })
    .filter((contentItem) => contentItem.isPublished)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return blogPosts;
};

export const getOneBlogPost = async (slug: string) => {
  const { rawString } = await getOneBlogContent(slug);
  const { frontmatter, code } = await mdxBundler.bundleMDX({
    source: rawString,
    // files: componentFilesWithContentMap,
  });
  // const { code, frontmatter } = await getBundledMdx(rawString);

  invariant(
    validatePostAttributes(frontmatter),
    `Invalid post attributes for ${slug}`
  );

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    code,
  };
};
