"use client";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { MockPancakeSwapContract } from "@/lib/mock-contract";

export function useWallet() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<MockPancakeSwapContract | null>(
    null
  );

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
        setContract(new MockPancakeSwapContract(web3Instance, accounts[0]));
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
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
        if (web3 && accounts[0]) {
          setContract(new MockPancakeSwapContract(web3, accounts[0]));
        } else {
          setContract(null);
        }
      });
    }
  }, [web3]);

  return { web3, account, contract, connectWallet };
}
