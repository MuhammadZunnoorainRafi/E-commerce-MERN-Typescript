import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  token: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: Cookie.get('user') ? JSON.parse(Cookie.get('user')!) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      Cookie.set('user', JSON.stringify(action.payload), { expires: 5 });
    },
    loginUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      Cookie.set('user', JSON.stringify(action.payload), { expires: 5 });
    },
    logoutUser: (state) => {
      state.user = null;
      Cookie.remove('user');
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      Cookie.set('user', JSON.stringify(action.payload), { expires: 5 });
    },
    deleteUser: (state) => {
      state.user = null;
      Cookie.remove('user');
    },
  },
});

export const { registerUser, loginUser, logoutUser, deleteUser, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
