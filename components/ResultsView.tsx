import React from 'react';
import { AIAnalysisResponse, SchemeRecommendation } from '../types';
import { Shield, AlertTriangle, CheckCircle2, RotateCcw, BrainCircuit, Info } from 'lucide-react';

interface ResultsViewProps {
  analysis: AIAnalysisResponse;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ analysis, onReset }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* 1. Profile Summary */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50"></div>
        <h2 className="text-xl font-bold text-slate-800 mb-3">Your Profile Summary</h2>
        <p className="text-slate-700 leading-relaxed text-lg font-light">
          {analysis.userProfileSummary}
        </p>
      </section>

      {/* 2. Suitability Analysis Narrative */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800">
          <Shield className="text-blue-600" size={24} />
          <h2 className="text-2xl font-bold">Our Analysis</h2>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-700 leading-relaxed">
          {analysis.suitabilityNarrative}
        </div>
      </section>

      {/* 3. Ranked Recommendations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Top Recommendations</h2>
        <div className="grid grid-cols-1 gap-6">
          {analysis.recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      </section>

      {/* NEW: Reasoning Summary */}
      <section className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3 text-indigo-700">
          <BrainCircuit size={20} />
          <h3 className="font-bold text-lg">How we looked at your details</h3>
        </div>
        <p className="text-slate-700 leading-relaxed">
          {analysis.aiReasoningSummary}
        </p>
        <p className="text-xs text-slate-400 mt-2 italic">
          * This is based on a quick check of your info, not a full professional review.
        </p>
      </section>

      {/* 4. Risks & Limitations Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
          <div className="flex items-center gap-2 mb-3 text-amber-800">
            <AlertTriangle size={20} />
            <h3 className="font-bold">Things to watch out for</h3>
          </div>
          <p className="text-amber-900/80 text-sm leading-relaxed">
            {analysis.riskAnalysis}
          </p>
        </div>
        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-3 text-slate-700">
            <CheckCircle2 size={20} />
            <h3 className="font-bold">Important notes</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {analysis.limitations}
          </p>
        </div>
      </section>

      {/* 5. Final Advice */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-3 opacity-90">Our Advice</h3>
        <p className="text-blue-50 leading-relaxed text-lg">
          {analysis.finalAdvice}
        </p>
      </section>

      {/* Footer / Disclaimer */}
      <div className="text-center text-xs text-slate-400 max-w-2xl mx-auto pt-4 space-y-1">
        <p className="font-semibold">Safety Notice</p>
        <p>
          MedCover is a student project and does not provide medical advice. 
          We don't save your personal data. 
          Always verify eligibility with the official scheme providers.
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100 font-medium"
        >
          <RotateCcw size={18} />
          Start Over
        </button>
      </div>
    </div>
  );
};

const RecommendationCard: React.FC<{ recommendation: SchemeRecommendation }> = ({ recommendation }) => {
  // Determine color theme based on scheme type
  const theme = {
    Government: 'bg-emerald-50 border-emerald-200 text-emerald-800 badge-emerald',
    Private: 'bg-purple-50 border-purple-200 text-purple-800 badge-purple',
    Hybrid: 'bg-blue-50 border-blue-200 text-blue-800 badge-blue',
  }[recommendation.type] || 'bg-slate-50 border-slate-200 text-slate-800';

  const badgeColor = {
    Government: 'bg-emerald-100 text-emerald-800',
    Private: 'bg-purple-100 text-purple-800',
    Hybrid: 'bg-blue-100 text-blue-800',
  }[recommendation.type];

  const suitabilityPercentage = recommendation.suitabilityScore;
  
  // Circle geometry for r=28
  const radius = 28;
  const circumference = 2 * Math.PI * radius; // ~175.9
  const offset = circumference - (suitabilityPercentage / 100) * circumference;

  return (
    <div className={`rounded-xl border shadow-sm p-6 transition-all hover:shadow-md ${theme.split(' ')[0]} ${theme.split(' ')[1]}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${badgeColor}`}>
              {recommendation.type}
            </span>
            <span className="text-xs font-semibold text-slate-500">Confidence: {recommendation.confidenceLevel}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">{recommendation.name}</h3>
        </div>
        
        {/* Suitability Score Visualization */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-3 bg-white/60 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/50">
            <div className="text-xs text-slate-500 uppercase font-bold text-right mr-1">Fit<br/>Score</div>
            <div className="relative flex items-center justify-center w-16 h-16">
               <svg className="w-full h-full transform -rotate-90">
                 {/* Background Circle */}
                 <circle 
                  cx="32" cy="32" r={radius} 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  fill="transparent" 
                  className="text-slate-200" 
                 />
                 {/* Progress Circle */}
                 <circle 
                  cx="32" cy="32" r={radius} 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  fill="transparent" 
                  className="text-current" 
                  strokeLinecap="round"
                  strokeDasharray={circumference} 
                  strokeDashoffset={offset}
                 />
               </svg>
               <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-800">
                 {suitabilityPercentage}%
               </span>
            </div>
          </div>
          {/* Feature B: Confidence Explanation */}
          <div className="flex items-center gap-1 text-[10px] text-slate-500 opacity-75">
            <Info size={10} />
            <span>Score is just an estimate based on your info.</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div>
          {/* Feature C: Explainability Layer */}
          <h4 className="text-sm font-bold opacity-70 uppercase tracking-wider mb-2 flex items-center gap-1">
            Why this was suggested
          </h4>
          <p className="text-sm leading-relaxed opacity-90">{recommendation.reasoning}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold opacity-70 uppercase tracking-wider mb-2">Trade-offs</h4>
          <p className="text-sm leading-relaxed italic opacity-80 border-l-2 border-current pl-3">
            {recommendation.tradeOffs}
          </p>
        </div>
      </div>
    </div>
  );
};