import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Sparkles } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function Layout() {
  const location = useLocation();
  const isDashboardLayout = ['/dashboard', '/history', '/chat', '/predict'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary-500/20">
      <Navbar />
      
      <main className={`flex-grow ${isDashboardLayout ? 'container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-7xl' : ''}`}>
        <Outlet />
      </main>

      {!isDashboardLayout && (
        <footer className="border-t border-surface-300 py-8 sm:py-14 bg-card">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm shadow-primary-500/20">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-[15px] tracking-tight text-surface-900">
                Predictify AI
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[13px] sm:text-[14px] font-medium text-surface-500">
              <a href="#" className="hover:text-primary-600 transition-colors">About Us</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
            </div>
            <p className="text-[13px] text-surface-400">
              &copy; {new Date().getFullYear()} Predictify AI. All rights reserved.
            </p>
          </div>
        </footer>
      )}

      <ThemeToggle />
    </div>
  );
}
