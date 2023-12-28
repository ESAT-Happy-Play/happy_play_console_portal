import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import GameResultsTableData from './GameResultsTableData';

import { BounceLetterLoader } from 'react-spinner-overlay';

const GameResultsList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  loading }) => {

  const results = SearchResults.map((obj, index ) => <GameResultsTableData
    key={ index }
    // onView= { handleOnView }
    objct={obj}
  />)

  const content = (loading) ?
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" align="center" scope="row" colSpan={4}>
          <BounceLetterLoader loading={true} overlayColor="rgba(0,153,255,0.2)" />
        </TableCell>
    </TableRow>
  : results?.length ? results 
  : <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
      <TableCell component="th" align="center" scope="row" colSpan={4}> No records found!</TableCell>
    </TableRow>;

  const handleChangePage = (event, newpage) => {
    ChangePage(event, newpage);
  }
  
  return (
    <div className="GameResultsList">
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
                    <TableRow>
                    <TableCell>Game ID</TableCell>
                    <TableCell>Draw Date</TableCell>
                    <TableCell>Draw</TableCell>
                    <TableCell>Combination</TableCell>
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

export default GameResultsList
