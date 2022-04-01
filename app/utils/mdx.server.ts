import { bundleMDX } from "mdx-bundler";
import {
  importRehypeAutolinkHeadings,
  importRehypeSlug,
  importRehypeHighlight,
  importUnistUtilVisit,
  importRemarkUnwrapImages,
  // @ts-ignore
} from "../es-modules";
import type * as M from "mdast";
import type * as U from "unified";

function massageImageUrl({ slug }: { slug: string }) {
  const visitor = (node: M.Image) => {
    const basePath = "/assets/resize";

    const imageUrl = node.url;

    if (imageUrl.startsWith("./images")) {
      const imageFileName = node.url?.split("/")?.slice?.(-1)?.[0] ?? "";
      // console.log("imageFileName:", imageFileName);

      const fullPathName = `${basePath}/${imageFileName}?slug=${slug}`;

      node.url = fullPathName;
    }
  };

  async function transform(tree: M.Root) {
    const { visit } = await importUnistUtilVisit();
    visit(tree, "image", visitor);
  }

  return transform;
}

export const getBundleMdx = async ({
  rawString,
  slug,
  files,
}: {
  files: Record<string, string>;
  rawString: string;
  slug: string;
}) => {
  const { default: rehypeAutolinkHeadings } =
    await importRehypeAutolinkHeadings();
  const { default: rehypeSlug } = await importRehypeSlug();
  const { default: rehypeHighlight } = await importRehypeHighlight();
  const { default: remarkUnwrapImages } = await importRemarkUnwrapImages();

  const bundleResult = await bundleMDX({
    source: rawString,
    files: files,
    esbuildOptions(options) {
      options.target = ["es2020", "chrome58", "firefox57", "safari11"];
      return options;
    },
    xdmOptions(options) {
      const myRehypePlugins = [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        rehypeHighlight,
      ];
      const myRemarkPlugins: U.PluggableList = [
        [massageImageUrl, { slug }],
        remarkUnwrapImages,
      ];

      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...myRemarkPlugins,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...myRehypePlugins,
      ];

      return options;
    },
  });

  return bundleResult;
};
