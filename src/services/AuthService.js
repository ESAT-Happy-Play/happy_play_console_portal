import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const AuthService = {
    authenticate: async (data) => {
        return ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/Auth/account/login`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, we couldn't find an account with that username and password."); 
                return false; 
            }
            return res;
        })
    }
}