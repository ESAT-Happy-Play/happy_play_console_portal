import "./indexpage.scss";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Button } from "@mui/material";

import { LoadingButton } from '@mui/lab';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

// import { setRoleState } from '../../redux/reducers/RoleStateReducer';
import { setCredentials } from '../../redux/reducers/auth/AuthReducer';

import PageLoader from "../../components/widget/PageLoader";
import { GetStoreObject, GetNEStoreObject } from "../../helper/Helpers";

const IndexPage = () => {
  let loginObj = GetStoreObject("auth");
  // let useRole = GetStoreObject("role");
  let deviceInfo = GetNEStoreObject("deviceInfo");

  const [pageLoader, setPageLoader] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="indexpage">
      <div className='indexContainer'>
        <div className="right">
            <div className="rightHead" style={{display:'block', textAlign:'center', marginBottom:'15px'}}>
                <h2>HAPPY PLAY</h2>
            </div>
            <Button component={Link} href={`/register`} variant="outlined" size="small">
                Happy Play Registration
            </Button>
            <Button component={Link} href={`/dashboard/login`} variant="outlined" size="small">
                Happy Play Dashboard
            </Button>
            <Button component={Link} href={`/console/login`} variant="outlined" size="small">
                Happy Play Console
            </Button>
        </div>
      </div>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  );
};

export default IndexPage;