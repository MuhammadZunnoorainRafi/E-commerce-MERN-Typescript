import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import sizeSlice from './Slices/sizeSlice';
import colorSlice from './Slices/colorSlice';
import categorySlice from './Slices/categorySlice';

export const store = configureStore({
  reducer: {
    authReducer: authSlice,
    sizeReducer: sizeSlice,
    colorReducer: colorSlice,
    categoryReducer: categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
