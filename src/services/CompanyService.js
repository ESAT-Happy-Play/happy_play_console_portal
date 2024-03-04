import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const CompanyService = {
    getPaginateCompany: async (keyword, pageNum, pageSize) => {
        let data = {
            pagedQuery: {
                search: keyword,
                pageNumber: pageNum,
                pageSize: pageSize,
                sortOrder: true
            }
        }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/Company/search`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    getCompanyDetails: async (companyId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Company/${companyId}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    addCompany: async (formData) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/Company`, formData)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    UpdateCompany: async (formData) => {
        return await ApiService.put(`${process.env.REACT_APP_GATEWAY_URL}/api/Company`, formData)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    }
}