"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './user-context';

interface Challenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  isCompleted: boolean;
}

interface Event {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

interface Referral {
  code: string;
  referredUsers: number;
}

interface GamificationContextType {
  dailyChallenges: Challenge[];
  weeklyChallenges: Challenge[];
  currentEvent: Event | null;
  referral: Referral;
  completeChallenge: (challengeId: number) => void;
  claimTieredReward: () => void;
  generateReferralCode: () => void;
}

const GamificationContext = createContext<GamificationContextType | null>(null);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { level } = useUser();
  const [dailyChallenges, setDailyChallenges] = useState<Challenge[]>([]);
  const [weeklyChallenges, setWeeklyChallenges] = useState<Challenge[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [referral, setReferral] = useState<Referral>({ code: '', referredUsers: 0 });

  useEffect(() => {
    // Mock daily challenges
    setDailyChallenges([
      { id: 1, title: 'Stake 100 CAKE', description: 'Stake 100 CAKE tokens today', reward: 50, isCompleted: false },
      { id: 2, title: 'Provide $500 Liquidity', description: 'Add $500 worth of liquidity to any pool', reward: 75, isCompleted: false },
    ]);

    // Mock weekly challenges
    setWeeklyChallenges([
      { id: 3, title: 'Stake for 7 Days', description: 'Keep your CAKE staked for 7 consecutive days', reward: 200, isCompleted: false },
      { id: 4, title: 'Swap 10 Times', description: 'Perform 10 token swaps this week', reward: 150, isCompleted: false },
    ]);

    // Mock current event
    setCurrentEvent({
      id: 1,
      title: 'Summer DeFi Fest',
      description: 'Participate in our Summer DeFi Fest and earn extra rewards!',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2024-07-31'),
    });
  }, []);

  const completeChallenge = (challengeId: number) => {
    setDailyChallenges(challenges =>
      challenges.map(challenge =>
        challenge.id === challengeId ? { ...challenge, isCompleted: true } : challenge
      )
    );
    setWeeklyChallenges(challenges =>
      challenges.map(challenge =>
        challenge.id === challengeId ? { ...challenge, isCompleted: true } : challenge
      )
    );
  };

  const claimTieredReward = () => {
    // In a real application, this would interact with a smart contract
    console.log(`Claimed tier ${Math.floor(level / 10) + 1} reward`);
  };

  const generateReferralCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferral({ ...referral, code });
  };

  return (
    <GamificationContext.Provider value={{
      dailyChallenges,
      weeklyChallenges,
      currentEvent,
      referral,
      completeChallenge,
      claimTieredReward,
      generateReferralCode,
    }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};