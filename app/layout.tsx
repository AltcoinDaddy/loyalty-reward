import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WalletProvider } from "@/contexts/wallet-context";
import { UserProvider } from "@/contexts/user-context";
import { GamificationProvider } from "@/contexts/gamification-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PancakeSwap Loyalty Program",
  description: "Gamified loyalty program for PancakeSwap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <UserProvider>
            <GamificationProvider>{children}</GamificationProvider>
          </UserProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
