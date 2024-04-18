import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const AuthReducer = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        accountObjectId: null,
        idNumber: null,
        userName: null,
        token: null,
        clientId: null,
        expirationDate: null,
        status: null,
        groupType: null,
        roleType: null,
        fullname: null,
        companyId: null,
        branchId: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { id, accountObjectId, idNumber, userName, token, clientId, expirationDate, status, groupType, roleType, fullname, companyId, branchId } = action.payload;

            state.id = id;
            state.accountObjectId = accountObjectId;
            state.idNumber = idNumber;
            state.userName = userName;
            state.token = token;
            state.clientId = clientId;
            state.expirationDate = expirationDate;
            state.status = status;
            state.groupType = groupType;
            state.roleType = roleType;
            state.fullname = fullname;
            state.branchId = branchId;
            state.companyId = companyId;

            const authdata = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
            localStorage.setItem("auth", authdata)
        },
        logOut: (state) => {
            state.id = null;
            state.accountObjectId = null;
            state.idNumber = null;
            state.userName = null;
            state.token = null;
            state.clientId = null;
            state.expirationDate = null;
            state.status = null;
            state.groupType = null;
            state.roleType = null;
            state.fullname = null;
            state.branchId = null;
            state.companyId = null;

            localStorage.removeItem("auth")
        }
    },
})

export const { setCredentials, logOut } = AuthReducer.actions

export default AuthReducer.reducer