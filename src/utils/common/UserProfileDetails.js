import { StoreExt } from "../helpers";

import { store } from '../../redux/Store';
import { setAccountState } from '../../redux/reducers/AccountStateReducer';
import { UserService } from "../../services";

export const UserProfileDetails = {
    getInitAccount: async (profileData = null) => {
        return new Promise((resolve, reject)=> {

            let accountData = StoreExt.getStore("accountState");
            let loginObj = StoreExt.getStore("auth");
            // let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

            if (profileData !== null) {
                store.dispatch(setAccountState(profileData));
                return resolve(profileData);
            } else if (accountData !== null) {
                // return accountData;
                return resolve(accountData);
            } else {
                
                UserService.systemUserInfo(loginObj.id).then((resp) => {
                    if(resp.success) { 
                        store.dispatch(setAccountState(resp.data));
                        return resolve(resp.data);
                    } else {
                        return reject("Something went wrong."); 
                    }
                });
            }
        });
    }
}