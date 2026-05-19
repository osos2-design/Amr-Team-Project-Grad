import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { login } from '../store/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const name = email.split('@')[0];
    dispatch(login({ name, email }));
    navigate('/dashboard');
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 outline-none transition-all placeholder:text-surface-400 font-medium text-[14px] text-surface-900";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-surface-50">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl border border-surface-200 shadow-lg shadow-surface-900/5 p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center shadow-sm shadow-primary-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-surface-900 mb-1.5">Welcome Back</h1>
            <p className="text-[14px] text-surface-500 font-medium">Log in to access your dashboard and history.</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-[13px] font-semibold text-surface-700 mb-2" htmlFor="email">Email Address</label>
              <input id="email" type="email" required placeholder="student@university.edu" className={inputClass} />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[13px] font-semibold text-surface-700" htmlFor="password">Password</label>
                <a href="#" className="text-[12px] font-semibold text-primary-500 hover:text-primary-600 transition-colors">Forgot password?</a>
              </div>
              <input id="password" type="password" required placeholder="••••••••" className={inputClass} />
            </div>

            <button type="submit" className="w-full py-3 mt-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-[15px] transition-all shadow-sm shadow-primary-500/15">
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-surface-100">
            <p className="text-center text-[14px] font-medium text-surface-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-500 font-semibold hover:text-primary-600 transition-colors">Create one now</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
