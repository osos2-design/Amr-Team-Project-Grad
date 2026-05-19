import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';

export default function Profile() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-10 px-6 max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-surface-900 mb-1">Your Profile</h1>
        <p className="text-surface-500 font-medium text-[14px]">Manage your personal information and account security.</p>
      </div>

      <div className="bg-card border border-surface-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Banner — soft baby blue gradient */}
        <div className="h-28 bg-gradient-to-r from-primary-100 via-primary-50 to-pastel-blue relative" />
        
        <div className="px-7 pb-7">
          <div className="relative flex justify-between items-end -mt-10 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-card border-4 border-background shadow-md flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-danger-50 text-danger-600 font-semibold text-[13px] hover:bg-danger-100 transition-colors border border-danger-100"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-50 rounded-xl p-5 border border-surface-200/60">
                <div className="flex items-center gap-2 text-surface-400 mb-1.5">
                  <User className="w-4 h-4" />
                  <span className="text-[12px] font-semibold uppercase tracking-wide">Full Name</span>
                </div>
                <p className="text-[16px] font-semibold text-surface-900 pl-6">{user.name}</p>
              </div>

              <div className="bg-surface-50 rounded-xl p-5 border border-surface-200/60">
                <div className="flex items-center gap-2 text-surface-400 mb-1.5">
                  <Mail className="w-4 h-4" />
                  <span className="text-[12px] font-semibold uppercase tracking-wide">Email Address</span>
                </div>
                <p className="text-[16px] font-semibold text-surface-900 pl-6">{user.email}</p>
              </div>
            </div>

            <div className="bg-accent-50 rounded-xl p-5 border border-accent-200/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-surface-900 mb-0.5">Account Status</h3>
                <p className="text-[13px] font-medium text-surface-500">Your account is active and verified.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
