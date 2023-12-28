import React, { useState, useEffect } from 'react';
import ShowUserDetails from "../../Dialog/forms/ShowUserDetails";
import PageLoader from "../../widget/PageLoader";
import VerificationTableData from "./VerificationTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const VerificationList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  BackVerifyCallBack }) => {

  // Show Details dialog
  const [pageLoader, setPageLoader] = useState(false);
  const [userObjId, setUserObjId] = React.useState(null);
  const [skipUserInfo, setskipUserInfo] = React.useState(true);
  const [userInfo, setuserInfo] = React.useState(true);

  const [openDialog, setDialog] = React.useState(false);
  const handleDialogClose = () => { setDialog(false); };
  const handleDialogOpen = (userObjectId) => {
    if(userObjectId !== userObjId) {
      setPageLoader(true);
    }
    setUserObjId(userObjectId);
    setskipUserInfo(false);
    setDialog(true); 
  };

  const VerifyCallBack = (userAccountId) => {
    console.log(userAccountId);
    BackVerifyCallBack(userAccountId);
  }

  const results = SearchResults.map((obj, index ) => <VerificationTableData 
    key={ index } 
    objct={obj}
    handleShow = { handleDialogOpen }
    handleVerifyCallback = { VerifyCallBack }
  />)

  const content = results?.length ? results : 
  <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
      <TableCell component="th" align="center" scope="row" colSpan={5}> No records found!</TableCell>
  </TableRow>;

  const handleChangePage = (event, newpage) => {
    ChangePage(event, newpage);
  }

    return ( 
    <div className="userList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
                  <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>MOBILE NUMBER</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
            <TableBody>
              {content}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination 
            rowsPerPageOptions={[5,10,25,50]}
            rowsPerPage={ pageSize }
            page={!totalCount || totalCount <= 0 ? 0 : pageNumber}
            count={ totalCount }
            component="div"
            onPageChange={ handleChangePage }
            onRowsPerPageChange={ RowsPerPage }
        >
        </TablePagination>

        <ShowUserDetails
        isOpen={ openDialog } 
        handleClose={ handleDialogClose } 
        user={ (userInfo !== undefined) ? userInfo : null }
        isAgent={true}/>

        <PageLoader isLoadingPage={ pageLoader } />
      </div>    
    )
}

export default VerificationList
