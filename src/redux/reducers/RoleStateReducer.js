import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const initialState = {
  roleState: null
};

export const RoleStateReducer = createSlice({
  name: "roleState",
  initialState,
  reducers: {
    setRoleState: (state, action) => {
      const { role } = action.payload;
      state.roleState = role;

      const userRole = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
      localStorage.setItem("role", userRole)
    },
    removeRoleState: (state) => {
      state.roleState = null;
      localStorage.removeItem("role")
    }
  }
});

export const { setRoleState, removeRoleState } = RoleStateReducer.actions;

export default RoleStateReducer.reducer;