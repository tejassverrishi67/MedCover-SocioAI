import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsView } from './components/ResultsView';
import { ChatBot } from './components/ChatBot';
import { UserProfile, AIAnalysisResponse } from './types';
import { analyzeProfile } from './services/geminiService';
import { Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentStep, setCurrentStep] = useState<'input' | 'analyzing' | 'results'>('input');

  const handleAnalysis = async (profile: UserProfile) => {
    setLoading(true);
    setError(null);
    setCurrentStep('analyzing');
    setUserProfile(profile); // Store profile for ChatBot context
    
    try {
      const result = await analyzeProfile(profile);
      setAnalysis(result);
      setCurrentStep('results');
    } catch (err) {
      console.error(err);
      setError("We ran into a small issue analyzing your info. Please try again.");
      setCurrentStep('input');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setCurrentStep('input');
    // We keep userProfile to allow chatbot to remember last context until new input
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {currentStep === 'input' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Find Health Coverage</h2>
              <p className="text-slate-600 text-lg">
                We look at your income, health history, and family needs to suggest the best coverage options for you.
              </p>
            </div>
            <InputForm onSubmit={handleAnalysis} isLoading={loading} />
            {error && (
              <div className="max-w-xl mx-auto mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50"></div>
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin relative z-10" />
            </div>
            <h3 className="mt-8 text-2xl font-semibold text-slate-800">Analyzing your info...</h3>
            <p className="mt-2 text-slate-500 max-w-md text-center">
              Checking affordability and health needs to find matches...
            </p>
          </div>
        )}

        {currentStep === 'results' && analysis && (
          <ResultsView analysis={analysis} onReset={handleReset} />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 flex items-center justify-center text-slate-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                {/* Monochrome Symbol */}
                <path d="M12 8C10.5 5 7.5 4 5.5 4.5C3 5 2 7.5 2.5 10" stroke="currentColor" />
                <path d="M12 8C13.5 5 16.5 4 18.5 4.5C21 5 22 7.5 21.5 10" stroke="currentColor" />
                <path d="M2.5 10C3 14 8 18 12 20.5" stroke="currentColor" />
                <path d="M21.5 10C21 14 16 18 12 20.5" stroke="currentColor" />
                <path d="M9.5 12.5L11.5 14.5L15.5 9.5" stroke="currentColor" />
              </svg>
            </div>
            <span className="font-semibold text-slate-700">MedCover</span>
          </div>
          <p>
            These are just suggestions based on your data. Always check with the actual providers.
          </p>
        </div>
      </footer>
      
      {/* Pass context to ChatBot */}
      <ChatBot userProfile={userProfile} analysis={analysis} />
    </div>
  );
};

export default App;