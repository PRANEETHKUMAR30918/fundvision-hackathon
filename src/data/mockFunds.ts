import { MutualFund } from '../types/funds';

// Generate historical data for the past 3 years (monthly points)
function generateHistoricalData(
  baseNav: number,
  volatility: number,
  returns: number
): { date: string; nav: number }[] {
  const data = [];
  const now = new Date();
  let currentNav = baseNav;

  // Generate 36 months of data
  for (let i = 36; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(now.getMonth() - i);
    
    // Add some randomness for realistic NAV changes
    const randomFactor = 1 + (Math.random() * volatility * 2 - volatility);
    
    // Trend upward based on returns
    const monthlyReturn = (returns / 12) / 100;
    currentNav *= (1 + monthlyReturn) * randomFactor;
    
    data.push({
      date: date.toISOString().split('T')[0],
      nav: parseFloat(currentNav.toFixed(2))
    });
  }
  
  return data;
}

export const mockFunds: MutualFund[] = [
  {
    id: 'hdfc-top-100',
    name: 'HDFC Top 100 Fund',
    amc: 'HDFC Mutual Fund',
    category: 'Large Cap Equity',
    riskLevel: 'moderate',
    nav: 874.25,
    aum: 23456.78,
    expenseRatio: 1.32,
    exitLoad: '1% if redeemed within 1 year',
    minInvestment: 5000,
    launchDate: '1996-10-11',
    returns: {
      oneMonth: 2.1,
      threeMonth: 5.8,
      sixMonth: 12.3,
      oneYear: 18.5,
      threeYear: 14.2,
      fiveYear: 12.8,
      inception: 16.5
    },
    volatility: {
      standardDeviation: 16.8,
      beta: 0.95,
      sharpeRatio: 0.68,
      alpha: 1.2
    },
    assetAllocation: {
      equity: 97.5,
      debt: 0,
      cash: 2.5,
      others: 0
    },
    sectorAllocation: {
      'Financial Services': 32.5,
      'IT': 15.8,
      'Oil & Gas': 10.2,
      'Consumer Goods': 8.5,
      'Automobile': 7.8,
      'Others': 25.2
    },
    historicalData: generateHistoricalData(650, 0.02, 14.2),
    ratings: {
      crisil: 4,
      valueResearch: 4
    }
  },
  {
    id: 'sbi-bluechip',
    name: 'SBI Bluechip Fund',
    amc: 'SBI Mutual Fund',
    category: 'Large Cap Equity',
    riskLevel: 'moderate',
    nav: 58.37,
    aum: 32175.45,
    expenseRatio: 1.65,
    exitLoad: '1% if redeemed within 1 year',
    minInvestment: 5000,
    launchDate: '2006-02-14',
    returns: {
      oneMonth: 1.9,
      threeMonth: 5.2,
      sixMonth: 10.8,
      oneYear: 16.7,
      threeYear: 13.5,
      fiveYear: 11.9,
      inception: 14.3
    },
    volatility: {
      standardDeviation: 15.2,
      beta: 0.91,
      sharpeRatio: 0.71,
      alpha: 1.5
    },
    assetAllocation: {
      equity: 96.8,
      debt: 0,
      cash: 3.2,
      others: 0
    },
    sectorAllocation: {
      'Financial Services': 28.7,
      'IT': 18.3,
      'Consumer Goods': 12.6,
      'Pharma': 9.2,
      'Engineering': 6.5,
      'Others': 24.7
    },
    historicalData: generateHistoricalData(45, 0.018, 13.5),
    ratings: {
      crisil: 5,
      valueResearch: 4
    }
  },
  {
    id: 'axis-midcap',
    name: 'Axis Midcap Fund',
    amc: 'Axis Mutual Fund',
    category: 'Mid Cap Equity',
    riskLevel: 'high',
    nav: 64.21,
    aum: 18735.62,
    expenseRatio: 1.78,
    exitLoad: '1% if redeemed within 1 year',
    minInvestment: 5000,
    launchDate: '2011-02-18',
    returns: {
      oneMonth: 2.5,
      threeMonth: 7.2,
      sixMonth: 15.6,
      oneYear: 22.3,
      threeYear: 18.4,
      fiveYear: 15.7,
      inception: 17.2
    },
    volatility: {
      standardDeviation: 19.7,
      beta: 1.08,
      sharpeRatio: 0.74,
      alpha: 2.1
    },
    assetAllocation: {
      equity: 98.2,
      debt: 0,
      cash: 1.8,
      others: 0
    },
    sectorAllocation: {
      'Financial Services': 21.5,
      'Consumer Goods': 17.8,
      'IT': 14.2,
      'Healthcare': 12.6,
      'Chemicals': 8.7,
      'Others': 25.2
    },
    historicalData: generateHistoricalData(42, 0.025, 18.4),
    ratings: {
      crisil: 5,
      valueResearch: 5
    }
  },
  {
    id: 'icici-balanced-advantage',
    name: 'ICICI Prudential Balanced Advantage Fund',
    amc: 'ICICI Prudential Mutual Fund',
    category: 'Balanced Advantage',
    riskLevel: 'moderate',
    nav: 49.87,
    aum: 42186.31,
    expenseRatio: 1.45,
    exitLoad: '1% if redeemed within 1 year',
    minInvestment: 5000,
    launchDate: '2006-12-30',
    returns: {
      oneMonth: 1.6,
      threeMonth: 4.3,
      sixMonth: 8.7,
      oneYear: 12.9,
      threeYear: 11.2,
      fiveYear: 10.5,
      inception: 11.8
    },
    volatility: {
      standardDeviation: 12.3,
      beta: 0.78,
      sharpeRatio: 0.67,
      alpha: 1.4
    },
    assetAllocation: {
      equity: 65.3,
      debt: 28.7,
      cash: 6.0,
      others: 0
    },
    sectorAllocation: {
      'Financial Services': 25.2,
      'IT': 12.8,
      'FMCG': 10.5,
      'Healthcare': 8.7,
      'Auto': 6.2,
      'Others': 36.6
    },
    historicalData: generateHistoricalData(38, 0.015, 11.2),
    ratings: {
      crisil: 4,
      valueResearch: 4
    }
  },
  {
    id: 'aditya-birla-corporate-bond',
    name: 'Aditya Birla Sun Life Corporate Bond Fund',
    amc: 'Aditya Birla Sun Life Mutual Fund',
    category: 'Debt Medium Term',
    riskLevel: 'low',
    nav: 87.12,
    aum: 21543.68,
    expenseRatio: 0.65,
    exitLoad: 'Nil',
    minInvestment: 1000,
    launchDate: '2008-03-03',
    returns: {
      oneMonth: 0.6,
      threeMonth: 1.8,
      sixMonth: 3.5,
      oneYear: 7.2,
      threeYear: 8.1,
      fiveYear: 7.8,
      inception: 8.5
    },
    volatility: {
      standardDeviation: 3.8,
      beta: 0.25,
      sharpeRatio: 1.25,
      alpha: 0.8
    },
    assetAllocation: {
      equity: 0,
      debt: 93.5,
      cash: 6.5,
      others: 0
    },
    sectorAllocation: {
      'Financial': 35.2,
      'PSU Bonds': 25.8,
      'Corporate Bonds': 32.5,
      'Others': 6.5
    },
    historicalData: generateHistoricalData(72, 0.005, 8.1),
    ratings: {
      crisil: 4,
      valueResearch: 5
    }
  },
  {
    id: 'mirae-asset-emerging-bluechip',
    name: 'Mirae Asset Emerging Bluechip Fund',
    amc: 'Mirae Asset Mutual Fund',
    category: 'Large & Mid Cap Equity',
    riskLevel: 'high',
    nav: 92.56,
    aum: 25678.42,
    expenseRatio: 1.71,
    exitLoad: '1% if redeemed within 1 year',
    minInvestment: 5000,
    launchDate: '2010-07-09',
    returns: {
      oneMonth: 2.8,
      threeMonth: 7.5,
      sixMonth: 16.2,
      oneYear: 24.5,
      threeYear: 20.1,
      fiveYear: 17.3,
      inception: 18.9
    },
    volatility: {
      standardDeviation: 18.5,
      beta: 1.05,
      sharpeRatio: 0.82,
      alpha: 2.4
    },
    assetAllocation: {
      equity: 97.8,
      debt: 0,
      cash: 2.2,
      others: 0
    },
    sectorAllocation: {
      'Financial Services': 23.5,
      'Consumer Goods': 15.8,
      'Automobile': 13.2,
      'IT': 12.6,
      'Pharma': 10.7,
      'Others': 24.2
    },
    historicalData: generateHistoricalData(65, 0.022, 20.1),
    ratings: {
      crisil: 5,
      valueResearch: 5
    }
  },
  {
    id: 'kotak-standard-multicap',
    name: 'Kotak Standard Multicap Fund',
    amc: 'Kotak Mahindra Mutual Fund',
    category: 'Multi Cap Equity',
    riskLevel: 'high',
    nav: 45.32,
    aum: 31562.78,
    expenseRatio: 1.68,
    exitLoad: '1% if redeemed within 1 year',
    minInvestment: 5000,
    launchDate: '2009-09-11',
    returns: {
      oneMonth: 2.3,
      threeMonth: 6.8,
      sixMonth: 14.5,
      oneYear: 19.8,
      threeYear: 16.7,
      fiveYear: 14.5,
      inception: 15.6
    },
    volatility: {
      standardDeviation: 17.2,
      beta: 0.98,
      sharpeRatio: 0.75,
      alpha: 1.9
    },
    assetAllocation: {
      equity: 98.5,
      debt: 0,
      cash: 1.5,
      others: 0
    },
    sectorAllocation: {
      'Financial Services': 29.8,
      'Consumer Goods': 14.5,
      'IT': 13.2,
      'Oil & Gas': 8.7,
      'Automobile': 7.5,
      'Others': 26.3
    },
    historicalData: generateHistoricalData(32, 0.02, 16.7),
    ratings: {
      crisil: 4,
      valueResearch: 5
    }
  },
  {
    id: 'franklin-india-liquid',
    name: 'Franklin India Liquid Fund',
    amc: 'Franklin Templeton Mutual Fund',
    category: 'Liquid Funds',
    riskLevel: 'low',
    nav: 3021.56,
    aum: 18765.32,
    expenseRatio: 0.18,
    exitLoad: 'Nil',
    minInvestment: 1000,
    launchDate: '2001-01-01',
    returns: {
      oneMonth: 0.4,
      threeMonth: 1.2,
      sixMonth: 2.3,
      oneYear: 4.5,
      threeYear: 5.2,
      fiveYear: 5.8,
      inception: 7.2
    },
    volatility: {
      standardDeviation: 0.5,
      beta: 0.02,
      sharpeRatio: 2.1,
      alpha: 0.2
    },
    assetAllocation: {
      equity: 0,
      debt: 88.5,
      cash: 11.5,
      others: 0
    },
    sectorAllocation: {
      'Certificate of Deposits': 45.2,
      'Commercial Papers': 35.8,
      'Treasury Bills': 8.5,
      'Others': 10.5
    },
    historicalData: generateHistoricalData(2800, 0.001, 5.2),
    ratings: {
      crisil: 5,
      valueResearch: 'NA'
    }
  },
  {
    id: 'dsp-tax-saver',
    name: 'DSP Tax Saver Fund',
    amc: 'DSP Mutual Fund',
    category: 'ELSS',
    riskLevel: 'high',
    nav: 62.45,
    aum: 8976.54,
    expenseRatio: 1.85,
    exitLoad: 'Nil (3-year lock-in)',
    minInvestment: 500,
    launchDate: '2006-01-31',
    returns: {
      oneMonth: 2.1,
      threeMonth: 6.2,
      sixMonth: 13.8,
      oneYear: 18.5,
      threeYear: 15.2,
      fiveYear: 13.6,
      inception: 14.8
    },
    volatility: {
      standardDeviation: 18.1,
      beta: 1.02,
      sharpeRatio: 0.69,
      alpha: 1.7
    },
    assetAllocation: {
      equity: 99.2,
      debt: 0,
      cash: 0.8,
      others: 0
    },
    sectorAllocation: {
      'Financial Services': 26.8,
      'IT': 16.5,
      'Healthcare': 12.8,
      'Consumer Goods': 10.5,
      'Automobile': 8.2,
      'Others': 25.2
    },
    historicalData: generateHistoricalData(48, 0.021, 15.2),
    ratings: {
      crisil: 4,
      valueResearch: 4
    }
  },
  {
    id: 'nippon-india-small-cap',
    name: 'Nippon India Small Cap Fund',
    amc: 'Nippon India Mutual Fund',
    category: 'Small Cap Equity',
    riskLevel: 'high',
    nav: 72.18,
    aum: 15678.32,
    expenseRatio: 1.92,
    exitLoad: '1% if redeemed within 1 year',
    minInvestment: 5000,
    launchDate: '2010-09-16',
    returns: {
      oneMonth: 3.2,
      threeMonth: 9.5,
      sixMonth: 18.7,
      oneYear: 28.5,
      threeYear: 22.3,
      fiveYear: 18.9,
      inception: 19.5
    },
    volatility: {
      standardDeviation: 22.8,
      beta: 1.15,
      sharpeRatio: 0.68,
      alpha: 2.5
    },
    assetAllocation: {
      equity: 97.5,
      debt: 0,
      cash: 2.5,
      others: 0
    },
    sectorAllocation: {
      'Industrial Manufacturing': 18.5,
      'Financial Services': 16.8,
      'Chemicals': 15.2,
      'Consumer Goods': 12.7,
      'Healthcare': 8.5,
      'Others': 28.3
    },
    historicalData: generateHistoricalData(52, 0.03, 22.3),
    ratings: {
      crisil: 4,
      valueResearch: 5
    }
  }
];