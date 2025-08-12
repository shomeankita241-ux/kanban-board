import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client-integration-nextjs";

export function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://countries.trevorblades.com/",
    }),
  });
}
