import WithdrawalRequestsTableData from "./WithdrawalRequestsTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const WithdrawalRequestsList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  ApproveDecline,
  isLoading}) => {

    const results = SearchResults.map(obj => <WithdrawalRequestsTableData 
      key={obj.requestId} 
      dataObj={obj} 
      handleAppDec={ApproveDecline}
    />)
    

    const content = isLoading ? 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={5}> Loading... Please wait! </TableCell>
    </TableRow> : results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={5}> No records found! </TableCell>
    </TableRow>;

    const handleChangePage = (event, newpage) => {
      ChangePage(event, newpage);
    }

    return ( 
    <div className="WithdrawalRequestsList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>AMOUNT</TableCell>
                <TableCell>MODE</TableCell>
                <TableCell>REQUEST DATE</TableCell>
                <TableCell>ACTION</TableCell>
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
      </div>    
    )
}

export default WithdrawalRequestsList
