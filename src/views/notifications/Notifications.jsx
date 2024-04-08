import './notification.scss';
import React, { useEffect, useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { DateExt } from "../../utils/helpers";

export const Notifications = () => {

  const [notificationList, setnotificationList] = useState(null);

  const initNotificationTable = () => {
    let notificationData = [
      {
        id: 1, title: 'This is a notif 1', description: 'This is a test description', 
        createdOn: '03/04/2024', isRead: false
      },
      {
        id: 2, title: 'This is a notif 2', description: 'This is a test description 1', 
        createdOn: '09/04/2024', isRead: true
      },
      {
        id: 3, title: 'This is a notif 3', description: 'This is a test description 2', 
        createdOn: '03/07/2024', isRead: true
      },
      {
        id: 4, title: 'This is a notif 4', description: 'This is a test description 3', 
        createdOn: '10/04/2024', isRead: true
      },
      {
        id: 5, title: 'This is a notif 5', description: 'This is a test description 4', 
        createdOn: '09/07/2024', isRead: true
      },
      {
        id: 6, title: 'This is a notif 6', description: 'This is a test description 5', 
        createdOn: '05/08/2024', isRead: true
      }
    ];

    setnotificationList(notificationData);
  }

  useEffect(() => {
      initNotificationTable();
  }, []);

  return (
    <div className='notif-container'>
      <div className='notif-head'>
        <div>
          <span className='span'>You have 1 unread notification(s)</span>
        </div>
        <div className='head-action'>
          <Button variant="text" className='btn-active'>All</Button>
          <Button variant="text">Read</Button>
          <Button variant="text">Unread</Button>
          <div className='div-devider'></div>
          <Button variant="text" style={{textTransform:'none',color:'black'}}>Mark all as read</Button>
        </div>
      </div>

      <div className='notif-body'>
        {
          (notificationList !== null) ?
          notificationList.map((item, index) => (
            <div className='notif-content' key={index}>
              <div className='div-first'>
                <div><NotificationsIcon /></div>
                <div>
                  <p><b>{item.title}</b></p>
                  <p style={{fontSize:'13px'}}>{item.description}</p>
                </div>
              </div>
              <div>
                <p className='p-center'>{DateExt.readableDate(item.createdOn)}</p>
              </div>
              <div className='div-last'>
                {
                  (!item.isRead) ? 
                  <>
                    <p className='p-center'>Unread</p>
                    {/* <CheckIcon />  */}
                  </>
                  : <p className='p-center'>Read</p>
                }
              </div>
            </div>
          ))
          : <></>
        }
      </div>
    </div>
  )
}
