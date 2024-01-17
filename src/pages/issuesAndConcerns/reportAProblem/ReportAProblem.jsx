import "./reportaproblem.scss"

import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";

import SaveAsIcon from '@mui/icons-material/SaveAs';
import { TextField, MenuItem } from "@mui/material";
import { GETFetch } from "../../../api/ApiFetchBuilder";
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { IssuesAndConcernModel } from "../../../model/IssuesAndConcernModel";

import CustomTab from "../../../components/tab/CustomTab";
import PageLoader from "../../../components/widget/PageLoader";

import { POSTFetch } from "../../../api/ApiFetchBuilder";
import MessageDialog from "../../../components/Dialog/MessageDialog";

function ReportAProblem() {

  const formAddIssue = useForm({ defaultValues: IssuesAndConcernModel.AddIssueForm });
  const { register, handleSubmit, formState, reset } = formAddIssue;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const [pageLoader, setPageLoader] = useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [userdata, setuserdata] = useState(null);
  const tabHeaders = ["Issues", "Report Someone"];

  const [reportType, setreportType] = useState(0);
  const selectReportType = (newValue) => {
    setreportType(newValue);
  }

  const handleCategoryData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_SUPPORT_URL}/api/category/${reportType}`;
    let response = await GETFetch(url);
    setPageLoader(false);
    if (response.status) {
      setCategories(response.data.categories);
    } 
  }

  const handleCurrentUserData = async () => {
    let url = `${process.env.REACT_APP_API_URL}/users/currentuserdata`;
    let response = await GETFetch(url);

    if(response.status) {
      setuserdata(response.data.loggedInUserData);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  useEffect(() => {
    handleCategoryData();
    handleCurrentUserData();
  }, [reportType]);

  const submitHandler = async (data) => {
    setFormData(data);
    handleSubmitOpen();
  }

  // Confiration dialog message
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleProblemOkay = async () => {
    let formObj = {
      owner: {
          userId: userdata.userId,
          mobileNumber: userdata.mobileNumber,
          firstName: (userdata.firstname !== null) ? userdata.firstname : "",
          lastName: (userdata.lastname !== null) ? userdata.lastname : "",
          middleName: (userdata.middlename !== null) ? userdata.middlename : "",
          email: (userdata.email !== null) ? userdata.email : ""
        },
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        organizationId: (reportType !==0) ? 9 : 9,
        attachments: []
    };

    setSubmitLoading(true);
    let response = await POSTFetch(`${process.env.REACT_APP_SUPPORT_URL}/api/case`, formObj);
    setSubmitLoading(false);

    if (response.status) {
      toast.success("report successfully submitted!");
      handleSubmitClose();
      reset(formValues => ({
        ...formValues,
        title: "",
        description: "",
        categoryId: "",
      }));
    } else {
      toast.error("Error creating report!");
    }
  }

  return (
    <div className="content">
      <div >
        <CustomTab changeEvent={selectReportType} tabList={
          tabHeaders.map((labelP) => ({ label: labelP, Component:
            <div style={{display:'flex', justifyContent:'center'}}>
              <div className="container divreport" style={{width:'535px'}}>
                <form onSubmit={handleSubmit(submitHandler)} noValidate>
                  <div className="divright" style={{ margin: '15px 15px 0px 15px', background:'none' }}>
                    <div className="div-r-content" style={{paddingRight:'40px'}}>
                      <div className="div-cont">
                        <p>Section</p>
                        <TextField
                          {
                          ...register("categoryId", { required: false })
                          }
                          error={!!errors.categoryId}
                          helperText={errors.categoryId?.message}
                          label="Section / Page Name" style={{ minWidth: "66%" }} defaultValue="" variant="outlined" size="small" select>
                          <MenuItem value=''><em>Section / Page Name</em></MenuItem>
                          {
                            (categories.length !== 0) ? categories.map((item) => (
                              <MenuItem key={item.categoryId} value={item.categoryId}>
                                {item.name}
                              </MenuItem>
                            ))
                              : (pageLoader) ? <MenuItem value=''>Loading options...</MenuItem>
                                : <MenuItem value=''>No records found!</MenuItem>
                          }
                        </TextField>
                      </div>

                      <div className="div-cont">
                        <p>{(reportType !==0) ? "User" : "Title"}</p>
                        <TextField
                          {
                          ...register("title", { required: false })
                          }
                          error={!!errors.title}
                          helperText={errors.title?.message} variant="outlined" size="small" fullWidth />
                      </div>
                      <div className="div-cont">
                        <p>Report Description</p>
                        <TextField
                          {
                          ...register("description", { required: false })
                          }
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          variant="outlined"
                          className="report-text-area"
                          size="small" multiline fullWidth />
                      </div>
                      <br />
                      <div className="div-cont" style={{justifyContent:'end'}}>
                        <Button type="submit" variant="contained" color="success">
                          Submit &nbsp; <SaveAsIcon/>
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          }))
        } />
      </div>
      <PageLoader isLoadingPage={pageLoader} />

      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleProblemOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to report problem?" }
        color={ "success" }
        isLoading={ submitLoading } />
    </div>
  )
}

export default ReportAProblem
