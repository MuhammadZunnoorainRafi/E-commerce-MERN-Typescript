import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import colorSlice from './Slices/colorSlice';

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    colorReducer: colorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
