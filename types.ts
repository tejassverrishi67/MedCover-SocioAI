export enum CoveragePreference {
  BALANCED = "Balanced",
  COST_FOCUS = "Lower Cost / Basic Coverage",
  COVERAGE_FOCUS = "Comprehensive Coverage / Higher Cost"
}

export interface UserProfile {
  age: number;
  income: number;
  currency: string;
  location: string;
  conditions: string; // Comma separated or description
  dependents: number;
  medicalHistory: string;
  preference: CoveragePreference;
}

export interface SchemeRecommendation {
  id: string;
  name: string;
  type: 'Government' | 'Private' | 'Hybrid';
  suitabilityScore: number; // 0 to 100
  confidenceLevel: 'High' | 'Medium' | 'Low';
  reasoning: string;
  tradeOffs: string;
}

export interface AIAnalysisResponse {
  userProfileSummary: string;
  suitabilityNarrative: string;
  aiReasoningSummary: string; // New interpretive field
  recommendations: SchemeRecommendation[];
  riskAnalysis: string;
  limitations: string;
  finalAdvice: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}