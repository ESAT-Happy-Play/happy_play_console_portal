
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { TableRow, TableCell, Button } from '@mui/material';
import CustomTable from '../../../components/table/customTable/CustomTable';

export const ClosingTable = ({ data }) => {

    const head = ["Closing Date", "Actions"];

    return (
        <CustomTable
            headers={head}
            tableRows={data?.map((row, i) => (
                <StyledTableRow key={i}>
                    <StyledTableCell align="center" component="th" scope="row">
                        {row}
                    </StyledTableCell>
                    <StyledTableCell align="center" width={300}>
                        <Button variant="primary" className="edit-button">Change</Button>
                        <Button variant="primary" className="delete-button">Delete</Button>
                    </StyledTableCell>
                </StyledTableRow>))} />
    );
};


export const DrawTypesTable = ({ data }) => {

    const head = ["Draw Time", "Start Cutoff", "End Cutoff", "Action",];

    return (
        <CustomTable
            headers={head}
            tableRows={data?.map((row, i) =>
                (<StyledTableRow key={i}>
                    <StyledTableCell align="center" component="th" scope="row">
                        {row.drawType}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.cutStart}</StyledTableCell>
                    <StyledTableCell align="center">{row.cutEnd}</StyledTableCell>
                    <StyledTableCell align="center" width={300}>
                        <Button variant="primary" className="edit-button">Change</Button>
                        <Button variant="primary" className="delete-button">Delete</Button>
                    </StyledTableCell>
                </StyledTableRow>))} />
    );
};

   

const StyledTableRow = styled(TableRow)(`
border-bottom: 1px solid black;
gap: 10px;

`);

const StyledTableCell = styled(TableCell)(`
padding: 8px ;
`);