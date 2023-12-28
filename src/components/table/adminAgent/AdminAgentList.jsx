import AdminAgentTableData from "./AdminAgentTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const AdminAgentList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount }) => {

    const results = SearchResults.map((obj, index ) => <AdminAgentTableData 
      key={ index } 
      objct={obj}
    />)

    const content = results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" align="center" scope="row" colSpan={4}> No records found! Please select company. </TableCell>
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
                    <TableCell>COMPANY NAME</TableCell>
                    <TableCell>BRANCH NAME</TableCell>
                    <TableCell>MASTER AGENT</TableCell>
                    <TableCell>AGENT NAME</TableCell>
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

export default AdminAgentList
