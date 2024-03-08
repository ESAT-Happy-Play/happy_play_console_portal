import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const AccountService = {
    current: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Account/current`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    },
    updatePassword: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/Account/new/password`, data)
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