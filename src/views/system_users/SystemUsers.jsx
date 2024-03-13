import "./sysusers.scss";
import React, { useState, useEffect } from 'react';
import { Button  } from "@mui/material";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { VerifyUserMobile } from './VerifyUserMobile';
import { SystemUserFilter } from './SystemUserFilter';
import { SystemUserInfo } from './SystemUserInfo';

import { SpinLoader } from '../../components/mui';
import { CompanyService, UserService, RoleService, BranchService } from "../../services";

export const SystemUsers = () => {
    const [isCreateNew, setisCreateNew] = useState(true);
    const [isCreateInfo, setisCreateInfo] = useState(false);

    const [pageLoader, setPageLoader] = useState(false);
    const [companies, setcompanies] = useState(null);
    const [systemUsers, setsystemUsers] = useState(null);

    const [branchesFilter, setbranchesFilter] = useState(null);
    const [rolesFilter, setrolesFilter] = useState(null);

    const [branches, setbranches] = useState(null);
    const [roles, setroles] = useState(null);

    const [mobileAvailable, setmobileAvailable] = useState(null);
    const [companyId, setcompanyId] = useState("");
    const [branchId, setbranchId] = useState("");
    const [roleId, setroleId] = useState("");
    const [paramObj, setparamObj] = useState(null);

    const handleCompanies = () => {
      CompanyService.getPaginateCompany("", 1, 100)
      .then((resp) => { if (resp.data !== null) { setcompanies(resp.data.companyList); } });
    }

    const handleUsersList = (cmpId = null, brnId = null, rlId = null) => {
      setPageLoader(true);
      let compId = (cmpId !== null) ? cmpId : companyId;
      let braId = (brnId !== null) ? brnId : branchId;
      let rolId = (rlId !== null) ? rlId : roleId;
      UserService.usersList(compId, braId, rolId)
      .then((resp) => { if (resp) { setsystemUsers(resp.data); } setPageLoader(false); });
    }

    const handleCompanyFilter = (compId, compObjId, isFilter = false) => {
      if (compId !== null) {
        setPageLoader(true);
        handleBranchList(compObjId, isFilter);
        handleRoles(compId, isFilter);
        setTimeout(function() {
          setPageLoader(false);
        }, 3000);
      }
    }

    const handleBranchList = (compObjId, isFilter = false) => {
      BranchService.getBranchByCompany({ companyId: compObjId, branchName: "" })
      .then((resp) => { if (resp) { 
        (isFilter) ? setbranchesFilter(resp.data) : setbranches(resp.data);
       } });
    }

    const handleRoles = (companyIdParam, isFilter = false) => {
      RoleService.getRoles(companyIdParam)
      .then((resp) => { if (resp) { 
        (isFilter) ? setrolesFilter(resp.data) : setroles(resp.data);
       } });
    }

    const verifyMobileHandler = (data, compName, brnName, rlName) => {
      setPageLoader(true);
      UserService.checkMobileExist({ mobileNumber: data.mobileNumber}).then((resp) => { 
        if (resp.data) { 
          setmobileAvailable("True");
          //reload page after 2 sec
          setTimeout(function() {
            setisCreateNew(false);
            setisCreateInfo(true);
            setmobileAvailable(null);

            setparamObj({
              mobileNumber: data.mobileNumber,
              companyName: compName,
              branchName: brnName,
              roleName: rlName,
              branchId: data.branch,
              roleId: data.role
            });
          }, 2000);
        } else {
          setmobileAvailable("False");
          setTimeout(function() {
            setisCreateNew(true);
            setisCreateInfo(false);
            setmobileAvailable(null);
          }, 2000);
        }
        setPageLoader(false);
      });
    }

    const handleUserInfCallback = (data) => {
      if(data) {
        setisCreateNew(true);
        setisCreateInfo(false);
      }
    }

    const handleFilter = (eventType, eventValue, eventObjValud) => {
      // 0 for company, 1 for branch and 2 for roles.
      if (eventType === "0") { 
        if(eventValue !== null) {
          setcompanyId(eventValue);
          setbranchId("");
          setroleId("");
          handleUsersList(eventValue, null, null);
          handleCompanyFilter(eventValue, eventObjValud, true);
        }
      }

      if (eventType === "1") { 
        if(eventValue !== null) { 
          setbranchId(eventValue); 
          handleUsersList(null, eventValue, null);
        }
      }

      if (eventType === "2") { 
        if(eventValue !== null) { 
          setroleId(eventValue); 
          handleUsersList(null, null, eventValue);
        }
      }
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
            <SystemUserFilter companies={companies} branches={branchesFilter} roles={rolesFilter} filterCallback={handleFilter} />
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
                  ? <VerifyUserMobile companies={companies} branches={branches} roles={roles} 
                    isAvailable={mobileAvailable} submitCallback={verifyMobileHandler} selectCompanyCallback={handleCompanyFilter} />
                  : <></>
                }
                {
                  (isCreateInfo)
                  ? <SystemUserInfo paramObj={paramObj} callback={handleUserInfCallback} />
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