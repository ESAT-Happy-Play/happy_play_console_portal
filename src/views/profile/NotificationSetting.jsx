import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { IOSSwitch } from '../../components/switch/IOSSwitch';

function NotificationSetting() {
    const [isEdit, setisEdit] = useState(false);

    return (
    <>
        <div className='div-profile-conainer'>
            <div className='div-profilecontent'>
                <div className='profile-form-input' style={{justifyContent:'space-between'}}>
                    <span className='spanFixW'>In-App Notifications</span>
                    <IOSSwitch checked={true} />
                </div>
                <div className='profile-form-input' style={{justifyContent:'space-between'}}>
                    <span className='spanFixW'>SMS Notifications</span>
                    <IOSSwitch checked={true} />
                </div>
                <div className='profile-form-input' style={{justifyContent:'space-between'}}>
                    <span className='spanFixW'>Email Notifications</span>
                    <IOSSwitch checked={true} />
                </div>
            </div>
        </div>
    </>
    )
}

export default NotificationSetting
