import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const AccountSettingService = {
    getSettings: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/AccountSetting`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    }
}