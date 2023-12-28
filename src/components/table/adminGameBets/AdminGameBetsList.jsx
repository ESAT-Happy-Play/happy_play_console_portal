import React from 'react';
import AdminGameBetsTableData from "./AdminGameBetsTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { toast } from 'react-toastify';
import ShowBetDetails from "../../Dialog/forms/ShowBetDetails";
import { ChunckArry } from "../../../helper/Helpers";

const AdminGameBetsList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  handleLoader }) => {
  
  const [itemObj, setitemObj] = React.useState(null);
  const [itemValObj, setitemValObj] = React.useState(null);

  const [openDialog, setDialog] = React.useState(false);
  const handleDialogClose = () => { setDialog(false); };
  const handleDialogOpen = () => {
    setDialog(true); 
  };

  const handleOnView = async (itemObj) => {
    setitemObj(itemObj);
  }

  const results = SearchResults.map((obj, index ) => <AdminGameBetsTableData 
    key={ index }
    onView= { handleOnView }
    objct={obj}
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
                    <TableCell>ACCOUNT NAME</TableCell>
                    <TableCell>TRANSACTION #</TableCell>
                    <TableCell>NO. OF CARDS</TableCell>
                    <TableCell>TOTAL AMOUNT</TableCell>
                    <TableCell>RECRUITER</TableCell>
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
        
        <ShowBetDetails 
          isOpen={ openDialog } 
          handleClose={ handleDialogClose } 
          itemObj={ itemObj }
          itemValObj={ itemValObj } />
    </div>
  )
}

export default AdminGameBetsList
