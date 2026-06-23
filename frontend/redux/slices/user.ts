import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  address?: string;
}

export interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loadUserStart(state) {
      state.loading = true;
      state.error = null;
    },

    loadUserSuccess(state, action: PayloadAction<IUser>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    loadUserFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      console.log(state.error);
    },
  },
});

export const { loadUserStart, loadUserFailed, loadUserSuccess } =
  userSlice.actions;

export default userSlice.reducer;
