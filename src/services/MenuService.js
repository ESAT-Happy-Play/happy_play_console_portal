import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const MenuService = {
    getSecrityGroupeMenu: async (userType, companyId = 0) => {
        
        let url = (companyId === 0) 
            ? `${process.env.REACT_APP_GATEWAY_URL}/api/Menu/securitygroup?UserTypeId=${userType}`
            : `${process.env.REACT_APP_GATEWAY_URL}/api/Menu/securitygroup?UserTypeId=${userType}&CompanyId=${companyId}`
        
        return ApiService.get(url)
        .then((res) => {
            if (!res.status) { 
                toast.error("Something went wrong. Please try again."); 
                return false; 
            }
            return res;
        })
    }
}