import { toast } from 'react-toastify';
import ApiService from './ApiService';

export const ImageService = {
    uploadBase64Image: async (base64image) => {
        // { "base64Image": "" }
        return await ApiService.post(`${process.env.REACT_APP_GATEWAY_URL}/api/Upload/base64image`,  { 
            base64Image: base64image
        }).then((res) => {
            if (!res.status) { 
                // toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    },
    getImage: async (fileName) => {
        // { "base64Image": "" }
        return await ApiService.get(`${process.env.REACT_APP_GATEWAY_URL}/api/Upload/${fileName}`)
        .then((res) => {
            if (!res.status) { 
                // toast.error("Sorry, unsuccessfull gateway communication."); 
                return false; 
            }
            return res.data;
        })
    }
}