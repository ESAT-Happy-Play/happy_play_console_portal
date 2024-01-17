import ViolationsTableData from "./ViolationsTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const ViolationsList = ({ 
  SearchResults,
  // ChangePage,
  // RowsPerPage,
  // pageNumber, 
  // pageSize, 
  // totalCount,
  ProcessAct,
  isLoading}) => {

    const results = SearchResults.map((obj, i) => <ViolationsTableData 
      key={i} 
      uniqueKey={i}
      dataObj={obj} 
      handleProcessAct={ProcessAct}
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
    <div className="ViolationsList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>On-Going Cases</TableCell>
                <TableCell>Total Cases</TableCell>
                <TableCell>Action</TableCell>
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

export default ViolationsList
