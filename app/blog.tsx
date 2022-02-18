import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import dayjs from "dayjs";
import { getBundleMdx } from "./utils/mdx.server";
import { getBlogContentList, getOneBlogContent } from "./utils/github.server";
import { fs } from "./utils/fileSystem.server";
import path from "path";

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

// import * as postA from "./posts/a.mdx";
// import * as postB from "./posts/b.md";
// import * as postC from "./posts/c.md";
// import * as post1 from "./routes/blog/getting-started-with-react-spring/index.mdx";
import * as post2 from "./routes/blog/content/setting-up-eslint-prettier-with-vscode-2019.mdx";
import * as post3 from "./routes/blog/content/switching-to-software-development-as-a-career.mdx";
import * as post4 from "./routes/blog/content/what-i-did-to-become-a-developer-in-a-year.mdx";
import * as post5 from "./routes/blog/content/what-i-learned-in-2019.mdx";
// import * as post2 from "../content/blog/setting-up-eslint-prettier-with-vscode-2019/index.mdx";
// import * as post3 from "../content/blog/switching-to-software-development-as-a-career/index.mdx";
// import * as post4 from "../content/blog/what-i-did-to-become-a-developer-in-a-year/index.mdx";
// import * as post5 from "../content/blog/what-i-learned-in-2019/index.mdx";

const allPosts = [post2, post3, post4, post5].map(postFromModule);

function postFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes,
    component: mod.default,
  };
}

export const getBlogPosts = async () => {
  const testFolders = await fs.readdir("~", { withFileTypes: true });

  console.log("testFolders:", testFolders);

  const folders = await fs.readdir(
    path.resolve(__dirname, "../../content/blog"),
    {
      withFileTypes: true,
    }
  );

  console.log("the folders:", folders);

  const foundBlogContentList = await Promise.all(
    folders.map(async (folderInfo) => {
      if (folderInfo.isDirectory()) {
        const folderName = folderInfo.name;
        const indexFilePath = path.resolve(
          __dirname,
          "../../content/blog",
          folderName,
          "index.mdx"
        );
        const file = await fs.readFile(indexFilePath, { encoding: "utf-8" });

        const { attributes } = parseFrontMatter(file);

        invariant(
          validatePostAttributes(attributes),
          `Invalid post attributes for ${folderName}. Attributes: ${JSON.stringify(
            attributes
          )}`
        );

        const post = {
          ...attributes,
          slug: folderName,
          createdAt: dayjs().format("YYYY-MM-DD"),
        };
        return post;
      }
    })
  );

  // const foundBlogContentList = [
  //   // postFromModule(post1),
  //   postFromModule(post2),
  //   postFromModule(post3),
  //   postFromModule(post4),
  //   postFromModule(post5),
  // ];

  console.log("foundBlogContentList:", foundBlogContentList);

  const blogPosts = foundBlogContentList
    // .map((contentItem) => {
    //   invariant(
    //     validatePostAttributes(contentItem),
    //     `Invalid post attributes for ${
    //       contentItem.slug
    //     }. Attributes: ${JSON.stringify(contentItem)}`
    //   );

    //   return {
    //     ...contentItem,
    //     createdAt: dayjs(contentItem.createdAt).format("DD/MM/YYYY"),
    //   };
    // })
    .filter((contentItem) => contentItem?.isPublished)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return blogPosts;
};

export const getOneBlogPost = async (slug: string) => {
  const foundPost = allPosts.find((post) => {
    return post.slug === slug;
  });

  console.log("the foundPost: ", foundPost);

  try {
    // const { frontmatter, code } = await getBundleMdx({ rawString, slug });

    // invariant(
    //   validatePostAttributes(frontmatter),
    //   `Invalid post attributes for ${slug}`
    // );

    return foundPost;
  } catch (error) {
    console.error(error);
    throw new Error("new error yo");
  }
};
