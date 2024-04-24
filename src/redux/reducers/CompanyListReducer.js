import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const initialState = {
    companyList: []
};

export const CompanyListReducer = createSlice({
  name: "companiesState",
  initialState,
  reducers: {
    setCompaniesState: (state, action) => {
        const { companyList } = action.payload;

        state.companyList = companyList;

        const companies = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
        localStorage.setItem("companyList", companies)
    },
    removeCompaniesState: (state) => {
        state.companyList = [];

        localStorage.removeItem("companyList")
    }
  }
});

export const { setCompaniesState, removeCompaniesState } = CompanyListReducer.actions;

export default CompanyListReducer.reducer;