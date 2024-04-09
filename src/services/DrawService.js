import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const DrawService = {
    postDrawResult: async (data) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/draw/result`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    },
    getLatestDraw: async (companyGameId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/draw/reference/${companyGameId}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    }
}