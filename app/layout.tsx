import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";

/**
 * https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app
 * Migrating _document.js and _app.js
 * If you have an existing _app or _document file, you can copy the
 * contents (e.g. global styles) to the root layout (app/layout.tsx).
 * Styles in app/layout.tsx will not apply to pages/*. You should
 * keep _app/_document while migrating to prevent your pages/*
 * routes from breaking. Once fully migrated, you can then
 * safely delete them.
 */

import "./globals.css";

const scp = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sti Tracker",
  description: "Sti Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={scp.className}>{children}</body>
    </html>
  );
}
