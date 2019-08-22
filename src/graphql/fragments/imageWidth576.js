import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const query = graphql`
  fragment fluidImage576 on File {
    childImageSharp {
      fluid(maxWidth: 576) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
