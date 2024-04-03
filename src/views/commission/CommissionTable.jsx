import React, { useEffect, useState } from 'react';
import { Card } from '../../components/card/Card';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import { Box } from '@mui/material';
import { Button } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

import CommonDialog from '../../components/dialog/CommonDialog';

import PercentRoundedIcon from '@mui/icons-material/PercentRounded';

function CommissionTable() {
    const [detailOpen, setdetailOpen] = useState(false);
    const [displayList, setDisplayList] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [selectedData, setSelectedData] = useState(null);

    const initCommissionTable = () => {
        setDisplayList([
            {
                id: 1,
                transNo: "TRNX2343333",
                gameType: "Regular",
                gameTime: "1 AM",
                source: "John Due",
                comAmt: 10.00,
                comType: "Bets",
                date: "04-25-2024"
            }
        ]);
    }

    useEffect(() => {
        initCommissionTable();
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
        setSelectedData(data);
        setdetailOpen(true);
    }

    return (
        <>
            <Card 
            style={{width:"95%", marginLeft:'10px', borderRadius:'15px'}} 
            bodystyle={{padding:'0px'}}
            header= "Commissions"
            body={
                <div className="tab-container">
                    <Box display="flex" padding='15px' justifyContent="space-between">
                        <RegularSearchBar headerWidth="47%"
                            handleSearch={handleSearch}
                            searchTitle="Search Game Type, Username or Comment Type"
                        />
                    </Box>
                    <CustomTable
                        // headAlign="left"
                        headers={["TXN No.", "Game Type", "Game Time", "Source", "Comm'n Amt", "Comm'n Type", "Date", ""]}
                        pagination={
                            <StyledPagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={(displayList !== null) ? displayList.length : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />}>
                        { (displayList !== null) ?
                            displayList.slice(page * rowsPerPage, page *
                                rowsPerPage + rowsPerPage).map((row, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell align="center" >{row.transNo}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.gameType}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.gameTime}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.source}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.comAmt}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.comType}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.date}</StyledTableCell>
                                        <StyledTableCell align="center" >
                                            <Button sx={{border:'none'}} variant="outlined" size='small' onClick={e => handleClickRow(row)}>
                                                <InfoIcon style={{fontSize:'large'}} />
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                                ) :
                            <StyledTableRow ><StyledTableCell align="center" colSpan={7}>No available data</StyledTableCell></StyledTableRow>
                        }
                    </CustomTable>
                </div>
            }
            />

            <CommonDialog title="Commission Detailed" 
                isOpen={detailOpen} onClose={e => setdetailOpen(false)} modalWidth="350px">
                {
                    (selectedData !== null) ?
                    <>
                        <div style={{textAlign:'center', marginTop:'30px'}}>
                            <PercentRoundedIcon sx={{ background:'#4845d2', color:'white', borderRadius:'5px'}} />
                            <p style={{fontSize:'14px', margin:'0'}}>Transaction No. 000000000000</p>
                            <p style={{fontSize:'25px', margin:'0', fontFamily:'Inter', color:'#4845d2'}}><b>₱ 10.00</b></p>
                            <p style={{fontSize:'14px', margin:'0'}}>Date: 03/21/2024 17:35:45</p>
                        </div>
                        <br/>
                        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'2px solid #c1c1c1',padding:'5px'}}>
                            <span>Commission Type</span>
                            <b>Bet</b>
                        </div>
                        <br/>
                        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'2px solid #c1c1c1', padding:'5px'}}>
                            <span>Source</span>
                            <b>John Due</b>
                        </div>
                        <br/>
                        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'2px solid #c1c1c1', padding:'5px'}}>
                            <span>Game Type</span>
                            <b>Regular</b>
                        </div>
                        <br/>
                        <div style={{display:'flex', justifyContent:'space-between', borderBottom:'2px solid #c1c1c1', padding:'5px'}}>
                            <span>Game Time</span>
                            <b>1:00 PM</b>
                        </div>
                    </> : <>Please wait.</>
                }
            </CommonDialog>
        </>
    )
}

export default CommissionTable
