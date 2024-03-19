import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const MenuService = {
    getSecrityGroupeMenu: async (userType = '', companyId = '', groupId = '') => {

        return ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Menu/securitygroup?UserTypeId=${userType}&CompanyId=${companyId}&GroupId=${groupId}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Something went wrong. Please try again."); 
                return false; 
            }
            return res.data;
        })
    },
    getRoleByGroupType: async (groupTypeId) => {
        return ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Menu/grouptype?groupType=${groupTypeId}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Something went wrong. Please try again."); 
                return false; 
            }
            return res.data;
        })
    },
    addSecurityGroup: async (formData) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/menu/securitygroup`, formData)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    updateSecurityGroup: async (formData) => {
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/menu/securitygroup`, formData)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    }
}