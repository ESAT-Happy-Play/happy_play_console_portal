import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const initialState = {
  menuState: []
};

export const MenuStateReducer = createSlice({
  name: "menuState",
  initialState,
  reducers: {
    setMenuState: (state, action) => {
      state.menuState = action.payload;

      const userMenuList = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
      localStorage.setItem("menuList", userMenuList)
    },
    removeMenuState: (state) => {
      state.menuState = [];
      localStorage.removeItem("menuList")
    }
  }
});

export const { setMenuState, removeMenuState } = MenuStateReducer.actions;

export default MenuStateReducer.reducer;