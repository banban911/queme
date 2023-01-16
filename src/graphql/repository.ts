import { gql } from "@apollo/client";

const GET_REPO = gql`
  query GET_REPO($owner: String, $name: String) {
    repository(owner: $owner, name: $name) {
      name
      nameWithOwner
      autoMergeAllowed
      createdAt
      description
    }
  }
`;

export { GET_REPO };
