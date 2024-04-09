import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IOSSwitch } from '../../components/switch/IOSSwitch';
import { ContentLoader } from "../../components/mui";
import { AccountSettingService, UserService } from '../../services';

function NotificationSetting() {
    const [pageLoader, setPageLoader] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const [accountSetting, setaccountSetting] = useState(null);

    // inAppNotification
    // smsNotification
    // emailNotification

    const handleInitSetting = () => {
        setPageLoader(true);    
        AccountSettingService.getSettings().then((res) => {
            if (res) { setaccountSetting(res.data);}
            setPageLoader(false);
        })
    }

    const handleInAppNotify = (event) => {
        setPageLoader(true);
        UserService.updateAccountSetting({
            inAppNotification: event.target.checked,
            smsNotification: accountSetting.smsNotification,
            emailNotification: accountSetting.emailNotification,
        }).then((res) => {
            if(res) { handleInitSetting(); }
            setPageLoader(false);
        });
    }

    const handleSmsNotify = (event) => {
        setPageLoader(true);
        UserService.updateAccountSetting({
            inAppNotification: accountSetting.inAppNotification,
            smsNotification: event.target.checked,
            emailNotification: accountSetting.emailNotification,
        }).then((res) => {
            if(res) { handleInitSetting(); }
            setPageLoader(false);
        });
    }

    const handleEmailNotify = (event) => {
        setPageLoader(true);
        UserService.updateAccountSetting({
            inAppNotification: accountSetting.inAppNotification,
            smsNotification: accountSetting.smsNotification,
            emailNotification: event.target.checked,
        }).then((res) => {
            if(res) { handleInitSetting(); }
            setPageLoader(false);
        });
    }

    useEffect(() => {
        handleInitSetting();
    }, []);

    return (
    <>
        <div className='div-profile-conainer'>
            <div className='div-profilecontent'>
                {
                    (accountSetting !== null) ?
                    <>
                        <div className='profile-form-input' style={{justifyContent:'space-between'}}>
                            <span className='spanFixW'>In-App Notifications</span>
                            <IOSSwitch onClick={e => handleInAppNotify(e)} checked={accountSetting.inAppNotification} />
                        </div>
                        <div className='profile-form-input' style={{justifyContent:'space-between'}}>
                            <span className='spanFixW'>SMS Notifications</span>
                            <IOSSwitch onClick={e => handleSmsNotify(e)} checked={accountSetting.smsNotification} />
                        </div>
                        <div className='profile-form-input' style={{justifyContent:'space-between'}}>
                            <span className='spanFixW'>Email Notifications</span>
                            <IOSSwitch onClick={e => handleEmailNotify(e)} checked={accountSetting.emailNotification} />
                        </div>   
                    </>
                    : <div style={{padding:'25px'}}>Loading...Please wait.</div>
                }
            </div>
        </div>

        <ContentLoader isLoadingPage={ pageLoader } />
    </>
    )
}

export default NotificationSetting
