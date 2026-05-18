import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail, ShieldCheck } from 'lucide-react';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';

export default function Profile() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Your Profile</h1>
        <p className="text-surface-500 font-medium">Manage your personal information and account security.</p>
      </div>

      <div className="bg-white border border-surface-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="h-32 bg-primary-50"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-8">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-sm flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-3xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-50 rounded-2xl p-5 border border-surface-100">
                <div className="flex items-center gap-3 text-surface-500 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-bold">Full Name</span>
                </div>
                <p className="text-lg font-semibold text-surface-900 pl-7">{user.name}</p>
              </div>

              <div className="bg-surface-50 rounded-2xl p-5 border border-surface-100">
                <div className="flex items-center gap-3 text-surface-500 mb-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-bold">Email Address</span>
                </div>
                <p className="text-lg font-semibold text-surface-900 pl-7">{user.email}</p>
              </div>
            </div>

            <div className="bg-surface-50 rounded-2xl p-5 border border-surface-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-surface-900 mb-0.5">Account Status</h3>
                <p className="text-sm font-medium text-surface-500">Your account is active and verified.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
