import "./profile.scss"

import React, { useState, useEffect } from 'react';
// import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

import { TextField, Button, MenuItem  } from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddEditProfile from "../../../components/Dialog/forms/AddEditProfile";

import PageLoader from "../../../components/widget/PageLoader";
import { GetStoreObject } from "../../../helper/Helpers";

const authObj = GetStoreObject("auth");

const Profile = () => {
  const [menuToDisplay, setMenuToDisplay] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [userTypeId, setUserTypeId] = React.useState('');
  const [userRoles, setUserRoles] = useState([]);
  const [skipMenu, setSkipMenu] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [AllMenuData, setAllMenuData] = React.useState([]);

  const hanleParentMenu = () => {
    let returnVal = [];
    
    returnVal.push(handleReturnObj("History."));
    returnVal.push(handleReturnObj("Wallet."));
    returnVal.push(handleReturnObj("Profile."));
    returnVal.push(handleReturnObj("SuperAdmin."));
    returnVal.push(handleReturnObj("UserAccount."));
    returnVal.push(handleReturnObj("Game."));
    returnVal.push(handleReturnObj("Postings."));

    return returnVal;
  }

  const handleReturnObj = (code) => {
    if (menuData.filter(str => str.includes(code)).length > 0) {
      if (AllMenuData.filter(obj => obj.menuName === code.slice(0, -1)).length > 0) {
        return buildChildObj(AllMenuData.filter(obj => obj.menuName === code.slice(0, -1)), menuData.filter(str => str.includes(code)));
      }
    }
    return {};
  }

  const buildChildObj = (dataObj, childLinks) => {
    let finalObj = {
      menuCode: "",
      menuId: "",
      menuName: "",
      childMenus: []
    };

    let finalChild = [];
    let tempdata = dataObj[0];

    for (let i = 0; i < childLinks.length; i++) {
      finalChild.push(tempdata.childMenus.find(item => item.menuCode === childLinks[i]));
    }

    finalObj.menuCode = tempdata.menuCode;
    finalObj.menuId = tempdata.menuId;
    finalObj.menuName = tempdata.menuName;
    finalObj.childMenus = finalChild;

    return finalObj;
  }

  const handleRoleChange = (e, value) => {
    setUserTypeId(value);
    setPageLoader(true);
    setSkipMenu(false);
  }
  
  // Add Profile dialog
  const [modalTitle, setModalTitle] = React.useState('');
  const [openAddProfile, setAddProfile] = React.useState(false);
  const handleAddProfileClose = () => { setAddProfile(false); };
  // const handleAddProfileOpen = () => { 
  //   setAddProfile(true); 
  //   setModalTitle("Add Profile"); 
  // };
  const handleEditProfileOpen = () => {
    if (userTypeId !== '') {
      setAddProfile(true); 
      setModalTitle("Edit Profile"); 
    } else {
      toast.error("Please select profile name.");
    }
  };

  const handleEditProfileCallback = () => {
    console.log("Refresh data");
  }

  return (
    <div className="content">
      <div className="container">
        <div className="top">
          <h2 className="title">Profiles</h2>
        </div>

        <div className="profile">

          <div className="searchContent">
            <div className="left">
              <label>Profile Name</label>
            </div>
            <div className="center">
             <TextField 
                placeholder="Select User Role"
                onChange={ e => handleRoleChange(e, e.target.value) }
                label="Select User Role" defaultValue="" variant="outlined" size="small" fullWidth select>
                <MenuItem value=''><em>Select user role</em></MenuItem>
                { 
                    (userRoles.length !== 0) ? userRoles.map((item) => (
                    <MenuItem key={item.userTypeId} value={item.userTypeId}>
                        {item.userTypeName}
                    </MenuItem>
                    )) :
                    <MenuItem value=''>Loading options...</MenuItem>
                }
                </TextField>

              <Button variant="contained" onClick={ handleEditProfileOpen } color="secondary" size="large">
                Edit <EditOutlinedIcon />
              </Button>
            </div>
            <div className="right">
              {/* <Button variant="contained" onClick={ handleAddProfileOpen } sx={{ background: "#ecc94b", color: "black" }} color="warning" size="large">
                New <AddIcon />
              </Button> */}
            </div>
          </div>

          <div className="bodyContent">

            {
              menuToDisplay.map((menu, index) => (
                (menu.menuId !== undefined) ?
                  <div key={index}>
                    <ul>
                      <li style={{ background: "#bec9c9" }} key={menu.menuId}>{menu.menuName}</li>
                      {
                        menu.childMenus.map((child, index) => (
                          <li key={child.menuId}><CheckOutlinedIcon sx={{ color: "green" }} /> { child.menuName }</li>
                        ))
                      }
                    </ul>
                  </div>
                :
                ""
              ))
            }

          </div>

        </div>
      </div>

      <AddEditProfile 
      isOpenAddProfile={ openAddProfile } 
      handleCloseAddProfile={ handleAddProfileClose } 
      handleCallback={ handleEditProfileCallback }
      modalTitle={ modalTitle }
      AllMenuData={AllMenuData}
      defaultMenu={null}
      roleObj={ (userRoles.filter(m => m.userTypeId === userTypeId)) }/>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Profile
