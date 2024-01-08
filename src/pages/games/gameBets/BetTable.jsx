import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { TableRow, TableCell, Button } from '@mui/material';
import CustomTable from '../../../components/table/customTable/CustomTable';

export const BetsTable = ({ data }) => {

    const head = ["Acct #", "Acct Name", "Transaction #", "Num Bet", "Bet Amount", "Bet Date", "Game Time", "Recruiter"];

    return (
        <CustomTable
            headers={head}
            tableRows={
                data?.length > 1 ? 
                    data?.map((row, i) => (
                    <StyledTableRow key={i}>
                        <StyledTableCell align="center" component="th" scope="row">
                            {row.accntNo}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.accntName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.transactionNo}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.noBet}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.betAmount}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.date}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.gameTime}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.recruiter}
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