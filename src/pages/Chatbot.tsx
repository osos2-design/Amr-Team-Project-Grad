import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

// DesignMD Fade Slide pattern for messages
const messageVariants = {
  hidden: (isUser: boolean) => ({
    opacity: 0,
    y: 12,
    x: isUser ? 20 : -20,
    scale: 0.95
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: easeOutExpo }
  }
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I am your Predictify AI Advisor. I can help you brainstorm strategies, understand your risk factors better, or refine your business model. How can I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "That's a great question! For a SaaS targeted at university students, I highly recommend adopting a freemium model. Students are very price-sensitive but are willing to upgrade if the tool becomes essential to their coursework."
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: easeOutExpo }}
      className="h-[calc(100vh-8rem)] max-w-4xl mx-auto flex flex-col bg-card border border-surface-200 rounded-2xl shadow-sm overflow-hidden mt-2"
    >
      {/* Header */}
      <div className="h-16 border-b border-surface-200 flex items-center px-6 bg-card z-10 shrink-0">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center"
          >
            <Bot className="w-5 h-5 text-primary-500" />
          </motion.div>
          <div>
            <h2 className="font-bold text-surface-900 text-[15px]">Predictify AI Advisor</h2>
            <div className="text-[12px] text-surface-400 font-medium flex items-center gap-1.5">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-accent-500"
              />
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-surface-50/50">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div 
              custom={msg.role === 'user'}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              layout
              key={msg.id} 
              className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25, delay: 0.1 }}
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-surface-100' : 'bg-primary-50'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-surface-500" />
                ) : (
                  <Bot className="w-4 h-4 text-primary-500" />
                )}
              </motion.div>
              <div className={`px-4 py-3 rounded-2xl text-[14px] font-medium leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary-500 text-white rounded-tr-md shadow-sm shadow-primary-500/15' 
                  : 'bg-card border border-surface-200 text-surface-700 rounded-tl-md shadow-sm'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing indicator with bounce animation */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: easeOutExpo }}
              className="flex gap-3 max-w-[85%]"
            >
              <div className="w-8 h-8 rounded-xl shrink-0 bg-primary-50 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-500" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-card border border-surface-200 rounded-tl-md flex items-center gap-1.5 shadow-sm">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-surface-300 rounded-full" />
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-2 h-2 bg-surface-300 rounded-full" />
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 bg-surface-300 rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-6 pb-2 pt-3 flex gap-2 overflow-x-auto no-scrollbar bg-card border-t border-surface-100 shrink-0">
        {['How can I lower acquisition costs?', 'Analyze my competitors', 'What is a freemium model?'].map((prompt, i) => (
          <motion.button 
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.25, ease: easeOutExpo }}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setInput(prompt)}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-surface-50 hover:bg-primary-50 hover:text-primary-600 text-[13px] font-semibold text-surface-500 transition-colors border border-surface-200/60"
          >
            {prompt}
          </motion.button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-surface-100 shrink-0">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="w-full pl-5 pr-14 py-3.5 rounded-2xl bg-surface-50 border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 outline-none text-surface-900 font-medium text-[14px] placeholder:text-surface-400"
          />
          <div className="absolute right-2 flex items-center">
            <motion.button 
              type="submit" 
              disabled={!input.trim()}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="p-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-surface-100 disabled:text-surface-400 text-white transition-colors shadow-sm shadow-primary-500/15 disabled:shadow-none"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
