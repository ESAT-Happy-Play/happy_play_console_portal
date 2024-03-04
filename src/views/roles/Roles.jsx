import "./roles.scss";
import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button  } from "@mui/material";
import { useForm } from 'react-hook-form';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { GroupCheckbox, SpinLoader } from '../../components/mui';
import { CompanyService, MenuService } from "../../services";

const theme = createTheme({
  palette: {
    ochre: { main: '#e6a931', light: '#f3c05a', dark: '#dea022', contrastText: 'white' }
  },
});

export const Roles = () => {

    const formRole = useForm({ defaultValues: { userTypeName: "" } });
    const { register, handleSubmit, formState, reset } = formRole;
    const { errors } = formState;

    const [pageLoader, setPageLoader] = useState(false);
    const [defaultMenuList, setdefaultMenuList] = useState(null);
    const [menuListDetails, setmenuListDetails] = useState(null);
    const [listMenuForSubmit, setlistMenuForSubmit] = useState(null);
    const [selectedUserType, setselectedUserType] = useState(null);
    const [companies, setcompanies] = useState([]);
    const [userRoles, setuserRoles] = useState(null);

    const [checkDisabled, setcheckDisabled] = useState(true);
    const [isCreateNew, setisCreateNew] = useState(false);
    const [actionType, setactionType] = useState(0);

    
    // const handleCheckAll = (data) => {
    //   console.log(menuListDetails);
    //   let objIndex = menuListDetails.findIndex(obj => obj.menuId === 3);
    //   menuListDetails[objIndex].readWrite = !menuListDetails[objIndex].readWrite;
    //   console.log(menuListDetails);
    //   setmenuListDetails(menuListDetails);
    // };

    const handleCheckCallback = (data) => {
      if (listMenuForSubmit == null) { setlistMenuForSubmit(data); }
      else {
        data.forEach(elem => {
          let objIndex = listMenuForSubmit.findIndex(obj => obj.menuId === elem.menuId);
          if (objIndex === -1) {
            listMenuForSubmit.push(elem);
          } else {
            listMenuForSubmit[objIndex] = elem;
          }
        });
      }
    };

    const handleNewRole = () => {
      handleListMenus();
      setisCreateNew(true);
      removeAllClass("li-usertypes-active");
      setactionType(2);
      setcheckDisabled(false);
    }

    const handleNewUserType = (event, ID) => {
      removeAllClass("new-active");
      event.target.classList.add("new-active");
    }

    const handleSelectRole = (event, userType) => {
      // now add active to curren selected
      removeAllClass("li-usertypes-active");
      event.target.classList.add("li-usertypes-active");

      // update selected role
      setselectedUserType(userType);
      handleListMenusByRoleId(userType.userTypeId, true);
      setisCreateNew(false);
      // resetRoleForm();
      setactionType(0);
    }

    const handleSelectGroupType = (event, groupId) => {
      // now add active to curren selected
      removeAllClass("btnActive");
      event.target.classList.add("btnActive");
      // setgroupTypeId(groupId);
      handleRoleByGroupType(groupId);
    }

    const removeAllClass = (className) => {
      let listClass = document.getElementsByClassName(className)
      // remove all class active to the list
      for (let i = 0; i < listClass.length; i++) {
        listClass[i].classList.remove(className);
      }
    }

    const handleCompanies = () => {
      CompanyService.getPaginateCompany("", 1, 100)
      .then((resp) => {
          if (resp) { setcompanies(resp.data.companyList);}
      });
    }

    const handleRoleByGroupType = (groupId) => {
      setPageLoader(true);
      MenuService.getRoleByGroupType(groupId)
      .then((resp) => {
          if (resp) {
            var roleList = resp.data.filter(m => m.userTypeName !== "NewRegister" && m.userTypeName !== "Player");
            setuserRoles(roleList);

            // default selected menu
            setselectedUserType(roleList[0]);
            handleListMenusByRoleId(roleList[0].userTypeId);
            // resetRoleForm();
          }
          setPageLoader(false);
      });
    }

    const handleListMenusByRoleId = (userTypeId, setLoading = false) => {
      if (setLoading) { setPageLoader(true); }
      MenuService.getSecrityGroupeMenu(userTypeId)
      .then((resp) => {
          if (resp) { setmenuListDetails(resp.data); }
          if (setLoading) { setPageLoader(false); }
      });
    }

    const handleListMenus = () => {
      setPageLoader(true);
      MenuService.getSecrityGroupeMenu()
      .then((resp) => {
          if (resp) { setdefaultMenuList(resp.data); }
          setPageLoader(false);
      });
    }

    useEffect(() => {
      handleCompanies();
      handleRoleByGroupType(0);
    }, []);

    const handleFilterByCompany = event => {
      console.log(event.target.getAttribute('data-value'));
    }

    const resetRoleForm = () => {
      reset(formValues => ({
          ...formValues,
          userTypeName: (selectedUserType !== null) ? selectedUserType.userTypeName : ""
      }));
    }

    // final submit handler
    const submitHandler = async (data) => {
      console.log(data);
      console.log(listMenuForSubmit);
    };
    return (
      <>
      <br />
      <div className="group-type">
        <div className="group-content">
          <Button className="btnActive" onClick={(e) => handleSelectGroupType(e, 0)} variant="text" size="medium">
            Dashboard
          </Button>
          <Button variant="text" onClick={(e) => handleSelectGroupType(e, 1)} size="medium">
            Accounting
          </Button>
          <Button variant="text" onClick={(e) => handleSelectGroupType(e, 2)} size="medium">
            Support
          </Button>
        </div>
      </div>
      <div className="card-roles">
        <div className="card-container">
          <div className="card-head">
            <span className="card-title">Roles List</span>
            <span>Admin</span>
          </div>
          <div className="card-body">

            <div className="body-left">
              <div className="search">
                <TextField type="text" sx={{width:'200px'}} defaultValue="" label="Select Company" 
                  size="small" onClick={handleFilterByCompany} select>
                  <MenuItem value=""><em>Select company</em></MenuItem>
                  { 
                      (companies.length > 0) ?
                      companies.map((item, index) => (
                          <MenuItem key={item.companyId} value={item.companyObjectId}>
                              {item.companyName}
                          </MenuItem>
                      ))
                      : <MenuItem value=""><em>No data found!</em></MenuItem>
                  }
                  </TextField>
              </div>
              <div className="btn-new-role">
                <Button onClick={handleNewRole} color="success" variant="text">New Role <AddOutlinedIcon /></Button>
              </div>
              <ul>
                {
                  (userRoles !== null) ?
                    userRoles.map((item, index) =>
                      <li className={(index === 0) ? "li-usertypes-active" : ""} onClick={(e) => handleSelectRole(e, item)}
                      key={index}>{item.userTypeName}</li>
                    )
                  : <></>
                }
              </ul>
            </div>

            <div className="body-right">
              <form onSubmit={handleSubmit(submitHandler)} noValidate>
                <div className="right-head">
                  <div className="stdiv">
                    <span>Role Name</span>
                    <TextField style={{textAlign:'left'}}
                      variant="outlined" value={(selectedUserType !== null) ? selectedUserType.userTypeName : ""} size="small"
                      {  ...register("userTypeName", { required: true } ) }
                      error={ !!errors.userTypeName }/>
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
                    (isCreateNew) ?
                      (defaultMenuList !== null) ?
                        defaultMenuList.filter(m => m.isParent).map((item, index) => 
                        <GroupCheckbox key={index} parentMenu={item} checkEndabled={checkDisabled}
                          childMenuList={defaultMenuList.filter(m => m.parentId === item.menuId)} 
                          callBack={handleCheckCallback} />
                        ) : <></>
                    :
                    (menuListDetails !== null) ?
                      menuListDetails.filter(m => m.isParent).map((item, index) => 
                      <GroupCheckbox key={index} parentMenu={item} checkEndabled={checkDisabled}
                        childMenuList={menuListDetails.filter(m => m.parentId === item.menuId)} 
                        callBack={handleCheckCallback} />
                      )
                    : <></>
                  }
                </div>
                <ThemeProvider theme={theme}>
                  {
                    (actionType === 0) ?
                    <div className="div-role-footer">
                      <Button type='button' variant='outlined' color='error' size="medium">
                        Delete <ClearIcon />
                      </Button>
                      <Button type='button' onClick={e => (setactionType(1), setcheckDisabled(false))} variant='contained' color='ochre' size="medium">
                        Edit <ModeEditOutlineIcon />
                      </Button>
                    </div> 
                    : (actionType === 1) ?
                    <div className="div-role-footer">
                      <Button type='button' onClick={ e => (setactionType(0),setisCreateNew(false), setcheckDisabled(true))} variant='outlined' size="medium">
                        Cancel
                      </Button>
                      <Button type='button' variant='contained' color='ochre' size="medium">
                        Update <ModeEditOutlineIcon />
                      </Button>
                    </div>
                    : (actionType === 2) ?
                    <div className="div-role-footer">
                      <Button type='button' onClick={ e => (setactionType(0),setisCreateNew(false), setcheckDisabled(true))} variant='outlined' size="medium">
                        Cancel
                      </Button>
                      <Button type='submit' variant='contained' color='success' size="medium">
                        Create <AddOutlinedIcon />
                      </Button>
                    </div>
                    : <></>
                  }
                  
                </ThemeProvider>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SpinLoader isLoadingPage={ pageLoader } />
    </>
  )
}