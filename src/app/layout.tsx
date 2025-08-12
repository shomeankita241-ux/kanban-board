import type { Metadata } from "next";
import "./globals.css";
import { ApolloProvider } from "@/lib/apollo-provider";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "MyCritters onboarding project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
