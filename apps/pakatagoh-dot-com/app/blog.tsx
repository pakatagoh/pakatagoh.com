import path from 'path';
import fs from 'fs/promises';
import parseFrontMatter from 'front-matter';
import invariant from 'tiny-invariant';
import { getBundledMdx } from './utils/mdx.server';

type PostMarkdownAttributes = {
  title: string;
  description?: string;
  createdAt: string;
};

const validatePostAttributes = (
  attributes: any
): attributes is PostMarkdownAttributes => {
  return attributes?.title && attributes?.createdAt;
};

const isProduction = process.env.NODE_ENV === 'production';

const pathToPosts = path.join(__dirname, '/routes/blog');

console.log(pathToPosts);

export const getBlogPosts = async () => {
  const files = await fs.readdir(pathToPosts, { withFileTypes: true });
  const filteredFiles = files.filter((file) => file.isDirectory());

  const posts = filteredFiles.map(async (file) => {
    const fileData = await fs.readFile(
      path.join(pathToPosts, file.name, 'index.mdx')
    );
    const markdown = fileData.toString();
    const { attributes, body } = parseFrontMatter(markdown);

    invariant(
      validatePostAttributes(attributes),
      `Invalid post attributes for ${file}. Attributes: ${JSON.stringify(
        attributes
      )}`
    );

    return {
      slug: file,
      createdAt: attributes.createdAt,
      title: attributes.title,
    };
  });

  const allPosts = await Promise.all(posts);
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return sortedPosts;
};

export const getOneBlogPost = async (slug: string) => {
  const { frontmatter, code } = await getBundledMdx(slug);

  invariant(
    validatePostAttributes(frontmatter),
    `Invalid post attributes for ${slug}`
  );

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    code,
  };
};
