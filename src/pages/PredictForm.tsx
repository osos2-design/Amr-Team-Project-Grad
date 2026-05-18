import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Lightbulb, Users, LineChart } from 'lucide-react';
import { setResults, setAnalyzing } from '../store/predictionSlice';

export default function PredictForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setAnalyzing(true));
    navigate('/dashboard');
    
    setTimeout(() => {
      dispatch(setResults({
        successScore: 78,
        weakPoints: ['Team lacks deep technical expertise', 'Initial funding might be insufficient for customer acquisition'],
        riskAnalysis: 'Moderate risk. The market is large, but reaching your target audience requires a significant marketing budget which currently seems strained.',
        recommendations: [
          'Consider bringing on a technical co-founder',
          'Focus on organic marketing or a niche segment first',
          'Validate the MVP with a small group before scaling'
        ]
      }));
      dispatch(setAnalyzing(false));
    }, 3000);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const steps = [
    { icon: Lightbulb, label: 'Concept' },
    { icon: Users, label: 'Team & Funding' },
    { icon: LineChart, label: 'Market & Risk' }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-surface-900 mb-3">Evaluate Your Startup</h1>
        <p className="text-surface-500 font-medium max-w-lg mx-auto">
          Tell us about your project, team, and market. Our AI will analyze your inputs and predict your launch success rate.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-12 relative px-4">
        <div className="absolute left-4 right-4 h-1.5 bg-surface-100 top-1/2 -translate-y-1/2 rounded-full"></div>
        <div 
          className="absolute left-4 h-1.5 bg-primary-500 top-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `calc(${((step - 1) / 2) * 100}% - ${step === 1 ? '0px' : '16px'})` }}
        ></div>
        
        {steps.map((s, i) => {
          const isActive = step >= i + 1;
          const isCurrent = step === i + 1;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3 bg-surface-50 px-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isActive ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20' : 'bg-white border-2 border-surface-200 text-surface-400'
              }`}>
                {isActive && !isCurrent ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
              </div>
              <span className={`text-sm font-bold absolute -bottom-7 whitespace-nowrap ${isActive ? 'text-primary-700' : 'text-surface-400'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-surface-200 rounded-3xl p-8 sm:p-12 shadow-sm mt-16 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
              <h2 className="text-2xl font-bold text-surface-900 mb-2">Step 1: Idea & Industry</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-surface-700 mb-2">What is your startup idea?</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your product, the problem it solves, and how it works in simple terms..."
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none text-surface-900 font-medium placeholder:text-surface-400"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-2">Industry</label>
                    <select className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none appearance-none font-medium text-surface-900">
                      <option value="">Select industry...</option>
                      <option value="saas">SaaS / Tech</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="education">EdTech / Education</option>
                      <option value="health">HealthTech</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-2">Business Model</label>
                    <select className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none appearance-none font-medium text-surface-900">
                      <option value="">Select model...</option>
                      <option value="b2b">B2B (Business to Business)</option>
                      <option value="b2c">B2C (Business to Consumer)</option>
                      <option value="marketplace">Marketplace</option>
                      <option value="freemium">Freemium</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
              <h2 className="text-2xl font-bold text-surface-900 mb-2">Step 2: Team & Funding</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-2">Team Size</label>
                    <input type="number" min="1" placeholder="e.g. 3" className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none font-medium text-surface-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-surface-700 mb-2">Experience Level</label>
                    <select className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none appearance-none font-medium text-surface-900">
                      <option value="">Select level...</option>
                      <option value="beginner">First-time founders</option>
                      <option value="intermediate">Some previous experience</option>
                      <option value="expert">Experienced professionals</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-surface-700 mb-2">Available Funding ($)</label>
                  <input type="number" placeholder="e.g. 5000" className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none font-medium text-surface-900" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
              <h2 className="text-2xl font-bold text-surface-900 mb-2">Step 3: Market & Risks</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-surface-700 mb-2">Market Size / Target Audience</label>
                  <input type="text" placeholder="e.g. University students in Egypt" className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none font-medium text-surface-900" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-surface-700 mb-2">What are the biggest risk factors?</label>
                  <textarea 
                    rows={4}
                    placeholder="e.g. Strong competitors, hard to get initial users..."
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-none font-medium text-surface-900 placeholder:text-surface-400"
                  ></textarea>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-surface-100">
          <button 
            type="button" 
            onClick={handlePrev}
            className={`px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-surface-600 hover:bg-surface-50'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          {step < 3 ? (
            <button 
              type="button" 
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              type="submit" 
              className="px-8 py-3 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold transition-all shadow-sm flex items-center gap-2 group"
            >
              Analyze Startup
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
