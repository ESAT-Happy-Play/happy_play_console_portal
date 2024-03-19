
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { COLORS } from '../../../utils/common_helpers/colors';
import { Box, Pagination, PaginationItem, TablePagination } from '@mui/material';
import { red } from '@mui/material/colors';

const CustomTable = ({ headers, style, children, pagination, headAlign = 'center' }) => {
    return (
        <>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                <Table sx={{ ...style }} aria-label="customized table">
                    <StyledTableHead>
                        <TableRow>
                            {headers.map((header, i) => (
                                <StyledTableHeaderCell align={headAlign} key={i}>{header}</StyledTableHeaderCell>
                            ))}
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {children}
                    </TableBody>
                </Table>
            </TableContainer >
            {pagination &&
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    {pagination}
                </Box>
            }
        </>
    );
}


const StyledTableHeaderCell = styled(TableCell)(`
    font-family: "Inter";
    padding:10px 0px;
    color: ${COLORS.violetMain};
    `,
);

const StyledTableHead = styled(TableHead)(`
font-family: "Inter";
    border-bottom: 2px solid ${COLORS.violetMain};
    `,
);


export const StyledTableRow = styled(TableRow)(`
    gap: 10px;

    &:hover{
        background:${COLORS.background};
        img{
            opacity:1 !important;
        }
    }
`);

export const StyledTableCell = styled(TableCell)(`
    font-family: "Inter";
    padding: 8px ;
    border-bottom: none;
    font-weight: 200;
    box-shadow: none;
`);

export const StyledPagination = styled((props) => {

    return (
        <>
            <TablePagination
                {...props}
            />
            <Pagination
                count={Math.ceil(props.count / props.rowsPerPage)}
                onChange={props.onPageChange}
                renderItem={(item) => (
                    <PaginationItem
                        sx={[{ '&.Mui-selected': { background: COLORS.violetMain, color: 'white' } }]}
                        {...item}
                    />
                )}
            />
        </>
    )
})(`
    p{
        font-family: "Inter";
    }
    .MuiTablePagination-select{
        font-family: "Inter";
        background: ${COLORS.tableBackground};
        color :${COLORS.violetMain};
        padding: 5px 10px !important;
    }
    .MuiTablePagination-selectIcon{
        display:none;
    }
    .MuiTablePagination-actions{
        display:none;
    }
`);

export default CustomTable;