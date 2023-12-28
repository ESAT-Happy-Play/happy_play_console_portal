import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function ForApprovalTableData({ objct, handleShow, handleDelete }) {
  return (
    <TableRow key={ objct.accountInfoId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.name }</TableCell>
    <TableCell>{ (objct.age !== 0) ? objct.age : '' }</TableCell>
    <TableCell>{ objct.mobileNumber }</TableCell>
    <TableCell>{ objct.registrationDate }</TableCell>
    <TableCell>
        <div className="row">
        <div className="col-6">
            <Button variant="contained" size="large" onClick={e => handleShow(e, objct.accountInfoId)}>Show</Button>
        </div>
        <div className="col-6">
            <Button variant="contained" onClick={e => handleDelete(objct.accountInfoId)} color="error" size="large">
              <DeleteIcon />
            </Button>
        </div>
        </div>
    </TableCell>
    </TableRow>
  )
}

export default ForApprovalTableData
