import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
import { getBundleMdx } from "./utils/mdx.server";
import {
  getBlogContentList,
  getOneBlogComponentContent,
  getOneBlogContent,
} from "./utils/github.server";

type FilePath = {
  path: string;
};

type PostMarkdownAttributes = {
  title: string;
  description?: string;
  createdAt: string;
  slug: string;
  isPublished?: boolean;
  keywords?: string[];
  filePaths?: FilePath[];
};

const validatePostAttributes = (
  attributes: any
): attributes is PostMarkdownAttributes => {
  return attributes?.title && attributes?.createdAt;
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
        createdAt: attributes.createdAt,
        isPublished: attributes.isPublished,
        title: attributes.title,
      };
    })
    .filter((contentItem) => contentItem.isPublished)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .map((contentItem) => {
      return {
        ...contentItem,
        createdAt: dayjs(contentItem.createdAt).format("DD MMM YYYY"),
      };
    });

  return blogPosts;
};

export const getOneBlogPost = async (slug: string) => {
  const files = await getOneBlogComponentContent(slug);
  const blogContent = await getOneBlogContent(slug);

  if (!blogContent?.rawString) {
    throw new Response(slug, {
      status: 404,
    });
  }

  const { frontmatter, code } = await getBundleMdx({
    rawString: blogContent.rawString,
    slug,
    files: files,
  });

  invariant(
    validatePostAttributes(frontmatter),
    `Invalid post attributes for ${slug}`
  );

  return {
    slug,
    code,
    title: frontmatter.title,
    description: frontmatter.description,
    createdAt: frontmatter.createdAt,
    keywords: frontmatter.keywords ?? [],
  };
};
