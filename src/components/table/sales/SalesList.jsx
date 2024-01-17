import SalesTableData from "./SalesTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const SalesList = ({ 
  SearchResults,
  // ChangePage,
  // RowsPerPage,
  // pageNumber, 
  // pageSize, 
  // totalCount,
  isLoading}) => {

    const results = SearchResults.sort( (a,b) => b.id - a.id ).map((obj, i) => <SalesTableData 
      key={i} 
      dataObj={obj}
      uniqKey= {i}
    />)
    

    const content = isLoading ? 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={12}> Loading... Please wait! </TableCell>
    </TableRow> : results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={12}> No records found! </TableCell>
    </TableRow>;

    // const handleChangePage = (event, newpage) => {
    //   ChangePage(event, newpage);
    // }

    return ( 
    <div className="SalesList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>1PM</TableCell>
                <TableCell>2PM</TableCell>
                <TableCell>3PM</TableCell>
                <TableCell>4PM</TableCell>
                <TableCell>5PM</TableCell>
                <TableCell>6PM</TableCell>
                <TableCell>7PM</TableCell>
                <TableCell>8PM</TableCell>
                <TableCell>9PM</TableCell>
                <TableCell>10PM</TableCell>
                <TableCell>11PM</TableCell>
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

export default SalesList
