import CompanyTableData from "./CompanyTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const CompanyList = ({ 
  companySearchResults,
  editCompanyProfile,
  companyChangePage,
  companyRowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  isLoading}) => {

    const results = companySearchResults.map(company => <CompanyTableData 
      key={company.companyId} 
      company={company} 
      handleEditCompanyProfile={ editCompanyProfile }
    />)
    

    const content = isLoading ? 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={5}> Loading... Please wait! </TableCell>
    </TableRow> : results?.length ? results : 
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row" align="center" colSpan={5}> No records found! </TableCell>
    </TableRow>;

    const handleChangePage = (event, newpage) => {
      companyChangePage(event, newpage);
    }

    return ( 
    <div className="div-table-list">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>COMPANY NAME</TableCell>
                <TableCell align="center">BRANCHES</TableCell>
                <TableCell align="center">OPERATORS</TableCell>
                <TableCell>REGISRATION DATE</TableCell>
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
          onRowsPerPageChange={ companyRowsPerPage }
        >
        </TablePagination>
      </div>    
    )
}

export default CompanyList
