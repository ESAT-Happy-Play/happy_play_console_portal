import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Tabs as BaseTabs, TabPanel as BaseTabPanel, TabsList as BaseTabsList, Tab as BaseTab, tabClasses } from '@mui/base';
import { buttonClasses } from '@mui/base/Button';
import { COLORS } from '../../helper/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

import MessageDialog from "../Dialog/MessageDialog";

import { useDispatch } from "react-redux";
import { logOut } from '../../redux/reducers/auth/AuthReducer';
import { removeAppState } from '../../redux/reducers/AppStateReducer';
import { removeMenuState } from '../../redux/reducers/MenuStateReducer';
import { removeAccountState } from '../../redux/reducers/AccountStateReducer';
import { removeGameState } from '../../redux/reducers/GamesStateReducer';
import { removeCompanyState } from '../../redux/reducers/CompanyStateReducer';

/*
Use to create Vertical tab, require the ff:
  -Tablist
    -Content for every tab
    - obj : 
      {
        label: "NameOfTab",
        Component: <display-of-the-said-tab/>,
        isHeader?: optional, display as category header of the vertical nav
      }
*/

const ProfileVerticalTab = ({ tabList, changeEvent = () => { } }) => {
  const dispatch = useDispatch();

  let defaultVal = (tabList[0].itemId !== undefined) 
    ? tabList.filter(obj => !obj.isHeader)[0].itemId : 0;

  const [openConfirmLogoutSubmit, setConfirmLogoutSubmit] = React.useState(false);
  const [value, setValue] = React.useState(defaultVal);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeEvent(newValue);
    // console.log(newValue);
  };

  const handleLogoutOkay = async () => {
    dispatch(logOut());
    dispatch(removeAppState());
    dispatch(removeMenuState());
    dispatch(removeAccountState());
    dispatch(removeGameState());
    dispatch(removeCompanyState());

    window.location.href = '/login';
  };

  return (
    <>
    <Tabs value={value} onChange={handleChange} orientation="vertical">
      <Box sx={{ borderRight: `1px solid ${COLORS.transparentFont}` }}>
        <TabsList>
          {tabList?.map((tabs, i) => (
            tabs.isHeader ?
              <HeaderTab key={i} value={ (tabs.itemId !== undefined) ? tabs.itemId : i } disabled>{tabs.label}</HeaderTab>
              :
              <Tab key={i} value={ (tabs.itemId !== undefined) ? tabs.itemId : i }>{tabs.label}</Tab>
          ))}

          <br/>
          <br/>
          <br/>
          <Button onClick={() => setConfirmLogoutSubmit(true)} variant="text">Logout &nbsp; <LogoutIcon style={{fontSize:'15px'}} /></Button>
        </TabsList>
      </Box>
      {tabList?.map(({ Component, itemId }, i) => (
        <TabPanel key={i} value={ (itemId !== undefined) ? itemId : i }>
          {Component}
        </TabPanel>
      ))}
    </Tabs>

    <MessageDialog
        isOpenMessage={ openConfirmLogoutSubmit } 
        handleCloseMessage={ () => setConfirmLogoutSubmit(false) } 
        handleOkay={ handleLogoutOkay } 
        title={ "Logout" } 
        content={ "Are you sure you want to logout?" }
        color={ "error" } />
    </>
  )
}


const Tab = styled(BaseTab)`
    cursor: pointer;
    font-size: 0.875rem;
    background-color: transparent;
    min-width: 200px;
    padding: 10px 20px;
    border: none;
    display: flex;

    &:hover {
        background-color: ${COLORS.background};
    }

    &.${tabClasses.selected} {
        background-color: ${COLORS.violetMain};
        color: white;
    }

    &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;


const HeaderTab = styled(BaseTab)`
    justify-content:center;
    color: ${COLORS.transparentFont};
    font-size: 0.875rem;
    background-color: transparent;
    min-width: 200px;
    padding: 10px 20px;
    border: none;
    display: flex;
`;

const Tabs = styled(BaseTabs)`
  display: flex;
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
    width: 100%;
    padding: 15px;
    font-size: 0.875rem;
    `,
);

const TabsList = styled(BaseTabsList)`
    border-radius: 12px;
    margin-bottom: 16px;
    background-color:white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

export default ProfileVerticalTab