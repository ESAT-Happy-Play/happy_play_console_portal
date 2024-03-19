import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const initialState = {
    success: "",
    data: {},
    errorMessage: ""
};

export const AccountStateReducer = createSlice({
  name: "accountState",
  initialState,
  reducers: {
    setAccountState: (state, action) => {
        const { success, data, errorMessage } = action.payload;

        state.success = success;
        state.data = data;
        state.errorMessage = errorMessage;

        const accountInfo = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
        localStorage.setItem("accountInfo", accountInfo)
    },
    removeAccountState: (state) => {
        state.success = "";
        state.data = {};
        state.errorMessage = "";

        localStorage.removeItem("accountInfo")
    }
  }
});

export const { setAccountState, removeAccountState } = AccountStateReducer.actions;

export default AccountStateReducer.reducer;