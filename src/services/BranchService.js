import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const BranchService = {
    getPaginateBranch: async (keyword, pageNum, pageSize) => {
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
            return res;
        })
    },
    getBranchDetails: async (companyId) => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Company/${companyId}`)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    },
    addBranch: async (formData) => {
        let data = {
            companyName: "",
            branchName: "",
            details: {
                firstName: "",
                lastName: "",
                middleName: "",
                email: "",
                gender: "",
                martialStatus: "",
                birthDate: "",
                contactNumber: "",
                region: "",
                province: "",
                municipality: "",
                barangay: "",
                streetOrPurok: "",
                permanentRegion: "",
                permanentProvince: "",
                permanentMunicipality: "",
                permanentBarangay: "",
                permanentStreetOrPurok: ""
            }
        }
        return await ApiService.put(`${process.env.REACT_APP_GATEWAY_URL}/api/Company`, data)
        .then((res) => {
            if (!res.status) { 
                toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res;
        })
    }
}