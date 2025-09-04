import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Info, ChevronRight, Award, BarChart, TrendingUp } from 'lucide-react';
import { useFunds } from '../context/FundsContext';
import { useUser } from '../context/UserContext';
import FundCard from '../components/FundCard';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useUser();
  const { loading, recommendedFunds, setSelectedFund } = useFunds();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<'oneYear' | 'threeYear' | 'fiveYear'>('threeYear');

  // Redirect to profile if not complete
  useEffect(() => {
    if (!userProfile) {
      navigate('/profile');
    }
  }, [userProfile, navigate]);

  const handleFundClick = (fundId: string) => {
    const fund = recommendedFunds.find(f => f.id === fundId);
    if (fund) {
      setSelectedFund(fund);
      navigate(`/fund/${fundId}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-4 w-64 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    );
  }

  // Find the best performing fund by selected timeframe
  const getBestFund = () => {
    if (recommendedFunds.length === 0) return null;

    return recommendedFunds.reduce((best, current) => {
      if (selectedTimeFrame === 'oneYear') {
        return current.returns.oneYear > best.returns.oneYear ? current : best;
      } else if (selectedTimeFrame === 'threeYear') {
        return current.returns.threeYear > best.returns.threeYear ? current : best;
      } else {
        return current.returns.fiveYear > best.returns.fiveYear ? current : best;
      }
    }, recommendedFunds[0]);
  };

  const bestFund = getBestFund();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with user info */}
      {userProfile && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-6 text-white shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-yellow-400" />
              Your Personalized Fund Recommendations
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <ProfileStat 
                label="Investment Goal" 
                value={
                  userProfile.investmentGoal === 'retirement' ? 'Retirement Planning' :
                  userProfile.investmentGoal === 'education' ? 'Education' :
                  userProfile.investmentGoal === 'wealth' ? 'Wealth Creation' : 'Short-term Savings'
                } 
              />
              <ProfileStat 
                label="Risk Appetite" 
                value={
                  userProfile.riskAppetite === 'low' ? 'Low Risk' :
                  userProfile.riskAppetite === 'moderate' ? 'Moderate Risk' : 'High Risk'
                } 
              />
              <ProfileStat 
                label="Time Horizon" 
                value={
                  userProfile.investmentHorizon === 'shortTerm' ? 'Short Term (0-2 yrs)' :
                  userProfile.investmentHorizon === 'mediumTerm' ? 'Medium Term (3-5 yrs)' : 'Long Term (5+ yrs)'
                } 
              />
              <ProfileStat 
                label="Investment Amount" 
                value={formatCurrency(userProfile.investmentAmount)} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Time frame selector */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div className="text-gray-700 font-medium">Filter by Performance:</div>
          <div className="flex space-x-2">
            <TimeFrameButton 
              active={selectedTimeFrame === 'oneYear'} 
              onClick={() => setSelectedTimeFrame('oneYear')}
            >
              1 Year
            </TimeFrameButton>
            <TimeFrameButton 
              active={selectedTimeFrame === 'threeYear'} 
              onClick={() => setSelectedTimeFrame('threeYear')}
            >
              3 Years
            </TimeFrameButton>
            <TimeFrameButton 
              active={selectedTimeFrame === 'fiveYear'} 
              onClick={() => setSelectedTimeFrame('fiveYear')}
            >
              5 Years
            </TimeFrameButton>
          </div>
        </div>
      </div>

      {recommendedFunds.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Recommendations Available</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any funds matching your profile. Please update your investment preferences.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {/* Top Recommended Fund */}
          {bestFund && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Award className="mr-2 h-5 w-5 text-yellow-300" />
                  Top Recommended Fund
                </h2>
                <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Best Match
                </span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Fund Info */}
                  <div className="lg:col-span-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{bestFund.name}</h3>
                    <p className="text-gray-600 mb-4">{bestFund.amc}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium">{bestFund.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Risk Level</p>
                        <p className="font-medium capitalize">{bestFund.riskLevel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">NAV</p>
                        <p className="font-medium">{formatCurrency(bestFund.nav)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expense Ratio</p>
                        <p className="font-medium">{bestFund.expenseRatio}%</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleFundClick(bestFund.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition duration-300"
                    >
                      View Details
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Key Performance */}
                  <div className="lg:col-span-2">
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                      Performance Highlights
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <PerformanceCard 
                        label="1 Year Return" 
                        value={formatPercentage(bestFund.returns.oneYear)} 
                        isHighlighted={selectedTimeFrame === 'oneYear'}
                      />
                      <PerformanceCard 
                        label="3 Year Return" 
                        value={formatPercentage(bestFund.returns.threeYear)} 
                        isHighlighted={selectedTimeFrame === 'threeYear'}
                      />
                      <PerformanceCard 
                        label="5 Year Return" 
                        value={formatPercentage(bestFund.returns.fiveYear)} 
                        isHighlighted={selectedTimeFrame === 'fiveYear'}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <RatingCard 
                        label="CRISIL Rating" 
                        value={bestFund.ratings.crisil === 'NA' ? 'NA' : `${bestFund.ratings.crisil} ★`}
                      />
                      <RatingCard 
                        label="Value Research" 
                        value={bestFund.ratings.valueResearch === 'NA' ? 'NA' : `${bestFund.ratings.valueResearch} ★`}
                      />
                      <RatingCard 
                        label="Sharpe Ratio" 
                        value={bestFund.volatility.sharpeRatio.toFixed(2)}
                        tooltip="Risk-adjusted return measure. Higher is better."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Recommended Funds */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                All Recommended Funds
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedFunds.map(fund => (
                  <FundCard 
                    key={fund.id}
                    fund={fund}
                    selectedTimeFrame={selectedTimeFrame}
                    onClick={() => handleFundClick(fund.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface ProfileStatProps {
  label: string;
  value: string;
}

const ProfileStat: React.FC<ProfileStatProps> = ({ label, value }) => (
  <div className="bg-white/10 rounded-lg p-3">
    <p className="text-blue-100 text-sm">{label}</p>
    <p className="font-semibold text-white">{value}</p>
  </div>
);

interface TimeFrameButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TimeFrameButton: React.FC<TimeFrameButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

interface PerformanceCardProps {
  label: string;
  value: string;
  isHighlighted: boolean;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ label, value, isHighlighted }) => (
  <div className={`rounded-lg p-4 ${isHighlighted ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-xl font-bold ${isHighlighted ? 'text-blue-600' : 'text-gray-800'}`}>{value}</p>
  </div>
);

interface RatingCardProps {
  label: string;
  value: string;
  tooltip?: string;
}

const RatingCard: React.FC<RatingCardProps> = ({ label, value, tooltip }) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 relative">
    {tooltip && (
      <div className="group">
        <Info className="h-4 w-4 text-gray-400 absolute right-2 top-2 cursor-help" />
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity z-10 -top-2 right-0 transform -translate-y-full bg-gray-800 text-white text-xs rounded p-2 w-48 pointer-events-none">
          {tooltip}
        </div>
      </div>
    )}
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-bold text-gray-800">{value}</p>
  </div>
);

export default RecommendationsPage;