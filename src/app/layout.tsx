import type { Metadata } from "next";
import "./globals.css";
import { ApolloProvider } from "@/lib/apollo-provider";
import { NhostAppProviders } from "@/lib/nhost-provider";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "MyCritters onboarding project",
};

const hasNhost =
  !!process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN &&
  !!process.env.NEXT_PUBLIC_NHOST_REGION;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {hasNhost ? (
          <NhostAppProviders>{children}</NhostAppProviders>
        ) : (
          <ApolloProvider>{children}</ApolloProvider>
        )}
      </body>
    </html>
  );
}
