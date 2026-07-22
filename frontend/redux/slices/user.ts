import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface IAddress {
  _id: string;
  country: string;
  city: string;
  address1: string;
  address2: string;
  zipCode: string;
  addressType: "Home" | "Office" | "Default";
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  addresses?: IAddress[];
  phoneNumber: string;
  isVerified: boolean;
  role: "admin" | "user";
}

export interface UserState {
  user: IUser | null;
  loading: boolean;
  profileLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  profileLoading: false,
  error: null,
  isAuthenticated: false,
  initialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    // When login add user to store
    addUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.initialized = true;
    },

    loadUserStart(state) {
      state.loading = true;
      state.error = null;
      state.initialized = false;
    },

    loadUserSuccess(state, action: PayloadAction<IUser>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.initialized = true;
    },

    loadUserFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.initialized = true;
    },

    // For Avatar update
    updateProfileAvatarStart(state) {
      state.loading = true;
    },
    updateProfileAvatarSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    updateProfileAvatarFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // For Name and PhoneNumber
    updateProfileStart(state) {
      state.profileLoading = true;
    },
    updateProfileSuccess(state, action) {
      state.profileLoading = false;
      state.user = action.payload;
      toast.success("Profile Updated successfully");
    },
    updateProfileFailure(state, action) {
      state.profileLoading = false;
      state.error = action.payload;
      toast.error(state.error);
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  addUser,
  loadUserStart,
  loadUserSuccess,
  loadUserFailed,
  updateProfileAvatarStart,
  updateProfileAvatarSuccess,
  updateProfileAvatarFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
