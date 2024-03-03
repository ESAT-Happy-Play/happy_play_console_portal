import "./company.scss";

import * as React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Button } from "@mui/material";

import PageLoader from "../../components/widget/PageLoader";
import { CompanyService } from "../../services";
import { DateExt } from "../../utils/helpers"
import { ConfirmMessage, AddEditCompany } from "../../components/mui/modals";

export const CompanyDetails = () => {
  // get url parameter
  const { id } = useParams();

  const [submitLoader, setsubmitLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [companyInfo, setcompanyInfo] = useState(null);

  const handleLoadCompany = () => {
    setPageLoader(true);
    CompanyService.getCompanyDetails(id).then((resp) => {
      if(resp) {
        setcompanyInfo(resp.data);
      }
      setPageLoader(false);
    });
  }

  const handleBack = () => {
    window.location.href = '/companies';
  }

  // dialog
  const [openEditCompany, setEditCompany] = React.useState(false);
  const handleEditCompanyOpen = () => { setEditCompany(true); };
  const handleEditCompanyClose = () => { setEditCompany(false); };

  const [formData, setFormData] = React.useState({});
  const handleCallback = (data) => {
    console.log(data);
    setFormData(data)
    handleSubmitOpen();
  }

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleSubmitOkay = async () => {
    setsubmitLoader(true);
    CompanyService.UpdateCompany({
      companyId: companyInfo.companyId,
      companyName: formData.companyName,
      region: formData.region,
      province: formData.province,
      municipality: formData.municipality,
      barangay: formData.barangay,
      streetOrPurok: formData.streetOrPurok
    })
    .then((resp) => {
      if (resp) {
        toast.success(`${formData.companyName} updated successfully.`);
        handleSubmitClose();
        handleEditCompanyClose();

        //reload page after 2 sec
        setTimeout(function() {
          window.location.reload(false);
        }, 2000);
      }
      setsubmitLoader(false);
    });
  };

  useEffect(() => {
    handleLoadCompany();
  }, []);

  return (
    <div className="div-table">
      <div className="div-container">
        <div className="div-head">
          <Button variant="text" size="medium" onClick={handleBack}>
            <ArrowBackIosIcon />
          </Button>
          <h3 className="title">Company Information</h3>
          <div></div>
        </div>
        <div className="div-body">
          <div className="div-content1">
            <h3 className="title">{(companyInfo !== null) ? companyInfo.companyName : "" }</h3>
            <div style={{display:'flex', gap:'10px'}}>
              <span style={{marginTop:'5px'}}>{(companyInfo !== null) ? companyInfo.address : "" }</span>
              <Button variant="text" size="medium" onClick={handleEditCompanyOpen}>
                <ModeEditOutlineIcon />
              </Button>
            </div>
          </div>
          <div className="div-content2">
              <div className="content1">
                <div>
                  <h1>{(companyInfo !== null) ? companyInfo.numberOfBranch : "" }</h1>
                  <span>No. of Branches</span>
                </div>
              </div>
              <div className="content2">
                <div>
                  <h1>{(companyInfo !== null) ? (companyInfo.dashboardUserCount + companyInfo.acountingUserCount + companyInfo.supportUserCount) : "" }</h1>
                  <span>No. of System Users</span>
                  <div className="user-group">
                    <div>
                      <span>{(companyInfo !== null) ? companyInfo.dashboardUserCount : "" }</span>
                      <p>Dashboard</p>
                    </div>
                    <div>
                      <span>{(companyInfo !== null) ? companyInfo.acountingUserCount : "" }</span>
                      <p>Accounting</p>
                    </div>
                    <div>
                      <span>{(companyInfo !== null) ? companyInfo.supportUserCount : "" }</span>
                      <p>Support</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div style={{textAlign:'center'}}>
            <p>Registration Date: {(companyInfo !== null) ? (DateExt.readableDate(companyInfo.createdOn)) : "" }</p>
          </div>
        </div>
      </div>

      <AddEditCompany isOpen={ openEditCompany } handleClose={ handleEditCompanyClose } handleCallback={handleCallback} itemData={companyInfo} />
      <ConfirmMessage 
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleSubmitOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to edit company?" }
        color={ "success" }
        isLoading={ submitLoader }/>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}