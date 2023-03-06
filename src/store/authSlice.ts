import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import type { AppState } from './store';
import { IUser } from '@/utils/types';

export interface AuthState {
  authState: boolean;
  user: IUser;
}

const initialState: AuthState = {
  authState: false,
  user: {} as IUser,
};

/* eslint-disable no-param-reassign */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setUserState(state, action) {
      state.authState = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.auth,
    }),
  },
});

export const { setAuthState, setUserState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export const selectUser = (state: AppState) => state.auth.user;

export default authSlice.reducer;
