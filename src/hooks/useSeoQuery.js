import { useStaticQuery, graphql } from 'gatsby';

const useSeoQuery = () => {
  return useStaticQuery(
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
};

export default useSeoQuery;
