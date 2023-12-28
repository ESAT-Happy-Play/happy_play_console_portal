import CompanyTableData from "./CompanyTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const CompanyList = ({ 
  companySearchResults, 
  showCompanyProfile, 
  companyChangePage,
  companyRowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount}) => {

    const results = companySearchResults.map(company => <CompanyTableData 
      key={company.companyId} 
      company={company} 
      handleShowCompanyProfile={ showCompanyProfile } 
    />)

    const content = results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" colSpan={6}> No company records found! </TableCell>
    </TableRow>;

    const handleChangePage = (event, newpage) => {
      companyChangePage(event, newpage);
    }

    return ( 
    <div className="companyList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>COMPANY NAME</TableCell>
                <TableCell align="center">No. Of Branches</TableCell>
                <TableCell>Main Branch</TableCell>
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
        <TablePagination 
          rowsPerPageOptions={[5,10,25,50]}
          rowsPerPage={ pageSize }
          page={!totalCount || totalCount <= 0 ? 0 : pageNumber}
          count={ totalCount }
          component="div"
          onPageChange={ handleChangePage }
          onRowsPerPageChange={ companyRowsPerPage }
        >
        </TablePagination>
      </div>    
    )
}

export default CompanyList
