import ForApprovalTableData from "./ForApprovalTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const ForApprovalList = ({ 
  SearchResults,
  ShowObjInfo,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  isLoading}) => {

    const results = SearchResults.map(obj => <ForApprovalTableData 
      key={obj.userId} 
      dataObj={obj} 
      handleShowInfo={ShowObjInfo}
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
    <div className="ForApprovalList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>REGISTRATION DATE</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>CONTACT NUMBER</TableCell>
                <TableCell>REGISTRATION TYPE</TableCell>
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

export default ForApprovalList
