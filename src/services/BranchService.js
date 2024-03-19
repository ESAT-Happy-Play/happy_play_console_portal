import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const BranchService = {
    getBranchByReferral: async (referralCode) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Branch/referral/${referralCode}`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res.data;
        })
    },
    getBranchByAddress: async (data) => {
        // "region": "string",
        // "province": "string",
        // "municipality": "string"
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/Branch/address`, data)
        .then((res) => {
            if (!res.status) {
                return false; 
            }
            return res.data;
        })
    },
    getPaginateBranch: async (keyword, pageNum, pageSize, companyGUID) => {
        let data = {
            companyId: companyGUID,
            pagedQuery: {
                search: keyword,
                pageNumber: pageNum,
                pageSize: pageSize,
                sortOrder: true
            }
        }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/branch/search`, data)
        .then((res) => {
            if (!res.status) {  
                return false; 
            }
            return res.data;
        })
    },
    getBranchDetails: async (branchId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/branch/${branchId}`)
        .then((res) => {
            if (!res.status) { 
                return false; 
            }
            return res.data;
        })
    },
    addBranch: async (formData) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/branch`, formData)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    },
    getBranchByCompany: async (formData) => {
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/branch/search/company`, formData)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    }
}