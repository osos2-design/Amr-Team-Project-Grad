import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I am your Safe AI Launch Advisor. I can help you brainstorm strategies, understand your risk factors better, or refine your business model. How can I assist you today?'
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
    <div className="h-[calc(100vh-10rem)] max-w-4xl mx-auto flex flex-col bg-white border border-surface-200 rounded-3xl shadow-sm overflow-hidden mt-4">
      {/* Header */}
      <div className="h-20 border-b border-surface-100 flex items-center px-8 bg-white z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="font-bold text-surface-900 text-lg">Safe AI Launch Advisor</h2>
            <div className="text-sm text-surface-500 font-medium flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent-500"></div> Online
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-surface-50/50">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center ${
              msg.role === 'user' ? 'bg-surface-200' : 'bg-primary-50'
            }`}>
              {msg.role === 'user' ? (
                <User className="w-5 h-5 text-surface-600" />
              ) : (
                <Bot className="w-5 h-5 text-primary-600" />
              )}
            </div>
            <div className={`p-5 rounded-2xl text-[15px] font-medium leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-sm' 
                : 'bg-white border border-surface-100 text-surface-800 rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[85%]">
            <div className="w-10 h-10 rounded-2xl shrink-0 bg-primary-50 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-600" />
            </div>
            <div className="p-5 rounded-2xl bg-white border border-surface-100 rounded-tl-sm flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-8 pb-3 pt-4 flex gap-3 overflow-x-auto no-scrollbar bg-white">
        {['How can I lower acquisition costs?', 'Analyze my competitors', 'What is a freemium model?'].map((prompt, i) => (
          <button 
            key={i} 
            onClick={() => setInput(prompt)}
            className="whitespace-nowrap px-4 py-2 rounded-xl bg-surface-50 hover:bg-primary-50 hover:text-primary-700 text-sm font-semibold text-surface-600 transition-colors border border-surface-100"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-surface-100">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="w-full pl-6 pr-20 py-4 rounded-2xl bg-surface-50 border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-surface-900 font-medium placeholder:text-surface-400"
          />
          <div className="absolute right-3 flex items-center gap-2">
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="p-3 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:bg-surface-200 disabled:text-surface-400 text-white transition-colors shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
