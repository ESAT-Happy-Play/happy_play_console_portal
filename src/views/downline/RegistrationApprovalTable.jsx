import React, { useEffect, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import { Button } from "@mui/material";
import { Box } from '@mui/material';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import ApprovalDialog from '../../components/dialog/ApprovalDialog';
import { DateExt } from "../../utils/helpers";
import { ContentLoader } from "../../components/mui";

import InfoIcon from '@mui/icons-material/Info';
import { UserService, ImageService } from "../../services";
import UserDetails from './UserDetails';

const RegistrationApprovalTable = ({ data }) => {
    
    const [selfieImage, setselfieImage] = React.useState(null);
    const [validIdImage, setvalidIdImage] = React.useState(null);

    const [pageLoader, setPageLoader] = useState(false);
    const [displayList, setDisplayList] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [selectedUser, setselectedUser] = useState(null);

    const [isOpenApproval, setisOpenApproval] = useState(false);

    useEffect(() => {
        var statusData = data;
        var search = statusData.filter((row) => {
            return Object.values(row).join('').toLowerCase().includes(searchValue.toLowerCase());
        });
        
        setPage(0);
        setDisplayList(search);
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

    const initImages = (fileName, requestType = 0) => {
        ImageService.getImage(fileName).then((res) => {
            if(res) {
                if (requestType === 0) { setvalidIdImage(res.data) }
                if (requestType === 1) { setselfieImage(res.data) }
            }
        })
    }

    const handleRowClick = (data) => {
        setPageLoader(true);
        UserService.getUsersByObjectID(data.accountObjectId).then((res) => {
            if (res) { 
                setselectedUser(res.data);
                setisOpenApproval(true);
                if (res.data.frontIdPath !== null) {
                    initImages(res.data.frontIdPath);
                }
                if (res.data.selfiePath !== null) {
                    initImages(res.data.selfiePath, 1);
                }
            }
            setPageLoader(false);
        })
    }

    const handleDialogCallback = () => {
        window.location.reload(false);
    }

    return (
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Box display="flex" justifyContent="space-between">
                <RegularSearchBar
                    handleSearch={handleSearch}
                    searchTitle="Search"
                />
            </Box>
            <CustomTable
                // headAlign="left"
                headers={["Name", "Mobile Number", "Registration Date"]}
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
                { 
                    (displayList !== null) ?
                        (displayList.length > 0) ?
                        displayList.slice(page * rowsPerPage, page *
                            rowsPerPage + rowsPerPage).map((row, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell align="center" >{row.fullname}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.contactNumber}</StyledTableCell>
                                    <StyledTableCell align="center" >{DateExt.readableDate(row.createdOn)}</StyledTableCell>
                                    <StyledTableCell align="center" >
                                        <Button variant="outlined" size='small' onClick={e => handleRowClick(row)}>
                                            View &nbsp; <InfoIcon sx={{fontSize:'14px'}} />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        ) :
                        <StyledTableRow><StyledTableCell align="center" colSpan={3}>No available data</StyledTableCell></StyledTableRow>
                    : <></>
                }
            </CustomTable>

            <ApprovalDialog title="View Invitee" isOpen={isOpenApproval} 
                onClose={e => setisOpenApproval(false)}
                objData={selectedUser} onTriggerClick={handleDialogCallback}>
                <UserDetails objData={selectedUser} selfieImage={selfieImage} validIdImage={validIdImage} />
            </ApprovalDialog>

            <ContentLoader isLoadingPage={ pageLoader } />
        </div>
    );
}

export default RegistrationApprovalTable;