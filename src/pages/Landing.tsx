import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowRight, CheckCircle2, ShieldCheck, Target, TrendingUp, Zap, BarChart3, Lock, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { setResults } from '../store/predictionSlice';

/* ── DesignMD Motion Primitives ── 
   Notion:   Unhurried, human motion — respects the rhythm of thought
   Stripe:   Deliberate, calm, trustworthy — communicates certainty
   Shopify:  Calm, confidence-inspiring — present when needed, invisible when not
   
   Patterns applied:
   - Fade Slide: y:8→0 · 250ms · ease-out-expo
   - Scale Pop: scale:0.92→1 · 200ms · ease-out-expo  
   - List Stagger: y:12→0 · 40ms delay
   - Grid Stagger: scale:0.6→1 · 30ms delay
   - Number Counter: 0→target · 1200ms · easeOutExpo
*/

// Easing: ease-out-expo from DesignMD
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// Notion-style unhurried spring
const gentleSpring = { type: 'spring' as const, stiffness: 200, damping: 24, mass: 0.8 };

// Stripe-style deliberate spring (for interactive elements)
const interactiveSpring = { type: 'spring' as const, stiffness: 400, damping: 30 };

// Staggered children container
const staggerContainer = (staggerDelay = 0.04) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: staggerDelay, delayChildren: 0.1 }
  }
});

// List stagger item (y:12→0 · 40ms)
const listStaggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.35, ease: easeOutExpo }
  }
};

// Grid stagger item (scale:0.6→1 · 30ms)
const gridStaggerItem = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, scale: 1,
    transition: { duration: 0.3, ease: easeOutExpo }
  }
};

// Animated counter component (Number Counter pattern: 0→target · 1200ms · easeOutExpo)
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayed, setDisplayed] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numericMatch = value.match(/[\d,]+/);
    if (!numericMatch) { setDisplayed(value); return; }
    
    const target = parseInt(numericMatch[0].replace(/,/g, ''));
    const prefix = value.slice(0, value.indexOf(numericMatch[0]));
    const postfix = value.slice(value.indexOf(numericMatch[0]) + numericMatch[0].length);
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      const formatted = current.toLocaleString();
      setDisplayed(`${prefix}${formatted}${postfix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{displayed}{suffix}</span>;
}

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
    <div className="flex flex-col items-center bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        {/* Animated background glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: easeOutExpo }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary-100/60 via-primary-50/30 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08)}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          {/* Title — Fade Slide with stagger */}
          <motion.h1
            variants={listStaggerItem}
            className="text-4xl sm:text-5xl md:text-[56px] font-extrabold tracking-[-0.025em] leading-[1.1] text-surface-900 mb-6"
          >
            Validate your startup{' '}
            <br className="hidden md:block" />
            <span className="text-primary-500">before you build</span>
          </motion.h1>
          
          <motion.p
            variants={listStaggerItem}
            className="text-[17px] text-surface-500 mb-10 max-w-2xl leading-relaxed font-medium"
          >
            Predictify AI helps university students and founders evaluate their business ideas, 
            analyze risks, and predict success using data-driven AI models.
          </motion.p>
          
          {/* CTAs with interactive hover spring */}
          <motion.div variants={listStaggerItem} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={interactiveSpring}>
              <Link to="/predict" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary-500 text-white font-semibold text-[15px] hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary-500/15 group">
                Start Free Analysis
                <motion.span className="inline-block" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={interactiveSpring}>
              <button onClick={handleViewExample} className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-surface-700 font-semibold text-[15px] hover:bg-surface-50 transition-colors flex items-center justify-center border border-surface-200 shadow-sm">
                View Example
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={listStaggerItem}
            className="mt-8 flex items-center gap-5 text-[13px] font-medium text-surface-400"
          >
            <motion.div className="flex items-center gap-1.5" whileHover={{ x: 2 }} transition={gentleSpring}>
              <CheckCircle2 className="w-4 h-4 text-accent-500" /> Free for students
            </motion.div>
            <motion.div className="flex items-center gap-1.5" whileHover={{ x: 2 }} transition={gentleSpring}>
              <CheckCircle2 className="w-4 h-4 text-accent-500" /> Data privacy guaranteed
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview Card — Slide up with spring */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: easeOutExpo }}
          className="relative mt-16 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.1)' }}
            transition={gentleSpring}
            className="bg-white rounded-2xl border border-surface-200 shadow-xl shadow-surface-900/5 p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <motion.div className="w-3 h-3 rounded-full bg-surface-200" whileHover={{ scale: 1.3, backgroundColor: '#EF4444' }} />
              <motion.div className="w-3 h-3 rounded-full bg-surface-200" whileHover={{ scale: 1.3, backgroundColor: '#F59E0B' }} />
              <motion.div className="w-3 h-3 rounded-full bg-surface-200" whileHover={{ scale: 1.3, backgroundColor: '#10B981' }} />
              <span className="ml-3 text-[12px] font-medium text-surface-400">Predictify AI — Analysis Dashboard</span>
            </div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { label: 'Success Score', value: '82', sub: '/100', badge: '↑ Solid Potential', badgeColor: 'text-accent-600 bg-accent-50' },
                { label: 'Risk Level', value: 'Low', sub: '', badge: '2 concerns found', badgeColor: 'text-primary-600 bg-primary-50' },
                { label: 'Recommendations', value: '3', sub: '', badge: 'Action items ready', badgeColor: 'text-primary-600 bg-primary-50' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={gridStaggerItem}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="bg-surface-50 rounded-xl p-5 border border-surface-200/60"
                >
                  <div className="text-[12px] font-semibold text-surface-400 uppercase tracking-wider mb-3">{card.label}</div>
                  <div className="text-3xl font-bold text-surface-900 mb-1">{card.value}<span className="text-lg text-surface-400 font-medium">{card.sub}</span></div>
                  <div className={`text-[12px] font-semibold px-2 py-0.5 rounded-md inline-block ${card.badgeColor}`}>{card.badge}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section — Notion-style pastel cards with Grid Stagger */}
      <section className="w-full bg-surface-50 py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer(0.06)}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <motion.h2 variants={listStaggerItem} className="text-3xl md:text-[36px] font-bold tracking-tight text-surface-900 mb-4">
              Everything you need to launch safely
            </motion.h2>
            <motion.p variants={listStaggerItem} className="text-[16px] text-surface-500 font-medium leading-relaxed">
              We take the guesswork out of building a business so you can focus on execution.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {[
              { icon: Target, title: 'Market Validation', desc: 'Understand your target audience and check if your solution actually solves a real problem in the market.', iconBg: 'bg-primary-50', iconColor: 'text-primary-600' },
              { icon: ShieldCheck, title: 'Risk Assessment', desc: 'Identify early red flags regarding funding, team experience, or aggressive competitors before they hit you.', iconBg: 'bg-accent-50', iconColor: 'text-accent-600' },
              { icon: TrendingUp, title: 'Growth Strategy', desc: 'Get actionable steps and recommendations tailored specifically to your industry and business model.', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={gridStaggerItem}
                whileHover={{ y: -6, scale: 1.02, transition: { ...gentleSpring } }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl p-7 border border-surface-200 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 transition-all cursor-default group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-11 h-11 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5`}
                >
                  <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                </motion.div>
                <h3 className="text-[17px] font-bold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-[14px] text-surface-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section — Number Counter animation */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer(0.06)}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Zap, value: '2,400', suffix: '+', label: 'Ideas Analyzed' },
              { icon: BarChart3, value: '89', suffix: '%', label: 'Prediction Accuracy' },
              { icon: Lock, value: '100', suffix: '%', label: 'Data Privacy' },
              { icon: Target, value: '45', suffix: 's', label: 'Avg. Analysis Time' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={gridStaggerItem}
                whileHover={{ y: -4, transition: gentleSpring }}
                className="text-center py-6"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={interactiveSpring}
                  className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon className="w-5 h-5 text-primary-500" />
                </motion.div>
                <div className="text-2xl md:text-3xl font-bold text-surface-900 mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[14px] font-medium text-surface-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section — Zoom-inspired blue gradient with Scale Pop */}
      <section className="w-full py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="bg-gradient-to-br from-primary-500 via-primary-400 to-primary-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Floating decorative circles */}
            <motion.div
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"
            />
            <motion.div
              animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4"
            />
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer(0.08)}
              className="relative z-10 max-w-lg mx-auto"
            >
              <motion.h2 variants={listStaggerItem} className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                Ready to validate your idea?
              </motion.h2>
              <motion.p variants={listStaggerItem} className="text-primary-100 font-medium mb-8 text-[16px]">
                Join thousands of student founders who trust Predictify AI to make data-driven launch decisions.
              </motion.p>
              <motion.div variants={gridStaggerItem}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={interactiveSpring} className="inline-block">
                  <Link
                    to="/predict"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-primary-600 font-bold text-[15px] hover:bg-primary-50 transition-colors shadow-lg shadow-primary-800/10 group"
                  >
                    Get Started Free
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}>
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
