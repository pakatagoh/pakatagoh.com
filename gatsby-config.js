module.exports = {
  siteMetadata: {
    title: `Pakata Goh`,
    canonicalUrl: 'https://www.pakatagoh.com',
    description: `Pakata is a software developer from Singapore specializing in JavaScript. In this personal site, he writes about things he's learnt and hopefully you'll learn a thing or two from it.`,
    author: `Pakata Goh`,
    social: {
      twitter: '@GohPakata',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        /*
         * @description: https://github.com/gatsbyjs/gatsby/issues/15486
         * @workaround: https://github.com/gatsbyjs/gatsby/issues/15486#issuecomment-510153237
         */
        plugins: [`gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1170,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pakata Goh`,
        short_name: `Pakata`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/Logo.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    'gatsby-plugin-eslint',
    'gatsby-plugin-twitter',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
