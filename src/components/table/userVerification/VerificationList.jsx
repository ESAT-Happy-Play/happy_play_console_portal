import VerificationTableData from "./VerificationTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const VerificationList = ({ 
  searchResults,
  // ChangePage,
  // RowsPerPage,
  // pageNumber, 
  // pageSize, 
  // totalCount,
  isLoading}) => {

    const results = searchResults.map(verfication => <VerificationTableData 
      key={verfication.userId} 
      objct={verfication}
    />)
    

    const content = isLoading ? 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={3}> Loading... Please wait! </TableCell>
    </TableRow> : results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={3}> No records found! </TableCell>
    </TableRow>;

    // const handleChangePage = (event, newpage) => {
    //   ChangePage(event, newpage);
    // }

    return ( 
    <div className="verificationList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>FULL NAME</TableCell>
                <TableCell>VERIFICATION REQUEST DATE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content}
            </TableBody>
          </Table>
        </TableContainer>
      </div>    
    )
}

export default VerificationList
