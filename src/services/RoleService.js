import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const RoleService = {
    getRoles: async (companyId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/roles/${companyId}`)
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
    getRolesByGroupType: async (data) => {
        // {
        //     "groupType": 0,
        //     "companyId": 0
        // }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/roles/grouptype`, data)
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