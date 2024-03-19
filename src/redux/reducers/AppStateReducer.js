import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appState: ""
};

export const AppStateReducer = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    removeAppState: (state) => {
      state.appState = "";
    }
  }
});

export const { setAppState, removeAppState } = AppStateReducer.actions;

export default AppStateReducer.reducer;