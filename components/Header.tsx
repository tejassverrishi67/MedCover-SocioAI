import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Handcrafted Logo Container - Minimal, no background */}
          <div className="w-10 h-10 flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              {/* Top Arches - Saffron (Deep Orange for visibility on white) */}
              <path d="M12 8C10.5 5 7.5 4 5.5 4.5C3 5 2 7.5 2.5 10" stroke="#ea580c" />
              <path d="M12 8C13.5 5 16.5 4 18.5 4.5C21 5 22 7.5 21.5 10" stroke="#ea580c" />
              
              {/* Bottom Curves - Green (Deep Green) */}
              <path d="M2.5 10C3 14 8 18 12 20.5" stroke="#16a34a" />
              <path d="M21.5 10C21 14 16 18 12 20.5" stroke="#16a34a" />
              
              {/* Center Checkmark - Blue */}
              <path d="M9.5 12.5L11.5 14.5L15.5 9.5" stroke="#2563eb" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">MedCover</h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <span>Social Impact Project</span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">Student Beta</span>
        </div>
      </div>
    </header>
  );
};