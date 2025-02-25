import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { redirect } from "next/navigation";

// const API_URL = "https://learn-layer-backend-production.up.railway.app/graphql";
const API_URL = "http://localhost:4000/graphql";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === "Not authenticated") {
        redirect("/login");
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default client;
