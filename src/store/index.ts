import { configureStore } from '@reduxjs/toolkit';
import predictionReducer from './predictionSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    prediction: predictionReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
