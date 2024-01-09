import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { TableRow, TableCell, Button } from '@mui/material';
import CustomTable from '../../../components/table/customTable/CustomTable';

export const ResultsTable = ({ data }) => {

    const head = ["Draw Date", "Draw Schedule", "Combination", "Action"];

    return (
        <CustomTable
            headers={head}
            tableRows={
                data?.length > 1 ? 
                    data?.map((row, i) => (
                    <StyledTableRow key={i}>
                        <StyledTableCell align="center" component="th" scope="row">
                            {row.drawDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.drawSchedule}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {row.combination}
                        </StyledTableCell>
                        <StyledTableCell align="center" width={300}>
                            <Button variant="primary" className="edit-button">Change</Button>
                            <Button variant="primary" className="delete-button">Delete</Button>
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