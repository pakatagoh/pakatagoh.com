const config = require('./config');

module.exports = {
  siteMetadata: {
    title: config.site.title,
    canonicalUrl: config.site.url,
    description: config.site.description,
    author: config.name,
    social: {
      twitter: config.twitter.handle,
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
        name: config.name,
        short_name: `Pakata Goh`,
        start_url: `/`,
        background_color: config.site.theme_color,
        theme_color: config.site.theme_color,
        display: `minimal-ui`,
        icon: `src/images/Logo.jpg`, // This path is relative to the root of the site.
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalytics.trackingId,
      },
    },
  ],
};
