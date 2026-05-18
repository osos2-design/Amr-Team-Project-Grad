import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowRight, CheckCircle2, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import { setResults } from '../store/predictionSlice';

export default function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewExample = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setResults({
      successScore: 82,
      weakPoints: ['Marketing budget is heavily reliant on paid ads', 'Team lacks a dedicated backend developer'],
      riskAnalysis: 'Low risk overall. You have a solid validation plan, but you need to transition to organic growth channels sooner rather than later to sustain your margins.',
      recommendations: ['Hire or partner with a technical lead', 'Start a campus ambassador program', 'Test pricing elasticity with a smaller cohort first']
    }));
    navigate('/dashboard');
  };
  return (
    <div className="flex flex-col items-center bg-white">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-8 border border-primary-100">
            <span className="flex h-2 w-2 rounded-full bg-primary-600"></span>
            Built for Young Entrepreneurs
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-[1.1] mb-6">
            Validate your startup <br className="hidden md:block" />
            <span className="text-primary-600">before you build</span>
          </h1>
          
          <p className="text-lg md:text-xl text-surface-600 mb-10 max-w-xl leading-relaxed font-medium">
            Safe AI Launch helps university students and founders evaluate their business ideas, analyze risks, and predict success using data-driven AI models.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/predict" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-md shadow-primary-600/10 flex items-center justify-center gap-2">
              Start Free Analysis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button onClick={handleViewExample} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface-50 text-surface-700 font-semibold hover:bg-surface-100 transition-all flex items-center justify-center border border-surface-200">
              View Example
            </button>
          </div>
          
          <div className="mt-10 flex items-center gap-4 text-sm font-medium text-surface-500">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent-500" /> Free for students</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent-500" /> Data privacy guaranteed</div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-surface-200/50 group">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
            alt="Students collaborating on a startup idea" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/60 to-transparent flex items-end p-8">
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-surface-900">Success Probability</span>
                <span className="text-accent-600 font-bold bg-accent-50 px-2 py-1 rounded-lg text-sm">82%</span>
              </div>
              <div className="h-2.5 bg-surface-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 w-[82%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-surface-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">Everything you need to launch safely</h2>
            <p className="text-lg text-surface-600 font-medium">We take the guesswork out of building a business so you can focus on execution.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Market Validation', desc: 'Understand your target audience and check if your solution actually solves a real problem in the market.' },
              { icon: ShieldCheck, title: 'Risk Assessment', desc: 'Identify early red flags regarding funding, team experience, or aggressive competitors before they hit you.' },
              { icon: TrendingUp, title: 'Growth Strategy', desc: 'Get actionable steps and recommendations tailored specifically to your industry and business model.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-surface-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-surface-900 mb-3">{feature.title}</h3>
                <p className="text-surface-600 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
