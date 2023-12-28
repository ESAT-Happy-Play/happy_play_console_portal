import "../dialogform.scss";

import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Button  } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import CancelIcon from '@mui/icons-material/Cancel';

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// Models
import { MenuModel } from "../../../model/MenuModel";
import MessageDialog from "../MessageDialog";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const AddEditProfile = ({ isOpenAddProfile, handleCloseAddProfile, handleCallback, modalTitle, AllMenuData, defaultMenu, roleObj }) => {

  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [value, setValue] = React.useState("1");
  const [listOfMenuIds, setListOfMenuIds] = React.useState([]);

  const [historyGameBets, setHistoryGameBets] = React.useState(false);
  const [historyGameResult, setHistoryGameResult] = React.useState(false);
  const [wallet, setWallet] = React.useState(false);
  const [profileInfo, setProfileInfo] = React.useState(false);
  const [resetPassword, setresetPassword] = React.useState(false);
  const [SuperAdmin, setSuperAdmin] = React.useState(false);
  const [Company, setCompany] = React.useState(false);
  const [Branch, setBranch] = React.useState(false);
  const [Profiles, setProfiles] = React.useState(false);
  const [SystemUsers, setSystemUsers] = React.useState(false);
  const [Operators, setOperators] = React.useState(false);
  const [UserApproval, setUserApproval] = React.useState(false);
  const [UserVerification, setUserVerification] = React.useState(false);
  const [MasterAgents, setMasterAgents] = React.useState(false);
  const [Agents, setAgents] = React.useState(false);
  const [Players, setPlayers] = React.useState(false);
  const [GameScheduleSettings, setGameScheduleSettings] = React.useState(false);
  const [MechanicsSettings, setMechanicsSettings] = React.useState(false);
  const [PriceAndPrizes, setPriceAndPrizes] = React.useState(false);
  const [gameGameBets, setGameGameBets] = React.useState(false);
  const [gameGameResult, setGameGameResult] = React.useState(false);
  const [TextBlast, setTextBlast] = React.useState(false);
  const [Announcements, setAnnouncements] = React.useState(false);
  const [LiveStreaming, setLiveStreaming] = React.useState(false);
  const [SalesReport, setSalesReport] = React.useState(false);
  const [TransactionReport, setTransactionReport] = React.useState(false);
  const [UserActivityReport, setUserActivityReport] = React.useState(false);

  useEffect(() => {
    if(defaultMenu !== undefined && defaultMenu.length > 0) {
      handleResetSelectState();

      let arry = [];
      for (let i = 0; i < defaultMenu.length; i++) {
        if (defaultMenu[i] === "History.GameBets") { 
          setHistoryGameBets(true); 
          arry.push(handleFindMenuId('History', 'History.GameBets'));
        }
        if (defaultMenu[i] === "History.GameResult") { 
          setHistoryGameResult(true); 
          arry.push(handleFindMenuId('History', 'History.GameResult'));
        }
        
        if (defaultMenu[i] === "Wallet.Wallet") { 
          setWallet(true); 
          arry.push(handleFindMenuId('Wallet', 'Wallet.Wallet'));
        }
        
        if (defaultMenu[i] === "Profile.ProfileInformation") { 
          setProfileInfo(true); 
          arry.push(handleFindMenuId('Profile', 'Profile.ProfileInformation'));
        }
        if (defaultMenu[i] === "Profile.ResetPassword") { 
          setresetPassword(true); 
          arry.push(handleFindMenuId('Profile', 'Profile.ResetPassword'));
        }
        
        if (defaultMenu[i] === "SuperAdmin.SuperAdmin") { 
          setSuperAdmin(true); 
          arry.push(handleFindMenuId('SuperAdmin', 'SuperAdmin.SuperAdmin'));
        }
        if (defaultMenu[i] === "SuperAdmin.Company") { 
          setCompany(true); 
          arry.push(handleFindMenuId('SuperAdmin', 'SuperAdmin.Company'));
        }
        if (defaultMenu[i] === "SuperAdmin.Branch") { 
          setBranch(true); 
          arry.push(handleFindMenuId('SuperAdmin', 'SuperAdmin.Branch'));
        }
        if (defaultMenu[i] === "SuperAdmin.Profiles") { 
          setProfiles(true); 
          arry.push(handleFindMenuId('SuperAdmin', 'SuperAdmin.Profiles'));
        }

        if (defaultMenu[i] === "UserAccount.SystemUsers") { 
          setSystemUsers(true); 
          arry.push(handleFindMenuId('UserAccount', 'UserAccount.SystemUsers'));
        }
        if (defaultMenu[i] === "UserAccount.Operators") { 
          setOperators(true); 
          arry.push(handleFindMenuId('UserAccount', 'UserAccount.Operators'));
        }
        if (defaultMenu[i] === "UserAccount.UserApproval") { 
          setUserApproval(true); 
          arry.push(handleFindMenuId('UserAccount', 'UserAccount.UserApproval'));
        }
        if (defaultMenu[i] === "UserAccount.UserVerification") { 
          setUserVerification(true); 
          arry.push(handleFindMenuId('UserAccount', 'UserAccount.UserVerification'));
        }
        if (defaultMenu[i] === "UserAccount.MasterAgents") { 
          setMasterAgents(true); 
          arry.push(handleFindMenuId('UserAccount', 'UserAccount.MasterAgents'));
        }
        if (defaultMenu[i] === "UserAccount.Agents") { 
          setAgents(true); 
          arry.push(handleFindMenuId('UserAccount', 'UserAccount.Agents'));
        }
        if (defaultMenu[i] === "UserAccount.Players") { 
          setPlayers(true); 
          arry.push(handleFindMenuId('UserAccount', 'UserAccount.Players'));
        }
        
        if (defaultMenu[i] === "Game.GameScheduleSettings") { 
          setGameScheduleSettings(true); 
          arry.push(handleFindMenuId('Game', 'Game.GameScheduleSettings'));
        }
        if (defaultMenu[i] === "Game.GameMechanicsSettings") { 
          setMechanicsSettings(true); 
          arry.push(handleFindMenuId('Game', 'Game.GameMechanicsSettings'));
        }
        if (defaultMenu[i] === "Game.Price&Prizes") { 
          setPriceAndPrizes(true); 
          arry.push(handleFindMenuId('Game', 'Game.Price&Prizes'));
        }
        if (defaultMenu[i] === "Game.GameBets") { 
          setGameGameBets(true); 
          arry.push(handleFindMenuId('Game', 'Game.GameBets'));
        }
        if (defaultMenu[i] === "Game.GameResult") { 
          setGameGameResult(true); 
          arry.push(handleFindMenuId('Game', 'Game.GameResult'));
        }
        
        if (defaultMenu[i] === "Postings.TextBlast") { 
          setTextBlast(true); 
          arry.push(handleFindMenuId('Postings', 'Postings.TextBlast'));
        }
        if (defaultMenu[i] === "Postings.Announcements") { 
          setAnnouncements(true); 
          arry.push(handleFindMenuId('Postings', 'Postings.Announcements'));
        }
        if (defaultMenu[i] === "Postings.LiveStreaming") { 
          setLiveStreaming(true); 
          arry.push(handleFindMenuId('Postings', 'Postings.LiveStreaming'));
        }
        
        if (defaultMenu[i] === "Reporting.SalesReport") { 
          setSalesReport(true); 
          arry.push(handleFindMenuId('Reporting', 'Reporting.SalesReport'));
        }
        if (defaultMenu[i] === "Reporting.TransactionReport") { 
          setTransactionReport(true); 
          arry.push(handleFindMenuId('Reporting', 'Reporting.TransactionReport'));
        }
        if (defaultMenu[i] === "Reporting.UserActivityReport") { 
          setUserActivityReport(true); 
          arry.push(handleFindMenuId('Reporting', 'Reporting.UserActivityReport'));
        }

        // console.log(arry);
        if(defaultMenu.length === i+1) {
          setListOfMenuIds(arry)
        }
      }
    } else {
      handleResetSelectState();
    }
  }, [AllMenuData, defaultMenu]);

  const handleResetSelectState = () => {
    setHistoryGameBets(false);
    setHistoryGameResult(false);
    setWallet(false);
    setProfileInfo(false);
    setresetPassword(false);
    setSuperAdmin(false);
    setCompany(false);
    setBranch(false);
    setProfiles(false);
    setSystemUsers(false);
    setOperators(false);
    setUserApproval(false);
    setUserVerification(false);
    setMasterAgents(false);
    setAgents(false);
    setPlayers(false);
    setGameScheduleSettings(false);
    setMechanicsSettings(false);
    setPriceAndPrizes(false);
    setGameGameBets(false);
    setGameGameResult(false);
    setTextBlast(false);
    setAnnouncements(false);
    setLiveStreaming(false);
    setSalesReport(false);
    setTransactionReport(false);
    setUserActivityReport(false);
  }

  const handleCloseModal = () => {
    handleCloseAddProfile();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const removeArryItem = (listArry, valueToRemove) => {
    const index = listArry.indexOf(valueToRemove);
    if (index > -1) {
      listArry.splice(index, 1);
    }

    return listArry;
  }

  const handleClickEvnt = (e, id, isSelected) => {
    (isSelected && (!listOfMenuIds.includes(id)) ? listOfMenuIds.push(id) : setListOfMenuIds(removeArryItem(listOfMenuIds, id)));
  }

  const handleFindMenuId = (name, code) => {
    let findResult = AllMenuData.filter(obj => obj.menuName === name);
    if (findResult.length > 0) {
      // console.log(findResult[0].childMenus.filter(item => item.menuCode === code)[0].menuId);
      return findResult[0].childMenus.filter(item => item.menuCode === code)[0].menuId;
    }
    return 0;
  }

  const resetForm = () => {
    setSubmitLoading(false);
    handleProfileSubmitClose();
    // handleCloseAddProfile();
    handleCloseModal();
  }

  // Confiration dialog message for updating menu
  const [openConfirmProfileSubmit, setConfirmProfileSubmit] = React.useState(false);
  const handleProfileSubmitOpen = () => { 
    MenuModel.UpdateMenuForm.userTypeId = (roleObj.length > 0) ? roleObj[0].userTypeId : "";
    MenuModel.UpdateMenuForm.menuIds = listOfMenuIds;
    setFormData(MenuModel.UpdateMenuForm);
    setConfirmProfileSubmit(true); 
  };
  const handleProfileSubmitClose = () => { setConfirmProfileSubmit(false); };
  const handleProfileOkay = async () => {
    console.log("Submit");
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm" open={ isOpenAddProfile }>
        <div className="dialogHeader">
          <div className="st"></div>
          <div className="nd"></div>
          <div className="rd">
            <span>{ modalTitle }</span>
             <IconButton onClick={ handleCloseModal } color="primary">
              <CancelIcon />
            </IconButton>
          </div>

        </div>
        <DialogContent dividers>
            <br/>
            <div className="divStep">
              <div className="divContent">
                <div className="left">
                  <label>PROFILE NAME</label>
                </div>
                <div className="right">
                  <TextField value={ (roleObj.length > 0) ? roleObj[0].userTypeName : "" } variant="outlined" size="small" />
                </div>
              </div>
            </div>
            <br/>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext position="static" value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList variant="scrollable" allowScrollButtonsMobile onChange={handleChange}>
                    {
                      (AllMenuData.length > 0 ) ? AllMenuData.map((menu, index) => (
                        <Tab key={index} label={ menu.menuName } value={ (index + 1).toString() } />
                      )) : ""
                    }
                  </TabList>
                </Box>
                {
                  (AllMenuData.length > 0 ) ? AllMenuData.map((menu, index) => (
                    <TabPanel key={index} value={(index + 1).toString()}>
                      <ul>
                        {
                          menu.childMenus.map((child, index) => (
                            (child.menuCode === "History.GameBets") ?
                            <li key={index} onClick={ e => { setHistoryGameBets(!historyGameBets); handleClickEvnt(e, child.menuId, ((!historyGameBets) ? true : false) ) } } 
                            className={ (historyGameBets) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !historyGameBets ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "History.GameResult") ?
                            <li key={index} onClick={ e => { setHistoryGameResult(!historyGameResult); handleClickEvnt(e, child.menuId, ((!historyGameResult) ? true : false) ) } } 
                            className={ (historyGameResult) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !historyGameResult ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Wallet.Wallet") ?
                            <li key={index} onClick={ e => { setWallet(!wallet); handleClickEvnt(e, child.menuId, ((!wallet) ? true : false) ) } } 
                            className={ (wallet) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !wallet ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Profile.ProfileInformation") ?
                            <li key={index} onClick={ e => { setProfileInfo(!profileInfo); handleClickEvnt(e, child.menuId, ((!profileInfo) ? true : false) ) } }
                            className={ (profileInfo) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !profileInfo ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Profile.ResetPassword") ?
                            <li key={index} onClick={ e =>  { setresetPassword(!resetPassword); handleClickEvnt(e, child.menuId, ((!resetPassword) ? true : false) ) } } 
                            className={ (resetPassword) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !resetPassword ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "SuperAdmin.SuperAdmin") ?
                            <li key={index} onClick={ e => { setSuperAdmin(!SuperAdmin); handleClickEvnt(e, child.menuId, ((!SuperAdmin) ? true : false) ) } }
                            className={ (SuperAdmin) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !SuperAdmin ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "SuperAdmin.Company") ?
                            <li key={index} onClick={ e => { setCompany(!Company); handleClickEvnt(e, child.menuId, ((!Company) ? true : false) ) } } 
                            className={ (Company) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !Company ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "SuperAdmin.Branch") ?
                            <li key={index} onClick={ e => { setBranch(!Branch); handleClickEvnt(e, child.menuId, ((!Branch) ? true : false) ) } } 
                            className={ (Branch) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !Branch ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "SuperAdmin.Profiles") ?
                            <li key={index} onClick={ e => { setProfiles(!Profiles); handleClickEvnt(e, child.menuId, ((!Profiles) ? true : false) ) } }
                            className={ (Profiles) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !Profiles ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "UserAccount.SystemUsers") ?
                            <li key={index} onClick={ e => { setSystemUsers(!SystemUsers); handleClickEvnt(e, child.menuId, ((!SystemUsers) ? true : false) ) } }
                            className={ (SystemUsers) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !SystemUsers ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "UserAccount.Operators") ?
                            <li key={index} onClick={ e => { setOperators(!Operators); handleClickEvnt(e, child.menuId, ((!Operators) ? true : false) ) } } 
                            className={ (Operators) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !Operators ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "UserAccount.UserApproval") ?
                            <li key={index} onClick={ e => { setUserApproval(!UserApproval); handleClickEvnt(e, child.menuId, ((!UserApproval) ? true : false) ) } }
                            className={ (UserApproval) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !UserApproval ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "UserAccount.UserVerification") ?
                            <li key={index} onClick={ e => { setUserVerification(!UserVerification); handleClickEvnt(e, child.menuId, ((!UserVerification) ? true : false) ) } }
                            className={ (UserVerification) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !UserVerification ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "UserAccount.MasterAgents") ?
                            <li key={index} onClick={ e => { setMasterAgents(!MasterAgents); handleClickEvnt(e, child.menuId, ((!MasterAgents) ? true : false) ) } }
                            className={ (MasterAgents) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !MasterAgents ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "UserAccount.Agents") ?
                            <li key={index} onClick={ e => { setAgents(!Agents); handleClickEvnt(e, child.menuId, ((!Agents) ? true : false) ) } }
                            className={ (Agents) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !Agents ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "UserAccount.Players") ?
                            <li key={index} onClick={ e => { setPlayers(!Players); handleClickEvnt(e, child.menuId, ((!Players) ? true : false) ) } }
                            className={ (Players) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !Players ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Game.GameScheduleSettings") ?
                            <li key={index} onClick={ e => { setGameScheduleSettings(!GameScheduleSettings); handleClickEvnt(e, child.menuId, ((!GameScheduleSettings) ? true : false) ) } }
                            className={ (GameScheduleSettings) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !GameScheduleSettings ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Game.MechanicsSettings") ?
                            <li key={index} onClick={ e => { setMechanicsSettings(!MechanicsSettings); handleClickEvnt(e, child.menuId, ((!MechanicsSettings) ? true : false) ) } }
                            className={ (MechanicsSettings) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !MechanicsSettings ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Game.Price&Prizes") ?
                            <li key={index} onClick={ e => { setPriceAndPrizes(!PriceAndPrizes); handleClickEvnt(e, child.menuId, ((!PriceAndPrizes) ? true : false) ) } }
                            className={ (PriceAndPrizes) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !PriceAndPrizes ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Game.GameBets") ?
                            <li key={index} onClick={ e => { setGameGameBets(!gameGameBets); handleClickEvnt(e, child.menuId, ((!gameGameBets) ? true : false) ) } }
                            className={ (gameGameBets) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !gameGameBets ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Game.GameResult") ?
                            <li key={index} onClick={ e => { setGameGameResult(!gameGameResult); handleClickEvnt(e, child.menuId, ((!gameGameResult) ? true : false) ) } }
                            className={ (gameGameResult) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !gameGameResult ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Postings.TextBlast") ?
                            <li key={index} onClick={ e => { setTextBlast(!TextBlast); handleClickEvnt(e, child.menuId, ((!TextBlast) ? true : false) ) } }
                            className={ (TextBlast) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !TextBlast ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Postings.Announcements") ?
                            <li key={index} onClick={ e => { setAnnouncements(!Announcements); handleClickEvnt(e, child.menuId, ((!Announcements) ? true : false) ) } }
                            className={ (Announcements) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !Announcements ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Postings.LiveStreaming") ?
                            <li key={index} onClick={ e => { setLiveStreaming(!LiveStreaming); handleClickEvnt(e, child.menuId, ((!LiveStreaming) ? true : false) ) } } 
                            className={ (LiveStreaming) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !LiveStreaming ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Reporting.SalesReport") ?
                            <li key={index} onClick={ e => { setSalesReport(!SalesReport); handleClickEvnt(e, child.menuId, ((!SalesReport) ? true : false) ) } }
                            className={ (SalesReport) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !SalesReport ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Reporting.TransactionReport") ?
                            <li key={index} onClick={ e => { setTransactionReport(!TransactionReport); handleClickEvnt(e, child.menuId, ((!TransactionReport) ? true : false) ) } }
                            className={ (TransactionReport) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !TransactionReport ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            (child.menuCode === "Reporting.UserActivityReport") ?
                            <li key={index} onClick={ e => { setUserActivityReport(!UserActivityReport); handleClickEvnt(e, child.menuId, ((!UserActivityReport) ? true : false) ) } }
                            className={ (UserActivityReport) ? "active" : "" }>
                              { child.menuName } 
                              {
                                !UserActivityReport ? <CloseOutlinedIcon sx={{ color:"red "}} /> : <CheckOutlinedIcon sx={{ color: "green" }} />
                              }
                            </li>
                            :
                            ""
                          ))
                        }
                      </ul>
                    </TabPanel>
                  )) : ""
                }
              </TabContext>
            </Box>
            
            <div className="divStep">
              <div className="divContent">
                <div className="aligncenter">
                <Button type="submit" variant="contained" color="secondary" onClick={handleProfileSubmitOpen}>
                  Submit Profile
                </Button>
                </div>
              </div>
            </div>

        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmProfileSubmit } 
        handleCloseMessage={ handleProfileSubmitClose } 
        handleOkay={ handleProfileOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to update profile menus?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default AddEditProfile
