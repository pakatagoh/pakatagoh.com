import { useStaticQuery, graphql } from 'gatsby';

const useContactPageQuery = () => {
  return useStaticQuery(graphql`
    query contactImageQuery {
      contactImage: file(relativePath: { eq: "typing-hands.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
};

export default useContactPageQuery;
