import RegularTableData from "./RegularTableData";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  tablePaginationClasses,
} from "@mui/material";

const RegularTable = ({
  dataSearchResults,
  changePage,
  rowsPerPage,
  pageNumber,
  pageSize,
  totalCount,
  isLoading,
}) => {
  const results = dataSearchResults.map((regular) => (
    <RegularTableData key={regular.id} data={regular} />
  ));

  const content = isLoading ? (
    <TableRow
      key={1}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center" colSpan={6}>
        {" "}
        Loading... Please wait!{" "}
      </TableCell>
    </TableRow>
  ) : results?.length ? (
    results
  ) : (
    <TableRow
      key={1}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center" colSpan={6}>
        {" "}
        No records found!{" "}
      </TableCell>
    </TableRow>
  );

  const handleChangePage = (event, newpage) => {
    changePage(event, newpage);
  };

  return (
    <div className="div-table-list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Display Name</TableCell>
              <TableCell align="center">Transaction Number</TableCell>
              <TableCell align="center">Combination</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Game Time</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{content}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        rowsPerPage={pageSize}
        page={!totalCount || totalCount <= 0 ? 0 : pageNumber}
        count={totalCount}
        component="div"
        onPageChange={handleChangePage}
        onRowsPerPageChange={rowsPerPage}
        sx={{
          [`& .${tablePaginationClasses.spacer}`]: {
            display: "none",
          },
          [`& .${tablePaginationClasses.toolbar}`]: {
            justifyContent: "left",
          },
        }}
      ></TablePagination>
    </div>
  );
};

export default RegularTable;
