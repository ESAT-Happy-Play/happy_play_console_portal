import React, { useEffect, useState } from 'react';
import { Card } from '../../components/card/Card';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CommonDialog from '../../components/dialog/CommonDialog';
import {Button, TextField, IconButton} from '@mui/material';

import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import { DragDropTicketUpload } from '../../components/mui/DragDropTicketUpload';

export const Support = () => {
  const [isCreateNew, setisCreateNew] = useState(false);
  const [displayList, setDisplayList] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const initSupportTable = () => {
      setDisplayList([
          {
              id: 1, reportTitle: "Report Title", description: "This is a test description. Please ignore.", 
              attachementCount: 2, date: "February 1, 2024"
          }
      ]);
  }

  useEffect(() => {
      initSupportTable();
      // var statusData = data;
      // var search = statusData.filter((row) => {
      //     return Object.values(row).join('').toLowerCase().includes(searchValue.toLowerCase());
      // });
      
      // setPage(0);
      // setDisplayList(search);
  }, [searchValue]);

  // On click search
  const handleSearch = (event, value) => {
      setSearchValue(value);
      setPage(0);
  };

  const handleChangePage = (event, newpage) => {
      setPage(newpage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  return (
    <>
      <Card 
        style={{width:"95%", marginLeft:'10px', borderRadius:'15px'}} 
        bodystyle={{padding:'0px'}}
        header= "Report an Issue"
        actions={
          <Button variant="outlined" size='medium' onClick={e => setisCreateNew(true)}>New Ticket <AddIcon /></Button>
        }
        body={
            <div className="tab-container">
                <Box display="flex" padding='15px' justifyContent="space-between">
                    <RegularSearchBar headerWidth="47%"
                        handleSearch={handleSearch}
                        searchTitle="Search Name, Ticket Title, or Priority Level"
                    />
                </Box>
                <CustomTable
                    // headAlign="left"
                    headers={["Report Title", "Ticket Description", "Attachment ct.", "Date"]}
                    pagination={
                        <StyledPagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={(displayList !== null) ? displayList.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />} >
                    { (displayList !== null) ?
                        displayList.slice(page * rowsPerPage, page *
                            rowsPerPage + rowsPerPage).map((row, i) => (
                                <StyledTableRow style={{cursor:'pointer'}} key={i}>
                                    <StyledTableCell align="center" >{row.reportTitle}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.description}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.attachementCount}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.date}</StyledTableCell>
                                </StyledTableRow>
                            )
                            ) :
                        <StyledTableRow ><StyledTableCell align="center" colSpan={4}>No available data</StyledTableCell></StyledTableRow>
                    }
                </CustomTable>
            </div>
        }
        />

        <CommonDialog title="Create Report" 
            isOpen={isCreateNew} onClose={e => setisCreateNew(false)} modalWidth="550px">
              <form noValidate>
                <div className='divInput'>
                  <span>Report Title</span>
                  <TextField placeholder="Enter report title" variant="outlined" size='small' fullWidth />
                </div>
                <div className='divInput'>
                  <span>Report Description</span>
                  <TextField placeholder="Enter report description" 
                  multiline={true} variant="outlined" rows={5} fullWidth />
                </div>
                <div className='divInput'>
                  <span>Attachement</span>
                  <div className='divAttachments'>
                      <div className='attachIcondata'>
                        <AttachmentIcon /> test-attachemet.jpg
                      </div>
                      <IconButton>
                          <CloseIcon />
                      </IconButton>
                  </div>
                  <DragDropTicketUpload />
                </div>
                <div className='divInput'>
                  <span>Date</span>
                  <TextField type='date' variant="outlined" size='small' fullWidth />
                </div>
                <br/>
                <div className='divInput' style={{display:'flex',justifyContent:'center'}}>
                  <Button variant="contained" size='medium'>Create Report <AddIcon /></Button>
                </div>
              </form>
        </CommonDialog>
    </>
  )
}

export default Support
