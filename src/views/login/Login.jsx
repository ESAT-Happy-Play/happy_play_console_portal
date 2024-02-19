import "./login.scss";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Stack, InputAdornment, IconButton } from "@mui/material";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { setCredentials } from '../../redux/reducers/auth/AuthReducer';
import { setMenuState } from '../../redux/reducers/MenuStateReducer';
import { setAccountState } from '../../redux/reducers/AccountStateReducer';

import PageLoader from "../../components/widget/PageLoader";
import { StoreExt } from "../../utils/helpers";

import { MuiInput, MuiLoadingButton } from "../../components/mui";
import { ValidateUsername, ValidatePassword } from "../../utils/validations/ValidateLogin";
import { AuthService, AccountService } from "../../services";

const Login = () => {
  let loginObj = StoreExt.getStore("auth");
  // let deviceInfo = GetNEStoreObject("deviceInfo");

  const [pageLoader, setPageLoader] = useState(false);

  const dispatch = useDispatch();

  const formLogin = useForm({
    defaultValues: {
      username: "",
      password: "",
      ipAddress: "192.168.1.1"
    }
  });

  const { register, handleSubmit, formState } = formLogin;
  const { errors } = formState;
  const [eye, setEye] = useState(false);

  // handle basic validation
  const validate_username = ValidateUsername();
  const validate_password = ValidatePassword(eye);

  // Handle for password show/hide
  const handleEye = () => { setEye(!eye); }
  
  // Handle for login submit
  const loginHandler = async (data) => {
    setPageLoader(true);
    AuthService.authenticate(data).then((authResp) => {
      if (authResp) {
        dispatch(setCredentials(authResp.data));
        // get current user and menu
        AccountService.current().then((acctResp) => {
          if(acctResp) {
            dispatch(setMenuState(acctResp.data.acocuntMenus));
            dispatch(setAccountState(acctResp.data.account));
            window.location.reload(false);
          }
        });
      } else { setPageLoader(false); }
    });
  }

  useEffect(() => {
    // redirect to dashboard if already login
    if (loginObj !== null) {
      window.location.href = '/';
    }
  }, [loginObj]);

  return (
    <div className="login">
      <div className='loginContainer'>
        <div className="left"></div>
        <div className="right">
          <div className="rightHead">
            <LockPersonRoundedIcon />
            <h2>LOGIN</h2>
          </div>
          <form onSubmit={ handleSubmit(loginHandler) } noValidate>
            <Stack spacing={1} direction="row" m={2}>
              <MuiInput
                {...validate_username}
                register={register}
                isError={ !!errors.username }
                errorMsg={ errors.username?.message }/>
            </Stack>
            <Stack spacing={1} direction="row" m={2}>
              <MuiInput
                {...validate_password}
                register={register}
                isError={ !!errors.password }
                errorMsg={ errors.password?.message }
                inputProps={{
                  endAdornment:<InputAdornment position="end">
                    <IconButton onClick={ handleEye } size="small">
                      {!eye ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                    </IconButton>
                  </InputAdornment>
                }}/>
            </Stack>
            <Stack spacing={1} direction="row" m={2} sx={
              { 
                justifyContent: "end",
                marginRight: "15px" 
              }}>
              <MuiLoadingButton text="Login" type="submit" loading={ pageLoader } className="btn-success" size="medium"
                loadingPosition='end'
                icon={ <LoginRoundedIcon/> } />
            </Stack>
          </form>
        </div>
      </div>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  );
};

export default Login;