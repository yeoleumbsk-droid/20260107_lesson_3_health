
import React from 'react';
import { AIAnalysis } from '../types';

interface AnalysisDisplayProps {
  analysis: AIAnalysis;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <span className="text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.535 5.503a1 1 0 011.415 0 3 3 0 004.242 0 1 1 0 011.415 1.415 5 5 0 01-7.072 0 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          </span>
          AI Personalized Health Report
        </h3>
        <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded uppercase tracking-tighter">Powered by Gemini</span>
      </div>
      
      <div className="p-6 space-y-8">
        <div>
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Summary</h4>
          <p className="text-slate-700 leading-relaxed italic">"{analysis.summary}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h4 className="flex items-center gap-2 text-emerald-700 font-semibold border-b border-emerald-100 pb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16a1 1 0 11-2 0V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.789l1.599.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Dietary Recommendations
            </h4>
            <ul className="space-y-2">
              {analysis.dietAdvice.map((item, i) => (
                <li key={i} className="flex gap-2 text-slate-600 text-sm">
                  <span className="text-emerald-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h4 className="flex items-center gap-2 text-blue-700 font-semibold border-b border-blue-100 pb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16a1 1 0 11-2 0V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.789l1.599.8L9 4.323V3a1 1 0 011-1z" />
              </svg>
              Exercise Plan
            </h4>
            <ul className="space-y-2">
              {analysis.exerciseAdvice.map((item, i) => (
                <li key={i} className="flex gap-2 text-slate-600 text-sm">
                  <span className="text-blue-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl space-y-4">
          <h4 className="text-slate-800 font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            General Health Tips
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analysis.healthTips.map((tip, i) => (
              <div key={i} className="bg-white p-3 rounded-lg text-sm text-slate-600 border border-slate-100 flex items-start gap-2 shadow-sm">
                <span className="text-amber-500 font-bold">#</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
