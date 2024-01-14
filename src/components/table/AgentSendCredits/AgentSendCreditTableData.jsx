import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../table.scss";

function AgentSendCreditTableData({ indexId, dataObj }) {
  return (
    <TableRow key={indexId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.receiverName}</TableCell>
        <TableCell>{dataObj.amount}</TableCell>
        <TableCell>
          {
            (dataObj.mode === "0") ? "Over The Counter"
            : (dataObj.mode === "1") ? "Cash On Delivery"
            : (dataObj.mode === "2") ? "Money Remittance"
            : "Bank Transfer"
          }
        </TableCell>
        <TableCell>{dataObj.requestDate}</TableCell>
    </TableRow>
  )
}

export default AgentSendCreditTableData
