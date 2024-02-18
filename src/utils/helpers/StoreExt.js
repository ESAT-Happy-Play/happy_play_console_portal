import CryptoJS from "crypto-js";
import jwt_decode from "jwt-decode";

export const StoreExt = {
    getStore: (itemName) => {
        let storageObj = localStorage.getItem(itemName);
        const storagebytes = (storageObj !== null) ? CryptoJS.AES.decrypt(storageObj, process.env.REACT_APP_SECRET_PASS) : null;
        const objdata = (storagebytes !== null) ? JSON.parse(storagebytes.toString(CryptoJS.enc.Utf8)) : null;
        return objdata;
    },
    getDecodeJWT: (jwtString) => {
        let decodedJWT = jwt_decode(jwtString);
        return decodedJWT;
    },
    getBasicStore: (name) => {
        let storageObj = localStorage.getItem(name);
        return JSON.parse(storageObj);
    }
}