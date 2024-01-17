import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { TableRow, TableCell, Button } from '@mui/material';
import CustomTable from '../../../components/table/customTable/CustomTable';

export const LimitTable = ({ data }) => {

    const head = ["Combination", "Bet Amount Limit", "Current Bet Limit", "Action"];

    return (
        <CustomTable
            headers={head}
            tableRows={
                data?.length > 0 ? 
                    data?.map((row, i) => (
                    <StyledTableRow key={i}>
                        <StyledTableCell align="center" component="th" scope="row">
                            {row.combination}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.amountlimit}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.amountCurrent}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Button variant="primary" className="edit-button">Change Limit</Button>
                        </StyledTableCell>
                    </StyledTableRow>)) 
                    : 
                    <StyledTableRow ><StyledTableCell align="center" colSpan={9}>No available data</StyledTableCell></StyledTableRow>
                    
                } />
    );
};


export const SoldOutTable = ({ data }) => {
    const head = ["Combination", "IsTemporary", "Action"];

    return (
        <CustomTable
            headers={head}
            tableRows={
                data?.length > 0 ? 
                    data?.map((row, i) => (
                    <StyledTableRow key={i}>
                        <StyledTableCell align="center" component="th" scope="row">
                            {row.combination}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.isTemporary == 0 ? '0': '1' }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <Button variant="primary" className="edit-button">Change Limit</Button>
                        </StyledTableCell>
                    </StyledTableRow>)) 
                    : 
                    <StyledTableRow ><StyledTableCell align="center" colSpan={9}>No available data</StyledTableCell></StyledTableRow>
                    
                } />
    );
};


const StyledTableRow = styled(TableRow)(`
border-bottom: 1px solid black;
gap: 10px;

`);

const StyledTableCell = styled(TableCell)(`
padding: 8px ;
`);