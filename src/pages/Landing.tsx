import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowRight, Activity, ShieldAlert, Sparkles, LineChart, Target, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { setResults } from '../store/predictionSlice';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) { setDisplayed(value); return; }
    
    const target = parseFloat(numericMatch[0]);
    const isFloat = numericMatch[0].includes('.');
    const prefix = value.slice(0, value.indexOf(numericMatch[0]));
    const postfix = value.slice(value.indexOf(numericMatch[0]) + numericMatch[0].length);
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * target;
      
      const formattedNumber = isFloat ? current.toFixed(1) : Math.round(current).toString();
      setDisplayed(`${prefix}${formattedNumber}${postfix}`);
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{displayed === '0' ? value.replace(/[\d.]+/g, '0') : displayed}</span>;
}

export default function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Scroll animations for the hero
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Scroll animations for the features section
  const featuresRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuresScroll } = useScroll({
    target: featuresRef,
    offset: ["start center", "end center"]
  });
  
  const handleDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setResults({
      successScore: 82,
      weakPoints: ['High CAC dependency', 'Lack of technical co-founder'],
      riskAnalysis: 'Moderate risk. Strong market demand but execution relies too heavily on paid acquisition. Need to diversify channels.',
      recommendations: ['Build a community-led growth motion', 'Find a technical advisor', 'Focus on SEO for long-term CAC reduction']
    }));
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center bg-background overflow-hidden">
      
      {/* ─── HERO SECTION: Ethereal Mesh Gradient ─── */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[95vh] flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6">
        {/* Soft Mesh Gradients — Boosted for light mode visibility */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary-300/60 dark:bg-primary-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} 
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-accent-200/50 dark:bg-accent-800/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" 
          />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], y: [0, -50, 0] }} 
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 left-[20%] w-[70vw] h-[40vw] max-w-[1000px] max-h-[600px] bg-primary-200/70 dark:bg-primary-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" 
          />
          {/* Dot grid texture */}
          <div className="absolute inset-0 dot-grid opacity-40 dark:opacity-20" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-4 sm:mt-10">

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1, ease: easeOutExpo }}
            className="text-[36px] sm:text-[52px] md:text-[72px] lg:text-[88px] font-bold tracking-tight leading-[1.08] text-surface-900 mb-5 sm:mb-8"
          >
            Clarity before <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">launching your startup.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2, ease: easeOutExpo }}
            className="text-base sm:text-lg md:text-2xl text-surface-500 mb-8 sm:mb-14 max-w-2xl leading-relaxed font-medium px-2 sm:px-0"
          >
            An intelligent validation engine for founders. We simulate market conditions and identify risks so you can launch with absolute certainty.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: easeOutExpo }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link to="/predict" className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-surface-900 px-8 py-4 text-[15px] font-bold text-surface-50 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-surface-900/10 flex justify-center items-center gap-2">
              <span className="relative z-10 flex items-center gap-2">Analyze Your Idea <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            <button onClick={handleDemo} className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-surface-900 font-bold text-[15px] hover:bg-surface-50/80 transition-all active:scale-95 flex justify-center items-center">
              View Sample Report
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── EDITORIAL SECTION: Sticky Scroll ─── */}
      <section ref={featuresRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-40">
        {/* Decorative glow for editorial section */}
        <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-primary-200/30 dark:bg-primary-900/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start gap-10 sm:gap-16 lg:gap-24 relative">
          
          {/* Sticky Left Sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-40 relative z-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-surface-900 mb-4 sm:mb-6">
              The Engine.
            </h2>
            <p className="text-lg text-surface-500 leading-relaxed mb-12">
              We process hundreds of data points—from competitor density to search volume trends—to give you a crystal-clear picture of your startup's viability.
            </p>
            
            {/* Scroll Progress Indicator */}
            <div className="hidden lg:flex flex-col gap-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-200">
              <motion.div 
                className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-primary-500 origin-top"
                style={{ scaleY: featuresScroll }}
              />
              
              {[
                { num: '01', label: 'Market Validation' },
                { num: '02', label: 'Risk Identification' },
                { num: '03', label: 'Actionable Strategy' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-surface-50 border-2 border-surface-200 flex items-center justify-center text-[10px] font-bold text-surface-400">
                    {/* We can animate this based on scroll, but keeping it simple for aesthetics */}
                  </div>
                  <div className="text-[14px] font-bold text-surface-400 uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling Right Cards */}
          <div className="lg:w-2/3 flex flex-col gap-8 sm:gap-16 md:gap-32 relative z-10">
            
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: easeOutExpo }}
              className="glass-panel rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 border-white/60 dark:border-surface-200/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/30 transition-colors duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-card shadow-sm border border-surface-100 flex items-center justify-center mb-8 relative z-10">
                <Target className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-3 sm:mb-4 relative z-10">Market Alignment</h3>
              <p className="text-base sm:text-lg text-surface-500 leading-relaxed relative z-10 max-w-lg mb-5 sm:mb-8">
                Stop building features nobody wants. We analyze your core value proposition against real-world market demands to ensure you have a targeted, hungry audience.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4 relative z-10">
                <div className="px-4 py-2 rounded-lg bg-surface-50 border border-surface-100 text-[13px] font-bold text-surface-700">Competitor Density</div>
                <div className="px-4 py-2 rounded-lg bg-surface-50 border border-surface-100 text-[13px] font-bold text-surface-700">Audience Targeting</div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: easeOutExpo }}
              className="glass-panel rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 border-white/60 dark:border-surface-200/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-100 dark:bg-accent-700/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-accent-200 dark:group-hover:bg-accent-600/30 transition-colors duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-card shadow-sm border border-surface-100 flex items-center justify-center mb-8 relative z-10">
                <ShieldAlert className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-3 sm:mb-4 relative z-10">Risk Surface Mapping</h3>
              <p className="text-base sm:text-lg text-surface-500 leading-relaxed relative z-10 max-w-lg mb-5 sm:mb-8">
                Identify operational, technical, and financial risks before you spend a dime. Our models flag potential pitfalls that kill 90% of early-stage startups.
              </p>
              <div className="w-full h-24 rounded-xl bg-surface-50 border border-surface-100 relative z-10 flex items-center px-6 overflow-hidden">
                <div className="flex-1">
                  <div className="text-[12px] font-bold text-surface-400 uppercase tracking-wider mb-2">Technical Debt Risk</div>
                  <div className="w-full h-2 rounded-full bg-surface-200 overflow-hidden"><div className="w-[15%] h-full bg-accent-500 rounded-full" /></div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: easeOutExpo }}
              className="glass-panel rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 border-white/60 dark:border-surface-200/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 dark:bg-orange-900/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/30 transition-colors duration-700" />
              <div className="w-16 h-16 rounded-2xl bg-card shadow-sm border border-surface-100 flex items-center justify-center mb-8 relative z-10">
                <LineChart className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-3 sm:mb-4 relative z-10">Step-by-Step Playbooks</h3>
              <p className="text-base sm:text-lg text-surface-500 leading-relaxed relative z-10 max-w-lg">
                Walk away with a comprehensive roadmap. We provide custom recommendations for MVP features, marketing channels, and timeline expectations based on your specific niche.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── DATA & TRUST: Minimalist Stats ─── */}
      <section className="w-full py-14 sm:py-24 bg-card border-y border-surface-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-16">
            {[
              { value: '14K+', label: 'Ideas Validated', icon: Zap },
              { value: '94%', label: 'Prediction Accuracy', icon: Activity },
              { value: '2.4M', label: 'Data Points Analyzed', icon: Target },
              { value: 'Top 1%', label: 'Founder Satisfaction', icon: Sparkles },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col border-l-2 border-surface-100 pl-6"
              >
                <stat.icon className="w-5 h-5 text-surface-300 mb-6" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-surface-900 tracking-tight mb-2"><AnimatedCounter value={stat.value} /></div>
                <div className="text-[14px] font-medium text-surface-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA: The Final Ask ─── */}
      <section className="w-full py-20 sm:py-32 md:py-48 relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary-200/40 dark:bg-primary-900/10 rounded-full blur-[100px] pointer-events-none" />
        {/* Dot grid texture */}
        <div className="absolute inset-0 dot-grid opacity-30 dark:opacity-15 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: easeOutExpo }}
            className="text-3xl sm:text-4xl md:text-[64px] font-bold tracking-tight text-surface-900 mb-6 sm:mb-8 leading-[1.1]"
          >
            Ready to build <br />
            with <span className="italic font-light text-primary-500">confidence?</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1, ease: easeOutExpo }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block"
          >
            <Link
              to="/predict"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-surface-900 text-surface-50 font-bold text-[16px] hover:shadow-2xl hover:shadow-surface-900/20 transition-all group"
            >
              Start Free Analysis
              <div className="w-8 h-8 rounded-full bg-surface-50/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
