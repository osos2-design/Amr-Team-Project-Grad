import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, History, MessageSquare, LogIn, Menu, X, Rocket, User } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

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
    <header className="sticky top-0 z-50 w-full border-b border-surface-200 bg-white/90 backdrop-blur-xl">
      <div className="container mx-auto px-6 max-w-7xl h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border border-surface-100">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-bold text-xl tracking-tight text-surface-900">
            Safe AI Launch
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors relative ${
                  isActive ? 'text-primary-600' : 'text-surface-500 hover:text-surface-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary-500' : 'text-surface-400'}`} />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-primary-500"
                    initial={false}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-bold text-surface-700 hover:text-primary-600 transition-colors bg-surface-50 hover:bg-primary-50 px-3 py-1.5 rounded-lg border border-surface-200"
            >
              <div className="w-6 h-6 rounded-md bg-primary-100 flex items-center justify-center text-primary-700">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-surface-600 hover:text-surface-900 transition-colors flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          )}
          <Link
            to="/predict"
            className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-all shadow-sm shadow-primary-600/20"
          >
            New Analysis
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-surface-600 hover:bg-surface-50 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-surface-200 p-6 flex flex-col gap-6 shadow-xl"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-surface-600 hover:bg-surface-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{item.name}</span>
              </Link>
            );
          })}
          <div className="h-px bg-surface-200 my-2"></div>
          {isAuthenticated ? (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-surface-600 hover:bg-surface-50 font-semibold"
            >
              <User className="w-5 h-5" />
              My Profile
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-surface-600 hover:bg-surface-50 font-semibold"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </Link>
          )}
          <Link
            to="/predict"
            onClick={() => setIsOpen(false)}
            className="flex justify-center items-center gap-2 p-4 rounded-xl bg-primary-600 text-white font-semibold shadow-sm"
          >
            Start New Analysis
          </Link>
        </motion.div>
      )}
    </header>
  );
}
