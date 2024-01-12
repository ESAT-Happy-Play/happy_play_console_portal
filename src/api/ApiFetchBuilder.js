import { GetStoreObject } from "./../helper/Helpers";
let authdata = GetStoreObject("auth");

var headersParams = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
};

var headersParams1 = {
    'Access-Control-Allow-Origin': '*'
};

if (authdata !== null) {
    headersParams = {
        'Access-Control-Allow-Origin': '*',
        'authorization': `Token ${authdata.sessionToken}`,
        'Content-Type': 'application/json'
    }

    headersParams1 = {
        'Access-Control-Allow-Origin': '*',
        'authorization': `Token ${authdata.sessionToken}`,
    }
}

export async function GETFetch (url) {
    let objdata = { status: true, data: null };
    await fetch(url, {
        method: 'GET',
        headers: headersParams,
    })
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
            objdata.status = false;
        }

        objdata.data = data;
    })
    .catch(error => {
        objdata.status = false;
        objdata.data = { msg: error.toString() };
        console.error('There was an error!', error);
    });
        
    return objdata;
}

export async function POSTFetch (url, dataBody) {
    let objdata = { status: true, data: null };
    await fetch(url, {
        method: 'POST',
        headers: headersParams,
        body: JSON.stringify(dataBody)
    })
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
            objdata.status = false;
        }

        objdata.data = data;
    })
    .catch(error => {
        objdata.status = false;
        objdata.data = { errorMessage: error.toString() };
        console.error('There was an error!', error);
    });
        
    return objdata;
}

export async function FetchFormData (url, method, formdata) {
    let objdata = { status: true, data: null };
    await fetch(url, {
        method: method,
        headers: headersParams1,
        body: formdata
    })
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
            objdata.status = false;
        }

        objdata.data = data;
    })
    .catch(error => {
        objdata.status = false;
        objdata.data = { errorMessage: error.toString() };
        console.error('There was an error!', error);
    });
        
    return objdata;
}

export async function PATCHFetch (url, dataBody) {
    let objdata = { status: true, data: null };
    await fetch(url, {
        method: 'PATCH',
        headers: headersParams,
        body: JSON.stringify(dataBody)
    })
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
            objdata.status = false;
        }

        objdata.data = data;
    })
    .catch(error => {
        objdata.status = false;
        objdata.data = { errorMessage: error.toString() };
        console.error('There was an error!', error);
    });
        
    return objdata;
}

export async function DELETEFetch (url) {
    let objdata = { status: true, data: null };
    await fetch(url, {
        method: 'DELETE',
        headers: headersParams
    })
    .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
            objdata.status = false;
        }

        objdata.data = data;
    })
    .catch(error => {
        objdata.status = false;
        objdata.data = { errorMessage: error.toString() };
        console.error('There was an error!', error);
    });
        
    return objdata;
}