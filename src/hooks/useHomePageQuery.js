import { useStaticQuery, graphql } from 'gatsby';

const useHomePageQuery = () => {
  return useStaticQuery(graphql`
    query indexPageQuery {
      pgImageSquare: file(relativePath: { eq: "pg-headshot.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pgImageWide: file(relativePath: { eq: "pg-headshot16x9.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 768, quality: 70) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allMdx(
        sort: { order: DESC, fields: frontmatter___createdAt }
        limit: 5
        filter: { frontmatter: { isPublished: { eq: true } } }
      ) {
        ...BlogInfo
      }
    }
  `);
};

export default useHomePageQuery;
