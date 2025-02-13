import { gql } from "@apollo/client";

export const GET_USER_CARD_BY_ID = gql`
  query GetUserCardById($id: ID!) {
    userCardById(id: $id) {
      id
      title
      content
    }
  }
`;
