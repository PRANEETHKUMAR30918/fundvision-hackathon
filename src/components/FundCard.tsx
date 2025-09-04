import React from 'react';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { MutualFund } from '../types/funds';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface FundCardProps {
  fund: MutualFund;
  selectedTimeFrame: 'oneYear' | 'threeYear' | 'fiveYear';
  onClick: () => void;
}

const FundCard: React.FC<FundCardProps> = ({ fund, selectedTimeFrame, onClick }) => {
  // Get the return based on selected timeframe
  const getReturn = () => {
    if (selectedTimeFrame === 'oneYear') {
      return fund.returns.oneYear;
    } else if (selectedTimeFrame === 'threeYear') {
      return fund.returns.threeYear;
    } else {
      return fund.returns.fiveYear;
    }
  };

  // Get the return label based on selected timeframe
  const getReturnLabel = () => {
    if (selectedTimeFrame === 'oneYear') {
      return '1Y Return';
    } else if (selectedTimeFrame === 'threeYear') {
      return '3Y Return';
    } else {
      return '5Y Return';
    }
  };

  const returnValue = getReturn();
  const returnLabel = getReturnLabel();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{fund.name}</h3>
        <p className="text-sm text-gray-500">{fund.amc}</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs text-gray-500">Category</p>
          <p className="font-medium">{fund.category}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Risk Level</p>
          <p className="font-medium capitalize">{fund.riskLevel}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">NAV</p>
          <p className="font-semibold">{formatCurrency(fund.nav)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">{returnLabel}</p>
          <p className={`font-semibold ${returnValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(returnValue)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Expense Ratio</p>
          <p className="font-medium">{fund.expenseRatio}%</p>
        </div>
        <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default FundCard;