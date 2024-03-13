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
    usersList: async (companyId, branchId, roleId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/user/list?CompanyId=${companyId}&BranchId=${branchId}&RoleId=${roleId}`)
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
    checkMobileExist: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/user/mobile/validate`, data)
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
    }
}