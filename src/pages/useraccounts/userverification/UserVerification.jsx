import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import PageLoader from '../../../components/widget/PageLoader';
import VerificationSearchBar from '../../../components/table/userVerification/VerificationSearchBar';
import VerificationList from '../../../components/table/userVerification/VerificationList';
import MessageDialog from '../../../components/Dialog/MessageDialog';

import { GetStoreObject, GetJWTStoreObject } from "../../../helper/Helpers";
import { Roles } from "../../../helper/Objects";

const UserVerification = () => {
  // Enum roles
  let roles = Roles();
  // auth api response object
  let loginObj = GetStoreObject("auth");
  // token object
  let tokenObj = GetJWTStoreObject(loginObj.token);
  // loginObj.companyObjId
  // loginObj.branchId
  // loginObj.isMain
  // loginObj.accountObjectId
  // loginObj.branchName

  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(true);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  // table state
  const [CompanyId, setCompanyId] = useState((tokenObj.RoleId !== roles.Admin) ? loginObj.companyObjId : null);

  const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [PageSize, setPageSize] = useState(_PAGESIZE);
  
  const [userList, setUserList] = useState([]);

  // On click search
  const handleSearch = (event, value) => { 
    setSearchValue(value);
    setPageNumber(0);
    setPageSize(_PAGESIZE);
    setPageLoader(true);
  }

  // Trigger on search empty
  const handleSearchEmpty = (event, value) => {
    if (value === "") {
      setSearchValue("");
      setPageNumber(0);
      setPageSize(_PAGESIZE);
      setPageLoader(true);
    }
  }

  // handle table next page
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  // Confiration dialog message
  const [userObjectId, setUserObjectId] = React.useState(false);
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = (userAccountId) => { 
    setConfirmSubmit(true);
    setUserObjectId(userAccountId);
  };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleVerifyOkay = async () => {
    console.log("Submit Verification");
  };

  const ResetVerification = () => {
    handleSubmitClose();
    setTotalRows(totalRows + 1);
    setPageLoader(false);
  }

  return (
    <div className="content">
      <div  className="container">
        <div className="top">
          <h2 className="title">USERS FOR VERIFICATION</h2>
        </div>
        <div className="row p-15">
          <div className="col-12">
            <VerificationSearchBar handleSearch={ handleSearch } handleSearchEmpty={ handleSearchEmpty } />
          </div>
        </div>

        <div className="row p-15">
          <div className="col-12">
            <VerificationList
            SearchResults={ userList }
            ChangePage = { handleChangePage }
            RowsPerPage = { handleRowsPerPage }
            pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
            pageSize = { PageSize } 
            totalCount = { totalRows }
            BackVerifyCallBack = { handleSubmitOpen } />
          </div>
        </div>

      </div>

      <MessageDialog
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleVerifyOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to verify this user?" }
        color={ "success" }
        isLoading={ submitLoading } />
      
      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default UserVerification
