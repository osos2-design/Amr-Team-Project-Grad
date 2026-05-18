import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { motion } from 'framer-motion';
import { AlertCircle, Target, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { successScore, isAnalyzing, weakPoints, riskAnalysis, recommendations } = useSelector((state: RootState) => state.prediction);

  if (isAnalyzing) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full mb-8"
        />
        <h2 className="text-2xl font-bold text-surface-900 mb-3">Analyzing Startup Details</h2>
        <p className="text-surface-500 font-medium max-w-md">Evaluating market fit, risk factors, and team capabilities against our AI models...</p>
      </div>
    );
  }

  if (successScore === null) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-white border border-surface-200 flex items-center justify-center mb-6 shadow-sm">
          <Target className="w-10 h-10 text-surface-300" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 mb-3">No Active Analysis</h2>
        <p className="text-surface-500 font-medium max-w-md mb-8">Start a new evaluation to see your startup's success probability and insights.</p>
        <Link to="/predict" className="px-8 py-3.5 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors shadow-sm">
          Start New Analysis
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 mb-2">Analysis Results</h1>
          <p className="text-surface-500 font-medium">Based on your recent input parameters.</p>
        </div>
        <Link to="/chat" className="px-5 py-2.5 rounded-xl bg-white border border-surface-200 hover:bg-surface-50 text-surface-700 text-sm font-bold transition-colors flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary-600" /> Discuss with AI
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Success Score Ring */}
        <div className="col-span-1 bg-white border border-surface-200 rounded-3xl p-8 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
          <h3 className="text-sm font-bold text-surface-500 mb-8 w-full text-center tracking-wide uppercase">Success Probability</h3>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-surface-100)" strokeWidth="10" />
              <motion.circle 
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * successScore) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50" cy="50" r="45" fill="none" stroke="var(--color-accent-500)" strokeWidth="10" strokeDasharray="283"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold text-surface-900">{successScore}</span>
              <span className="text-sm font-bold text-surface-400 mt-1">/ 100</span>
            </div>
          </div>
          <p className="mt-8 text-sm text-center text-accent-700 bg-accent-50 border border-accent-100 px-4 py-1.5 rounded-full font-bold">
            Solid Potential
          </p>
        </div>

        {/* AI Risk Analysis */}
        <div className="col-span-2 bg-white border border-surface-200 rounded-3xl p-8 flex flex-col shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="font-bold text-lg text-surface-900">Risk Assessment</h3>
          </div>
          <p className="text-surface-600 font-medium leading-relaxed text-lg flex-grow">{riskAnalysis}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Weak Points */}
        <div className="bg-white border border-surface-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-bold text-lg text-surface-900">Areas to Improve</h3>
          </div>
          <ul className="space-y-4">
            {weakPoints.map((point, i) => (
              <li key={i} className="flex gap-4 text-surface-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0"></span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white border border-surface-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-bold text-lg text-surface-900">Recommended Steps</h3>
          </div>
          <ul className="space-y-4">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex gap-4 text-surface-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-primary-400 mt-2 shrink-0"></span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
