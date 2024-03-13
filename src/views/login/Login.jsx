import "./login.scss";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { InputAdornment, IconButton } from "@mui/material";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { setCredentials } from '../../redux/reducers/auth/AuthReducer';
import { setMenuState } from '../../redux/reducers/MenuStateReducer';

import { StoreExt } from "../../utils/helpers";

import { MuiInput, MuiLoadingButton, ContentLoader } from "../../components/mui";
import { ValidateUsername, ValidatePassword } from "../../utils/validations/ValidateLogin";
import { AuthService, MenuService } from "../../services";

export const Login = () => {
  let loginObj = StoreExt.getStore("auth");
  // let deviceInfo = GetNEStoreObject("deviceInfo");

  const [pageLoader, setPageLoader] = useState(false);
  const [checkTerm, setCheckTerm] = useState(false);
  const [termError, settermError] = useState(false);

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
    if(!checkTerm) { settermError(true); }

    if (checkTerm) {
      setPageLoader(true);
      AuthService.authenticate(data).then((authResp) => {
        if (authResp) {
          let tokenObj = StoreExt.getDecodeJWT(authResp.data.token);
          dispatch(setCredentials(authResp.data));

          // get current user and menu
          MenuService.getSecrityGroupeMenu(tokenObj.RoleId).then((menuResp) => {
            if(menuResp) {
              dispatch(setMenuState(menuResp.data));
              window.location.reload(false);
            }
          });
        } else { setPageLoader(false); }
      });
    }
  }

  useEffect(() => {
    // redirect to dashboard if already login
    if (loginObj !== null) {
      window.location.href = '/';
    }
  }, [loginObj]);

  return (
    <>
      <div className="login">
        <div className='container'>
          <div className="content">
            <div className="top">
              <img src={require('../../assets/happy-play-logo.png')} className="logo" title="Esat Logo" />
            </div>
            <div className="div-newuser">
              <a href="/login/new">New User? Login Here</a>
            </div>
            <div className="div-login-title">
              <h3>Login</h3>
            </div>
            <form onSubmit={ handleSubmit(loginHandler) } noValidate>
              <div className="body">
                  
                  <div className="form-input">
                    <label htmlFor="mobileNumber">Username</label>
                    <MuiInput
                      {...validate_username}
                      register={register}
                      isError={ !!errors.username }
                      errorMsg={ errors.username?.message }/>
                  </div>
                  <div className="form-input">
                    <label htmlFor="password">Password</label>
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
                  </div>
                  <div className="form-button">
                    <a href="/forgot/password">Forgot Password?</a>
                    <MuiLoadingButton text="Login" variant="contained" type="submit" 
                      loading={ pageLoader } size="medium" color="primary"
                      loadingPosition='end'
                      icon={ <LoginRoundedIcon/> } />
                  </div>
                  
              </div>
              <br/>
              <hr />
              <div className="div-privacy">
                <div className="checkRequired">
                  { (termError) ? <span>Required *</span> : '' }
                </div>
                
                <FormControlLabel className={(!checkTerm) ? 'hasError' : ''}
                  control={
                    <Checkbox onChange={e => (setCheckTerm(!checkTerm), settermError(!termError))} />
                  } label={
                    <div className="div-agree">
                        <div className="div1">
                          <span>I agree to Happy Play's</span>
                          <a href={'/privacy'}>Privacy Policy</a>
                          <span> and </span>
                        </div>
                        <div className="div2">
                          <a href={'/terms'}>Terms of Use</a>
                        </div>
                    </div>
                  } />
              </div>
            </form>
          </div>
        </div>
        <ContentLoader isLoadingPage={ pageLoader } />
      </div>
    </>
  );
};