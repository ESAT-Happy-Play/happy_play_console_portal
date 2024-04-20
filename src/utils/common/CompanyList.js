import { StoreExt } from "../helpers";
import { CompanyService } from "../../services";

import { store } from '../../redux/Store';
import { setCompaniesState } from '../../redux/reducers/CompanyListReducer';

export const CompanyList = {
    getCompanyList: async () => {
        let companyList = StoreExt.getStore("companyList");
        // let loginObj = StoreExt.getStore("auth");

        if (companyList !== null) {
            return companyList;
        } else {
            let companies = await  CompanyService.getPaginateCompany("", 1, 100).then((resp) => {
                if(resp.success) { return resp.data.companyList; }
                else { return []; }
            });

            store.dispatch(setCompaniesState({ companyList: companies }));
            return { companyList: companies };
        }
    }
}