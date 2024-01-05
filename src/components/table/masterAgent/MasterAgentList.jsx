import MasterAgentTableData from "./MasterAgentTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const MasterAgentList = ({ 
  searchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  isLoading}) => {

    const results = searchResults.map(magent => <MasterAgentTableData 
      key={magent.userId}
    />)
    

    const content = isLoading ? 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={6}> Loading... Please wait! </TableCell>
    </TableRow> : results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={6}> No records found! </TableCell>
    </TableRow>;

    const handleChangePage = (event, newpage) => {
      ChangePage(event, newpage);
    }

    return ( 
    <div className="masterAgentList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>COMPANY</TableCell>
                <TableCell>BRANCH</TableCell>
                <TableCell >MASTER AGENT NAME</TableCell>
                <TableCell>AGENTS</TableCell>
                <TableCell>CONTACT NUMBER</TableCell>
                <TableCell>REGISRATION DATE</TableCell>
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

export default MasterAgentList
