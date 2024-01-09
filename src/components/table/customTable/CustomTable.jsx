
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { COLORS } from '../../../helper/colors';

const CustomTable = ({headers, tableRows, style}) => {
    return (
    <TableContainer component={Paper}>
        <Table sx={{ ...style }} aria-label="customized table">
            <StyledTableHead>
                <TableRow>
                    {headers.map((header) => (
                        <StyledTableCell align='center'>{header}</StyledTableCell>
                    ))}
                </TableRow>
            </StyledTableHead>
            <TableBody>
                {tableRows}
            </TableBody>
        </Table>
    </TableContainer>
    );
}

    
const StyledTableCell = styled(TableCell)( `
    color: ${COLORS.violetMain};
    `,
);
 
const StyledTableHead = styled(TableHead)( `
    border-top: 2px solid ${COLORS.violetMain};
    border-bottom: 2px solid ${COLORS.violetMain};
    `,
);
   
export default CustomTable