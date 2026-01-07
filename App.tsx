
import React, { useState, useCallback } from 'react';
import { UserStats, Gender, ActivityLevel, CalculationResult, AIAnalysis } from './types';
import { ACTIVITY_MULTIPLIERS, getBmiCategory } from './constants';
import BmrForm from './components/BmrForm';
import ResultCards from './components/ResultCards';
import AnalysisDisplay from './components/AnalysisDisplay';
import { getAIHealthAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>({
    age: 30,
    height: 175,
    weight: 70,
    gender: Gender.MALE,
    activityLevel: ActivityLevel.MODERATE
  });

  const [results, setResults] = useState<CalculationResult | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateResults = useCallback(() => {
    const { age, height, weight, gender, activityLevel } = stats;

    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === Gender.MALE) {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];
    const bmi = weight / ((height / 100) ** 2);
    const bmiCategory = getBmiCategory(bmi);

    return { bmr, tdee, bmi, bmiCategory };
  }, [stats]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const calcResults = calculateResults();
      setResults(calcResults);
      
      const aiResponse = await getAIHealthAnalysis(stats, calcResults);
      setAnalysis(aiResponse);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating the analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">AI Health Analyzer</h1>
              <p className="text-xs text-slate-500 font-medium">Personalized BMR & Metabolism Insights</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Calculate your stats</h2>
              <p className="text-slate-500">Enter your details below to get a breakdown of your metabolic rate and calorie needs.</p>
            </div>
            <BmrForm
              stats={stats}
              onChange={setStats}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
          </div>

          {/* Right Column: Results & Analysis */}
          <div className="lg:col-span-7 space-y-8">
            {!results && !isLoading && (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-400">No results to show yet</h3>
                <p className="text-slate-400 max-w-xs">Fill out the form and click analyze to see your metabolic health breakdown.</p>
              </div>
            )}

            {results && <ResultCards results={results} />}
            {analysis && <AnalysisDisplay analysis={analysis} />}

            {isLoading && !analysis && (
              <div className="space-y-6 animate-pulse">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-32 bg-slate-200 rounded-2xl"></div>
                  <div className="h-32 bg-slate-200 rounded-2xl"></div>
                  <div className="h-32 bg-slate-200 rounded-2xl"></div>
                </div>
                <div className="h-96 bg-slate-200 rounded-2xl"></div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center text-slate-500 text-sm">
          <p>© 2024 AI Health Analyzer. This tool provides information based on general metabolic formulas and AI analysis. Please consult a medical professional for personalized health advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
