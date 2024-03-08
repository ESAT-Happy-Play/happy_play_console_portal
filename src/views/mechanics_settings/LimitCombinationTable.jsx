import React, { useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';

import { COLORS } from '../../helper/colors';
import { IconButton } from '@mui/material';

const LimitCombinationTable = ({ data }) => {
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(5);


    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    return (
        <div>
            <Box>
            </Box>
            <CustomTable
                headers={["Bet Combination", "Applied Limit", "CurrentBets", "Status"]}
                count={data.length}
                pagination={
                    <StyledPagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rpg}
                        page={pg}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
            >
                {data?.length > 1 ?

                    data.slice(pg * rpg, pg *
                        rpg + rpg).map((row, i) => (
                            <StyledTableRow key={i}>
                                <StyledTableCell align="center" >{row.combination}</StyledTableCell>
                                <StyledTableCell align="center" >{row.limit}</StyledTableCell>
                                <StyledTableCell align="center" >{row.current}</StyledTableCell>
                                <StyledTableCell align="center" sx={{ color: row.limit > row.current ? null : COLORS.redWarn }}>{row.limit > row.current ? "Available" : "Soldout"}</StyledTableCell>
                                <StyledTableCell align="center" >
                                    <IconButton ><img src={require('./../../assets/icons/table-edit.png')} style={{ opacity: 0, width: 16, height: 16 }} /></IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                        ) :
                    <StyledTableRow ><StyledTableCell align="center" colSpan={9}>No available data</StyledTableCell></StyledTableRow>
                }
            </CustomTable>
        </div>
    );
}

export default LimitCombinationTable;