import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Button } from "@mui/material";

function VerificationTableData({ objct, handleShow, handleVerifyCallback }) {
  return (
    <TableRow key={ objct.accountInfoId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.name}</TableCell>
    <TableCell>{ objct.age }</TableCell>
    <TableCell>{ objct.mobileNumber }</TableCell>
    <TableCell>{ (objct.IsVerified) ? <b style={{color:'#38a169'}}>Verified</b> : <b style={{ color:"red"}}>Not Verified</b> }</TableCell>
    <TableCell>
        <div className="row">
          <div className="col-6">
              <Button onClick={ e => handleShow(objct.accountInfoId) } style={{ textAlign:"center" }} variant="contained" size="medium">View Details</Button>
          </div>
          <div className="col-6">
              <Button onClick={ e => handleVerifyCallback(objct.accountInfoId) } style={{ textAlign:"center" }} color="success" variant="contained" size="medium">Verify</Button>
          </div>
        </div>
    </TableCell>
    </TableRow>
  )
}

export default VerificationTableData
