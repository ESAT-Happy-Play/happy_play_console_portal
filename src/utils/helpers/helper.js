import CryptoJS from "crypto-js";
import jwt_decode from "jwt-decode";

const GetStoreObject = (itemName) => {
  let storageObj = localStorage.getItem(itemName);
  const storagebytes = (storageObj !== null) ? CryptoJS.AES.decrypt(storageObj, process.env.REACT_APP_SECRET_PASS) : null;
  const objdata = (storagebytes !== null) ? JSON.parse(storagebytes.toString(CryptoJS.enc.Utf8)) : null;
  return objdata;
}

const GetJWTStoreObject = (jwtString) => {
  let decodedJWT = jwt_decode(jwtString);
  return decodedJWT;
}

const GetNEStoreObject = (name) => {
  let storageObj = localStorage.getItem(name);
  return JSON.parse(storageObj);
}

const FormatDate = (stringDate, format = 0) => {
  let dt = (new Date(stringDate));
  var mm = ('0' + (dt.getMonth()+1)).slice(-2);
  var dd = ('0' + (dt.getDate())).slice(-2);
  var yy = dt.getFullYear();

  // 0 = YYYY-MM-DD
  // 1 = MM-DD-YYYY
  return (format === 0) ? (yy + '-' + mm + '-' + dd) : (mm + '-' + dd + '-' + yy);
}

const FormatDateTime = (stringDate) => {
  let dt = (new Date(stringDate));
  var mm = ('0' + (dt.getMonth()+1)).slice(-2);
  var dd = ('0' + (dt.getDate())).slice(-2);
  var hr = ('0' + (dt.getHours())).slice(-2);
  var min = ('0' + (dt.getMinutes())).slice(-2);
  
  // date.toLocaleTimeString('en-US', { hour12: true });
  var yy = dt.getFullYear();
  return (yy + '-' + mm + '-' + dd + ' ' + hr + ':' + min )
}

const ChunckArry = (arryVal, chunkSize) => {
  var chunkArry = [];
  for (var i = 0; i < arryVal.length; i += chunkSize)
    chunkArry.push(arryVal.slice(i, i + chunkSize));

  return chunkArry;
}

const FormatTime = (time) => {

  if(time !== null) {
    time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice (1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join ('');
  }
  return "N/A"
}

export {
    GetStoreObject,
    GetJWTStoreObject,
    GetNEStoreObject,
    FormatDate,
    FormatDateTime,
    ChunckArry,
    FormatTime
} 