import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const initialState = {
  numberVerified: ""
};

export const OtpVerifiedStateReducer = createSlice({
  name: "numberVerified",
  initialState,
  reducers: {
    setNumberVerified: (state, action) => {
      state.numberVerified = action.payload;

      const otpVerified = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
      localStorage.setItem("isnumberverified", otpVerified)
    },
    removeNumberVerified: (state) => {
      state.numberVerified = [];
      localStorage.removeItem("isnumberverified")
    }
  }
});

export const { setNumberVerified, removeNumberVerified } = OtpVerifiedStateReducer.actions;

export default OtpVerifiedStateReducer.reducer;