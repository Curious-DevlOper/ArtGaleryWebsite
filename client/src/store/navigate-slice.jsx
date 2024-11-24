// navigation-slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialNavigationState = {
  currentRoute: "/", // Tracks the current route
  redirect: null,    // Stores the path to redirect
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: initialNavigationState,
  reducers: {
    // Sets the current route and clears any pending redirects
    setRoute(state, action) {
      state.currentRoute = action.payload.route;
      state.redirect = null; // Clear any pending redirects
    },

    // Sets the redirect route
    setRedirect(state, action) {
      state.redirect = action.payload.route; // Set a route to redirect
    },

    // Clears the redirect route
    clearRedirect(state) {
      state.redirect = null; // Clear redirect after use
    },
  },
});

export const navigationActions = navigationSlice.actions;

export default navigationSlice;
