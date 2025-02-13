import { gql } from "@apollo/client";

export const GET_USER_CARDS = gql`
  query GetCards {
    userCards {
      id
      title
      content
    }
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCard($title: String!, $content: String!) {
    createCard(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $title: String!, $content: String!) {
    updateCard(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id) {
      id
      title
      content
    }
  }
`;
