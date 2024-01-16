import CasesTableData from "./CasesTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const CasesList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  ProcessCase,
  isLoading}) => {

    const results = SearchResults.map(obj => <CasesTableData 
      key={obj.caseId} 
      dataObj={obj} 
      handleProcessCase={ProcessCase}
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
    <div className="CasesList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Section</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Attachements</TableCell>
                <TableCell>Report Date</TableCell>
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

export default CasesList
