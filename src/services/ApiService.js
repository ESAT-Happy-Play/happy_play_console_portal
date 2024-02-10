import axios from 'axios';

var headersParams = {
    Accept: "application/json",
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    // 'Content-Type': `multipart/form-data; boundary=${form._boundary}`
};

const ApiService = { 
    get: async (URL) => {
        let objdata = { status: true, data: null };
        await axios.get(URL, {
            headers: headersParams
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    },
    postData: async (URL, DATA) => {
        let objdata = { status: true, data: null };
        await axios.post(URL, DATA, {
            headers: headersParams
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    },
    patchData: async (URL, DATA) => {
        let objdata = { status: true, data: null };
        await axios.patch(URL, DATA, {
            headers: headersParams
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    },
    putData: async (URL, DATA) => {
        let objdata = { status: true, data: null };
        await axios.put(URL, DATA, {
            headers: headersParams
        })
        .then((res) => { objdata.data = res.data; })
        .catch((err) => {
            objdata.status = false;
            objdata.data = err
        })

        return objdata;
    },
    deleteData: async (URL) => {
        let objdata = { status: true, data: null };
        await axios.delete(URL, {
            headers: headersParams
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