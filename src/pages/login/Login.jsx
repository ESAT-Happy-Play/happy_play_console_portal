import "./login.scss";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { TextField, Stack, InputAdornment, IconButton } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { setRoleState } from '../../redux/reducers/RoleStateReducer';
import { setCredentials } from '../../redux/reducers/auth/AuthReducer';

import PageLoader from "../../components/widget/PageLoader";
import { GetStoreObject, GetNEStoreObject } from "../../helper/Helpers";

import { POSTFetch } from "../../api/ApiFetchBuilder";

const Login = () => {
  let loginObj = GetStoreObject("auth");
  let useRole = GetStoreObject("role");
  let deviceInfo = GetNEStoreObject("deviceInfo");

  const [pageLoader, setPageLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formLogin = useForm({
    defaultValues: {
      username: "",
      password: "",
      deviceName: deviceInfo.browserName,
      deviceModel: deviceInfo.osName,
      webSystemCode: "01"
    }
  });

  const { register, handleSubmit, formState } = formLogin;
  const { errors } = formState;
  const [eye, setEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle for password show/hide
  const handleEye = () => { setEye(!eye); }
  
  // Handle for login submit
  const loginHandler = async (data) => {
    setIsLoading(true);
    setPageLoader(true);
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/auth/login`, data);

    if(response.status) {
      dispatch(setCredentials(response.data));
      // goto dashboard page
      window.location.reload(false);
    }

    if(!response.status) {
      setIsLoading(false);
      setPageLoader(false);
      toast.error(response.data.errorMessage);
    }
  }

  useEffect(() => {
    // redirect to dashboard if already login
    if (loginObj !== null) {
      navigate('/');
    } else {

      // set user role
      if (useRole !== null) {
        if (useRole.role !== "Dashboard") {
          if(useRole !== null && useRole.role !== "Dashboard") {
            dispatch(setRoleState({ role: "Dashboard"}));
            window.location.reload(false);
          }
        }
      } else {
        // set role for Super Admin and Operator.
        dispatch(setRoleState({ role: "Dashboard"}));
        window.location.reload(false);
      }
    }
  }, [loginObj, useRole]);

  return (
    <div className="login">
      <div className='loginContainer'>
        <div className="left">
          <div className="leftHead"></div>
        </div>
        <div className="right">
        <div className="rightHead">
          <LockPersonRoundedIcon />
          <h2>LOGIN</h2>
        </div>
        <form onSubmit={ handleSubmit(loginHandler) } noValidate>
            <Stack spacing={1} direction="row" m={2}>
              <TextField 
                label="Mobile Number / Email"
                variant="outlined" 
                placeholder="Enter mobile number/email"
                { 
                  ...register("username", { required: "Mobile number/email is required" } ) 
                }
                error={ !!errors.username }
                helperText={ errors.username?.message }
                size="small"
                required
                fullWidth 
              />
            </Stack>
            <Stack spacing={1} direction="row" m={2}>
              <TextField 
                type={eye ? "text" : "password" }
                label="Password" 
                variant="outlined" 
                placeholder="Enter password"
                size="small"
                { 
                  ...register("password", 
                  { 
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "min length is 5"
                    } 
                  }) 
                }
                required
                error={ !!errors.password }
                helperText={ errors.password?.message }
                InputProps={{
                  endAdornment:<InputAdornment position="end">
                    <IconButton onClick={ handleEye } size="small">
                      {!eye ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                    </IconButton>
                  </InputAdornment>
                }}
                fullWidth 
              />
            </Stack>
            <Stack spacing={1} direction="row" m={2} sx={
              { 
                justifyContent: "end",
                marginRight: "15px" 
              }}>
              <LoadingButton type="submit" loading={ isLoading } sx={{ backgroundColor: "#319795" }} variant="contained" color="success" size="medium"
                loadingPosition='end'
                endIcon={ <LoginRoundedIcon/> }>
                Login
              </LoadingButton>
            </Stack>
          </form>
        </div>
      </div>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  );
};

export default Login;