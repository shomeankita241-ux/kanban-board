"use client";

import { NhostProvider } from "@nhost/react";
import { nhost } from "./nhost";
import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { HttpLink } from "@apollo/client";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: nhost.graphql.getUrl(),
      // attach JWT if signed in
      fetch: async (input, init) => {
        const token = nhost.auth.getAccessToken();
        const headers = new Headers(init?.headers || {});
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return fetch(input, { ...init, headers });
      },
    }) as any,
  });
}

export function NhostAppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloNextAppProvider makeClient={makeClient}>
        {children}
      </ApolloNextAppProvider>
    </NhostProvider>
  );
}
