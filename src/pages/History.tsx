import { useState } from 'react';
import { Search, Filter, MoreHorizontal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_HISTORY = [
  { id: 1, name: 'EcoPack Solutions', type: 'E-commerce', date: 'Oct 24, 2025', score: 87 },
  { id: 2, name: 'FinFlow App', type: 'SaaS / Tech', date: 'Oct 12, 2025', score: 62 },
  { id: 3, name: 'Local Chef Delivery', type: 'Marketplace', date: 'Sep 28, 2025', score: 45 },
  { id: 4, name: 'AI Marketing Tool', type: 'SaaS / Tech', date: 'Sep 15, 2025', score: 92 },
  { id: 5, name: 'VR Fitness Studio', type: 'HealthTech', date: 'Aug 30, 2025', score: 78 },
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = MOCK_HISTORY.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Previous Analyses</h1>
        <p className="text-surface-500 font-medium">Review your past startup evaluations and track improvements.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input 
            type="text" 
            placeholder="Search by project name or industry..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm font-medium text-surface-900 placeholder:text-surface-400"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-surface-200 hover:bg-surface-50 transition-colors text-sm font-bold text-surface-700">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div key={item.id} className="bg-white border border-surface-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-surface-50 border border-surface-100">
                <span className={`text-xl font-extrabold ${
                  item.score >= 80 ? 'text-accent-600' : 
                  item.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {item.score}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-surface-900 mb-1">{item.name}</h3>
                <div className="flex items-center gap-3 text-sm font-medium text-surface-500">
                  <span className="px-2.5 py-1 rounded-md bg-surface-100 text-surface-700 text-xs">
                    {item.type}
                  </span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl hover:bg-surface-50 text-surface-400 hover:text-surface-700 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <Link to="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-50 text-primary-700 font-bold hover:bg-primary-100 transition-colors">
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
        
        {filteredHistory.length === 0 && (
          <div className="text-center py-16 bg-white border border-surface-200 rounded-3xl">
            <p className="text-surface-500 font-medium">No analyses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
