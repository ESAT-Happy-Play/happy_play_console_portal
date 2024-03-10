import CryptoJS from "crypto-js";
import jwt_decode from "jwt-decode";

export function GetStoreObject(itemName) {
  // auth
  // menu
  let storageObj = localStorage.getItem(itemName);
  const storagebytes =
    storageObj !== null
      ? CryptoJS.AES.decrypt(storageObj, process.env.REACT_APP_SECRET_PASS)
      : null;
  const objdata =
    storagebytes !== null
      ? JSON.parse(storagebytes.toString(CryptoJS.enc.Utf8))
      : null;

  return objdata;
}

export function GetJWTStoreObject(jwtString) {
  let decodedJWT = jwt_decode(jwtString);

  return decodedJWT;
}

export function GetNEStoreObject(name) {
  let storageObj = localStorage.getItem(name);
  return JSON.parse(storageObj);
}

export function FormatDate(stringDate) {
  let dt = new Date(stringDate);
  var mm = ("0" + (dt.getMonth() + 1)).slice(-2);
  var dd = ("0" + dt.getDate()).slice(-2);
  var yy = dt.getFullYear();

  return yy + "-" + mm + "-" + dd;
}

export function FormatDateMMDDYY(stringDate) {
  let dt = new Date(stringDate);
  var mm = ("0" + (dt.getMonth() + 1)).slice(-2);
  var dd = ("0" + dt.getDate()).slice(-2);
  var yy = dt.getFullYear();

  return mm + "-" + dd + "-" + yy;
}

export function FormatDateTime(stringDate) {
  let dt = new Date(stringDate);
  var mm = ("0" + (dt.getMonth() + 1)).slice(-2);
  var dd = ("0" + dt.getDate()).slice(-2);
  var hr = ("0" + dt.getHours()).slice(-2);
  var min = ("0" + dt.getMinutes()).slice(-2);

  // date.toLocaleTimeString('en-US', { hour12: true });

  var yy = dt.getFullYear();

  return yy + "-" + mm + "-" + dd + " " + hr + ":" + min;
}

export function ChunckArry(arryVal, chunkSize) {
  var chunkArry = [];
  for (var i = 0; i < arryVal.length; i += chunkSize)
    chunkArry.push(arryVal.slice(i, i + chunkSize));

  return chunkArry;
}

export function FormatTime(time) {
  if (time !== null) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? " AM" : " PM";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }
  return "N/A";
}

export function FormatTimeAmPm(val) {
  let returnVal = "";
  switch (val) {
    case 1:
      returnVal = "1 AM";
      break;
    case 2:
      returnVal = "2 AM";
      break;
    case 3:
      returnVal = "3 AM";
      break;
    case 4:
      returnVal = "4 AM";
      break;
    case 5:
      returnVal = "5 AM";
      break;
    case 6:
      returnVal = "6 AM";
      break;
    case 7:
      returnVal = "7 AM";
      break;
    case 8:
      returnVal = "8 AM";
      break;
    case 9:
      returnVal = "9 AM";
      break;
    case 10:
      returnVal = "10 AM";
      break;
    case 11:
      returnVal = "11 AM";
      break;
    case 12:
      returnVal = "12 PM";
      break;
    case 13:
      returnVal = "1 PM";
      break;
    case 14:
      returnVal = "2 PM";
      break;
    case 15:
      returnVal = "3 PM";
      break;
    case 16:
      returnVal = "4 PM";
      break;
    case 17:
      returnVal = "5 PM";
      break;
    case 18:
      returnVal = "6 PM";
      break;
    case 19:
      returnVal = "7 PM";
      break;
    case 20:
      returnVal = "8 PM";
      break;
    case 21:
      returnVal = "9 PM";
      break;
    case 22:
      returnVal = "10 PM";
      break;
    case 23:
      returnVal = "11 PM";
      break;
    case 24:
      returnVal = "12 AM";
      break;
    default:
      returnVal = "12 PM";
  }
  return returnVal;
}

export function FormatAmount(val) {
  const options = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formattedWithOptions = val.toLocaleString("en-US", options);

  return formattedWithOptions;
}

export function FormatInteger(val) {
  const commaSeparatedInt = val.toLocaleString("en-US");

  return commaSeparatedInt;
}
