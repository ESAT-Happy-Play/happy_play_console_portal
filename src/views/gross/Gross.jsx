import React, { useEffect, useState } from 'react';
import { Card } from '../../components/card/Card';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import { Box } from '@mui/material';
import CommissionCustomTable from '../../components/table/customTable/CommissionCustomTable';

export const Gross = () => {
    const [displayList, setDisplayList] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    const initGrossTable = () => {
        setDisplayList([
            {
                id: 1, day: "Feb 1, 2024", pm1: "1,000", pm2: "1,000",
                pm3: "1,000", pm4: "1,000", pm5: "1,000", pm6: "1,000",
                pm7: "1,000", pm8: "1,000", pm9: "1,000", pm10: "1,000",
                pm11: "1,000", total: "11,000",
            },
            {
                id: 2, day: "Feb 2, 2024", pm1: "1,000", pm2: "1,000",
                pm3: "1,000", pm4: "1,000", pm5: "1,000", pm6: "1,000",
                pm7: "1,000", pm8: "1,000", pm9: "1,000", pm10: "1,000",
                pm11: "1,000", total: "11,000",
            }
        ]);
    }

    useEffect(() => {
        initGrossTable();
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
        header= "Gross Report"
        body={
            <div className="tab-container">
                <Box display="flex" padding='15px' justifyContent="space-between">
                    <RegularSearchBar headerWidth="47%"
                        handleSearch={handleSearch}
                        searchTitle="Search Name, Combination, or Transaction #"
                    />
                </Box>
                <CommissionCustomTable
                    // headAlign="left"
                    headers={["Day", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM", "Total"]}
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
                                    <StyledTableCell align="center" >{row.day}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm1}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm2}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm3}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm4}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm5}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm6}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm7}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm8}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm9}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm10}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.pm11}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.total}</StyledTableCell>
                                </StyledTableRow>
                            )
                            ) :
                        <StyledTableRow ><StyledTableCell align="center" colSpan={13}>No available data</StyledTableCell></StyledTableRow>
                    }
                </CommissionCustomTable>
            </div>
        }
        />
    </>
  )
}

export default Gross
