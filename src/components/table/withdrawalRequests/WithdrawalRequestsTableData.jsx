import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import "../table.scss";

function AgentCreditRequestsTableData({ dataObj, handleAppDec }) {
  return (
    <TableRow key={dataObj.requestId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.requesteeName}</TableCell>
        <TableCell>{dataObj.requestAmount}</TableCell>
        <TableCell>
          {
            (dataObj.mode === "0") ? "Over The Counter"
            : (dataObj.mode === "1") ? "Cash On Delivery"
            : (dataObj.mode === "2") ? "Money Remittance"
            : "Bank Transfer"
          }
        </TableCell>
        <TableCell>{dataObj.requestDate}</TableCell>
        <TableCell style={{ display:'flex', gap:'5px'}}>
            <Button onClick={e => handleAppDec(e, dataObj, 1)} className="btnSuccess" variant="contained" size="small">
                Approve <CheckOutlinedIcon />
            </Button>
            <Button onClick={e => handleAppDec(e, dataObj, 0)} className="btnEdit" variant="contained" size="small">
                Decline <DeleteOutlinedIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default AgentCreditRequestsTableData
