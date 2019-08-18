/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ isBlogPost, description, lang, title, image, slug }) {
  const { site, defaultImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            canonicalUrl
            social {
              twitter
            }
          }
        }
        defaultImage: file(relativePath: { eq: "pg-headshot.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  );
  const { canonicalUrl } = site.siteMetadata;
  const metaUrl = slug ? `${canonicalUrl}${slug}` : canonicalUrl;
  const metaDescription = description || site.siteMetadata.description;
  const metaImage = `${canonicalUrl}${image || defaultImage.childImageSharp.fluid.src}`;
  const metaTitle = title || site.siteMetadata.title;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${site.siteMetadata.author}`}
    >
      {/* general meta tags */}
      <meta name="description" content={metaDescription} />
      <meta name="image" content={metaImage} />
      {/* Open Graph Tags */}
      <meta property="og:url" content={metaUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.social.twitter} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
};

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  description: PropTypes.string,
  lang: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string,
};

export default SEO;
