import React, { useState, useEffect } from 'react';
import "./../../dialogform.scss";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, MenuItem, Button  } from "@mui/material"

import SaveAsIcon from '@mui/icons-material/SaveAs';
import MessageDialog from "../../MessageDialog";

import { DrawTypes } from "../../../../helper/Enums";
import { FormatDateMMDDYY } from "../../../../helper/Helpers";

// Models
import { GameModel } from "../../../../model/GameModel";
import { POSTFetch } from "../../../../api/ApiFetchBuilder";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));
  
const PostResultRegular = ({ isOpenAdd, handleCloseAdd, handleCallback }) => {

  const formPostResult = useForm({ defaultValues: GameModel.PostResultForm });
  const { register, handleSubmit, formState, reset } = formPostResult;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});
  const [submitLoading, setSubmitLoading] = React.useState(false);

  useEffect(() => {
    reset(formValues => ({
        ...formValues,
        gametype: "01"
    }));
  }, []);

  // final step submit handler
  const submitHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  };

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleOkay = async () => {
    setSubmitLoading(true);
    let submitData = {
        gametype: formData.gametype,
        drawtype: formData.drawtype,
        drawdate: FormatDateMMDDYY(formData.drawdate),
        numresult: `${formData.numresult1}-${formData.numresult2}-${formData.numresult3}`,
    }
    let response = await POSTFetch(`${process.env.REACT_APP_API_URL}/gameresults/postresult`, submitData);
    // if(response.status) {
    //   toast.success(response.data.message);
    //   handleSubmitClose();
    //   handleCallback();
    // }

    // if(!response.status) {
    //   setSubmitLoading(false);
    //   toast.error(response.data.errorMessage);
    // }
    toast.success(`Regular game result posted successfully.`);
    reset(formValues => ({
        ...formValues,
        gametype: "01",
        drawtype: "",
        drawdate: "",
        numresult1: "",
        numresult2: "",
        numresult3: "",
    }));
    handleSubmitClose();
    handleCallback();
  };

  return (
    <>
      <BootstrapDialog className="divDialogForm-small"
        open={ isOpenAdd }
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">Regular Game Result</div>
        </div>
        <DialogContent dividers>
          <div className="divStep">
            <form onSubmit={ handleSubmit(submitHandler) } noValidate> 
              <div className="divContent">
                <div className="left" style={{flex:'none', width:'100px'}}>
                  <label>Draw Date</label>
                </div>
                <div className="right">
                  <TextField 
                    type='date'
                    { 
                      ...register("drawdate", { required: true }) 
                    }
                    error={ !!errors.drawdate }
                    helperText={ errors.drawdate?.message }
                    variant="outlined" size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left" style={{flex:'none', width:'100px'}}>
                  <label>Draw Type</label>
                </div>
                <div className="right">
                  <TextField style={{textAlign:'left'}}
                    label="Select draw type"
                    { 
                        ...register("drawtype", { required: true }) 
                    }
                    error={ !!errors.drawtype }
                    helperText={ errors.drawtype?.message }
                    variant="outlined" defaultValue="" size="small" fullWidth select>
                    <MenuItem value=""><em>Select draw type</em></MenuItem>
                        { 
                            DrawTypes().map((item, index) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                            ))
                        }
                    </TextField>
                </div>
              </div>

              <div>
                <p style={{fontSize:'15px', textTransform:'none'}}>
                    <b style={{color:'red'}}>NOTE: </b>
                    The three boxes takes numbers from 2-10 and letters A,J,K,Q only.
                </p>
                <p style={{fontSize:'15px', textTransform:'none'}}>
                    *** 2-10 digits, A=ace, J=jack, K=king, Q=queen ***
                </p>
              </div>

              <div style={{display:'flex', gap:'5px', justifyContent:'center', padding:'25px', background:'#edf2f7', borderRadius:'5px', marginBottom:'25px'}}>
                <TextField autoFocus
                    { 
                      ...register("numresult1", { required: true }) 
                    }
                    error={ !!errors.numresult1 }
                    helperText={ errors.numresult1?.message }
                    style={{width:'60px'}}
                    inputProps={{style: {fontSize: '2rem', textTransform:'uppercase'}}}
                    onInput= {(e) =>{ e.target.value = e.target.value.toString().slice(0,1) }}
                    variant="outlined" size="small" fullWidth />
                <TextField 
                    { 
                      ...register("numresult2", { required: true }) 
                    }
                    error={ !!errors.numresult2 }
                    helperText={ errors.numresult2?.message }
                    style={{width:'60px'}}
                    inputProps={{style: {fontSize: '2rem', textTransform:'uppercase'}}}
                    onInput= {(e) =>{ e.target.value = e.target.value.toString().slice(0,1) }}
                    variant="outlined" size="small" fullWidth />
                <TextField 
                    { 
                      ...register("numresult3", { required: true }) 
                    }
                    error={ !!errors.numresult3 }
                    helperText={ errors.numresult3?.message }
                    style={{width:'60px'}}
                    inputProps={{style: {fontSize: '2rem', textTransform:'uppercase'}}}
                    onInput= {(e) =>{ e.target.value = e.target.value.toString().slice(0,1) }}
                    variant="outlined" size="small" fullWidth />
              </div>

              <div className="divContent">
                <div className="left"></div>
                <div className="right divFoot">
                <Button onClick={ handleCloseAdd } variant="outlined">Close</Button>
                <Button type="submit" sx={{ backgroundColor: "#38a169" }} variant="contained" color="success">
                  Submit &nbsp; <SaveAsIcon/>
                </Button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want post this result?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </>
  )
}

export default PostResultRegular
