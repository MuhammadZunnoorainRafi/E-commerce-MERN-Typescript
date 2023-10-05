import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TSize = {
  id: string;
  name: string;
  createdAt: string;
}[];

interface TInitialState {
  size: TSize | [];
}

const initialState: TInitialState = {
  size: localStorage.getItem('sizes')
    ? JSON.parse(localStorage.getItem('sizes')!)
    : [],
};

const sizeSlice = createSlice({
  name: 'sizeSlice',
  initialState,
  reducers: {
    getSize: (state, action: PayloadAction<TSize>) => {
      state.size = action.payload;
      localStorage.setItem('sizes', JSON.stringify(action.payload));
    },
  },
});

export const { getSize } = sizeSlice.actions;

export default sizeSlice.reducer;
