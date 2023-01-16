import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser($login: String!) {
    user(login: $login) {
      repositories(first: 10) {
        nodes {
          name
          isPrivate
          createdAt
          updatedAt
          languages(first: 10) {
            nodes {
              color
              name
            }

            edges {
              size
            }

            totalCount
            totalSize
          }
        }
      }

      organizations(first: 10) {
        nodes {
          avatarUrl
          name
        }
      }
      name
      login
      avatarUrl
      bio
      location
    }
  }
`;

export { GET_USER };
