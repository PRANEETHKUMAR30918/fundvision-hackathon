import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, ArrowLeft, DollarSign, Percent, PieChart, BarChart2, Activity, Calendar } from 'lucide-react';
import { useFunds } from '../context/FundsContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { MutualFund } from '../types/funds';

const FundDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { allFunds, setSelectedFund, selectedFund } = useFunds();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'comparison'>('overview');
  const [comparisonMetric, setComparisonMetric] = useState<'returns' | 'volatility'>('returns');
  const [timeframe, setTimeframe] = useState<'oneYear' | 'threeYear' | 'fiveYear'>('threeYear');
  
  // Get fund from URL parameter if not already selected
  useEffect(() => {
    if (!selectedFund && id) {
      const fund = allFunds.find(f => f.id === id);
      if (fund) {
        setSelectedFund(fund);
      } else {
        navigate('/recommendations');
      }
    }
  }, [id, allFunds, selectedFund, setSelectedFund, navigate]);
  
  if (!selectedFund) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Filter out this fund for comparisons
  const peerFunds = allFunds.filter(fund => 
    fund.id !== selectedFund.id && fund.category === selectedFund.category
  ).slice(0, 3);
  
  // Create a comparison dataset for returns
  const createReturnsComparisonData = () => {
    let categoryReturns = {
      oneYear: 0,
      threeYear: 0,
      fiveYear: 0
    };
    
    let highestReturns = {
      oneYear: 0,
      threeYear: 0,
      fiveYear: 0
    };
    
    let lowestReturns = {
      oneYear: 100,
      threeYear: 100,
      fiveYear: 100
    };
    
    // Calculate averages and extremes
    const categoryFunds = allFunds.filter(fund => fund.category === selectedFund.category);
    categoryFunds.forEach(fund => {
      categoryReturns.oneYear += fund.returns.oneYear;
      categoryReturns.threeYear += fund.returns.threeYear;
      categoryReturns.fiveYear += fund.returns.fiveYear;
      
      highestReturns.oneYear = Math.max(highestReturns.oneYear, fund.returns.oneYear);
      highestReturns.threeYear = Math.max(highestReturns.threeYear, fund.returns.threeYear);
      highestReturns.fiveYear = Math.max(highestReturns.fiveYear, fund.returns.fiveYear);
      
      lowestReturns.oneYear = Math.min(lowestReturns.oneYear, fund.returns.oneYear);
      lowestReturns.threeYear = Math.min(lowestReturns.threeYear, fund.returns.threeYear);
      lowestReturns.fiveYear = Math.min(lowestReturns.fiveYear, fund.returns.fiveYear);
    });
    
    const count = categoryFunds.length;
    if (count > 0) {
      categoryReturns.oneYear /= count;
      categoryReturns.threeYear /= count;
      categoryReturns.fiveYear /= count;
    }
    
    // Create comparison data
    return [
      {
        name: '1 Year',
        'This Fund': selectedFund.returns.oneYear,
        'Category Avg': categoryReturns.oneYear,
        'Highest': highestReturns.oneYear,
        'Lowest': lowestReturns.oneYear
      },
      {
        name: '3 Years',
        'This Fund': selectedFund.returns.threeYear,
        'Category Avg': categoryReturns.threeYear,
        'Highest': highestReturns.threeYear,
        'Lowest': lowestReturns.threeYear
      },
      {
        name: '5 Years',
        'This Fund': selectedFund.returns.fiveYear,
        'Category Avg': categoryReturns.fiveYear,
        'Highest': highestReturns.fiveYear,
        'Lowest': lowestReturns.fiveYear
      }
    ];
  };
  
  // Create a comparison dataset for volatility
  const createVolatilityComparisonData = () => {
    let categoryVolatility = {
      standardDeviation: 0,
      beta: 0,
      sharpeRatio: 0
    };
    
    let lowestVolatility = {
      standardDeviation: 100,
      beta: 100,
      sharpeRatio: 0
    };
    
    let highestVolatility = {
      standardDeviation: 0,
      beta: 0,
      sharpeRatio: 100
    };
    
    // Calculate averages and extremes
    const categoryFunds = allFunds.filter(fund => fund.category === selectedFund.category);
    categoryFunds.forEach(fund => {
      categoryVolatility.standardDeviation += fund.volatility.standardDeviation;
      categoryVolatility.beta += fund.volatility.beta;
      categoryVolatility.sharpeRatio += fund.volatility.sharpeRatio;
      
      lowestVolatility.standardDeviation = Math.min(lowestVolatility.standardDeviation, fund.volatility.standardDeviation);
      lowestVolatility.beta = Math.min(lowestVolatility.beta, fund.volatility.beta);
      highestVolatility.sharpeRatio = Math.max(highestVolatility.sharpeRatio, fund.volatility.sharpeRatio);
      
      highestVolatility.standardDeviation = Math.max(highestVolatility.standardDeviation, fund.volatility.standardDeviation);
      highestVolatility.beta = Math.max(highestVolatility.beta, fund.volatility.beta);
      lowestVolatility.sharpeRatio = Math.min(lowestVolatility.sharpeRatio, fund.volatility.sharpeRatio);
    });
    
    const count = categoryFunds.length;
    if (count > 0) {
      categoryVolatility.standardDeviation /= count;
      categoryVolatility.beta /= count;
      categoryVolatility.sharpeRatio /= count;
    }
    
    // For volatility metrics, lower is better for standard deviation and beta
    // For sharpe ratio, higher is better
    return [
      {
        name: 'Std Deviation',
        'This Fund': selectedFund.volatility.standardDeviation,
        'Category Avg': categoryVolatility.standardDeviation,
        'Lowest': lowestVolatility.standardDeviation,
        'Highest': highestVolatility.standardDeviation
      },
      {
        name: 'Beta',
        'This Fund': selectedFund.volatility.beta,
        'Category Avg': categoryVolatility.beta,
        'Lowest': lowestVolatility.beta,
        'Highest': highestVolatility.beta
      },
      {
        name: 'Sharpe Ratio',
        'This Fund': selectedFund.volatility.sharpeRatio,
        'Category Avg': categoryVolatility.sharpeRatio,
        'Lowest': lowestVolatility.sharpeRatio,
        'Highest': highestVolatility.sharpeRatio
      }
    ];
  };
  
  // Create data for the sector allocation chart
  const createSectorAllocationData = () => {
    return Object.entries(selectedFund.sectorAllocation).map(([sector, allocation]) => ({
      name: sector,
      value: allocation
    }));
  };
  
  const returnsComparisonData = createReturnsComparisonData();
  const volatilityComparisonData = createVolatilityComparisonData();
  const sectorAllocationData = createSectorAllocationData();
  
  // Create an array of historical NAV data points that we can use for the chart
  const navChartData = selectedFund.historicalData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    nav: item.nav
  }));
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button and fund name */}
      <div className="mb-8 flex items-center">
        <button
          onClick={() => navigate('/recommendations')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Recommendations
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{selectedFund.name}</h1>
      </div>
      
      {/* Fund summary card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between text-white">
            <div>
              <h2 className="text-xl font-bold">{selectedFund.name}</h2>
              <p className="text-blue-100">{selectedFund.amc} • {selectedFund.category}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <div className="bg-white/10 rounded-lg px-4 py-2 mr-3">
                <p className="text-sm text-blue-100">Current NAV</p>
                <p className="font-bold">{formatCurrency(selectedFund.nav)}</p>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="text-sm text-blue-100">AUM</p>
                <p className="font-bold">₹{selectedFund.aum.toFixed(2)} Cr</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SummaryCard 
              icon={<Calendar className="h-5 w-5 text-blue-600" />}
              label="Launch Date" 
              value={new Date(selectedFund.launchDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })} 
            />
            <SummaryCard 
              icon={<Percent className="h-5 w-5 text-blue-600" />}
              label="Expense Ratio" 
              value={`${selectedFund.expenseRatio}%`} 
            />
            <SummaryCard 
              icon={<DollarSign className="h-5 w-5 text-blue-600" />}
              label="Min Investment" 
              value={formatCurrency(selectedFund.minInvestment)} 
            />
            <SummaryCard 
              icon={<Activity className="h-5 w-5 text-blue-600" />}
              label="Risk Level" 
              value={selectedFund.riskLevel.charAt(0).toUpperCase() + selectedFund.riskLevel.slice(1)} 
            />
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <TabButton 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </TabButton>
            <TabButton 
              active={activeTab === 'performance'} 
              onClick={() => setActiveTab('performance')}
            >
              Performance
            </TabButton>
            <TabButton 
              active={activeTab === 'comparison'} 
              onClick={() => setActiveTab('comparison')}
            >
              Comparison
            </TabButton>
          </nav>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="mb-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* NAV History */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                NAV History
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={navChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="nav" 
                      stroke="#4f46e5" 
                      activeDot={{ r: 8 }}
                      name="NAV Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Asset & Sector Allocation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-blue-600" />
                  Asset Allocation
                </h3>
                <div className="space-y-4">
                  <AllocationBar 
                    label="Equity" 
                    value={selectedFund.assetAllocation.equity} 
                    color="bg-blue-500" 
                  />
                  <AllocationBar 
                    label="Debt" 
                    value={selectedFund.assetAllocation.debt} 
                    color="bg-green-500" 
                  />
                  <AllocationBar 
                    label="Cash" 
                    value={selectedFund.assetAllocation.cash} 
                    color="bg-yellow-500" 
                  />
                  <AllocationBar 
                    label="Others" 
                    value={selectedFund.assetAllocation.others} 
                    color="bg-purple-500" 
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-blue-600" />
                  Top Sector Allocation
                </h3>
                <div className="space-y-4">
                  {sectorAllocationData.slice(0, 5).map((sector, index) => (
                    <AllocationBar 
                      key={sector.name}
                      label={sector.name} 
                      value={sector.value} 
                      color={`bg-${['blue', 'green', 'orange', 'purple', 'teal'][index % 5]}-500`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Returns Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                Historical Returns
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 font-semibold text-gray-600">Time Period</th>
                      <th className="pb-2 font-semibold text-gray-600">Returns</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ReturnRow label="1 Month" value={selectedFund.returns.oneMonth} />
                    <ReturnRow label="3 Months" value={selectedFund.returns.threeMonth} />
                    <ReturnRow label="6 Months" value={selectedFund.returns.sixMonth} />
                    <ReturnRow label="1 Year" value={selectedFund.returns.oneYear} />
                    <ReturnRow label="3 Years" value={selectedFund.returns.threeYear} />
                    <ReturnRow label="5 Years" value={selectedFund.returns.fiveYear} />
                    <ReturnRow label="Since Inception" value={selectedFund.returns.inception} />
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Risk Metrics */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-600" />
                Risk Metrics
              </h3>
              <div className="space-y-6">
                <RiskMetric 
                  label="Standard Deviation" 
                  value={selectedFund.volatility.standardDeviation.toFixed(2)}
                  description="Measures the fund's volatility. Lower values indicate less price fluctuation."
                />
                <RiskMetric 
                  label="Beta" 
                  value={selectedFund.volatility.beta.toFixed(2)}
                  description="Measures the fund's volatility relative to the market. A beta of 1 means the fund moves with the market." 
                />
                <RiskMetric 
                  label="Sharpe Ratio" 
                  value={selectedFund.volatility.sharpeRatio.toFixed(2)}
                  description="Measures risk-adjusted returns. Higher values indicate better risk-adjusted performance." 
                />
                <RiskMetric 
                  label="Alpha" 
                  value={selectedFund.volatility.alpha.toFixed(2)}
                  description="Measures the fund's excess return compared to its expected return. Positive values are better." 
                />
              </div>
            </div>
            
            {/* Ratings */}
            <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Fund Ratings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RatingCard 
                  organization="CRISIL" 
                  rating={selectedFund.ratings.crisil} 
                />
                <RatingCard 
                  organization="Value Research" 
                  rating={selectedFund.ratings.valueResearch} 
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'comparison' && (
          <div>
            {/* Comparison Metrics Selector */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">Compare with Peer Funds</h3>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setComparisonMetric('returns')}
                    className={`px-4 py-2 rounded-md ${
                      comparisonMetric === 'returns'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Returns
                  </button>
                  <button
                    onClick={() => setComparisonMetric('volatility')}
                    className={`px-4 py-2 rounded-md ${
                      comparisonMetric === 'volatility'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Volatility
                  </button>
                </div>
              </div>
            </div>
            
            {/* Comparison Chart */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                {comparisonMetric === 'returns' ? (
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                ) : (
                  <Activity className="mr-2 h-5 w-5 text-blue-600" />
                )}
                {comparisonMetric === 'returns' ? 'Returns Comparison' : 'Volatility Comparison'}
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonMetric === 'returns' ? returnsComparisonData : volatilityComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="This Fund" fill="#4f46e5" />
                    <Bar dataKey="Category Avg" fill="#10b981" />
                    <Bar dataKey="Highest" fill="#f59e0b" />
                    <Bar dataKey="Lowest" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Peer Funds Comparison */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Funds</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 font-semibold text-gray-600 text-left">Fund Name</th>
                      <th className="pb-2 font-semibold text-gray-600 text-right">NAV</th>
                      <th className="pb-2 font-semibold text-gray-600 text-right">1Y Return</th>
                      <th className="pb-2 font-semibold text-gray-600 text-right">3Y Return</th>
                      <th className="pb-2 font-semibold text-gray-600 text-right">5Y Return</th>
                      <th className="pb-2 font-semibold text-gray-600 text-right">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Current fund */}
                    <tr className="border-b bg-blue-50">
                      <td className="py-3 font-semibold text-blue-700">{selectedFund.name}</td>
                      <td className="py-3 text-right">{formatCurrency(selectedFund.nav)}</td>
                      <td className="py-3 text-right">{formatPercentage(selectedFund.returns.oneYear)}</td>
                      <td className="py-3 text-right">{formatPercentage(selectedFund.returns.threeYear)}</td>
                      <td className="py-3 text-right">{formatPercentage(selectedFund.returns.fiveYear)}</td>
                      <td className="py-3 text-right capitalize">{selectedFund.riskLevel}</td>
                    </tr>
                    
                    {/* Peer funds */}
                    {peerFunds.map(fund => (
                      <tr key={fund.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">{fund.name}</td>
                        <td className="py-3 text-right">{formatCurrency(fund.nav)}</td>
                        <td className="py-3 text-right">{formatPercentage(fund.returns.oneYear)}</td>
                        <td className="py-3 text-right">{formatPercentage(fund.returns.threeYear)}</td>
                        <td className="py-3 text-right">{formatPercentage(fund.returns.fiveYear)}</td>
                        <td className="py-3 text-right capitalize">{fund.riskLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <div className="flex items-center mb-2">
      {icon}
      <p className="text-sm text-gray-500 ml-2">{label}</p>
    </div>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
      active
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    {children}
  </button>
);

interface AllocationBarProps {
  label: string;
  value: number;
  color: string;
}

const AllocationBar: React.FC<AllocationBarProps> = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

interface ReturnRowProps {
  label: string;
  value: number;
}

const ReturnRow: React.FC<ReturnRowProps> = ({ label, value }) => (
  <tr className="border-b">
    <td className="py-3">{label}</td>
    <td className={`py-3 font-medium ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {formatPercentage(value)}
    </td>
  </tr>
);

interface RiskMetricProps {
  label: string;
  value: string;
  description: string;
}

const RiskMetric: React.FC<RiskMetricProps> = ({ label, value, description }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

interface RatingCardProps {
  organization: string;
  rating: 1 | 2 | 3 | 4 | 5 | 'NA';
}

const RatingCard: React.FC<RatingCardProps> = ({ organization, rating }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <p className="text-sm text-gray-500 mb-2">{organization} Rating</p>
    {rating === 'NA' ? (
      <p className="font-medium">Not Rated</p>
    ) : (
      <div className="flex items-center">
        <span className="text-2xl font-bold text-blue-600 mr-2">{rating}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-xl ${i < Number(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default FundDetailsPage;