import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStore {
  name: string | null;
  userId: string | null;
}

interface IInitialState {
  store: IStore;
}

const initialState: IInitialState = {
  store: {
    name: null,
    userId: null,
  },
};

const adminStoreSlice = createSlice({
  name: 'Admin-store-slice',
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<IStore>) => {
      state.store = action.payload;
    },
  },
});

export const { setStore } = adminStoreSlice.actions;

export default adminStoreSlice.reducer;
