import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const OTPService = {
    generateOTP: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/otp/generate`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    generateLoginOTP: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/otp/generate/login`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    generateRegistrationOTP: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/otp/generate/registration`, data)
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
    verifyOTP: async (data) => {
        return await ApiService.put(`${process.env.REACT_APP_GATEWAY_URL}/api/otp/verifyOTP`, data)
        .then((res) => {
            return res;
        })
    }
}