import { bundleMDX } from "mdx-bundler";
// @ts-ignore
import { importRehypeAutolinkHeadings, importRehypeSlug } from "../es-modules";

export const getBundleMdx = async (rawString: string) => {
  const { default: rehypeAutolinkHeadings } =
    await importRehypeAutolinkHeadings();
  const { default: rehypeSlug } = await importRehypeSlug();

  const bundleResult = await bundleMDX({
    source: rawString,
    esbuildOptions(options) {
      options.target = ["es2020", "chrome58", "firefox57", "safari11"];
      return options;
    },
    xdmOptions(options) {
      const myRehypePlugins = [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ];
      // options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...myRehypePlugins,
      ];

      return options;
    },
  });

  return bundleResult;
};
