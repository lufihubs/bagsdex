import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bagsdex - Real-time Solana Token Explorer",
  description: "Professional token explorer for Solana blockchain. View live token data, prices, and market information.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
