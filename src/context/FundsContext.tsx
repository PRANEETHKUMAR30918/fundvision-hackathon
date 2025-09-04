import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockFunds } from '../data/mockFunds';
import { MutualFund } from '../types/funds';
import { useUser, RiskAppetite, InvestmentGoal, InvestmentHorizon } from './UserContext';

interface FundsContextType {
  allFunds: MutualFund[];
  recommendedFunds: MutualFund[];
  selectedFund: MutualFund | null;
  setSelectedFund: React.Dispatch<React.SetStateAction<MutualFund | null>>;
  loading: boolean;
  error: string | null;
}

const FundsContext = createContext<FundsContextType>({
  allFunds: [],
  recommendedFunds: [],
  selectedFund: null,
  setSelectedFund: () => {},
  loading: false,
  error: null,
});

export const useFunds = () => useContext(FundsContext);

export const FundsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allFunds, setAllFunds] = useState<MutualFund[]>([]);
  const [recommendedFunds, setRecommendedFunds] = useState<MutualFund[]>([]);
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { userProfile } = useUser();

  // Load all funds (in a real app, this would be an API call)
  useEffect(() => {
    setLoading(true);
    try {
      // Simulate API delay
      setTimeout(() => {
        setAllFunds(mockFunds);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to load mutual funds data');
      setLoading(false);
    }
  }, []);

  // Update recommended funds when user profile changes
  useEffect(() => {
    if (userProfile && allFunds.length > 0) {
      setRecommendedFunds(
        recommendFundsForUser(
          allFunds,
          userProfile.riskAppetite,
          userProfile.investmentGoal,
          userProfile.investmentHorizon
        )
      );
    }
  }, [userProfile, allFunds]);

  return (
    <FundsContext.Provider
      value={{
        allFunds,
        recommendedFunds,
        selectedFund,
        setSelectedFund,
        loading,
        error,
      }}
    >
      {children}
    </FundsContext.Provider>
  );
};

// Fund recommendation logic
function recommendFundsForUser(
  funds: MutualFund[],
  riskAppetite: RiskAppetite,
  investmentGoal: InvestmentGoal,
  horizon: InvestmentHorizon
): MutualFund[] {
  // Filter funds based on risk appetite
  let filteredFunds = funds.filter(fund => {
    if (riskAppetite === 'low') {
      return fund.riskLevel === 'low';
    } else if (riskAppetite === 'moderate') {
      return fund.riskLevel === 'moderate' || fund.riskLevel === 'low';
    } else {
      return true; // High risk appetite can invest in any fund
    }
  });

  // Filter funds based on investment goal
  filteredFunds = filteredFunds.filter(fund => {
    if (investmentGoal === 'retirement') {
      return fund.category.includes('Debt') || fund.category.includes('Balanced');
    } else if (investmentGoal === 'education') {
      return fund.category.includes('Debt') || fund.category.includes('Balanced');
    } else if (investmentGoal === 'wealth') {
      return fund.category.includes('Equity') || fund.category.includes('Balanced');
    } else {
      return fund.category.includes('Liquid') || fund.category.includes('Debt');
    }
  });

  // Sort funds based on performance and risk-adjusted returns
  filteredFunds.sort((a, b) => {
    if (horizon === 'shortTerm') {
      return b.returns.oneYear - a.returns.oneYear;
    } else if (horizon === 'mediumTerm') {
      return b.returns.threeYear - a.returns.threeYear;
    } else {
      return b.returns.fiveYear - a.returns.fiveYear;
    }
  });

  // Return top funds (up to 5)
  return filteredFunds.slice(0, 5);
}