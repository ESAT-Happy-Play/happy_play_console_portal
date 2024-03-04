import "./branch.scss";

import * as React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Button } from "@mui/material";

import PageLoader from "../../components/widget/PageLoader";
import { BranchService } from "../../services";
import { DateExt } from "../../utils/helpers"
import { EditBranch } from "../../components/mui/modals";

export const BranchDetails = () => {
  // get url parameter
  const { id } = useParams();

  const [pageLoader, setPageLoader] = useState(false);
  const [itemInfo, setitemInfo] = useState(null);

  const handleLoadData = () => {
    setPageLoader(true);
    BranchService.getBranchDetails(id).then((resp) => {
      if(resp) {
        console.log(resp);
        setitemInfo(resp.data);
      }
      setPageLoader(false);
    });
  }

  const handleBack = () => {
    window.location.href = '/branches';
  }

  // dialog
  const [openEditModal, setEditModal] = React.useState(false);
  const handleEditModalOpen = () => { setEditModal(true); };
  const handleEditModalClose = () => { setEditModal(false); };

  const handleModalCallback = () => {
    setPageLoader(true);
  }

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <div className="div-table">
      <div className="div-container">
        <div className="div-head">
          <Button variant="text" size="medium" onClick={handleBack}>
            <ArrowBackIosIcon />
          </Button>
          <h3 className="title">Branch Information</h3>
          <div></div>
        </div>
        <div className="div-body">
          <div className="div-content1">
            <h3 className="title">{(itemInfo !== null) ? itemInfo.branchName : "" }</h3>
            <div style={{display:'flex', gap:'10px'}}>
              <span style={{marginTop:'5px'}}>{(itemInfo !== null) ? itemInfo.address : "" }</span>
              <Button variant="text" size="medium" onClick={handleEditModalOpen}>
                <ModeEditOutlineIcon />
              </Button>
            </div>
          </div>
          <div className="div-content2">
              <div className="content2" style={{border:'none'}}>
                <div>
                  <h1>{(itemInfo !== null) ? (itemInfo.dashboardUserCount + itemInfo.acountingUserCount + itemInfo.supportUserCount) : "" }</h1>
                  <span>No. of System Users</span>
                  <div className="user-group">
                    <div>
                      <span>{(itemInfo !== null) ? itemInfo.dashboardUserCount : "" }</span>
                      <p>Dashboard</p>
                    </div>
                    <div>
                      <span>{(itemInfo !== null) ? itemInfo.acountingUserCount : "" }</span>
                      <p>Accounting</p>
                    </div>
                    <div>
                      <span>{(itemInfo !== null) ? itemInfo.supportUserCount : "" }</span>
                      <p>Support</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div style={{textAlign:'center'}}>
            <p>Registration Date: {(itemInfo !== null) ? (DateExt.readableDate(itemInfo.createdOn)) : "" }</p>
          </div>
        </div>
      </div>
      <EditBranch isOpen={ openEditModal } handleClose={ handleEditModalClose } />
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}