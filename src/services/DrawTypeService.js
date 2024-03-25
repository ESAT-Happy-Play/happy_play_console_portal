import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const DrawTypeService = {
    getDrawTypes: async (companyId, gameId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/game/draw-types?companyId=${companyId}&gameId=${gameId}&includeIsDeleted=false`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    }
}