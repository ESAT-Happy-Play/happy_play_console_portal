export const UserModel = {
    ApproveForm: {
        accountInfoId: "",
        userTypeId: "",
        commission: ""
    },
    DeclineForm: {
        AccountInfoId: ""
    },
    OperatorForm: {
        branchId: "",
        region: "",
        province: "",
        municipality: "",
        barangay: "",
        streetOrPurok: "",
        // Step 2
        firstName: "",
        lastName: "",
        middleName: "",
        email: "", //
        gender: "",
        martialStatus: "",
        birthDate: "",
        contactNumber: ""
    },
    MasterAgetForm: {
        companyId: "",
        branchId: "",
        region: "",
        province: "",
        municipality: "",
        barangay: "",
        streetOrPurok: "",
        // Step 2
        firstName: "",
        lastName: "",
        middleName: "",
        email: "", //
        gender: "",
        martialStatus: "",
        birthDate: "",
        contactNumber: "",
        commision: ""
    },
    AccountInfoForm: {
        FirstName: "",
        LastName: "",
        MiddleName: "",
        Email: "",
        Age: "",
        Gender: "",
        MartialStatus: "",
        BloodType: "",
        Nationality: "",
        NatureOfWork: "",
        SourceOfIncome: "",
        BirthDate: "",
        MobileNumber: ""
    },
    UpdateAccountInfoForm: {
        accountObjectId: "",
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        age: "",
        gender: "",
        martialStatus: "",
        bloodType: "",
        nationality: "",
        natureOfWork: "",
        sourceOfIncome: "",
        birthDate: "",
        mobileNumber: "",

        region: "",
        province: "",
        municipality: "",
        barangay: "",
        streetOrPurok: "",

        permanentRegion: "",
        permanentProvince: "",
        permanentMunicipality: "",
        permanentBarangay: "",
        permanentStreetOrPurok: ""
    },
    RegistrationForm: {
        referralCode: "",
        firstName: "",
        lastName: "",
        middleName: "",
        mobileNumber: "",
        checkAge: "",
        checkNationality: "",
        checkTerm: ""
    },
    ResetPasswordForm: {
        userId: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    }
}