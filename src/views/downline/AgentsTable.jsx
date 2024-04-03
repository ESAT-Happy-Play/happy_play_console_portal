import React, { useEffect, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import { Button } from "@mui/material";
import { Box } from '@mui/material';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import { ContentLoader } from "../../components/mui";
import { DateExt } from "../../utils/helpers";

import { UserService } from "../../services";
import UserProfile from './UserProfile';
import InfoIcon from '@mui/icons-material/Info';

const AgentsTable = () => {
    const [pageLoader, setPageLoader] = useState(false);
    const [displayList, setDisplayList] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [isUserDetails, setisUserDetails] = useState(false);
    const [selectedUser, setselectedUser] = useState(null);
    const [agentCount, setagentCount] = useState(null);
    const [playerCount, setplayerCount] = useState(null);

    const initDownlineAgents = () => {
        setPageLoader(true);
        UserService.getDownlineAgents().then((res) => {
            if (res) { setDisplayList(res.data); }
            setPageLoader(false);
        })
    }

    useEffect(() => {
        initDownlineAgents();
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

    const handeClickRows = (data) => {
        setPageLoader(true);

        setagentCount(data.agentsCount);
        setplayerCount(data.playersCount);
        UserService.getUsersByObjectID(data.accountObjectId).then((resp) => {
            if(resp) {
                setPageLoader(false);
                setselectedUser(resp.data);
                setisUserDetails(true);
            }
        })
    }

    const handeBackToList = () => {
        setisUserDetails(false);
    }

    return (
        <>
            {
                (isUserDetails) ? 
                <UserProfile objData={selectedUser} agentCount={agentCount} playerCount={playerCount} hasDownline={true} callBack={handeBackToList} />
                :
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Box display="flex" justifyContent="space-between">
                        <RegularSearchBar
                            handleSearch={handleSearch}
                            searchTitle="Search"
                        />
                    </Box>
                    <CustomTable
                        // headAlign="left"
                        headers={["Name", "Agents", "Players", "Status", "Regisration Date", ""]}
                        pagination={
                            <StyledPagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={(displayList !== null) ? displayList.length : 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />}
                    >
                        { (displayList !== null) ?
                            displayList.slice(page * rowsPerPage, page *
                                rowsPerPage + rowsPerPage).map((row, i) => (
                                    <StyledTableRow key={i} >
                                        <StyledTableCell align="center" >{row.fullname}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.agentsCount}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.playersCount}</StyledTableCell>
                                        <StyledTableCell align="center" >
                                            {
                                                (row.status === 1) ? <span style={{color:'green',background:'#bbf3bd', padding:'1px', borderRadius:'3px'}}>Active</span>
                                                : <span style={{color:'red',background:'#f6aca3', padding:'1px', borderRadius:'3px'}}>Inactive</span>
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell align="center" >{DateExt.readableDate(row.createdOn)}</StyledTableCell>
                                        <StyledTableCell align="center" >
                                            <Button variant="outlined" size='small' onClick={e => handeClickRows(row)}>
                                                View &nbsp; <InfoIcon sx={{fontSize:'14px'}} />
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                                ) :
                            <StyledTableRow ><StyledTableCell align="center" colSpan={5}>No available data</StyledTableCell></StyledTableRow>
                        }
                    </CustomTable>
                </div>
            }

            <ContentLoader isLoadingPage={ pageLoader } />
        </>
    );
}

export default AgentsTable;