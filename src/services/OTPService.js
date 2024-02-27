import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const OTPService = {
    generateOTP: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/otp/generateOTP`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    },
    verifyOTP: async (data) => {
        return await ApiService.put(`${process.env.REACT_APP_GATEWAY_URL}/api/otp/verifyOTP`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, Invalid OTP."); 
                return false; 
            }
            return res;
        })
    }
}