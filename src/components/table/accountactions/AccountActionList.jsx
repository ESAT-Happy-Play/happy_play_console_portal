import AccountActionTableData from "./AccountActionTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const AccountActionList = ({ 
  SearchResults,
  // ChangePage,
  // RowsPerPage,
  // pageNumber, 
  // pageSize, 
  // totalCount,
  isLoading}) => {

    const results = SearchResults.map((obj, i) => <AccountActionTableData 
      key={i} 
      uniqueKey={i}
      dataObj={obj} 
    />)
    

    const content = isLoading ? 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={7}> Loading... Please wait! </TableCell>
    </TableRow> : results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={7}> No records found! </TableCell>
    </TableRow>;

    // const handleChangePage = (event, newpage) => {
    //   ChangePage(event, newpage);
    // }

    return ( 
    <div className="AccountActionList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Cases</TableCell>
                <TableCell>Cancellation Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination 
          rowsPerPageOptions={[5,10,25,50]}
          rowsPerPage={ pageSize }
          page={!totalCount || totalCount <= 0 ? 0 : pageNumber}
          count={ totalCount }
          component="div"
          onPageChange={ handleChangePage }
          onRowsPerPageChange={ RowsPerPage }
        >
        </TablePagination> */}
      </div>    
    )
}

export default AccountActionList
