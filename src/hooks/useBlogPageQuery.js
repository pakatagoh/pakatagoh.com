import { useStaticQuery, graphql } from 'gatsby';

const useBlogPageQuery = () => {
  return useStaticQuery(graphql`
    query blogListQuery {
      allMdx(
        sort: { order: DESC, fields: frontmatter___createdAt }
        filter: { fields: { isPublished: { eq: true } } }
      ) {
        ...BlogInfo
      }
    }
  `);
};

export default useBlogPageQuery;
