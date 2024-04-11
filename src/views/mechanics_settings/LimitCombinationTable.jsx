import React, { useEffect, useMemo, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';

import { COLORS } from '../../helper/colors';
import { Box, IconButton, TextField } from '@mui/material';
import { CustomRadioButton } from '../../components/radio/CustomRadioGroup';
import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import UpdateDialog from '../../components/Dialog/game/gameMechanics/UpdateDialog';
import { GameService } from "../../services";

const LimitCombinationTable = ({ data, type, settingId, subType }) => {
    const [displayList, setDisplayList] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [pages, setPages] = useState([0]);

    //Update modal states
    const [selectedRow, setSelectedRow] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [updateValue, setUpdateValue] = useState();
    const [valid, setValid] = useState(true);


    const initDisplayList = () => {
        requestDisplayList();
    }

    const requestDisplayList = () => {
        const requestData = {
            "companyGameId": subType.id,
            "start": page * rowsPerPage,
            "size": 1000,
            "search": ""
        };

        GameService.getCombinationLimit(requestData).then((res) => {
            if (res) {
                setTotalCount(res.data.totalCount);
                setDisplayList(res.data.combinations);
            }
        });
    }

    useEffect(() => {
        var statusData = [];
        switch (statusFilter) {
            case "available":
                statusData = data.filter((row) => row.limit > row.current);
                break;
            case "soldout":
                statusData = data.filter((row) => row.limit <= row.current);
                break;
            default:
                statusData = data;
        }
        var search = statusData.filter((row) => {
            return Object.values(row).join('').toLowerCase().includes(searchValue.toLowerCase());
        });

        setPage(0);
        // setDisplayList(search);

        initDisplayList();
    }, [searchValue, statusFilter]);

    // On click search
    const handleSearch = (event, value) => {
        setSearchValue(value);
        setPage(0);
    };

    const handleChangePage = (event, newpage) => {
        var newPage = newpage - 1;
        // if (Array.includes(pages, newPage))
        // {
        //     pages[pages.length] = newPage;
        //     setPages(pages);
        // }

        setPage(newPage - 1);

        console.log(newpage - 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));

        console.log(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilter = (value) => {
        setStatusFilter(value);
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
            <Box display="flex" justifyContent="space-between">
                <RegularSearchBar
                    handleSearch={handleSearch}
                    searchTitle="Search Combination"
                />
                <CustomRadioButton
                    defaultValue="all"
                    size="small"
                    options={[
                        { label: "All", value: "all" },
                        { label: "Available", value: "available" },
                        { label: "Soldout", value: "soldout" },
                    ]}
                    handleRadioChange={(e) => handleFilter(e.target.value)}
                />
            </Box>
            <CustomTable
                headers={["Bet Combination", "Applied Limit", "CurrentBets", "Status"]}
                pagination={
                    <StyledPagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalCount}
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
                                <StyledTableCell align="center" >{row.combination}</StyledTableCell>
                                <StyledTableCell align="center" >{row.limit}</StyledTableCell>
                                <StyledTableCell align="center" >{row.current}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ color: row.limit > row.current ? null : COLORS.redWarn }}>{row.limit > row.current ? "Available" : "Soldout"}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ width: 20 }}>
                                    <IconButton onClick={() => handleEdit(row)}><img src={require('./../../assets/icons/table-edit.png')} style={{ opacity: 0, width: 16, height: 16 }} /></IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                        ) :
                    <StyledTableRow ><StyledTableCell align="center" colSpan={9}>No available data</StyledTableCell></StyledTableRow>
                }
            </CustomTable>
            <UpdateDialog
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                title="Edit Limit for Combination"
                isValid={valid}
                successMessage={`Limit for ${selectedRow?.combination} is updated and will be applied to all upcoming draws for ${type}`}
            >
                <h2 style={{ margin: 0, textAlign: 'center', color: COLORS.violetMain, fontWeight: 600, fontSize: 32, fontFamily: 'Inter' }}>{selectedRow?.combination}</h2>
                <p style={{ marginTop: 6, marginBottom: 6, fontWeight: 200, fontFamily: 'Inter' }}>Limit Value</p>
                <TextField
                    size="small"
                    defaultValue={selectedRow?.limit}
                    variant="outlined"
                    fullWidth
                    error={!valid}
                    onChange={handleValidation}
                    helperText={!valid ? "Value should be atleast 1" : null}
                />

            </UpdateDialog>
        </div>
    );
}

export default LimitCombinationTable;