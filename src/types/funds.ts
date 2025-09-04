export type FundCategory = 
  | 'Large Cap Equity'
  | 'Mid Cap Equity'
  | 'Small Cap Equity'
  | 'Multi Cap Equity'
  | 'Balanced Advantage'
  | 'Hybrid Equity'
  | 'Debt Short Term'
  | 'Debt Medium Term'
  | 'Debt Long Term'
  | 'Liquid Funds'
  | 'Index Funds'
  | 'ELSS';

export type RiskLevel = 'low' | 'moderate' | 'high';

export type Rating = 1 | 2 | 3 | 4 | 5 | 'NA';

export interface HistoricalData {
  date: string;
  nav: number;
}

export interface Returns {
  oneMonth: number;
  threeMonth: number;
  sixMonth: number;
  oneYear: number;
  threeYear: number;
  fiveYear: number;
  inception: number;
}

export interface Volatility {
  standardDeviation: number;
  beta: number;
  sharpeRatio: number;
  alpha: number;
}

export interface AssetAllocation {
  equity: number;
  debt: number;
  cash: number;
  others: number;
}

export interface SectorAllocation {
  [sector: string]: number;
}

export interface Rating {
  crisil: Rating;
  valueResearch: Rating;
}

export interface MutualFund {
  id: string;
  name: string;
  amc: string;
  category: FundCategory;
  riskLevel: RiskLevel;
  nav: number;
  aum: number; // Assets Under Management in crores
  expenseRatio: number;
  exitLoad: string;
  minInvestment: number;
  launchDate: string;
  returns: Returns;
  volatility: Volatility;
  assetAllocation: AssetAllocation;
  sectorAllocation: SectorAllocation;
  historicalData: HistoricalData[];
  ratings: {
    crisil: Rating;
    valueResearch: Rating;
  };
}