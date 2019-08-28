import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetaQuery = () => {
  return useStaticQuery(graphql`
    query siteMetaQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
};

export default useSiteMetaQuery;
