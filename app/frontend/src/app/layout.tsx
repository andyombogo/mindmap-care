import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindMap Care",
  description: "Care navigation and mental-health workflow platform starter."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
