import AgentSendCreditTableData from "./AgentSendCreditTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const AgentSendCreditsList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  isLoading}) => {

    const results = SearchResults.map((obj, index) => <AgentSendCreditTableData 
      key={index} 
      indexId={index} 
      dataObj={obj} 
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
    <div className="AgentSendCreditsList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>AMOUNT</TableCell>
                <TableCell>MODE</TableCell>
                <TableCell>REQUEST DATE</TableCell>
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

export default AgentSendCreditsList
