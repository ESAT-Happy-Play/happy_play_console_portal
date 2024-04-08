import React, { useEffect, useState } from 'react';
import { Card } from '../../components/card/Card';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {Button} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ContentLoader } from "../../components/mui";
import { AddTicketDialog, UpdateTicketDialog } from '../../components/dialog/Suppot';

import { StoreExt, DateExt } from "../../utils/helpers";
import { SupportService } from '../../services'

export const Support = () => {
  let authdata = StoreExt.getStore("auth");

  const [pageLoader, setPageLoader] = useState(false);
  const [isCreateNew, setisCreateNew] = useState(false);
  const [isUpdateTicket, setisUpdateTicket] = useState(false);
  const [displayList, setDisplayList] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setselectedValue] = useState(null);
  
  const initSupportTable = () => {
    setPageLoader(true);
    SupportService.searchTicket(authdata.id).then((resp) => {
        if (resp) { setDisplayList(resp.cases) }
        setPageLoader(false);
    });
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

  const handleClickRow = (data) => {
      setisUpdateTicket(true);
      setselectedValue(data);
  }

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
                    headers={["Report Title", "Ticket Description", "Attachment ct.", "Date", ""]}
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
                                <StyledTableRow key={i}>
                                    <StyledTableCell align="center" >{row.title}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.description}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.attachmentCount}</StyledTableCell>
                                    <StyledTableCell align="center" >{DateExt.readableDate(row.createdOn)}</StyledTableCell>
                                    <StyledTableCell align="center" >
                                        <Button sx={{border:'none'}} variant="outlined" size='small' onClick={e => handleClickRow(row)}>
                                            <InfoIcon style={{fontSize:'large'}} />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                            ) :
                        <StyledTableRow ><StyledTableCell align="center" colSpan={4}>No available data</StyledTableCell></StyledTableRow>
                    }
                </CustomTable>
            </div>
        }
        />

        <AddTicketDialog title="Create Report" 
            isOpen={isCreateNew} onClose={e => setisCreateNew(false)} modalWidth="550px" />

        <UpdateTicketDialog title="Update Report" 
            isOpen={isUpdateTicket} onClose={e => setisUpdateTicket(false)} objData={selectedValue} modalWidth="550px" />

        <ContentLoader isLoadingPage={ pageLoader } />
    </>
  )
}

export default Support
