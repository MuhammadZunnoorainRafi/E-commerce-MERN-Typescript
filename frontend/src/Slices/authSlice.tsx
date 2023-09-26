import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    deleteUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { registerUser, loginUser, logoutUser, deleteUser, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
