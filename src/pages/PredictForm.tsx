import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Lightbulb, Users, LineChart } from 'lucide-react';
import { setResults, setAnalyzing } from '../store/predictionSlice';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const interactiveSpring = { type: 'spring' as const, stiffness: 400, damping: 30 };

export default function PredictForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => { setDirection(1); setStep(s => Math.min(s + 1, 3)); };
  const handlePrev = () => { setDirection(-1); setStep(s => Math.max(s - 1, 1)); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setAnalyzing(true));
    navigate('/dashboard');
    setTimeout(() => {
      dispatch(setResults({
        successScore: 78,
        weakPoints: ['Team lacks deep technical expertise', 'Initial funding might be insufficient for customer acquisition'],
        riskAnalysis: 'Moderate risk. The market is large, but reaching your target audience requires a significant marketing budget which currently seems strained.',
        recommendations: ['Consider bringing on a technical co-founder', 'Focus on organic marketing or a niche segment first', 'Validate the MVP with a small group before scaling']
      }));
      dispatch(setAnalyzing(false));
    }, 3000);
  };

  // DesignMD Slide Drawer pattern adapted for steps: directional slide
  const stepVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: easeOutExpo } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.2, ease: easeOutExpo } })
  };

  const steps = [
    { icon: Lightbulb, label: 'Concept' },
    { icon: Users, label: 'Team & Funding' },
    { icon: LineChart, label: 'Market & Risk' }
  ];

  const inputClass = "w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all font-medium text-[14px] text-surface-900 placeholder:text-surface-400";
  const labelClass = "block text-[13px] font-semibold text-surface-700 mb-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: easeOutExpo }}
      className="max-w-3xl mx-auto py-6 px-4 sm:px-6"
    >
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-surface-900 mb-2">Evaluate Your Startup</h1>
        <p className="text-surface-500 font-medium text-[14px] max-w-lg mx-auto">
          Tell us about your project, team, and market. Our AI will analyze your inputs and predict your launch success rate.
        </p>
      </div>

      {/* Progress Indicator with animated bar */}
      <div className="flex items-center justify-between mb-16 relative px-4">
        <div className="absolute left-4 right-4 h-[3px] bg-surface-100 top-1/2 -translate-y-1/2 rounded-full"></div>
        <motion.div 
          className="absolute left-4 h-[3px] bg-primary-500 top-1/2 -translate-y-1/2 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `calc(${((step - 1) / 2) * 100}% - ${step === 1 ? '0px' : '16px'})` }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        />
        
        {steps.map((s, i) => {
          const isActive = step >= i + 1;
          const isCurrent = step === i + 1;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3 bg-background px-2">
              <motion.div
                animate={isActive ? { scale: [1, 1.15, 1], backgroundColor: '#3B95F6' } : { scale: 1 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/20' : 'bg-card border-2 border-surface-200 text-surface-400'
                }`}
              >
                {isActive && !isCurrent ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }}>
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
              </motion.div>
              <span className={`text-[10px] sm:text-[12px] font-semibold absolute -bottom-8 sm:-bottom-7 text-center whitespace-nowrap transition-colors ${isActive ? 'text-primary-600' : 'text-surface-400'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35, ease: easeOutExpo }}
        className="bg-card border border-surface-200 rounded-2xl p-5 sm:p-10 shadow-sm mt-10 relative overflow-hidden"
      >
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div key="step1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
              <h2 className="text-lg font-bold text-surface-900 mb-1">Step 1: Idea & Industry</h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>What is your startup idea?</label>
                  <textarea rows={4} placeholder="Describe your product, the problem it solves, and how it works in simple terms..." className={`${inputClass} resize-none`}></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Industry</label>
                    <select className={`${inputClass} appearance-none`}><option value="">Select industry...</option><option value="saas">SaaS / Tech</option><option value="ecommerce">E-commerce</option><option value="education">EdTech / Education</option><option value="health">HealthTech</option><option value="other">Other</option></select>
                  </div>
                  <div>
                    <label className={labelClass}>Business Model</label>
                    <select className={`${inputClass} appearance-none`}><option value="">Select model...</option><option value="b2b">B2B (Business to Business)</option><option value="b2c">B2C (Business to Consumer)</option><option value="marketplace">Marketplace</option><option value="freemium">Freemium</option></select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
              <h2 className="text-lg font-bold text-surface-900 mb-1">Step 2: Team & Funding</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><label className={labelClass}>Team Size</label><input type="number" min="1" placeholder="e.g. 3" className={inputClass} /></div>
                  <div><label className={labelClass}>Experience Level</label><select className={`${inputClass} appearance-none`}><option value="">Select level...</option><option value="beginner">First-time founders</option><option value="intermediate">Some previous experience</option><option value="expert">Experienced professionals</option></select></div>
                </div>
                <div><label className={labelClass}>Available Funding ($)</label><input type="number" placeholder="e.g. 5000" className={inputClass} /></div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
              <h2 className="text-lg font-bold text-surface-900 mb-1">Step 3: Market & Risks</h2>
              <div className="space-y-5">
                <div><label className={labelClass}>Market Size / Target Audience</label><input type="text" placeholder="e.g. University students in Egypt" className={inputClass} /></div>
                <div><label className={labelClass}>What are the biggest risk factors?</label><textarea rows={4} placeholder="e.g. Strong competitors, hard to get initial users..." className={`${inputClass} resize-none`}></textarea></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex justify-between items-center pt-6 border-t border-surface-100">
          <motion.button 
            type="button" onClick={handlePrev}
            whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors flex items-center gap-2 ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </motion.button>
          
          {step < 3 ? (
            <motion.button
              type="button" onClick={handleNext}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              transition={interactiveSpring}
              className="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-[14px] transition-colors flex items-center gap-2 shadow-sm shadow-primary-500/15"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              transition={interactiveSpring}
              className="px-6 py-2.5 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-[14px] transition-colors flex items-center gap-2 shadow-sm shadow-accent-600/15 group"
            >
              Analyze Startup
              <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          )}
        </div>
      </motion.form>
    </motion.div>
  );
}
