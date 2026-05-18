import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PredictionState {
  businessType: string;
  capital: number;
  country: string;
  targetAudience: string;
  competitors: number;
  avgPricing: number;
  marketingBudget: number;
  description: string;
  
  // Results
  successScore: number | null;
  weakPoints: string[];
  riskAnalysis: string;
  recommendations: string[];
  
  isAnalyzing: boolean;
}

const initialState: PredictionState = {
  businessType: '',
  capital: 0,
  country: '',
  targetAudience: '',
  competitors: 0,
  avgPricing: 0,
  marketingBudget: 0,
  description: '',
  successScore: null,
  weakPoints: [],
  riskAnalysis: '',
  recommendations: [],
  isAnalyzing: false,
};

export const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<PredictionState>>) => {
      return { ...state, ...action.payload };
    },
    setAnalyzing: (state, action: PayloadAction<boolean>) => {
      state.isAnalyzing = action.payload;
    },
    setResults: (state, action: PayloadAction<{successScore: number, weakPoints: string[], riskAnalysis: string, recommendations: string[]}>) => {
      state.successScore = action.payload.successScore;
      state.weakPoints = action.payload.weakPoints;
      state.riskAnalysis = action.payload.riskAnalysis;
      state.recommendations = action.payload.recommendations;
    },
    resetForm: () => initialState,
  },
});

export const { setFormData, setAnalyzing, setResults, resetForm } = predictionSlice.actions;

export default predictionSlice.reducer;
