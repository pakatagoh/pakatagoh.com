/* eslint-disable no-undef */
module.exports = {
  importRehypeAutolinkHeadings: async () => import("rehype-autolink-headings"),
  importRehypeSlug: async () => import("rehype-slug"),
  importRehypeHighlight: async () => import("rehype-highlight"),
  importRemarkUnwrapImages: async () => import("remark-unwrap-images"),
  importUnistUtilVisit: async () => import("unist-util-visit"),
  // remark-gfm to turn link literals into proper anchor tags.
  // writing https://example.com will be transformed into <a href="https://example.com">https://example.com</a>
  importRemarkGfm: async () => import("remark-gfm"),
};
