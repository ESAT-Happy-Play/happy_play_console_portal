import React, { useState, useEffect } from 'react';
import ScheduledSimulatorTableData from "./ScheduledSimulatorTableData";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

import { BounceLetterLoader } from 'react-spinner-overlay';

const ScheduledSimulatorList = ({ 
  SearchResults,
  ChangePage,
  RowsPerPage,
  pageNumber, 
  pageSize, 
  totalCount,
  loading }) => {

  const results = SearchResults.map((obj, index ) => <ScheduledSimulatorTableData 
    key={ index } 
    objct={obj}
  />)

  const content = (loading) ?
    <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" align="center" scope="row" colSpan={10}>
          <BounceLetterLoader loading={true} overlayColor="rgba(0,153,255,0.2)" />
        </TableCell>
    </TableRow>
  : results?.length ? results 
  : <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
      <TableCell component="th" align="center" scope="row" colSpan={10}> No records found!</TableCell>
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
                    <TableCell colSpan={5} style={{ textAlign:'center'}}>No Of Cards Per Game</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>BlackOut</TableCell>
                    <TableCell>First 5</TableCell>
                    <TableCell>First 6</TableCell>
                    <TableCell>First 7</TableCell>
                    <TableCell>First 8</TableCell>
                    <TableCell>No Of Players</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Time Interval</TableCell>
                    <TableCell>Status</TableCell>
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
            onRowsPerPageChange={ RowsPerPage }
        >
        </TablePagination>

        {/* <PageLoader isLoadingPage={ pageLoader } /> */}
      </div>    
    )
}

export default ScheduledSimulatorList
