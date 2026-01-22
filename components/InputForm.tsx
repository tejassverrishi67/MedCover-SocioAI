import React, { useState } from 'react';
import { UserProfile, CoveragePreference } from '../types';
import { ChevronRight, DollarSign, HeartPulse, Users, MapPin } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserProfile) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserProfile>({
    age: 30,
    income: 500000,
    currency: 'INR',
    location: '',
    conditions: '',
    medicalHistory: '',
    dependents: 0,
    preference: CoveragePreference.BALANCED,
  });

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 space-y-8">
        
        {/* Section 1: Demographics & Finance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <DollarSign className="w-5 h-5 text-blue-500" />
            Basic Details & Income
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Age</label>
              <input 
                type="number" 
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Annual Income (INR)</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-slate-500 font-bold">₹</span>
                 </div>
                <input 
                  type="number" 
                  value={formData.income}
                  onChange={(e) => handleChange('income', parseInt(e.target.value))}
                  className="w-full p-3 pl-8 bg-white text-slate-900 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                  required
                />
              </div>
            </div>
             <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Residence / Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g., Mumbai, Maharashtra or Bangalore, Karnataka"
                  className="w-full p-3 pl-10 bg-white text-slate-900 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                  required
                />
              </div>
              <p className="text-xs text-slate-500">Helps us find state-specific schemes.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Health Context */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            Health Information
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Existing Conditions (if any)</label>
              <input 
                type="text" 
                value={formData.conditions}
                onChange={(e) => handleChange('conditions', e.target.value)}
                placeholder="e.g., Diabetes Type 2, Hypertension, None"
                className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Medical History</label>
              <textarea 
                value={formData.medicalHistory}
                onChange={(e) => handleChange('medicalHistory', e.target.value)}
                placeholder="Brief history of surgeries, hospitalizations, or family history..."
                className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24 resize-none placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Dependents & Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Users className="w-5 h-5 text-emerald-500" />
            Family & Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Number of Dependents</label>
              <input 
                type="number" 
                min="0"
                value={formData.dependents}
                onChange={(e) => handleChange('dependents', parseInt(e.target.value))}
                className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">What's most important?</label>
              <select 
                value={formData.preference}
                onChange={(e) => handleChange('preference', e.target.value)}
                className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                {Object.values(CoveragePreference).map(pref => (
                  <option key={pref} value={pref}>{pref}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isLoading ? 'Checking...' : 'See Recommendations'}
          {!isLoading && <ChevronRight size={18} />}
        </button>
      </div>
    </form>
  );
};