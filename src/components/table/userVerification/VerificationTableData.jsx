import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Button } from "@mui/material";

function VerificationTableData({ objct, handleShow }) {
  return (
    <TableRow key={ objct.userId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.nameFull}</TableCell>
    <TableCell>{ objct.requestDate }</TableCell>
    <TableCell>
        <div className="row">
          <div className="col-6">
              <Button style={{ textAlign:"center" }} variant="contained" size="small">View Details</Button>
          </div>
        </div>
    </TableCell>
    </TableRow>
  )
}

export default VerificationTableData
