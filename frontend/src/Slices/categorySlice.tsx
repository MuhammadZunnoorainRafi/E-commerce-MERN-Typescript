import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TCategory = {
  id: string;
  name: string;
  createdAt: string;
}[];

interface TInitialState {
  category: TCategory | [];
}

const initialState: TInitialState = {
  category: localStorage.getItem('categories')
    ? JSON.parse(localStorage.getItem('categories')!)
    : [],
};

const categoryStoreSlice = createSlice({
  name: 'Color-store-slice',
  initialState,
  reducers: {
    getCategory: (state, action: PayloadAction<TCategory>) => {
      state.category = action.payload;
      localStorage.setItem('categories', JSON.stringify(action.payload));
    },
  },
});

export const { getCategory } = categoryStoreSlice.actions;

export default categoryStoreSlice.reducer;
