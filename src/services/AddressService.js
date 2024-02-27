import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const AddressService = {
    getRegionProvinces: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Address/region`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res;
        })
    }
}