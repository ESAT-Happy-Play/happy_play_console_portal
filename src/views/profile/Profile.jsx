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

export const Profile = () => {
    const [pageLoader, setPageLoader] = useState(false);

    const handeTabChange = (newVal) => { console.log(newVal); }

    const tabComponents = () => { return [
        { label:
          <img src='/default-profile.jpg' style={{width:'180px', height:'180px', borderRadius:'50%', objectFit:'cover', padding:'15px'}} />
        , itemId: 0, isHeader: true },
        { label: "About You", itemId: 1, isHeader: true },
        { label: "Game Info", itemId: 1001, Component: <GameInfo />, isHeader: false },
        { label: "Personal Details", itemId: 1002, Component: <PersonalDetails />, isHeader: false },
        { label: "Address", itemId: 1003, Component: <AddressInfo />, isHeader: false },
        { label: "Professional Info", itemId: 1004, Component: <ProfessionalInfo />, isHeader: false },
        { label: "Preferences", itemId: 2, isHeader: true },
        { label: "Notifications", itemId: 1005, Component: <NotificationSetting />, isHeader: false },
        { label: "Account", itemId: 3, isHeader: true },
        { label: "Password", itemId: 1006, Component: <PasswordInfo />, isHeader: false },
    ]};
    
    return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <Card 
        style={{width:"70%", margin:'10px'}} 
        bodystyle={{padding:'0px'}}
        header={null}
        body={
          <div className="tab-container">
            <ProfileVerticalTab
              changeEvent={handeTabChange}
              tabList={tabComponents()} />
          </div>
        }
      />
      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Profile
