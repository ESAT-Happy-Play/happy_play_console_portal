import React, { useEffect, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import { Button } from "@mui/material";
import { Box } from '@mui/material';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import VerificationDialog from '../../components/Dialog/VerificationDialog';
import { DateExt } from "../../utils/helpers";
import { ContentLoader } from "../../components/mui";

import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import FileExportIcon from "../../assets/icons/FileExportIcon";
import FilterListIcon from "@mui/icons-material/FilterList";

import InfoIcon from '@mui/icons-material/Info';
import { UserService, ImageService } from "../../services";
import UserDetails from './UserDetails';
import ExportModal from '../../components/modals/ExportModal';

const VerificationListTable = ({ data, page, rowsPerPage, pageSize, triggerCallback }) => {
    
    const [selfieImage, setselfieImage] = React.useState(null);
    const [validIdImage, setvalidIdImage] = React.useState(null);

    const [pageLoader, setPageLoader] = useState(false);
    const [displayList, setDisplayList] = useState(null);

    const [maxpage, setmaxpage] = useState(0);
    const [pageT, setPageT] = useState(null);
    const [rowsPerPageT, setRowsPerPageT] = useState(null);
    const [pageSizeT, setpageSizeT] = useState(null);
   
    const [searchValue, setSearchValue] = useState("");
    const [selectedUser, setselectedUser] = useState(null);
    const [selectedUserRecruiter, setselectedUserRecruiter] = useState(null);

    const [isOpenApproval, setisOpenApproval] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    
    useEffect(() => {
        setDisplayList(data);
        
        setPageT(page);
        setRowsPerPageT(rowsPerPage);
        setpageSizeT(pageSize);
    }, [data, page, rowsPerPage, pageSize]);

    // On click search
    const handleSearch = (event, value) => {
        setSearchValue(value);
        triggerCallback(value, 2);
        setPageT(0);
    };

    const handleChangePage = (event, newpage) => {
        let newVal = newpage - 1;
        // if (newVal > maxpage) {
        //     setmaxpage(newVal);
        // }
        triggerCallback(newVal);
        setPageT(newVal);
    };

    const handleChangeRowsPerPage = (event) => {
        triggerCallback(parseInt(event.target.value, 10), 1);
        setmaxpage(0);
        setPageT(0);
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

    const toggleFilter = () => {
        setShowFilterModal((prev) => !prev);
    };

    // const toggleScanModal = () => {
    //     setShowScanNowModal((prev) => !prev);
    // };

    const toggleExportModal = () => {
        setShowExportModal((prev) => !prev);
    };

    return (
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Box display="flex" justifyContent="space-between" marginBottom={2}>
                <div style={{ display: "flex", gap: 20 }}>
                <RegularSearchBar
                    handleSearch={handleSearch}
                    searchTitle="Search name"
                />
                <div
                    style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    }}
                >
                    {/* <div className="buttons" onClick={toggleScanModal}>
                    <QrCodeScannerIcon />
                    Scan Ticket QR
                    </div> */}
                    <div className="buttons" onClick={toggleExportModal}>
                    <FileExportIcon size={20} />
                    Export
                    </div>
                </div>
                </div>
                <div className="filter-button" onClick={toggleFilter}>
                Filters
                <FilterListIcon />
                </div>
            </Box>
            <CustomTable
                // headAlign="left"
                headers={["Name", "Number", "Recruiter", "Statur", "Registration Date"]}
                pagination={
                    <StyledPagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={(pageSizeT !== null && pageSizeT !== undefined) ? pageSizeT : 5}
                        rowsPerPage={(rowsPerPageT !== null && rowsPerPageT !== undefined) ? rowsPerPageT : 5}
                        page={(pageT !== null && pageT !== undefined) ? pageT : 0}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
            >
                { 
                    (displayList !== null && displayList !== undefined) ?
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

            <ExportModal
                open={showExportModal}
                onClose={toggleExportModal}
                handleToCsv={() => {}}
                handleToPdf={() => {}}
            />

            <ContentLoader isLoadingPage={ pageLoader } />
        </div>
    );
}

export default VerificationListTable;