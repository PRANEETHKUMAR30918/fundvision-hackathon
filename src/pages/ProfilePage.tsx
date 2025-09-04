import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, DollarSign, Calendar, Gauge, Target, ArrowRight } from 'lucide-react';
import { useUser, UserProfile, RiskAppetite, InvestmentGoal, InvestmentHorizon } from '../context/UserContext';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, isProfileComplete } = useUser();
  
  // Initialize form state
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 30,
    income: 0,
    investmentAmount: 0,
    riskAppetite: 'moderate',
    investmentGoal: 'wealth',
    investmentHorizon: 'mediumTerm',
  });
  
  // Set form data from context if available
  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'income' || name === 'investmentAmount' 
        ? Number(value) 
        : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(formData);
    navigate('/recommendations');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <User className="mr-2 h-6 w-6" />
              Create Your Investor Profile
            </h1>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              Tell us about yourself so we can recommend the best mutual funds for your financial goals.
            </p>
            
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <User className="mr-2 h-5 w-5 text-blue-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Financial Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-blue-600" />
                  Financial Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Income (₹)
                    </label>
                    <input
                      type="number"
                      id="income"
                      name="income"
                      min="0"
                      step="10000"
                      value={formData.income}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Amount to Invest (₹)
                    </label>
                    <input
                      type="number"
                      id="investmentAmount"
                      name="investmentAmount"
                      min="0"
                      step="1000"
                      value={formData.investmentAmount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Investment Preferences */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                  <Target className="mr-2 h-5 w-5 text-blue-600" />
                  Investment Preferences
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="riskAppetite" className="block text-sm font-medium text-gray-700 mb-1">
                      Risk Appetite
                    </label>
                    <select
                      id="riskAppetite"
                      name="riskAppetite"
                      value={formData.riskAppetite}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="low">Low - I prefer safety over high returns</option>
                      <option value="moderate">Moderate - I can accept some volatility for better returns</option>
                      <option value="high">High - I aim for maximum returns and can tolerate high volatility</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="investmentGoal" className="block text-sm font-medium text-gray-700 mb-1">
                      Investment Goal
                    </label>
                    <select
                      id="investmentGoal"
                      name="investmentGoal"
                      value={formData.investmentGoal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="retirement">Retirement Planning</option>
                      <option value="education">Education (Self or Children)</option>
                      <option value="wealth">Wealth Creation</option>
                      <option value="shortTerm">Short-term Savings</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="investmentHorizon" className="block text-sm font-medium text-gray-700 mb-1">
                      Investment Time Horizon
                    </label>
                    <select
                      id="investmentHorizon"
                      name="investmentHorizon"
                      value={formData.investmentHorizon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="shortTerm">Short Term (0-2 years)</option>
                      <option value="mediumTerm">Medium Term (3-5 years)</option>
                      <option value="longTerm">Long Term (5+ years)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center transition duration-300"
                >
                  Get Recommendations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Risk Appetite Info Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Gauge className="mr-2 h-5 w-5" />
              Understanding Risk Appetite
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RiskCard
                title="Low Risk"
                description="Focuses on capital preservation with minimal fluctuations. Suitable for conservative investors or those with short time horizons."
                examples="Liquid funds, Ultra Short Duration Funds, Corporate Bond Funds"
                returns="4-8% p.a."
              />
              
              <RiskCard
                title="Moderate Risk"
                description="Balances growth and stability. Suitable for investors who can tolerate some market volatility."
                examples="Balanced Advantage Funds, Hybrid Equity Funds, Large Cap Funds"
                returns="8-12% p.a."
              />
              
              <RiskCard
                title="High Risk"
                description="Aims for maximum growth with significant volatility. Suitable for aggressive investors with long time horizons."
                examples="Mid Cap Funds, Small Cap Funds, Sectoral/Thematic Funds"
                returns="12-18% p.a."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RiskCardProps {
  title: string;
  description: string;
  examples: string;
  returns: string;
}

const RiskCard: React.FC<RiskCardProps> = ({ title, description, examples, returns }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm mb-3">{description}</p>
    <div className="mb-2">
      <span className="text-xs font-medium text-gray-500 block">TYPICAL FUNDS:</span>
      <span className="text-sm">{examples}</span>
    </div>
    <div>
      <span className="text-xs font-medium text-gray-500 block">EXPECTED RETURNS:</span>
      <span className="text-sm font-semibold text-blue-600">{returns}</span>
    </div>
  </div>
);

export default ProfilePage;