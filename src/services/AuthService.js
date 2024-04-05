import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const AuthService = {
    authenticate: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/Account/auth`, data)
            .then((res) => {
                if (!res.status) {
                    // console.log(res.data.response.data);
                    toast.error("Sorry, we couldn't find an account with that username and password.");
                    return false;
                }
                return res.data;
            })
    }
}