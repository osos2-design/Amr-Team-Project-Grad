import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, History, MessageSquare, LogIn, Menu, X, User, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'History', path: '/history', icon: History },
    { name: 'AI Advisor', path: '/chat', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-2xl border-b border-surface-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="container mx-auto px-6 max-w-7xl h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm shadow-primary-500/20 group-hover:shadow-md group-hover:shadow-primary-500/30 transition-shadow"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
          <span className="font-bold text-[16px] tracking-tight text-surface-900">
            Predictify AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-surface-50 border border-surface-200 shadow-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-all relative ${
                  isActive
                    ? 'text-surface-900 bg-white shadow-sm border border-surface-200/50'
                    : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary-500' : ''}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 text-[14px] font-medium text-surface-600 hover:text-surface-900 transition-colors px-3 py-2 rounded-lg hover:bg-surface-50"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-800 text-[12px] font-bold"
              >
                {user?.name.charAt(0).toUpperCase()}
              </motion.div>
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-[14px] font-medium text-surface-600 hover:text-surface-900 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-50"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          )}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}>
            <Link
              to="/predict"
              className="px-4 py-2 rounded-xl bg-surface-900 text-white hover:bg-black text-[13px] font-bold transition-all shadow-md shadow-surface-900/10 hover:shadow-lg hover:shadow-surface-900/20"
            >
              New Analysis
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 text-surface-500 hover:text-surface-900 hover:bg-surface-50 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Nav — Slide Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-surface-200"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
              className="p-4 flex flex-col gap-1"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: easeOutExpo } } }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="h-px bg-surface-100 my-2"></div>
              <motion.div variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: easeOutExpo } } }}>
                {isAuthenticated ? (
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-surface-600 hover:bg-surface-50 hover:text-surface-900 text-[14px] font-medium">
                    <User className="w-4.5 h-4.5" /> My Profile
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-surface-600 hover:bg-surface-50 hover:text-surface-900 text-[14px] font-medium">
                    <LogIn className="w-4.5 h-4.5" /> Sign In
                  </Link>
                )}
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: easeOutExpo } } }}>
                <Link
                  to="/predict" onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center gap-2 py-3 rounded-xl bg-surface-900 text-white text-[14px] font-bold mt-1 shadow-md shadow-surface-900/10"
                >
                  Start New Analysis
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
