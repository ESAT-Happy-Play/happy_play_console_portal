import BranchTableData from "./BranchTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const BranchList = ({ 
  BranchSearchResults,
  BranchChangePage,
  BranchRowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount}) => {

    const results = BranchSearchResults.map(Branch => <BranchTableData 
      key={Branch.branchId} 
      branch={Branch} 
    />)

    const content = results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" colSpan={6}> No Branch records found! </TableCell>
    </TableRow>;

    const handleChangePage = (event, newpage) => {
      BranchChangePage(event, newpage);
    }

    return ( 
    <div className="BranchList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Branch Name</TableCell>
                {/* <TableCell align="center">No. Of Branches</TableCell> */}
                <TableCell>Company Name</TableCell>
                <TableCell>Branch Operator</TableCell>
                <TableCell>Branch Contact</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content}
            </TableBody>
          </Table>
        </TableContainer>
        {
          (totalCount !== 0) ? <TablePagination 
            rowsPerPageOptions={[5,10,25,50]}
            rowsPerPage={ pageSize }
            page={!totalCount || totalCount <= 0 ? 0 : pageNumber}
            count={ totalCount }
            component="div"
            onPageChange={ handleChangePage }
            onRowsPerPageChange={ BranchRowsPerPage }
          >
          </TablePagination> :
          ""
        }
        
      </div>    
    )
}

export default BranchList
