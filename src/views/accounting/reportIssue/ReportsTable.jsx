import React, { useEffect, useMemo, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell } from '../../../components/table/customTable/CustomTable';
import { styled } from '@mui/material/styles';
import { COLORS } from '../../../helper/colors';
import { Box, Chip, IconButton, TableRow, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FileExportIcon from "../../../assets/icons/FileExportIcon";
import RegularSearchBar from '../../../components/searchbar/RegularSearchBar';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from "@mui/icons-material/FilterList";
import AssetFilterDialog from '../../../components/modals/accountingModals/AssetFilterDialog';
import ReportDetail from './ReportDetail';

import { DateExt, StoreExt } from '../../../utils/helpers';
import { SupportService } from '../../../services';

const ReportsTable = ({ loaderCallback }) => {
    let authdata = StoreExt.getStore("auth");
    let tokenObj = StoreExt.getDecodeJWT(authdata.token);

    const [displayList, setDisplayList] = useState([]);
    
    const [maxpage, setmaxpage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCounts, settotalCounts] = useState(0);

    
    const [filters, setFilters] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    //Update modal states
    const [selectedRow, setSelectedRow] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const filterSummary = useMemo(() => {
        var summary = {};
        filters.forEach((filter) => {
            summary[filter.key] = filter;
        })
        return summary;
    }, [filters]);

    const handleInitTickets = (pageNum = null, perPageNum = null) => {
        loaderCallback(true);
        let filterData = {
            caseId: "", title: "", owner: "",
            userId: tokenObj.user_id, status: null,
            importance: null, organizationId: null,
            startDate: null, endDate: null,
            pagedQuery: { 
                index: (pageNum !== null) ? pageNum : page, 
                size: (perPageNum !== null) ? perPageNum : rowsPerPage 
            }
        };

        return new Promise((resolve, reject) => {
            SupportService.searchTicket(filterData).then((res) => {
                loaderCallback(false);
                return resolve(res);
            })
        });
    }

    useEffect(() => {
        // var search = data.filter((row) => {
        //     return Object.values(row).join('').toLowerCase().includes(searchValue.toLowerCase());
        // });

        // setPage(0);
        // setDisplayList(search);
        handleInitTickets().then((res) => {
            setDisplayList(res.cases);
            settotalCounts(res.total);
        });
    }, [searchValue, filters]);


    // On click search
    const handleSearch = (event, value) => {
        setSearchValue(value);
        setPage(0);
    };

    const handleChangePage = async (event, newpage) => {
        let newVal = newpage - 1;
        
        if (maxpage < newVal) {
            let result = await handleInitTickets(newVal);
        
            let oldData = displayList;
            result.cases.map((item) => {
                oldData.push(item);
            });
            settotalCounts(result.total);
            setDisplayList(oldData);
            setmaxpage(newVal);
        }

        setPage(newVal);
    };

    const handleChangeRowsPerPage = async (event) => {
        let result = await handleInitTickets(0, parseInt(event.target.value, 10));
        setDisplayList(result.cases);
        settotalCounts(result.total);

        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilter = (value) => {
        setFilters(value);
    };

    const toggleFilter = () => {
        setShowFilterModal((prev) => !prev);
    };

    const handleResetFilters = () => {
        setFilters([]);
    };

    const handleCloseEdit = () => {
        setSelectedRow(null);
        setOpenEdit(false);
    }

    const handleSubmit = (data) => {
        setOpenSuccess(true);
        console.log(data);
        handleCloseEdit();
    }

    const handleDelete = (chipToDelete) => () => {
        setShowFilterModal(false);
        setFilters((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleSuccessClose = async () => {
        setSelectedRow(null);
        setOpenEdit(false);

        let result = await handleInitTickets();
        settotalCounts(result.total);
        setDisplayList(result.cases);
    }

    const handleEdit = (value) => {
        setSelectedRow(value);
        setOpenEdit(true);
    }

    return (
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Box display="flex" alignItems="center" gap={1}>
                <RegularSearchBar
                    handleSearch={handleSearch}
                    searchTitle="Search Name, Ticket Title, or Priority Level"
                />
                <div className="buttons">
                    <FileExportIcon size={20} />
                    Export
                </div>
                <Box marginLeft="auto" display="flex" alignItems="center" gap='2px'>
                    {filters.map((filter, index) =>
                        <Chip
                            sx={{ color: COLORS.violetMain, height: '22px', background: COLORS.tableBackground }}
                            key={index}
                            color='primary'
                            label={filter.label}
                            onDelete={handleDelete(filter)}
                            deleteIcon={<CloseIcon sx={{ color: `${COLORS.violetMain} !important`, width: '16px' }} />}
                        />
                    )}
                    <Box position='relative' display='flex' alignItems='center' sx={{ '&:hover': { cursor: 'pointer' } }} onClick={toggleFilter}>
                        Filters
                        <FilterListIcon />
                        {
                            showFilterModal &&
                            <AssetFilterDialog
                                open={showFilterModal}
                                onClose={() => toggleFilter(null)}
                                onSubmit={handleFilter}
                                initFilters={filterSummary}
                                handleResetFilters={handleResetFilters}
                            />
                        }
                    </Box>
                </Box>
            </Box>
            <CustomTable
                headers={["Report Title", "Ticket Description", "Attachment ct.", "Date"]}
                pagination={
                    <StyledPagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={ totalCounts }
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
            >
                {displayList?.length >= 1 ?
                    displayList.slice(page * rowsPerPage, page *
                        rowsPerPage + rowsPerPage).map((row, i) => (
                            <StyledTableRow key={i} sx={{ background: `${row.priority == 2 ? COLORS.transparentRed : null} !important` }} onClick={() => handleEdit(row)}>
                                <StyledTableCell width={200} >{row.title}</StyledTableCell>
                                <StyledTableCell>{`${row.description.substring(0, 150)}...`}</StyledTableCell>
                                <StyledTableCell align="center" >{row.attachmentCount}</StyledTableCell>
                                <StyledTableCell align="center" >{ DateExt.readableDate(row.ticketDate) }</StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: 20 }}>
                                    <IconButton><InfoIcon className='icon-show' sx={{ color: row.importance == 3 ? COLORS.redWarn : COLORS.violetMain, opacity: 0 }} /></IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                        ) :
                    <StyledTableRow ><StyledTableCell align="center" colSpan={5}>No available data</StyledTableCell></StyledTableRow>
                }
            </CustomTable>
            {openEdit &&
                <ReportDetail
                    isOpen={openEdit}
                    handleClose={handleCloseEdit}
                    handleSubmission={handleSubmit}
                    isEditing={true}
                    succesCallback={handleSuccessClose}
                    report={selectedRow}
                />}
            {openSuccess &&
                <Dialog
                    open={openSuccess}
                    onClose={() => setOpenSuccess(false)}
                >
                    <DialogTitle style={{ color: '#38A169', fontWeight: 'bold' }}>Success</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Successfully updated report!</DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                        <Button onClick={() => setOpenSuccess(false)} className="cancel-button">Close</Button>
                    </DialogActions>
                </Dialog>
            }
        </div >
    );
}
const StyledTableRow = styled(TableRow)(`
    gap: 10px;
    &:hover{
        cursor:pointer;
        background:${COLORS.background};
        .icon-show{
            opacity:1 !important;
        }
        .MuiTableCell-root:{
            background: black !important;
        }
    }
`);

export default ReportsTable;