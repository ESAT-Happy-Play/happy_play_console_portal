import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const UserService = {
    registerUser: async (data) => {
        let objData = { user: data }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/registration`, objData)
        .then((res) => {
            if (!res.status) { 
                if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    createSystemUser: async (roleId, data) => {
        let objData = { roleId: roleId, userModel: data }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/system/create`, objData)
        .then((res) => {
            if (!res.status) { 
                if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    systemUserInfo: async (userId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user/${userId}`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    usersList: async (companyId, branchId, roleId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user/list?CompanyId=${companyId}&BranchId=${branchId}&RoleId=${roleId}`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    checkMobileExist: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/mobile/validate`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    getUsersForApprove: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user/request/approval`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    approveUser: async (data) => {
        // {
            // Guid AccountInfoId
            // int UserTypeId
            // decimal? Commission
        // }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/approved`, data)
        .then((res) => {
            if (!res.status) { 
                if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    declinedUser: async (data) => {
        // {
            // Guid AccountObjectId
            // string Remarks
        // }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/declined`, data)
        .then((res) => {
            if (!res.status) { 
                if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    getUsersByObjectID: async (userAccountObjId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user/accountObjectId?AccountObjctId=${userAccountObjId}`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    getDownlineAgents: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user/downline/agents`)
        .then((res) => {
            console.log(res);
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    getDownlinePlayers: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user/downline/players`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    getDownlineCounts: async (accountObjectId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user/downline/counts/${accountObjectId}`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    updateProfileImage: async (fileName) => {
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/user/profile/image`, {
            profilePath: fileName
        })
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    updatePersonalDetails: async (data) => {
        // {
        //     firstName: "",
        //     lastName: "",
        //     middleName: "",
        //     gender: "",
        //     martialStatus: "",
        //     bloodType: "",   
        //     nationality: "",
        //     birthDate: "",
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/user/personal/details`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    updateProfileAddress: async (data) => {
        // {
        //     presentRegion: "",
        //     presentProvince: "",
        //     presentMunicipality: "",
        //     presentBarangay: "",
        //     presentStreetOrPurok: "",
        //     permanentRegion: "",   
        //     permanentProvince: "",
        //     permanentMunicipality: "",
        //     permanentBarangay: "",
        //     permanentStreetOrPurok: "",
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/user/address`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    updateProofInfo: async (data) => {
        // {
        //     natureOfWork: "",
        //     sourceOfIncome: "",
        //     validIdType: "",
        //     frontIdPath: "",
        //     selfiePath: ""
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/user/proof/info`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    updateAccountSetting: async (data) => {
        // {
        //     inAppNotification: "",
        //     smsNotification: "",
        //     emailNotification: "",
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/user/account/setting`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    getForVerificationData: async (data) => {
        // {
        //     "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     "dateFrom": "2024-04-13T18:32:17.521Z",
        //     "dateTo": "2024-04-13T18:32:17.521Z",
        //     "pagedQuery": {
        //         "search": "string",
        //         "pageNumber": 0,
        //         "pageSize": 0,
        //         "sortOrder": true
        //     }
        // }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/request/for-verifcation`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    approvedVerification: async (accountObjectId) => {
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/user/verified/${accountObjectId}`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    declinedVerification: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/verification/declined`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },

    getAgentPlayerList: async (data) => {
        // Player = 0 or other 
        // Master Agent = 1
        // Agent = 2
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/list/search`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                }
                else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
}