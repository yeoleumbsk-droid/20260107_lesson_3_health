
import React from 'react';
import { CalculationResult } from '../types';

interface ResultCardsProps {
  results: CalculationResult;
}

const ResultCards: React.FC<ResultCardsProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">BMR</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-800">{Math.round(results.bmr)}</span>
          <span className="text-slate-500 font-medium">kcal/day</span>
        </div>
        <p className="mt-2 text-xs text-slate-400">Calories burned at complete rest.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">TDEE</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-blue-600">{Math.round(results.tdee)}</span>
          <span className="text-slate-500 font-medium">kcal/day</span>
        </div>
        <p className="mt-2 text-xs text-slate-400">Total daily calorie expenditure.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">BMI</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-emerald-600">{results.bmi.toFixed(1)}</span>
        </div>
        <p className={`mt-2 text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${
          results.bmiCategory === 'Normal Weight' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
        }`}>
          {results.bmiCategory}
        </p>
      </div>
    </div>
  );
};

export default ResultCards;
