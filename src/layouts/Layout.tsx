import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  const location = useLocation();
  const isDashboardLayout = ['/dashboard', '/history', '/chat', '/predict'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 text-surface-900 selection:bg-primary-100 selection:text-primary-800">
      <Navbar />
      
      <main className={`flex-grow ${isDashboardLayout ? 'container mx-auto px-6 py-12 max-w-7xl' : ''}`}>
        <Outlet />
      </main>

      {!isDashboardLayout && (
        <footer className="border-t border-surface-200 py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border border-surface-100">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-bold text-xl tracking-tight text-surface-900">Safe AI Launch</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-surface-500">
              <a href="#" className="hover:text-primary-600 transition-colors">About Us</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
            </div>
            <p className="text-sm text-surface-400">
              &copy; {new Date().getFullYear()} Safe AI Launch. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
