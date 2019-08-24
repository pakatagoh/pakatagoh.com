import { graphql } from 'gatsby';

// eslint-disable-next-line import/prefer-default-export
export const query = graphql`
  fragment BlogInfo on MdxConnection {
    edges {
      node {
        id
        excerpt(pruneLength: 200)
        fields {
          slug
          title
          createdAt
          updatedAt
          keywords
        }
      }
    }
  }
`;
