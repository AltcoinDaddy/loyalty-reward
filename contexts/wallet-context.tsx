"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";

interface WalletContextType {
  web3: Web3 | null;
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      // @ts-expect-error ethereum
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // @ts-expect-error ethereum
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // @ts-expect-error ethereum
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      // @ts-expect-error ethereum
      typeof window.ethereum !== "undefined"
    ) {
      // @ts-expect-error ethereum
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{ web3, account, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
