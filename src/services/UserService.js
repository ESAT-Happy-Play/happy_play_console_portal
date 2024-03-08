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
    }
}