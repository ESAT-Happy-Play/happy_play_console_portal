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
import AssetDetail from './AssetDetail';
import { assetTypes } from '../../../helper/mocks';
import AssetFilterDialog from '../../../components/modals/accountingModals/AssetFilterDialog';

const AssetsTable = ({ data }) => {
    const [displayList, setDisplayList] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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

    const handleEdit = (value) => {
        setSelectedRow(value);
        setOpenEdit(true);
    }

    return (
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Box display="flex" alignItems="center" gap={1}>
                <RegularSearchBar
                    handleSearch={handleSearch}
                    searchTitle="Search Name, Asset#"
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
                headers={["AssetId", "Company / Branch", "Asset Type", "Amount", "Date"]}
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
                            <StyledTableRow key={i} onClick={() => handleEdit(row)}>
                                <StyledTableCell align="center" >{row.assetNumber}</StyledTableCell>
                                <StyledTableCell align="center" >{row.name}</StyledTableCell>
                                <StyledTableCell align="center" >{assetTypes.find((e) => e.id == row.type).name}</StyledTableCell>
                                <StyledTableCell align="center" >{row.amount}</StyledTableCell>
                                <StyledTableCell align="center" >{row.date}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: 20 }}>
                                    <IconButton><InfoIcon className='icon-show' sx={{ opacity: 0 }} /></IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                        ) :
                    <StyledTableRow ><StyledTableCell align="center" colSpan={9}>No available data</StyledTableCell></StyledTableRow>
                }
            </CustomTable>
            {openEdit &&
                <AssetDetail
                    isOpen={openEdit}
                    handleClose={handleCloseEdit}
                    handleSubmition={handleSubmit}
                    isEditing={true}
                    asset={selectedRow}
                />}
            {openSuccess &&
                <Dialog
                    open={openSuccess}
                    onClose={() => setOpenSuccess(false)}
                >
                    <DialogTitle style={{ color: '#38A169', fontWeight: 'bold' }}>Success</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Successfully updated asset!</DialogContentText>
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

export default AssetsTable;