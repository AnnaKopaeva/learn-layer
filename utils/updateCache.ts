import { gql, ApolloCache } from "@apollo/client";
import { Card } from "@/types/Card";

export const updateCacheAfterCreate = (
  cache: ApolloCache<{ userCards: Card[] }>,
  createCard: Card
) => {
  cache.modify({
    fields: {
      userCards(existingCards = []) {
        const newCardRef = cache.writeFragment({
          data: createCard,
          fragment: gql`
            fragment NewCard on Card {
              id
              title
              content
            }
          `,
        });
        return [...existingCards, newCardRef];
      },
    },
  });
};

export const updateCacheAfterChangeCard = (
  cache: ApolloCache<{ userCards: Card[] }>,
  updateCard: Card
) => {
  cache.modify({
    fields: {
      userCards(existingCards = []) {
        const updatedCardRef = cache.writeFragment({
          data: updateCard,
          fragment: gql`
            fragment UpdatedCard on Card {
              id
              title
              content
            }
          `,
        });
        return existingCards.map((cardRef: { __ref: string }) =>
          cardRef.__ref === `Card:${updateCard.id}` ? updatedCardRef : cardRef
        );
      },
    },
  });
};

export const updateCacheAfterDeleteCard = (
  cache: ApolloCache<{ card: Card }>,
  card: Card
) => {
  cache.modify({
    fields: {
      userCards(existingCards = [], { readField }) {
        return existingCards.filter(
          (cardRef: { __ref: string }) => card.id !== readField("id", cardRef)
        );
      },
    },
  });
};
