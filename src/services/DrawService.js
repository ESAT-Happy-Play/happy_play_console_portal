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
    getLatestDraw: async (companyGameId, drawResultType = 0) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/draw/reference/${companyGameId}/${drawResultType}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    getDrawResultHistory: async (companyGameId, magicResult = false) => {
        let data = {
            companyGameId: companyGameId,
            start_date: "",
            end_date: "",
            size: 5,
            start: 1,
            magicResult: magicResult
        }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/draw/result/list`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    getCurrentBetSchedule: async (companyGameId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/draw/current/bet/${companyGameId}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
}