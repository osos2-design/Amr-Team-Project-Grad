import { useState } from 'react';
import { Search, Filter, MoreHorizontal, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { setResults } from '../store/predictionSlice';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const staggerContainer = (delay = 0.04) => ({
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: delay, delayChildren: 0.05 } }
});
const listItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutExpo } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: easeOutExpo } }
};

const MOCK_HISTORY = [
  { 
    id: 1, name: 'UniRide', type: 'Marketplace', date: 'May 16, 2026', score: 87,
    details: { successScore: 87, weakPoints: ['Initial chicken-and-egg problem for drivers/riders', 'Insurance costs for student drivers'], riskAnalysis: 'Low risk. High demand among university students for affordable transportation between campuses. The main challenge is achieving initial liquidity.', recommendations: ['Partner with the student union for initial launch', 'Subsidize the first 50 drivers to ensure supply', 'Launch exclusively in one university first'] }
  },
  { 
    id: 2, name: 'StudyNotes AI', type: 'EdTech', date: 'May 12, 2026', score: 62,
    details: { successScore: 62, weakPoints: ['High churn rate after exams', 'Intellectual property concerns with university materials'], riskAnalysis: 'Moderate risk. Very high competition with existing general AI tools. Students are reluctant to pay monthly subscriptions outside of exam seasons.', recommendations: ['Shift to a pay-per-use model rather than monthly subscription', 'Focus strictly on specific medical or engineering courses', 'Build a community feature to retain users year-round'] }
  },
  { 
    id: 3, name: 'GradGowns Rental', type: 'E-commerce', date: 'April 28, 2026', score: 45,
    details: { successScore: 45, weakPoints: ['Extremely seasonal business (only active 2 months a year)', 'Logistics and dry-cleaning overhead'], riskAnalysis: 'High risk. The business model cannot sustain a full-time team year-round. Profit margins are easily eaten up by damaged inventory.', recommendations: ['Expand inventory to include formal wear for other events', 'Partner directly with universities instead of B2C marketing', 'Consider a peer-to-peer rental model to avoid buying inventory'] }
  },
  { 
    id: 4, name: 'Campus Eats', type: 'Food Delivery', date: 'March 15, 2026', score: 72,
    details: { successScore: 72, weakPoints: ['Low profit margins per order', 'Delivery staff retention during midterm/final weeks'], riskAnalysis: 'Moderate risk. High order volume is guaranteed, but profitability relies heavily on operational efficiency and maintaining a steady fleet of student delivery riders.', recommendations: ['Implement batch deliveries to dorms to save time', 'Offer premium subscriptions for free delivery', 'Partner with local off-campus restaurants popular with students'] }
  }
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredHistory = MOCK_HISTORY.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (details: any) => {
    dispatch(setResults(details));
    navigate('/dashboard');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent-600 bg-accent-50';
    if (score >= 60) return 'text-warning-600 bg-warning-50';
    return 'text-danger-600 bg-danger-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: easeOutExpo }}
      className="py-6 px-4 sm:px-6 max-w-5xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.25, ease: easeOutExpo }}
      >
        <h1 className="text-2xl font-bold text-surface-900 mb-1">Previous Analyses</h1>
        <p className="text-surface-500 font-medium text-[14px]">Review your past startup evaluations and track improvements.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.25, ease: easeOutExpo }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input 
            type="text" placeholder="Search by project name or industry..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 outline-none text-[14px] font-medium text-surface-900 placeholder:text-surface-400"
          />
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-surface-200 hover:bg-surface-50 transition-colors text-[14px] font-semibold text-surface-600">
          <Filter className="w-4 h-4" /> Filters
        </motion.button>
      </motion.div>

      {/* Cards with AnimatePresence for search filtering */}
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredHistory.map((item) => (
            <motion.div
              key={item.id}
              variants={listItem}
              layout
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              whileHover={{ y: -2, boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.06)', transition: { type: 'spring', stiffness: 300, damping: 25 } }}
              className="bg-white border border-surface-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors group"
            >
              <div className="flex items-center gap-5">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`hidden sm:flex flex-col items-center justify-center w-14 h-14 rounded-xl ${getScoreColor(item.score)}`}
                >
                  <span className="text-lg font-extrabold">{item.score}</span>
                </motion.div>
                <div>
                  <h3 className="text-[16px] font-bold text-surface-900 mb-1">{item.name}</h3>
                  <div className="flex items-center gap-2.5 text-[13px] font-medium text-surface-400">
                    <span className="px-2.5 py-0.5 rounded-lg bg-surface-50 text-surface-600 text-[12px] font-semibold border border-surface-200/60">{item.type}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2.5 rounded-xl hover:bg-surface-50 text-surface-400 hover:text-surface-600 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => handleViewDetails(item.details)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-50 text-primary-600 font-semibold text-[13px] hover:bg-primary-100 transition-colors border border-primary-200/60"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="text-center py-16 bg-white border border-surface-200 rounded-2xl"
          >
            <p className="text-surface-500 font-medium text-[14px]">No analyses found matching your search.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
