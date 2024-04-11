import "./profile.scss";
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/card/Card';
import { ContentLoader } from "../../components/mui";
import ProfileVerticalTab from '../../components/tab/ProfileVerticalTab';
import GameInfo from "./GameInfo";
import PersonalDetails from "./PersonalDetails";
import AddressInfo from "./AddressInfo";
import ProfessionalInfo from "./ProfessionalInfo";
import NotificationSetting from "./NotificationSetting";
import PasswordInfo from "./PasswordInfo";

import { StoreExt } from "../../utils/helpers";
import { UserService, ImageService } from "../../services";

export const Profile = () => {
    let authdata = StoreExt.getStore("auth");
    const [pageLoader, setPageLoader] = useState(false);
    const [userInfo, setuserInfo] = useState(null);
    const [profileImage, setprofileImage] = React.useState(null);

    const initImages = (fileName) => {
        ImageService.getImage(fileName).then((res) => {
            if(res.success) { setprofileImage(res.data); }
        })
    }

    const handleInitUserInfo = () => {
      setPageLoader(true);
      UserService.systemUserInfo(authdata.id).then((resp) => {
        if(resp) { 
          setuserInfo(resp.data);
          
          if(resp.data.profilePath !== null) {
            initImages(resp.data.profilePath);
          }
        }
        setPageLoader(false);
      })
    }

    useEffect(() => {
        handleInitUserInfo();
    }, []);

    const tabComponents = () => { return [
        { label: (profileImage !== null) ? <img src={profileImage} style={{width:'180px', height:'180px', borderRadius:'50%', objectFit:'cover', padding:'15px'}} />
          : <img src="/no-image.jpg" style={{width:'180px', height:'180px', borderRadius:'50%', objectFit:'cover', padding:'15px'}} />
        , itemId: 0, isHeader: true },
        { label: "About You", itemId: 1, isHeader: true },
        { label: "Game Info", itemId: 1001, Component: 
          (userInfo !== null) ? <GameInfo dataObj={userInfo} profileImage={profileImage} /> 
          : <div style={{padding:'25px'}}>Loading...Please wait.</div>, isHeader: false },
        { label: "Personal Details", itemId: 1002, Component: <PersonalDetails dataObj={userInfo} />, isHeader: false },
        { label: "Address", itemId: 1003, Component: <AddressInfo dataObj={userInfo} />, isHeader: false },
        { label: "Professional Info", itemId: 1004, Component: <ProfessionalInfo dataObj={userInfo} />, isHeader: false },
        { label: "Preferences", itemId: 2, isHeader: true },
        { label: "Notifications", itemId: 1005, Component: <NotificationSetting />, isHeader: false },
        { label: "Account", itemId: 3, isHeader: true },
        { label: "Password", itemId: 1006, Component: <PasswordInfo />, isHeader: false },
    ]};
    
    return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <Card 
        style={{width:"70%", margin:'10px', padding:'0px'}} 
        bodystyle={{padding:'0px'}}
        header={null}
        body={
          <div className="tab-container">
            <ProfileVerticalTab
              tabList={tabComponents()} />
          </div>
        }
      />
      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Profile
