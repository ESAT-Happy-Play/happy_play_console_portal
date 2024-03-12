import "./sysusers.scss";
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button  } from "@mui/material";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { VerifyUserMobile } from './VerifyUserMobile';
import { SystemUserFilter } from './SystemUserFilter';
import { SystemUserInfo } from './SystemUserInfo';

import { SpinLoader } from '../../components/mui';
import { CompanyService, UserService } from "../../services";

export const SystemUsers = () => {
    const formRole = useForm({ defaultValues: { mobileNumber: "" } });
    const { register, handleSubmit, formState, reset } = formRole;
    const { errors } = formState;

    const [isCreateNew, setisCreateNew] = useState(false);
    const [isCreateInfo, setisCreateInfo] = useState(false);

    const [pageLoader, setPageLoader] = useState(false);
    const [companies, setcompanies] = useState(null);
    const [systemUsers, setsystemUsers] = useState(null);

    const [companyId, setcompanyId] = useState("");
    const [branchId, setbranchId] = useState("");
    const [roleId, setroleId] = useState("");

    const verifyMobileHandler = (data) => {
      console.log(data);
      setisCreateNew(false);
      setisCreateInfo(true);
    }

    const handleCompanies = () => {
      CompanyService.getPaginateCompany("", 1, 100)
      .then((resp) => {
          if (resp.data !== null) { setcompanies(resp.data.companyList); }
      });
    }

    const handleUsersList = () => {
      UserService.usersList(companyId, branchId, roleId)
      .then((resp) => {
          if (resp) { setsystemUsers(resp.data); }
      });
    }

    useEffect(() => {
      handleCompanies();
      handleUsersList();
    }, []);

    return (
      <>
      <br />
      <div className="card-sysusers">
        <div className="card-container">
          <div className="card-head">
            <span className="card-title">System User List</span>
            <SystemUserFilter companies={companies} />
          </div>

            <div className="card-body">
              
              <div className="body-left">
                <div className="search"></div>
                <div className="btn-new-role">
                  <Button color="success" variant="text" onClick={e => (setisCreateNew(true), setisCreateInfo(false))}>New User <AddOutlinedIcon /></Button>
                </div>
                <ul>
                  {
                    (systemUsers !== null) ?
                      systemUsers.map((item, index) =>
                        <li className={(index === 0) ? "li-usertypes-active" : ""}
                        key={index}>{item.fullname}</li>
                      )
                    : <></>
                  }
                </ul>
              </div>
              
              <div className="body-right">
                {
                  (isCreateNew)
                  ? <VerifyUserMobile companies={companies} submitCallback={verifyMobileHandler} />
                  : <></>
                }
                {
                  (isCreateInfo)
                  ? <SystemUserInfo companies={companies} />
                  : <></>
                }
              </div>
              
            </div>

        </div>
      </div>
      <SpinLoader isLoadingPage={ pageLoader } />
    </>
  )
}