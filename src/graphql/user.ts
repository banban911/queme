import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser($login: String!, $firstRepo: Int!, $cursor: String) {
    user(login: $login) {
      repositories(first: $firstRepo, after: $cursor) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        nodes {
          owner {
            login
          }
          nameWithOwner
          name
          isPrivate
          createdAt
          updatedAt
          stargazerCount
          homepageUrl
          url
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
              url
            }
          }
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

      organizations(first: 20) {
        nodes {
          avatarUrl
          name
        }
      }
      followers(first: 10) {
        nodes {
          id
          login
        }
      }
      following(first: 10) {
        nodes {
          id
          login
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
