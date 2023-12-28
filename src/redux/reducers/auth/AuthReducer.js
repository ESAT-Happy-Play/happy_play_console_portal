import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const AuthReducer = createSlice({
    name: 'auth',
    initialState: {
        sessionToken: null,
        userCode: null,
        userId: null, 
        featureId: null,
        companyId: null,
        branchCode: null,
        displayName: null,
        email: null,
        mobileNumber: null,
        referralCode: null,
        creditBalance: null,
        commissionBalance: null,
        commissionPercentage: null,
        agentCount: null,
        playerCount: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { sessionToken, userCode, userId, featureId, companyId, branchCode, displayName ,
            email, mobileNumber, referralCode, creditBalance, commissionBalance, commissionPercentage,
            agentCount, playerCount } = action.payload;

            state.sessionToken = sessionToken;
            state.userCode = userCode;
            state.userId = userId; 
            state.featureId = featureId;
            state.companyId = companyId;
            state.branchCode = branchCode;
            state.displayName = displayName;
            state.email = email;
            state.mobileNumber = mobileNumber;
            state.referralCode = referralCode;
            state.creditBalance = creditBalance;
            state.commissionBalance = commissionBalance;
            state.commissionPercentage = commissionPercentage;
            state.agentCount = agentCount;
            state.playerCount = playerCount;

            const authdata = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
            localStorage.setItem("auth", authdata)
        },
        logOut: (state) => {
            state.sessionToken = null;
            state.userCode = null;
            state.userId = null; 
            state.featureId = null;
            state.companyId = null;
            state.branchCode = null;
            state.displayName = null;
            state.email = null;
            state.mobileNumber = null;
            state.referralCode = null;
            state.creditBalance = null;
            state.commissionBalance = null;
            state.commissionPercentage = null;
            state.agentCount = null;
            state.playerCount = null;

            localStorage.removeItem("auth")
        }
    },
})

export const { setCredentials, logOut } = AuthReducer.actions

export default AuthReducer.reducer