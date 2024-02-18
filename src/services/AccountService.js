import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const AccountService = {
    current: async () => {
        return ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Account/current`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    }
}