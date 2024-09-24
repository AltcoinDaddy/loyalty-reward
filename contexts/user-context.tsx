"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@/hooks/use-wallet';

interface UserContextType {
  level: number;
  cakeStaked: number;
  liquidityProvided: number;
  points: number;
  stake: (amount: number) => Promise<void>;
  unstake: (amount: number) => Promise<void>;
  provideLiquidity: (amount: number) => Promise<void>;
  removeLiquidity: (amount: number) => Promise<void>;
  claimRewards: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { contract } = useWallet();
  const [level, setLevel] = useState(1);
  const [cakeStaked, setCakeStaked] = useState(0);
  const [liquidityProvided, setLiquidityProvided] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (contract) {
      updateUserData();
    }
  }, [contract]);

  const updateUserData = async () => {
    if (contract) {
      const stakedAmount = await contract.getStakedAmount();
      const liquidityAmount = await contract.getLiquidityProvided();
      setCakeStaked(stakedAmount);
      setLiquidityProvided(liquidityAmount);
      setPoints(stakedAmount + liquidityAmount);
      setLevel(Math.floor(points / 1000) + 1);
    }
  };

  const stake = async (amount: number) => {
    if (contract) {
      await contract.stake(amount);
      await updateUserData();
    }
  };

  const unstake = async (amount: number) => {
    if (contract) {
      await contract.unstake(amount);
      await updateUserData();
    }
  };

  const provideLiquidity = async (amount: number) => {
    if (contract) {
      await contract.provideLiquidity(amount);
      await updateUserData();
    }
  };

  const removeLiquidity = async (amount: number) => {
    if (contract) {
      await contract.removeLiquidity(amount);
      await updateUserData();
    }
  };

  const claimRewards = async () => {
    if (contract) {
      const rewards = await contract.getRewards();
      setPoints(prev => prev + rewards);
      // In a real implementation, you'd call a contract method to claim rewards
    }
  };

  return (
    <UserContext.Provider value={{
      level,
      cakeStaked,
      liquidityProvided,
      points,
      stake,
      unstake,
      provideLiquidity,
      removeLiquidity,
      claimRewards
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};