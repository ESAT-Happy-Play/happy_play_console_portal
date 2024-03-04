import React, { useState, useEffect } from 'react';
import "../modal.scss";
import { toast } from 'react-toastify';

import { styled } from '@mui/material/styles';
import { TextField, MenuItem, Button  } from "@mui/material";

import { useForm } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { ConfirmMessage } from "../index";
import { DefaultAddress } from "../../index";
import { BranchService } from "../../../../services";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

export const AddBranch = ({ isOpen, handleClose, handleCallback, companies = [] }) => {
    const formBanch = useForm({ defaultValues: {
        companyId: "",
        branchName: "",
        region: "",
        province: "",
        municipality: "",
        barangay: "",
        streetOrPurok: ""
    } });
    const { register, handleSubmit, formState, reset } = formBanch;
    const { errors } = formState;
    const [formData, setFormData] = React.useState({});
    const [pageLoader, setPageLoader] = useState(false);

    // final step submit handler
    const submitHandler = async (data) => {
        setFormData(data);
        handleSubmitOpen();
    };

    // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleSubmitOkay = async () => {
    setPageLoader(true);
    BranchService.addBranch(formData)
    .then((resp) => {
      if (resp) {
        toast.success(`${formData.branchName} added successfully.`);
        //reload page after 2 sec
        setTimeout(function() {
          window.location.reload(false);
        }, 2000);
      }
    });
  };

return (
    <>
    <BootstrapDialog className="medium-modal-dialog"
        open={ isOpen }
        disableEscapeKeyDown
      >
        <div className="modal-head">
            <h2>Create Branch</h2>
            <IconButton onClick={ handleClose } color="primary">
                <CancelIcon />
            </IconButton>
        </div>
        <DialogContent dividers>
            <form onSubmit={handleSubmit(submitHandler)} noValidate>
                <div className="modal-body">
                    <div className='form-div'>
                        <div className="form-input">
                            <div className="form-title">
                                <label>Company Name</label>
                                <span className="required">*</span>
                            </div>
                            <TextField type="text" placeholder="Company Name" size="small" 
                            {  ...register("companyId", { required: true } ) }
                            error={ !!errors.companyId }
                            fullWidth select>
                            <MenuItem value=""><em>Select company</em></MenuItem>
                            { 
                                (companies.length > 0) ?
                                companies.map((item, index) => (
                                    <MenuItem key={item.companyId} value={item.companyObjectId}>
                                        {item.companyName}
                                    </MenuItem>
                                ))
                                : <></>
                            }
                            </TextField>
                        </div>
                    </div>
                    <div className='form-div'>
                        <div className="form-input">
                            <div className="form-title">
                                <label>Branch Name</label>
                                <span className="required">*</span>
                            </div>
                            <TextField type="text" placeholder="Branch Name" size="small" 
                            {  ...register("branchName", { required: true } ) }
                            error={ !!errors.branchName }
                            fullWidth/>
                        </div>
                    </div>
                    <br />
                    <div className='groupTitle'>
                        <h4>Location</h4>
                        <hr />
                    </div>
                    <DefaultAddress register={register} errors={errors} />
                </div>
                <div className='modal-footer'>
                    <Button type='submit' variant='contained' size="medium">
                        Create Branch <AddIcon />
                    </Button>
                </div>
          </form>
        </DialogContent>
      </BootstrapDialog>

      <ConfirmMessage 
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleSubmitOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to add new branch?" }
        color={ "success" }
        isLoading={ pageLoader }/>
    </>
    )
}