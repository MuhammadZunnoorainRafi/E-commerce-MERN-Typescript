import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ISize {
  id: string;
  name: string;
  createdAt: string;
}
[];

interface IInitialState {
  size: ISize | [];
}

const initialState: IInitialState = {
  size: [],
};

const sizeSlice = createSlice({
  name: 'sizeSlice',
  initialState,
  reducers: {
    getSize: (state, action: PayloadAction<ISize>) => {
      state.size = action.payload;
    },
  },
});

export const { getSize } = sizeSlice.actions;

export default sizeSlice.reducer;
