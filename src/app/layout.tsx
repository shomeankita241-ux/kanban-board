import type { Metadata } from "next";
import "./globals.css";
import { NhostAppProviders } from "@/lib/nhost-provider";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "MyCritters onboarding project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NhostAppProviders>{children}</NhostAppProviders>
      </body>
    </html>
  );
}
