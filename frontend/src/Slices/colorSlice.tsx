import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IColor {
  id: string;
  name: string;
  createdAt: string;
}
[];

interface IInitialState {
  color: IColor | [];
}

const initialState: IInitialState = {
  color: [],
};

const colorStoreSlice = createSlice({
  name: 'Color-store-slice',
  initialState,
  reducers: {
    getColor: (state, action: PayloadAction<IColor>) => {
      state.color = action.payload;
    },
  },
});

export const { getColor } = colorStoreSlice.actions;

export default colorStoreSlice.reducer;
