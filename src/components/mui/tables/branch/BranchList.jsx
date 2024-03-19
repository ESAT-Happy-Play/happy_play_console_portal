import BranchListData from "./BranchListData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

export const BranchList = ({ 
  listData,
  changePage,
  rowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  isLoading,
  onView,
}) => {

    const results = listData.map(item => <BranchListData 
      key={item.branchId} 
      branch={item}
    />)
    

    const content = isLoading ? 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={5}> Loading... Please wait! </TableCell>
    </TableRow> : results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={5}> No records found! </TableCell>
    </TableRow>;

    const handleChangePage = (event, newpage) => {
      changePage(event, newpage);
    }

    return ( 
    <div className="div-table-list">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Branch Name</TableCell>
                <TableCell align="center">System Users</TableCell>
                <TableCell>Registration Date</TableCell>
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
          onRowsPerPageChange={ rowsPerPage }
        >
        </TablePagination>
      </div>    
    )
}