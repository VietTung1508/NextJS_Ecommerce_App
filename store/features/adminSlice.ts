import { Admin } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isFetching: false,
  token: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },

    loginFailure: (state) => {
      state.isFetching = false;
    },

    logout: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  adminSlice.actions;

export default adminSlice.reducer;
