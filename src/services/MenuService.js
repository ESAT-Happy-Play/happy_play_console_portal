import { toast } from 'react-toastify';
import ApiService from './ApiService';

const MenuService = {
    getSecrityGroupeMenu: async () => {
        return ApiService.get(`${process.env.REACT_APP_API_URL}/api/Menu/securitygroup?UserTypeId=1`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Something went wrong. Please try again."); 
                return false; 
            }
            return res;
        })
    }
}

export default MenuService; 