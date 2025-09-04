import React, { createContext, useContext, useState } from 'react';

export type RiskAppetite = 'low' | 'moderate' | 'high';
export type InvestmentGoal = 'retirement' | 'education' | 'wealth' | 'shortTerm';
export type InvestmentHorizon = 'shortTerm' | 'mediumTerm' | 'longTerm';

export interface UserProfile {
  name: string;
  age: number;
  income: number;
  investmentAmount: number;
  riskAppetite: RiskAppetite;
  investmentGoal: InvestmentGoal;
  investmentHorizon: InvestmentHorizon;
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isProfileComplete: boolean;
}

const defaultUserProfile: UserProfile = {
  name: '',
  age: 30,
  income: 0,
  investmentAmount: 0,
  riskAppetite: 'moderate',
  investmentGoal: 'wealth',
  investmentHorizon: 'mediumTerm',
};

const UserContext = createContext<UserContextType>({
  userProfile: null,
  setUserProfile: () => {},
  isProfileComplete: false,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const isProfileComplete = Boolean(
    userProfile &&
    userProfile.name &&
    userProfile.age > 0 &&
    userProfile.income > 0 &&
    userProfile.investmentAmount > 0
  );

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, isProfileComplete }}>
      {children}
    </UserContext.Provider>
  );
};