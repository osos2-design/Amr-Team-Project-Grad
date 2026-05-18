import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { motion, useInView } from 'framer-motion';
import { AlertCircle, Target, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

/* DesignMD Motion: ease-out-expo + stagger patterns */
const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const gentleSpring = { type: 'spring' as const, stiffness: 200, damping: 24, mass: 0.8 };

const staggerContainer = (delay = 0.06) => ({
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: delay, delayChildren: 0.05 } }
});
const gridItem = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: easeOutExpo } }
};
const listItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOutExpo } }
};

// Number counter (DesignMD: 0→target · 1200ms · easeOutExpo)
function AnimatedScore({ score }: { score: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, score]);

  return <span ref={ref}>{displayed}</span>;
}

export default function Dashboard() {
  const { successScore, isAnalyzing, weakPoints, riskAnalysis, recommendations } = useSelector((state: RootState) => state.prediction);

  if (isAnalyzing) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-12 h-12 border-[3px] border-surface-100 border-t-primary-500 rounded-full mb-6"
        />
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3, ease: easeOutExpo }}
          className="text-xl font-bold text-surface-900 mb-2"
        >
          Analyzing Startup Details
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-surface-500 font-medium text-[14px] max-w-md"
        >
          Evaluating market fit, risk factors, and team capabilities against our AI models...
        </motion.p>
      </div>
    );
  }

  if (successScore === null) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className="h-[60vh] flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, ...gentleSpring }}
          className="w-16 h-16 rounded-2xl bg-surface-50 border border-surface-200 flex items-center justify-center mb-5"
        >
          <Target className="w-8 h-8 text-surface-300" />
        </motion.div>
        <h2 className="text-xl font-bold text-surface-900 mb-2">No Active Analysis</h2>
        <p className="text-surface-500 font-medium text-[14px] max-w-md mb-6">Start a new evaluation to see your startup's success probability and insights.</p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
          <Link to="/predict" className="px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold text-[14px] hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/15">
            Start New Analysis
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  const scoreStrokeColor = successScore >= 75 ? '#059669' : successScore >= 50 ? '#D97706' : '#DC2626';
  const scoreLabel = successScore >= 75 ? 'Solid Potential' : successScore >= 50 ? 'Moderate Potential' : 'Needs Work';
  const scoreBadge = successScore >= 75 ? 'text-accent-700 bg-accent-50 border-accent-200/60' : successScore >= 50 ? 'text-warning-600 bg-warning-50 border-warning-200/60' : 'text-danger-600 bg-danger-50 border-danger-200/60';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.08)}
      className="py-6 px-4 sm:px-6 space-y-6 max-w-6xl mx-auto"
    >
      <motion.div variants={listItem} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1">Analysis Results</h1>
          <p className="text-surface-500 font-medium text-[14px]">Based on your recent input parameters.</p>
        </div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
          <Link to="/chat" className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-surface-200 hover:bg-surface-50 text-surface-600 text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Lightbulb className="w-4 h-4 text-primary-500" /> Discuss with AI
          </Link>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Success Score Ring */}
        <motion.div variants={gridItem} whileHover={{ y: -4, transition: gentleSpring }} className="col-span-1 bg-white border border-surface-200 rounded-2xl p-5 sm:p-7 flex flex-col items-center justify-center shadow-sm">
          <h3 className="text-[12px] font-semibold text-surface-400 mb-6 w-full text-center tracking-wider uppercase">Success Probability</h3>
          
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#F4F6F8" strokeWidth="8" />
              <motion.circle 
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (264 * successScore) / 100 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                cx="50" cy="50" r="42" fill="none" stroke={scoreStrokeColor} strokeWidth="8" strokeDasharray="264"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-surface-900">
                <AnimatedScore score={successScore} />
              </span>
              <span className="text-[12px] font-semibold text-surface-400 mt-0.5">/ 100</span>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.3, ease: easeOutExpo }}
            className={`mt-6 text-[12px] text-center px-3 py-1 rounded-full font-semibold border ${scoreBadge}`}
          >
            {scoreLabel}
          </motion.p>
        </motion.div>

        {/* AI Risk Analysis */}
        <motion.div variants={gridItem} whileHover={{ y: -4, transition: gentleSpring }} className="col-span-1 md:col-span-2 bg-white border border-surface-200 rounded-2xl p-5 sm:p-7 flex flex-col shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-pastel-orange flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="font-bold text-[16px] text-surface-900">Risk Assessment</h3>
          </div>
          <p className="text-surface-600 font-medium leading-relaxed text-[15px] flex-grow">{riskAnalysis}</p>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Weak Points — List Stagger */}
        <motion.div variants={gridItem} whileHover={{ y: -4, transition: gentleSpring }} className="bg-white border border-surface-200 rounded-2xl p-5 sm:p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-pastel-pink flex items-center justify-center">
              <XCircle className="w-5 h-5 text-danger-500" />
            </div>
            <h3 className="font-bold text-[16px] text-surface-900">Areas to Improve</h3>
          </div>
          <motion.ul variants={staggerContainer(0.04)} initial="hidden" animate="visible" className="space-y-3.5">
            {weakPoints.map((point, i) => (
              <motion.li key={i} variants={listItem} className="flex gap-3 text-surface-600 font-medium text-[14px]">
                <span className="w-2 h-2 rounded-full bg-danger-400 mt-[7px] shrink-0"></span>
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Recommendations — List Stagger */}
        <motion.div variants={gridItem} whileHover={{ y: -4, transition: gentleSpring }} className="bg-white border border-surface-200 rounded-2xl p-5 sm:p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-500" />
            </div>
            <h3 className="font-bold text-[16px] text-surface-900">Recommended Steps</h3>
          </div>
          <motion.ul variants={staggerContainer(0.04)} initial="hidden" animate="visible" className="space-y-3.5">
            {recommendations.map((rec, i) => (
              <motion.li key={i} variants={listItem} className="flex gap-3 text-surface-600 font-medium text-[14px]">
                <span className="w-2 h-2 rounded-full bg-primary-400 mt-[7px] shrink-0"></span>
                {rec}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
