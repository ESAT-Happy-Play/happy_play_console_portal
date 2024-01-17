import "./../../dialogform.scss";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { TextField, Button, MenuItem } from "@mui/material";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MessageDialog from "../../MessageDialog";

import { GETFetch, PATCHFetch, POSTFetch } from "../../../../api/ApiFetchBuilder";

// import { GetStoreObject } from "../../../../helper/Helpers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2), },
  '& .MuiDialogActions-root': { padding: theme.spacing(1), },
}));

const ProcessCase = ({ isOpenAdd, handleCloseAdd, handleCallback, objData }) => {
  //   let loginObj = GetStoreObject("auth");
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [loggedInUserData, setLoggedInUserData] = useState({});
  const [taggedUserData, setTaggedUserData] = useState({});
  const [categories, setCategories] = useState([]);
  
  const formProcess = useForm({ defaultValues: { desctiption: "", tagUserId: "" } });
  const { register, handleSubmit, formState, reset } = formProcess;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  // submit handler
  const submitHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  };
  
  const handleCategoryData = async () => {
    let url = `${process.env.REACT_APP_SUPPORT_URL}/api/category/1`;
    let response = await GETFetch(url);
    if (response.status) {
      setCategories(response.data.categories);
    } 
  }

  const handleCurrentUserData = async () => {    
    let url = `${process.env.REACT_APP_API_URL}/users/currentuserdata`;
    let response = await GETFetch(url);

    if (response.status) {
      setLoggedInUserData(response.data.loggedInUserData);
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const submitCaseComment = async (userData) => {
    let url = `${process.env.REACT_APP_SUPPORT_URL}/api/casecomment`;
    const data = {
      "caseId": objData.caseId,
      "title": objData.title,
      "description": objData.description,
      "categoryId": objData.categoryId,
      "organizationId": objData.organizationId,
      "statusId": 4,
      "reportedPersonId": 0,
      "remarks": "completed",
      "importance": objData.importance,
      "comment": formData.desctiption,
      "commentAccount": {
        "userId": loggedInUserData.userId,
        "mobileNumber": loggedInUserData.mobileNumber,
        "firstName": loggedInUserData.firstname,
        "lastName": loggedInUserData.lastname,
        "middleName": loggedInUserData.middlename,
        "email": ""
      },
      "reportedPerson": {
        "userId": userData.userId,
        "mobileNumber": userData.userId,
        "firstName": userData.firstName,
        "lastName": userData.lastName,
        "middleName": userData.middleName,
        "email": ""
      },
      "attachments": []
    };

    let response = await POSTFetch(url, data);

    if (response.status) {
      if (objData.organizationId == 9) {
        await submitViolation();
      }
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const submitViolation = async () => {
    const categoryName = categories.find(o => o.categoryId == objData.categoryId)?.name ?? "";
    let url = `${process.env.REACT_APP_API_URL}/violations`;
    const data = {
      "userId": taggedUserData.userId, // logged user
      "caseId": `${objData.caseId}`,
      "title": objData.title,
      "description": objData.description,
      "violationTypeId": objData.categoryId, // categoryId
      "violationType": categoryName, // name
      "parmuserid": loggedInUserData.userId // tagged user Id
    };

    let response = await POSTFetch(url, data);

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  const getUserDataByUserId = async () => {
    let url = `${process.env.REACT_APP_API_URL}/account/${formData.tagUserId}`;
    let response = await GETFetch(url);

    if (response.status) {
      await submitCaseComment(response.data.userData);
    }

    if (!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleProcessOkay = async () => {
    setSubmitLoading(true);
    await getUserDataByUserId();
    setSubmitLoading(false);
    toast.success("Successfully processed.");
    handleSubmitClose();
    handleCallback();
  };

  useEffect(() => {
    handleCategoryData();
    handleCurrentUserData();
  }, []);

  return (
    <>
      <BootstrapDialog className="divDialogForm-small"
        open={isOpenAdd}
        disableEscapeKeyDown
      >
        <div className="dialogHeader">
          <div className="rd">Confirm Process Case</div>
        </div>
        <DialogContent dividers>
          <div id="step1" className="divStep">
            <form onSubmit={handleSubmit(submitHandler)} noValidate>
              <div className="divContent">
                <div className="left">
                  <label>Category</label>
                </div>
                <div className="right">
                  <TextField disabled variant="outlined" defaultValue={(objData !== null) ? objData.category : '...'} size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>User / Title</label>
                </div>
                <div className="right">
                  <TextField disabled variant="outlined" defaultValue={(objData !== null) ? objData.title : '...'} size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>Reason</label>
                </div>
                <div className="right">
                  <TextField variant="outlined"
                    placeholder="Explain the problem"
                    {
                    ...register("desctiption", { required: true })
                    }
                    error={!!errors.desctiption}
                    helperText={errors.desctiption?.message}
                    multiline maxRows={4} size="small" fullWidth />
                </div>
              </div>

              <div className="divContent">
                <div className="left">
                  <label>Tagged User</label>
                </div>
                <div className="right">
                  <TextField {
                    ...register("tagUserId", { required: true })
                  } variant="outlined" defaultValue="" size="small" fullWidth />
                </div>
              </div>

              <br />
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                <Button onClick={handleCloseAdd} variant="outlined">Cancel</Button>
                <Button type="submit" className="btnSuccess" variant="contained">
                  Submit
                </Button>
              </div>
            </form>
          </div>

        </DialogContent>
      </BootstrapDialog>

      <MessageDialog
        isOpenMessage={openConfirmSubmit}
        handleCloseMessage={handleSubmitClose}
        handleOkay={handleProcessOkay}
        title={"Confirmation"}
        content={"Are you sure you want to process case?"}
        color={"error"}
        isLoading={submitLoading} />
    </>
  )
}

export default ProcessCase
