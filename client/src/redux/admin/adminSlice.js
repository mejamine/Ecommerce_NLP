import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  signinError: null,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loddingStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.signinError = false;
    },
    signinFailed: (state, action) => {
      state.signinError = action.payload;
      state.loading = false;
    },
    userUpdateSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = false;
    },
    userUpdateFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Handle User Delete State
    userDeleteSuccess: (state) => {
      state.loading = false;
      state.currentAdmin = null;
      state.error = false;
    },
    userDeleteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Handle Sign Out
    signoutSuccess: (state) => {
      state.loading = false;
      state.currentAdmin = null;
      state.error = false;
    },
    signoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loddingStart,
  signinSuccess,
  signinFailed,
  userUpdateFailed,
  userUpdateSuccess,
  userDeleteSuccess,
  userDeleteFail,
  signoutSuccess,
  signoutFailed,
} = adminSlice.actions;

export default adminSlice.reducer;
