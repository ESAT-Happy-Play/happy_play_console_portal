import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

const initialState = {
    accountInfoId: "",
    accountObjectId: "",
    userId: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    gender: "",
    martialStatus: "",
    bloodType: "",
    nationality: "",
    natureOfWork: "",
    sourceOfIncome: "",
    birthDate: "",
    mobileNumber: "",
    userTypeId: "",
    isMain: "",
    refferralKey: "",
    accountStatusId: "",
    refferralCode: "",
    validId: "",
    frontIdPath: "",
    backIdPath: "",
    signaturePath: "",
    profilePath: "",
    selfiePath: "",
    isVerified: "",
    lastSetPassword: "",
    region: "",
    province: "",
    municipality: "",
    barangay: "",
    streetOrPurok: "",
    presentRegion: "",
    presentProvince: "",
    presentMunicipality: "",
    presentBarangay: "",
    presentStreetOrPurok: "",
    permanentRegion: "",
    permanentProvince: "",
    permanentMunicipality: "",
    permanentBarangay: "",
    permanentStreetOrPurok: "",
    branchId: "",
    branchName: "",
    companyId: "",
    companyName: ""
};

export const AccountStateReducer = createSlice({
  name: "accountState",
  initialState,
  reducers: {
    setAccountState: (state, action) => {
        const { accountInfoId, accountObjectId, userId, firstName, lastName, middleName, email, gender,
            martialStatus, bloodType, nationality, natureOfWork, sourceOfIncome, birthDate, mobileNumber,
            userTypeId, isMain, refferralKey, accountStatusId, refferralCode, validId, frontIdPath,
            backIdPath, signaturePath, profilePath, selfiePath, isVerified, lastSetPassword, region,
            province, municipality, barangay, streetOrPurok, presentRegion, presentProvince, presentMunicipality,
            presentBarangay, presentStreetOrPurok, permanentRegion, permanentProvince, permanentMunicipality,
            permanentBarangay, permanentStreetOrPurok, branchId, branchName, companyId, companyName } = action.payload;

        state.accountInfoId = accountInfoId;
        state.accountObjectId = accountObjectId;
        state.userId = userId;
        state.firstName = firstName;
        state.lastName = lastName;
        state.middleName = middleName;
        state.email = email;
        state.gender = gender;
        state.martialStatus = martialStatus;
        state.bloodType = bloodType;
        state.nationality = nationality;
        state.natureOfWork = natureOfWork;
        state.sourceOfIncome = sourceOfIncome;
        state.birthDate = birthDate;
        state.mobileNumber = mobileNumber;
        state.userTypeId = userTypeId;
        state.isMain = isMain;
        state.refferralKey = refferralKey;
        state.accountStatusId = accountStatusId;
        state.refferralCode = refferralCode;
        state.validId = validId;
        state.frontIdPath = frontIdPath;
        state.backIdPath = backIdPath;
        state.signaturePath = signaturePath;
        state.profilePath = profilePath;
        state.selfiePath = selfiePath;
        state.isVerified = isVerified;
        state.lastSetPassword = lastSetPassword;
        state.region = region;
        state.province = province;
        state.municipality = municipality;
        state.barangay = barangay;
        state.streetOrPurok = streetOrPurok;
        state.presentRegion = presentRegion;
        state.presentProvince = presentProvince;
        state.presentMunicipality = presentMunicipality;
        state.presentBarangay = presentBarangay;
        state.presentStreetOrPurok = presentStreetOrPurok;
        state.permanentRegion = permanentRegion;
        state.permanentProvince = permanentProvince;
        state.permanentMunicipality = permanentMunicipality;
        state.permanentBarangay = permanentBarangay;
        state.permanentStreetOrPurok = permanentStreetOrPurok;
        state.branchId = branchId;
        state.branchName = branchName;
        state.companyId = companyId;
        state.companyName = companyName;

        const accountInfo = CryptoJS.AES.encrypt(JSON.stringify(action.payload), process.env.REACT_APP_SECRET_PASS).toString();
        localStorage.setItem("accountInfo", accountInfo)
    },
    removeAccountState: (state) => {
        state.accountInfoId = "";
        state.accountObjectId = "";
        state.userId = "";
        state.firstName = "";
        state.lastName = "";
        state.middleName = "";
        state.email = "";
        state.gender = "";
        state.martialStatus = "";
        state.bloodType = "";
        state.nationality = "";
        state.natureOfWork = "";
        state.sourceOfIncome = "";
        state.birthDate = "";
        state.mobileNumber = "";
        state.userTypeId = "";
        state.isMain = "";
        state.refferralKey = "";
        state.accountStatusId = "";
        state.refferralCode = "";
        state.validId = "";
        state.frontIdPath = "";
        state.backIdPath = "";
        state.signaturePath = "";
        state.profilePath = "";
        state.selfiePath = "";
        state.isVerified = "";
        state.lastSetPassword = "";
        state.region = "";
        state.province = "";
        state.municipality = "";
        state.barangay = "";
        state.streetOrPurok = "";
        state.presentRegion = "";
        state.presentProvince = "";
        state.presentMunicipality = "";
        state.presentBarangay = "";
        state.presentStreetOrPurok = "";
        state.permanentRegion = "";
        state.permanentProvince = "";
        state.permanentMunicipality = "";
        state.permanentBarangay = "";
        state.permanentStreetOrPurok = "";
        state.branchId = "";
        state.branchName = "";
        state.companyId = "";
        state.companyName = "";

        localStorage.removeItem("accountInfo")
    }
  }
});

export const { setAccountState, removeAccountState } = AccountStateReducer.actions;

export default AccountStateReducer.reducer;