
import React, { useEffect, useMemo, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell } from '../../components/table/customTable/CustomTable';
import { styled } from '@mui/material/styles';
import { COLORS } from '../../helper/colors';
import { Box, Chip, IconButton, TableRow, TextField } from '@mui/material';
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import InfoIcon from '@mui/icons-material/Info';
import FileExportIcon from "../../assets/icons/FileExportIcon";
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from "@mui/icons-material/FilterList";
import TicketDetail from './TicketDetail';
import TicketsFilterModal from '../../components/modals/TicketsFilterModal';

import { DateExt } from '../../utils/helpers';
import { SupportService } from '../../services';

const TicketsTable = ({ data, type, loaderCallback }) => {

    const [displayList, setDisplayList] = useState([]);
    const [caseStatuses, setcaseStatuses] = useState([]);
    const [caseOrganizations, setcaseOrganizations] = useState([]);

    const [maxpage, setmaxpage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCounts, settotalCounts] = useState(0);

    const [filters, setFilters] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    //Update modal states
    const [selectedRow, setSelectedRow] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const priorityLevel = ["Low", "High", "Critical"];
    const filterSummary = useMemo(() => {
        var summary = {};
        filters.forEach((filter) => {
            summary[filter.key] = filter;
        })
        return summary;
    }, [filters]);

    const handleInitTickets = (pageNum = null, perPageNum = null) => {
        let filterData = {
            caseId: "", title: "", owner: "",
            userId: "", status: null,
            importance: null, organizationId: null,
            startDate: null, endDate: null,
            pagedQuery: { 
                index: (pageNum !== null) ? pageNum : page, 
                size: (perPageNum !== null) ? perPageNum : rowsPerPage 
            }
        };

        return new Promise((resolve, reject) => {
            SupportService.searchTicket(filterData).then((res) => {
                return resolve(res);
            })
        });
    }

    const initCaseStatuses = () => {
        return new Promise((resolve, reject) => {
            SupportService.getStatuses().then((res) => {
                return resolve(res);
            })
        });
    }

    const initCaseOrganzations = () => {
        return new Promise((resolve, reject) => {
            SupportService.getOrganizations().then((res) => {
                return resolve(res);
            })
        });
    }

    const initAll = async () => {
        loaderCallback(true);
        let allResults = await Promise.all([
            handleInitTickets(),
            initCaseStatuses(),
            initCaseOrganzations()
        ]);

        setDisplayList(allResults[0].cases);
        settotalCounts(allResults[0].total);

        setcaseStatuses(allResults[1].caseStatuses);
        setcaseOrganizations(allResults[2].organizations);
        loaderCallback(false, allResults[1].caseStatuses, allResults[2].organizations);
    }

    useEffect(() => {
        initAll();
    }, []);

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

    const handleCloseEdit = async () => {
        setSelectedRow(null);
        setOpenEdit(false);
    }

    const handleSuccessClose = async () => {
        setSelectedRow(null);
        setOpenEdit(false);

        await initAll();
    }

    const handleDelete = (chipToDelete) => () => {
        setShowFilterModal(false);
        setFilters((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleEdit = (value) => {
        setSelectedRow(value);
        setOpenEdit(true);
    }

    return (
        <>
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
                                <TicketsFilterModal
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
                    headers={["Full Name", "Ticket Title", "Ticket Description", "Attachment ct.", "Priority Level", "Date"]}
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
                                    <StyledTableCell width={150} >{row.fullname}</StyledTableCell>
                                    <StyledTableCell width={200} >{row.title}</StyledTableCell>
                                    <StyledTableCell>{`${row.description.substring(0, 150)}...`}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.attachmentCount}</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ color: row.importance == 1 ? COLORS.yellow : row.importance == 2 ? COLORS.redWarn : COLORS.skyBlue }}>
                                        {priorityLevel[row.importance]}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" >{ DateExt.readableDate(row.ticketDate) }</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ width: 20 }}>
                                        <IconButton><InfoIcon className='icon-show' sx={{ color: row.importance == 3 ? COLORS.redWarn : COLORS.violetMain, opacity: 0 }} /></IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                            ) :
                        <StyledTableRow ><StyledTableCell align="center" colSpan={8}>No available data</StyledTableCell></StyledTableRow>
                    }
                </CustomTable>
                {openEdit &&
                    <TicketDetail
                        isOpen={openEdit}
                        caseStatuses={caseStatuses}
                        caseOrganizations={caseOrganizations}
                        handleClose={handleCloseEdit}
                        succesCallback={handleSuccessClose}
                        ticket={selectedRow}
                        isEditing={true}
                    />}
            </div >
        </>
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

export default TicketsTable;