import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MailBrief AI",
  description: "Understand every email in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
