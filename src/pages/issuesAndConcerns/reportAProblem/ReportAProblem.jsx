import "./reportaproblem.scss"

import React, { useState, useEffect } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Card } from "../../../components/card/Card";
import { Box } from '@mui/material';
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import FilterIcon from '@mui/icons-material/Filter';
import { TextField, MenuItem } from "@mui/material";
import { GETFetch } from "../../../api/ApiFetchBuilder";

import { useForm } from 'react-hook-form';

import CustomTab from "../../../components/tab/CustomTab";

function ReportAProblem() {
  const caseForm = useForm();
  const { register, handleSubmit, formState, reset } = caseForm;
  const { errors } = formState;

  const [multiplier, setMultiplier] = React.useState(700);

  const [pageLoader, setPageLoader] = useState(false);

  const [categories, setCategories] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const submitHandler = async (data) => {
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
    setPageLoader(true);
    let url = `${process.env.REACT_APP_SUPPORT_URL}/api/organization`;
    let response = await GETFetch(url);
    setPageLoader(false);
    if (response.status) {
      setOrganizations(response.data.organization);
    }
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
  }, []);

  const tabs = [
    {
      label: "Issues",
      Component:
        <div className="container divreport">
          <form onSubmit={handleSubmit(submitHandler)} noValidate>
            <div className="divright" style={{ margin: '15px 15px 0px 15px' }}>
              <div className="div-r-content">
                <div className="div-cont">
                  <p>Section</p>
                  <TextField
                    onChange={e => handleSelect(e, e.target.value)}
                    label="Section / Page Name" style={{ minWidth: "250px" }} defaultValue="" variant="outlined" size="small" select>
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
                  <p>Title</p>
                  <TextField
                    {
                    ...register("title", { required: false })
                    }
                    error={!!errors.firstname}
                    helperText={errors.firstname?.message} variant="outlined" size="small" fullWidth />
                </div>
                <div className="div-cont">
                  <p>Report Description</p>
                  <TextField
                    {
                    ...register("description", { required: false })
                    }
                    error={!!errors.middlename}
                    helperText={errors.middlename?.message}
                    variant="outlined"
                    className="report-text-area"
                    size="small" multiline fullWidth />
                </div>
                <div className="div-cont">
                  <LoadingButton loading={false}
                    style={{ width: '280px', padding: '6px', backgroundColor: '#4845d2' }}
                    component="label" variant="contained" color="success" loadingPosition='end' endIcon={<FilterIcon />}>
                    Upload Supporting Attachment
                    <VisuallyHiddenInput type="file" {...register("validIdImageFront", { required: false })} name="validIdImageFront" accept="image/*" onChange={(e) => handleFileUpload(e, e.target.files[0])} />
                  </LoadingButton>
                </div>
              </div>
            </div>
          </form>
        </div>
    },
    {
      label: "Report Someone",
      Component:
        <div className="div-multiplier">
          <Card
            body={
              <div className="mult-body">
                <p>Winning equivalent per 1 peso bet</p>
              </div>
            }
          />
        </div>
    }
  ];

  return (
    <div className="content">
      <CustomTab
        tabList={tabs}
      />
      {/* <PageLoader isLoadingPage={ pageLoader } /> */}
    </div>
  )
}

export default ReportAProblem
