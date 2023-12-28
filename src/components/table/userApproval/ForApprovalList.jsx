import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ForApprovalTableData from "./ForApprovalTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import MessageDialog from '../../Dialog/MessageDialog';
import PageLoader from '../../widget/PageLoader';

import { BounceLetterLoader } from 'react-spinner-overlay';

const ForApprovalList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  ShowApproveDecline,
  deleteRequest,
  loading }) => {

  const [pageLoader, setPageLoader] = useState(false);
  const [openDialog, setDialog] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [objectId, setObjectId] = React.useState(null);

  const handleDialogClose = () => { setDialog(false); };
  const handleDialogOpen = (accountObjId) => { 
    setDialog(true);
    setObjectId(accountObjId);
  };

  const handleOkay = async () => {
    handleDialogClose();
  }

  const results = SearchResults.map((obj, index ) => <ForApprovalTableData 
    key={ index } 
    objct={obj}
    handleShow = { ShowApproveDecline }
    handleDelete= { handleDialogOpen }
  />)

  const content = (loading) ?
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" align="center" scope="row" colSpan={5}>
          <BounceLetterLoader loading={true} overlayColor="rgba(0,153,255,0.2)" />
        </TableCell>
    </TableRow>
  : results?.length ? results 
  : <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
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
                    <TableCell>REGISTRATION DATE</TableCell>
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

        <MessageDialog
        isOpenMessage={ openDialog } 
        handleCloseMessage={ handleDialogClose } 
        handleOkay={ handleOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to delete this users request?" }
        color={ "success" }
        isLoading={ submitLoading } />

        <PageLoader isLoadingPage={ pageLoader } />
      </div>    
    )
}

export default ForApprovalList
