
import React, { useEffect, useMemo, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell } from '../../components/table/customTable/CustomTable';
import { styled } from '@mui/material/styles';
import { COLORS } from '../../helper/colors';
import { Box, Chip, IconButton, TableRow, TextField } from '@mui/material';
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import InfoIcon from '@mui/icons-material/Info';
import FileExportIcon from "../../assets/icons/FileExportIcon";
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from "@mui/icons-material/FilterList";
import TicketDetail from './TicketDetail';
import TicketsFilterModal from '../../components/modals/TicketsFilterModal';

const TicketsTable = ({ data, type }) => {
    const [displayList, setDisplayList] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filters, setFilters] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    //Update modal states
    const [selectedRow, setSelectedRow] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [updateValue, setUpdateValue] = useState();
    const [valid, setValid] = useState(true);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const priorityLevel = ["Low", "High", "Critical"];
    const filterSummary = useMemo(() => {
        var summary = {};
        filters.forEach((filter) => {
            summary[filter.key] = filter;
        })
        return summary;
    }, [filters])

    useEffect(() => {
        var search = data.filter((row) => {
            return Object.values(row).join('').toLowerCase().includes(searchValue.toLowerCase());
        });

        setPage(0);
        setDisplayList(search);
    }, [searchValue, filters]);




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

    const handleFilter = (value) => {
        setFilters(value);
    };

    const toggleFilter = () => {
        setShowFilterModal((prev) => !prev);
    };

    const handleResetFilters = () => {
        setFilters([]);
    };

    const handleDelete = (chipToDelete) => () => {
        setShowFilterModal(false);
        setFilters((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleEdit = (value) => {
        setSelectedRow(value);
        setValid(true);
        setOpenEdit(true);
    }

    return (
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Box display="flex" alignItems="center" gap={1}>
                <RegularSearchBar
                    handleSearch={handleSearch}
                    searchTitle="Search Combination"
                />

                <div className="buttons">
                    <QrCodeScannerIcon />
                    Scan Ticket QR
                </div>
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
                        count={displayList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
            >
                {displayList?.length >= 1 ?

                    displayList.slice(page * rowsPerPage, page *
                        rowsPerPage + rowsPerPage).map((row, i) => (
                            <StyledTableRow key={i} sx={{ background: `${row.priority == 3 ? COLORS.transparentRed : null} !important` }} onClick={() => handleEdit(row)}>
                                <StyledTableCell align="center" >{row.fullName}</StyledTableCell>
                                <StyledTableCell align="center" >{row.title}</StyledTableCell>
                                <StyledTableCell align="center" >{row.description}</StyledTableCell>
                                <StyledTableCell align="center" >{row.attachment}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ color: row.priority == 2 ? COLORS.yellow : row.priority == 3 ? COLORS.redWarn : null }}>{priorityLevel[row.priority - 1]}</StyledTableCell>
                                <StyledTableCell align="center" >{row.date}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: 20 }}>
                                    <IconButton><InfoIcon className='icon-show' sx={{ color: row.priority == 3 ? COLORS.redWarn : COLORS.violetMain, opacity: 0 }} /></IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                        ) :
                    <StyledTableRow ><StyledTableCell align="center" colSpan={9}>No available data</StyledTableCell></StyledTableRow>
                }
            </CustomTable>
            <TicketDetail
                isOpen={openEdit}
                setOpen={setOpenEdit}
                ticket={selectedRow}
            />
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

export default TicketsTable;