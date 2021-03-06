import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import useSeoQuery from '../hooks/useSeoQuery';

function SEO({ isBlogPost, description, lang, title, image, slug }) {
  const { site, defaultImage } = useSeoQuery();
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
    >
      {/* general meta tags */}
      <title>{metaTitle === site.siteMetadata.author ? metaTitle : `${metaTitle} | ${site.siteMetadata.author}`}</title>
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
  title: PropTypes.string,
  slug: PropTypes.string,
};

export default SEO;
