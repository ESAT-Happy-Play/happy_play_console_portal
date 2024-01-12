import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../table.scss";

function AgentCreditRequestsTableData({ dataObj }) {
  return (
    <TableRow key={dataObj.requestId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.requesteeName}</TableCell>
        <TableCell>{dataObj.requestAmount}</TableCell>
        <TableCell>{dataObj.mode}</TableCell>
        <TableCell>{dataObj.requestDate}</TableCell>
        <TableCell style={{ display:'flex', gap:'5px'}}>
            <Button component={Link} href={`/dataObj`} className="btnShow" variant="contained" size="small">
                View Details<VisibilityIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default AgentCreditRequestsTableData
