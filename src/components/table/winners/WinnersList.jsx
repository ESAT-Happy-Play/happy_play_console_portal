import WinnersTableData from "./WinnersTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const WinnersList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  isLoading}) => {

    const results = SearchResults.map((obj, index )=> <WinnersTableData 
      key={index}
      uniqueId= {index}
      dataObj={obj} 
    />)
    

    const content = isLoading ? 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={8}> Loading... Please wait! </TableCell>
    </TableRow> : results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={8}> No records found! </TableCell>
    </TableRow>;

    // const handleChangePage = (event, newpage) => {
    //   ChangePage(event, newpage);
    // }

    return ( 
    <div className="WinnersList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ACCT #</TableCell>
                <TableCell>ACCT NAME</TableCell>
                <TableCell>TRXN #</TableCell>
                <TableCell>NUM BET</TableCell>
                <TableCell>BET AMOUNT</TableCell>
                <TableCell>WINNING AMOUNT</TableCell>
                <TableCell>RECRUITER</TableCell>
                <TableCell>WIN TYPE</TableCell>
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

export default WinnersList
