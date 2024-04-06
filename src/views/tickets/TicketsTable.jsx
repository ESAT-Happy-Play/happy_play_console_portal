
import React, { useEffect, useMemo, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';

import { COLORS } from '../../helper/colors';
import { Box, Chip, IconButton, TextField } from '@mui/material';
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
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

    const priorityLevel = ["Low", "High", "Critical"]

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
        console.log(value);
        setFilters(value);
    };

    const toggleFilter = () => {
        setShowFilterModal((prev) => !prev);
    };

    const handleResetFilters = () => {
        setFilters([])
    };

    const handleDelete = (chipToDelete) => () => {
        setFilters((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleEdit = (value) => {
        setSelectedRow(value);
        setValid(true);
        setOpenEdit(true);
    }

    const handleValidation = (value) => {
        console.log(value.target.value);
        if (value.target.value < 1)
            setValid(false);
        else
            setValid(true);
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
                <Box marginLeft="auto" display="flex">
                    {filters.map((filter, index) =>
                        <Chip
                            key={index}
                            color='primary'
                            label={filter.label}
                            onDelete={handleDelete(filter)}
                            deleteIcon={<CloseIcon />}
                        />
                    )}
                    <div className="filter-button" onClick={toggleFilter}>
                        Filters
                        <FilterListIcon />
                    </div>
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
                            <StyledTableRow key={i}>
                                <StyledTableCell align="center" >{row.fullName}</StyledTableCell>
                                <StyledTableCell align="center" >{row.title}</StyledTableCell>
                                <StyledTableCell align="center" >{row.description}</StyledTableCell>
                                <StyledTableCell align="center" >{row.attachment}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ color: row.priority == 2 ? COLORS.yellow : row.priority == 3 ? COLORS.redWarn : null }}>{priorityLevel[row.priority - 1]}</StyledTableCell>
                                <StyledTableCell align="center" >{row.date}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: 20 }}>
                                    <IconButton onClick={() => handleEdit(row)}><img src={require('./../../assets/icons/table-edit.png')} style={{ opacity: 0, width: 16, height: 16 }} /></IconButton>
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

            <TicketsFilterModal
                open={showFilterModal}
                onClose={() => toggleFilter(null)}
                onSubmit={handleFilter}
                initFilters={filters}
                handleResetFilters={handleResetFilters}
            />
        </div>
    );
}

export default TicketsTable;