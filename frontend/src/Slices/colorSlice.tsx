import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TColor = {
  id: string;
  name: string;
  createdAt: string;
}[];

interface TInitialState {
  color: TColor | [];
}

const initialState: TInitialState = {
  color: localStorage.getItem('colors')
    ? JSON.parse(localStorage.getItem('colors')!)
    : [],
};

const colorStoreSlice = createSlice({
  name: 'Color-store-slice',
  initialState,
  reducers: {
    getColor: (state, action: PayloadAction<TColor>) => {
      state.color = action.payload;
      localStorage.setItem('colors', JSON.stringify(action.payload));
    },
  },
});

export const { getColor } = colorStoreSlice.actions;

export default colorStoreSlice.reducer;
