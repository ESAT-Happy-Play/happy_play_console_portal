import { StoreExt } from "../utils/helpers";
// 'Content-Type': 'multipart/form-data'

export const RequestHeader = () => {
    let authdata = StoreExt.getStore("auth");
    if (authdata !== null) {
        return { 
            Accept: "application/json",
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authdata.token}`,
        };
    } else {
        return {
            Accept: "application/json",
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        };
    }
}