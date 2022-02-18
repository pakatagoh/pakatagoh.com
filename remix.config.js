/* eslint-disable no-undef */
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/_build",
  ignoredRouteFiles: [
    ".*",
    "**/.DS_Store",
    "**/*.{png, jpeg}",
    "**/*.test.*",
    "**/*.mdx",
    "**/blog/content/*",
  ],
};
