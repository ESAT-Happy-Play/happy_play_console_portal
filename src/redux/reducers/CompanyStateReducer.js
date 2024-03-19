import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const initialState = {
    success: "",
    data: {},
    errorMessage: ""
};

export const CompanyStateReducer = createSlice({
  name: "companyState",
  initialState,
  reducers: {
    setCompanyState: (state, action) => {
        const { success, data, errorMessage } = action.payload;

        state.success = success;
        state.data = data;
        state.errorMessage = errorMessage;

        const companyInfo = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
        localStorage.setItem("cmpInfo", companyInfo)
    },
    removeCompanyState: (state) => {
        state.success = "";
        state.data = {};
        state.errorMessage = "";

        localStorage.removeItem("cmpInfo")
    }
  }
});

export const { setCompanyState, removeCompanyState } = CompanyStateReducer.actions;

export default CompanyStateReducer.reducer;