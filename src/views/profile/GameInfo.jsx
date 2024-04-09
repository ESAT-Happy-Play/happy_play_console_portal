import React, { useEffect, useState } from 'react';

import { DateExt } from "../../utils/helpers";
import EditIcon from '@mui/icons-material/Edit';

import { DragDropEditProfile, ContentLoader } from "../../components/mui";
import { UserService } from '../../services';

function GameInfo ({ dataObj, profileImage }) {
  const [pageLoader, setPageLoader] = useState(false);
  const [profileImg, setprofileImg] = useState(null);
  const [isEditImage, setisEditImage] = useState(false);
  
  const handleOnView = (filePrev) => {
    setprofileImg(filePrev);
  }

  const handleImageCallback = (fileName, uploadType) => {
    setPageLoader(true);
    UserService.updateProfileImage(fileName).then((res) => {
      window.location.reload(false);
    });
  }

  return (
    <div className='div-profile-conainer'>
      <div className='div-profilecontent'>
        {
          (profileImg !== null) ? 
            <div>
              <img src={profileImg} alt="profile" />
            </div>
          : (profileImage !== null) ? 
            <div>
              <img src={profileImage} alt="profile" />
            </div>
          : <div>
              <img src="/no-image.jpg" alt="profile" />
          </div> 
        }
        <div className='editImgProfileIcon'>
          {
            (isEditImage) ?
            <div>
              <DragDropEditProfile onView={handleOnView} callBack={handleImageCallback} />
              <p style={{margin:'3px'}} onClick={() => setisEditImage(false)}>Cancel</p>
            </div>
            :
            <div onClick={() => setisEditImage(true)}>
              <EditIcon style={{fontSize:'18px'}} />
              <p style={{margin:'1px'}}><b>Update</b></p>
            </div>
          }
        </div>
        
        <div className='profile-form-input'>
            <span className='spanFixW'>Mobile Number</span>
            <b>{ dataObj.mobileNumber }</b>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Display Name</span>
            <b>{ dataObj.fullname }</b>
        </div>
        <br/>
        <div className='profile-form-input'>
            <span className='spanFixW'>Company Name</span>
            <b>{ dataObj.companyName }</b>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Branch Name</span>
            <b>{ dataObj.branch }</b>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Registration Date</span>
            <b>{ DateExt.readableDate(dataObj.createdOn) }</b>
        </div>
        <div className='profile-form-input'>
            <span className='spanFixW'>Role</span>
            <b>{ dataObj.roleName }</b>
        </div>
      </div>

      <ContentLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default GameInfo 
