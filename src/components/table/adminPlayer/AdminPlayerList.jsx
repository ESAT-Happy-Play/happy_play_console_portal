import React from 'react';

import AddWallet from "../../Dialog/forms/AddWallet";
import AdminPlayerTableData from "./AdminPlayerTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const AdminPlayerList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  pageLoad }) => {

    const [AccountObjectID, setAccountObjectID] = React.useState(null);
    const [openAddWallet, setAddWallet] = React.useState(false);
    const handleWalletOpen = () => { setAddWallet(true); };
    const handleAddWalletClose = () => { setAddWallet(false); };

    const handleAddWallet = (e, accountObjId) => {
      setAccountObjectID(accountObjId);
      handleWalletOpen();
    }

    const results = SearchResults.map((obj, index ) => <AdminPlayerTableData 
      key={ index } 
      objct={obj}
      addWallet={ handleAddWallet }
    />)

    const content = (pageLoad) 
    ? <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
          <TableCell component="th" align="center" scope="row" colSpan={5}> Loading... Please wait. </TableCell>
      </TableRow>
    : results?.length ? results : 
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
                    <TableCell>COMPANY NAME</TableCell>
                    <TableCell>BRANCH NAME</TableCell>
                    {/* <TableCell>MASTER AGENT</TableCell> */}
                    <TableCell>AGENT</TableCell>
                    <TableCell>PLAYER</TableCell>
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

        <AddWallet isOpenModal={openAddWallet} acctObjID={AccountObjectID} handleCloseModal={handleAddWalletClose} />
    </div>
  )
}

export default AdminPlayerList
