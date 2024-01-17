import "./reportaproblem.scss"

import React, { useState, useEffect } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Card } from "../../../components/card/Card";
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { LoadingButton } from '@mui/lab';
import { TextField, MenuItem } from "@mui/material";
import { GETFetch, POSTFetch } from "../../../api/ApiFetchBuilder";

import { useForm } from 'react-hook-form';
import { IssuesAndConcernModel } from "../../../model/IssuesAndConcernModel";

import CustomTab from "../../../components/tab/CustomTab";
import { GetStoreObject } from "../../../helper/Helpers";

function ReportAProblem() {
  let loginObj = GetStoreObject("auth");

  const formAddIssue = useForm({ defaultValues: IssuesAndConcernModel.AddIssueForm });
  const { register, handleSubmit, formState, reset } = formAddIssue;
  const { errors } = formState;
  const [formData, setFormData] = React.useState({});

  const [multiplier, setMultiplier] = React.useState(700);
  const [currentAccount, setcurrentAccount] = React.useState(loginObj);

  const [pageLoader, setPageLoader] = useState(false);

  const [categories, setCategories] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const getUserInformation = async () => {
    let url = `${process.env.REACT_APP_API_URL}/account/${loginObj.userId}`;
    let response = await GETFetch(url);

    if (response.status) {
      if (!!response.data.userData) {
        setcurrentAccount(response.data.userData);
      }
    }
  }

  const handleCategoryData = async () => {
    setPageLoader(true);
    let url = `${process.env.REACT_APP_SUPPORT_URL}/api/category`;
    let response = await GETFetch(url);

    if (response.status) {
      setCategories(response.data.categories);
    }
  }

  const handleOrganizationData = async () => {
    // setPageLoader(true);
    let url = `${process.env.REACT_APP_SUPPORT_URL}/api/organization`;
    let response = await GETFetch(url);
    setPageLoader(false);
    if (response.status) {
      setOrganizations(response.data.organization);
    }
  }

  const createNewCaseRequest = async (request) => {
    setPageLoader(true);
    if (!!!request.owner.email)
      request.owner.email = "";

    if (!!!request.owner.firstName)
      request.owner.email = "";

    if (!!!request.owner.lastName)
      request.owner.email = "";

    if (!!!request.owner.middleName)
      request.owner.email = "";

    let response = await POSTFetch(`${process.env.REACT_APP_SUPPORT_URL}/api/case`, request);
    setPageLoader(false);

    if (response.status) {
      toast.success("report successfully submitted!");

      reset(formValues => ({
        ...formValues
      }));
    }
  }

  const submitSystemIssue = async (data) => {
    let request = {
      "owner": currentAccount,
      "title": data.title,
      "description": data.description,
      "categoryId": data.categoryId,
      "organizationId": 5,
      "attachments": []
    }

    await createNewCaseRequest(request);
  }

  const submitReportSomeone = async (data) => {
    let request = {
      "owner": currentAccount,
      "title": data.title,
      "description": data.description,
      "categoryId": data.categoryId,
      "organizationId": 9,
      "attachments": []
    }

    await createNewCaseRequest(request);
  }



  const handleSelect = () => {

  }

  const handleFileUpload = () => {

  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  useEffect(() => {
    handleCategoryData();
    handleOrganizationData();
    getUserInformation();
    reset(formValues => ({
      ...formValues
    }));
  }, []);

  const tabs = [
    {
      label: "Issues",
      Component:
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="container divreport" style={{ width: '535px' }}>
            <form onSubmit={handleSubmit(submitSystemIssue)} noValidate>
              <div className="divright" style={{ margin: '15px 15px 0px 15px', background: 'none' }}>
                <div className="div-r-content" style={{ paddingRight: '40px' }}>
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
                        (categories.length !== 0) ? categories.filter(o => o.type == 0).map((item) => (
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
                    <p>Title</p>
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
                  <br /><br />
                  {/* <div className="div-cont" style={{justifyContent:'end'}}>
                  <div>
                    <LoadingButton loading={false}
                      component="label" variant="contained" loadingPosition='end' endIcon={<FilterIcon />}>
                      Supporting Attachment
                      <VisuallyHiddenInput type="file" {...register("validIdImageFront", { required: false })} name="validIdImageFront" accept="image/*" onChange={(e) => handleFileUpload(e, e.target.files[0])} />
                    </LoadingButton>
                    <br />
                    <div className="div-imgUpload">
                        <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                    </div>
                  </div>
                </div> */}
                  <br />
                  <div className="div-cont" style={{ justifyContent: 'end' }}>
                    <Button type="submit" variant="contained" color="success">
                      Submit &nbsp; <SaveAsIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    },
    {
      label: "Report Someone",
      Component:
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="container divreport" style={{ width: '535px' }}>
            <form onSubmit={handleSubmit(submitReportSomeone)} noValidate>
              <div className="divright" style={{ margin: '15px 15px 0px 15px', background: 'none' }}>
                <div className="div-r-content" style={{ paddingRight: '40px' }}>
                  <div className="div-cont">
                    <p>Category</p>
                    <TextField
                      {
                      ...register("categoryId", { required: false })
                      }
                      error={!!errors.categoryId}
                      helperText={errors.categoryId?.message}
                      label="Category" style={{ minWidth: "66%" }} defaultValue="" variant="outlined" size="small" select>
                      <MenuItem value=''><em>Category</em></MenuItem>
                      {
                        (categories.length !== 0) ? categories.filter(o => o.type == 1).map((item) => (
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
                    <p>User</p>
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
                  <br /><br />
                  {/* <div className="div-cont" style={{justifyContent:'end'}}>
              <div>
                <LoadingButton loading={false}
                  component="label" variant="contained" loadingPosition='end' endIcon={<FilterIcon />}>
                  Supporting Attachment
                  <VisuallyHiddenInput type="file" {...register("validIdImageFront", { required: false })} name="validIdImageFront" accept="image/*" onChange={(e) => handleFileUpload(e, e.target.files[0])} />
                </LoadingButton>
                <br />
                <div className="div-imgUpload">
                    <img className="imgFiles" src={`${process.env.PUBLIC_URL}/empty.jpg`} salt="" />
                </div>
              </div>
            </div> */}
                  <br />
                  <div className="div-cont" style={{ justifyContent: 'end' }}>
                    <Button type="submit" variant="contained" color="success">
                      Submit &nbsp; <SaveAsIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    }
  ];

  return (
    <div className="content">
      <CustomTab
        tabList={tabs}
      />
    </div>
  )
}

export default ReportAProblem
