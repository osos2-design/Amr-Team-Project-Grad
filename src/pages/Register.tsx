import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Rocket } from 'lucide-react';
import { login } from '../store/authSlice';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    dispatch(login({ name, email }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-surface-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-surface-200 overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-surface-900 mb-2">Create an Account</h1>
            <p className="text-surface-500 font-medium">Join us to validate and track your startup ideas.</p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-bold text-surface-700 mb-2" htmlFor="name">Full Name</label>
              <input 
                id="name" 
                type="text" 
                required
                placeholder="John Doe"
                className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all placeholder:text-surface-400 font-medium text-surface-900"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-surface-700 mb-2" htmlFor="email">Email Address</label>
              <input 
                id="email" 
                type="email" 
                required
                placeholder="student@university.edu"
                className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all placeholder:text-surface-400 font-medium text-surface-900"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-surface-700 mb-2" htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all placeholder:text-surface-400 font-medium text-surface-900"
              />
            </div>

            <button type="submit" className="w-full py-3.5 mt-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-sm">
              Sign Up
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-surface-100">
            <p className="text-center text-sm font-medium text-surface-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700 transition-colors">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
