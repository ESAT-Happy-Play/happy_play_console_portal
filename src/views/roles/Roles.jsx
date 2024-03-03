import "./roles.scss";
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button  } from "@mui/material";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { GroupCheckbox } from '../../components/mui';

import { MenuList } from '../../utils/data';

export const Roles = () => {
    const [menuListDetails, setmenuListDetails] = useState(null);
    const [userTypes, setuserTypes] = useState(null);
    const [selectedUserType, setselectedUserType] = useState(null);

    const [isCreateNew, setisCreateNew] = useState(false);
    const [isUpdate, setisUpdate] = useState(false);
    
    // const handleCheckAll = (data) => {
    //   console.log(menuListDetails);
    //   let objIndex = menuListDetails.findIndex(obj => obj.menuId === 3);
    //   menuListDetails[objIndex].readWrite = !menuListDetails[objIndex].readWrite;
    //   console.log(menuListDetails);
    //   setmenuListDetails(menuListDetails);
    // };

    const handleCheckCallback = (data) => {
      console.log(data);
    };

    const handleNewRole = () => {
      setisCreateNew(true);
      removeAllClass("li-usertypes-active");
    }

    const handleNewUserType = (event, ID) => {
      console.log(ID);
      
      removeAllClass("new-active");
      event.target.classList.add("new-active");
    }

    const handleSelectRole = (event, userType) => {
      // now add active to curren selected
      removeAllClass("li-usertypes-active");
      event.target.classList.add("li-usertypes-active");

      setselectedUserType(userType);
      setisCreateNew(false);
    }

    const removeAllClass = (className) => {
      let listClass = document.getElementsByClassName(className)
      // remove all class active to the list
      for (let i = 0; i < listClass.length; i++) {
        listClass[i].classList.remove(className);
      }
    }

    useEffect(() => {
      setmenuListDetails(MenuList.Details);
      setuserTypes(MenuList.UserTypes);
    }, []);

    return (
    <div className="card-roles">
      <div className="card-container">
        <div className="card-head">
          <span className="card-title">Roles List</span>
          <span>Admin</span>
        </div>
        <div className="card-body">

          <div className="body-left">
            <div className="search">
              <TextField style={{textAlign:'left'}}
                variant="outlined" defaultValue="" size="small" 
                label="Company"
                fullWidth select>
                <MenuItem value=""><em>Select company</em></MenuItem>
              </TextField>
            </div>
            <div className="btn-new-role">
              <Button onClick={handleNewRole} color="success" variant="text">New Role <AddOutlinedIcon /></Button>
            </div>
            <ul>
              {
                (userTypes !== null) ?
                  userTypes.map((item, index) =>
                    <li onClick={(e) => handleSelectRole(e, item)}
                    key={index}>{item.userTypeName}</li>
                  )
                : <></>
              }
            </ul>
          </div>

          <div className="body-right">
            <div className="right-head">
              <div className="stdiv">
                <span>Role Name</span>
                <TextField style={{textAlign:'left'}}
                  variant="outlined" defaultValue="" size="small" 
                  label="Role Name" />
              </div>
              <div className="nddiv">
                {
                  (isCreateNew) ?
                    <>
                      <span onClick={e => handleNewUserType(e, 0)} className="us-new">Admin-Level</span>
                      <span onClick={e => handleNewUserType(e, 1)} className="us-new">Company-Level</span>
                      <span onClick={e => handleNewUserType(e, 2)} className="us-new">Branch-Level</span>
                    </>
                  : 
                  <>
                    <span className={(selectedUserType !== null) ? (selectedUserType.roleType === 0) ? "us-new new-active" : "" : "" }>Admin-Level</span>
                    <span className={(selectedUserType !== null) ? (selectedUserType.roleType === 1) ? "us-new new-active" : "" : "" }>Company-Level</span>
                    <span className={(selectedUserType !== null) ? (selectedUserType.roleType === 2) ? "us-new new-active" : "" : "" }>Branch-Level</span>
                  </>
                }
              </div>
            </div>

            <div className="right-content">
              {
                (menuListDetails !== null) ?
                  menuListDetails.filter(m => m.isParent).map((item, index) => 
                  <GroupCheckbox key={index} parentMenu={item} 
                    childMenuList={menuListDetails.filter(m => m.parentId === item.menuId)} 
                    callBack={handleCheckCallback} />
                  )
                : <></>
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}