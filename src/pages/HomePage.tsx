import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShieldCheck, BarChart, Target, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isProfileComplete } = useUser();

  const handleGetStarted = () => {
    if (isProfileComplete) {
      navigate('/recommendations');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Find the Perfect Mutual Funds for Your Financial Goals
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Get personalized mutual fund recommendations based on your investment goals and risk appetite with data-driven analysis.
              </p>
              <button
                onClick={handleGetStarted}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition duration-300 transform hover:translate-y-[-2px]"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
                <img
                  src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Investment Chart"
                  className="rounded-lg w-full object-cover h-64 md:h-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose FundVision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              icon={<ShieldCheck className="h-10 w-10 text-blue-600" />}
              title="Data-Driven Recommendations"
              description="Our algorithm analyzes thousands of mutual funds to match your investment goals with the best performing options."
            />
            
            {/* Feature 2 */}
            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-blue-600" />}
              title="Visual Performance Analysis"
              description="Comprehensive charts and metrics help you understand fund performance and make informed decisions."
            />
            
            {/* Feature 3 */}
            <FeatureCard
              icon={<Target className="h-10 w-10 text-blue-600" />}
              title="Goal-Based Investing"
              description="Customize your investment strategy based on specific financial goals like retirement, education, or wealth creation."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Create Your Profile"
              description="Tell us about your investment goals, risk tolerance, and time horizon."
            />
            <StepCard
              number={2}
              title="Get Personalized Recommendations"
              description="Our algorithm matches your profile with the best mutual funds."
            />
            <StepCard
              number={3}
              title="Make Informed Decisions"
              description="Review detailed analytics and choose the funds that best meet your needs."
            />
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center transition duration-300"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              content="FundVision helped me choose the right mutual funds for my retirement. The visual analytics made it easy to understand complex fund metrics."
              author="Rahul Sharma"
              role="IT Professional"
            />
            <TestimonialCard
              content="As a first-time investor, I was overwhelmed by the choices. FundVision's recommendations were spot-on for my low-risk profile."
              author="Priya Patel"
              role="Doctor"
            />
            <TestimonialCard
              content="The comparative analysis between funds helped me optimize my portfolio. I've seen a 15% growth since following these recommendations."
              author="Amit Singh"
              role="Business Owner"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of investors who have optimized their mutual fund portfolio with our data-driven recommendations.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg inline-flex items-center transition duration-300 transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

// Helper Components
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 transform hover:translate-y-[-5px]">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-md relative border border-gray-100">
    <div className="absolute -top-4 -left-4 bg-blue-600 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-xl">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-3 mt-4 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ content, author, role }) => (
  <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
    <p className="text-gray-700 mb-4 italic">{content}</p>
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
        {author.charAt(0)}
      </div>
      <div className="ml-3">
        <h4 className="font-semibold text-gray-800">{author}</h4>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  </div>
);

export default HomePage;