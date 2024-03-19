import React from 'react';
import "../modal.scss";
import { toast } from 'react-toastify';

import { styled } from '@mui/material/styles';
import { TextField, MenuItem, Button  } from "@mui/material";

import { useForm } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
// import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { DefaultAddress } from "../../index";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2), },
    '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

export const EditBranch = ({ isOpen, handleClose, handleCallback }) => {
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

    // final step submit handler
    const submitHandler = async (data) => {
        setFormData(data);
    };
return (
    <>
    <BootstrapDialog className="medium-modal-dialog"
        open={ isOpen }
        disableEscapeKeyDown
      >
        <div className="modal-head">
            <h2>Edit Branch</h2>
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
                        Update Branch <ModeEditOutlineIcon />
                    </Button>
                </div>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </>
    )
}