import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const SupportService = {
    createTicket: async (data) => {
        // {
        //     title: data.title, description: data.description,
        //     owner: {
        //         userId: authdata.id, mobileNumber: "", firstName: "", 
        //         lastName: "", middleName: "", email: ""
        //     }, attachments: [{ fileName: "", content: null, fileType: null }]
        // }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/case`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                } else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    updateTicketOwner: async (data) => {
        // {
        //     "caseId": 5, "title": "string",
        //     "description": "string", "ticketDate": "2024-04-08T01:50:16.808Z",
        //     "attachments": [
        //         { "fileName": "string", "content": null, "fileType": null }
        //     ]
        // }
        return await ApiService.patch(`${process.env.REACT_APP_GATEWAY_URL}/api/case`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                } else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    searchTicket: async (data) => {
        // {
        //     caseId: "", title: "", owner: "",
        //     userId: "", status: null,
        //     importance: null, organizationId: null,
        //     startDate: null, endDate: null,
        //     pagedQuery: { index: 0, size: 1000 }
        // }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/case/search`, data)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                } else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    getStatuses: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/case/statuses`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                } else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    },
    getOrganizations: async () => {
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/case/organizations`)
        .then((res) => {
            if (!res.status) { 
                if(res.data.message === "Network Error") {
                    toast.error("Network Error - CONNECTION REFUSED"); 
                } else if (res.data.response.status === 400) {
                    toast.error(res.data.response.data.errorMessage); 
                } else {
                    toast.error("Sorry, unsuccessfull gateway communication."); 
                }
                return false; 
            }
            return res.data;
        })
    }
}