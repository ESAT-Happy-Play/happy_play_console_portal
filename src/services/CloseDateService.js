import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const CloseDateService = {
    getClosedDateByCompany: async (companyId, gameId, startDate, endDate) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/closed-dates?companyId=${companyId}&gameId=${gameId}&startDate=${startDate}&endDate=${endDate}&includeIsDeleted=false`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    }
}