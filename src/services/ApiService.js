import axios from 'axios';
import { RequestHeader } from './RequestHeader';

const ApiService = { 
    get: async (URL) => {
        let objdata = { status: true, data: null };
        await axios.get(URL, {
            headers: RequestHeader()
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    },
    post: async (URL, DATA) => {
        let objdata = { status: true, data: null };
        await axios.post(URL, DATA, {
            headers: RequestHeader()
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    },
    patch: async (URL, DATA) => {
        let objdata = { status: true, data: null };
        await axios.patch(URL, DATA, {
            headers: RequestHeader()
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    },
    put: async (URL, DATA) => {
        let objdata = { status: true, data: null };
        await axios.put(URL, DATA, {
            headers: RequestHeader()
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    },
    delete: async (URL) => {
        let objdata = { status: true, data: null };
        await axios.delete(URL, {
            headers: RequestHeader()
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    }
}

export default ApiService; 