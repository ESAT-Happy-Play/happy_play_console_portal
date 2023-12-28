import "./mechanicssetting.scss";
import React, { useState, useEffect } from 'react';
import { TextField, Button  } from "@mui/material";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditMechanicSetting from "../../../components/Dialog/forms/EditMechanicSetting";

import PageLoader from "../../../components/widget/PageLoader";

const MechanicsSetting = () => {
  const [pageLoader, setPageLoader] = useState(true);
  const [skipGamebyId, setSkipGamebyId] = React.useState(true);
  const [gameGuid, setGameGUid] = React.useState(null);
  const [gamelist, setGameList] = React.useState([]);

    // Edit Setting dialog
  const [openEditSetting, setEditSetting] = React.useState(false);
  const handleEditSettingOpen = () => { setEditSetting(true); };
  const handleEditSettingClose = () => { setEditSetting(false); };

  const handleEditCallback = () => {
    setTimeout(function(){
      window.location.reload(false);
    }, 2000);
  }

  return (
    <div className="content">
      <div className="container">

        <div className="divMechanics">
          <div className="divContent">
              <div className="left">
                <div className="container">
                  <div className="top">
                    <h2 className="title">No. Of Cards At Once</h2>
                  </div>

                  <br/>
                  <div className="ulContent">
                    <TextField disabled value={(gamelist.length > 0) ? gamelist[0].maxBetPerDraw : 0 } variant="outlined" size="small" fullWidth />
                    <br/><br/>
                    <Button onClick={e => handleEditSettingOpen() } variant="contained" color="warning" size="large">
                      Edit <EditOutlinedIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      <EditMechanicSetting 
      isOpenAddSetting={ openEditSetting } 
      handleCloseEditSetting={ handleEditSettingClose } 
      handleCallback={ handleEditCallback } gameObj={ gamelist }/>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default MechanicsSetting
