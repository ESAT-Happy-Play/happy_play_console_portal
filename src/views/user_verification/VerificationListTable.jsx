import React, { useEffect, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import { Button } from "@mui/material";
import { Box } from '@mui/material';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import VerificationDialog from '../../components/Dialog/VerificationDialog';
import { DateExt } from "../../utils/helpers";
import { ContentLoader } from "../../components/mui";

import InfoIcon from '@mui/icons-material/Info';
import { UserService, ImageService } from "../../services";
import UserDetails from './UserDetails';

const VerificationListTable = ({ data }) => {
    
    const [selfieImage, setselfieImage] = React.useState(null);
    const [validIdImage, setvalidIdImage] = React.useState(null);

    const [pageLoader, setPageLoader] = useState(false);
    const [displayList, setDisplayList] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [selectedUser, setselectedUser] = useState(null);
    const [selectedUserRecruiter, setselectedUserRecruiter] = useState(null);

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

    const initUserInfo = (accountObjectId) => {
        return new Promise((resolve, reject) => {
            UserService.getUsersByObjectID(accountObjectId).then((res) => {
                if (res.success) { return resolve(res.data); }
                else { return reject("Error"); }
            })
        });
    }

    const handleRowClick = async (data) => {
        setPageLoader(true);
        let allResults = await Promise.all([
            initUserInfo(data.accountObjectId),
            initUserInfo(data.recruiterAccountObjId)
        ]);

        setselectedUser(allResults[0]);
        setselectedUserRecruiter(allResults[1]);

        setisOpenApproval(true);

        console.log(allResults[0]);
        if (allResults[0].frontIdPath !== null) {
            initImages(allResults[0].frontIdPath);
        }
        if (allResults[0].selfiePath !== null) {
            initImages(allResults[0].selfiePath, 1);
        }

        setPageLoader(false);
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
                headers={["Name", "Number", "Recruiter", "Statur", "Registration Date"]}
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
                                    <StyledTableCell align="center" >{row.fullName}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.mobileNumber}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.recruiter}</StyledTableCell>
                                    <StyledTableCell align="center" >
                                        <span style={{color:'red',background:'#ebc3c3',padding:'1px 5px 1px 5px',borderRadius:'3px'}}>Peding</span>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" >{DateExt.readableDate(row.registrationDate)}</StyledTableCell>
                                    <StyledTableCell align="center" >
                                        <Button variant="text" size='small' onClick={e => handleRowClick(row)}>
                                            <InfoIcon sx={{fontSize:'14px'}} />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        ) :
                        <StyledTableRow><StyledTableCell align="center" colSpan={3}>No available data</StyledTableCell></StyledTableRow>
                    : <></>
                }
            </CustomTable>

            <VerificationDialog title="About User" isOpen={isOpenApproval} 
                onClose={e => setisOpenApproval(false)}
                objData={selectedUser} onTriggerClick={handleDialogCallback}>
                <UserDetails objData={selectedUser} recruiterData={selectedUserRecruiter} selfieImage={selfieImage} validIdImage={validIdImage} />
            </VerificationDialog>

            <ContentLoader isLoadingPage={ pageLoader } />
        </div>
    );
}

export default VerificationListTable;