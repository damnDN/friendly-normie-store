import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Holds {_id, username, email, isAdmin}
  accessToken: null, // Stored purely in memory for top-tier security
  isAuthenticated: false,
  isHydrated: false, // Tracks if we have checked for an existing session yet
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.isHydrated = true;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isHydrated = true;
    },
    setHydrated: (state) => {
      state.isHydrated = true;
    },
  },
});

export const { setCredentials, logOut, setHydrated } = authSlice.actions;
export default authSlice.reducer;
