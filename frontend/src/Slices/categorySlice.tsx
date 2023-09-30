import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICategory {
  id: string;
  name: string;
  createdAt: string;
}
[];

interface IInitialState {
  category: ICategory | [];
}

const initialState: IInitialState = {
  category: [],
};

const categoryStoreSlice = createSlice({
  name: 'Color-store-slice',
  initialState,
  reducers: {
    getCategory: (state, action: PayloadAction<ICategory>) => {
      state.category = action.payload;
    },
  },
});

export const { getCategory } = categoryStoreSlice.actions;

export default categoryStoreSlice.reducer;
