import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import "../table.scss";

function ViolationsTableData({ uniqueKey, dataObj, handleProcessAct }) {
  return (
    <TableRow key={uniqueKey} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.UserId}</TableCell>
        <TableCell>{dataObj.UserName}</TableCell>
        <TableCell>{dataObj.UserType}</TableCell>
        <TableCell>{dataObj.CASES}</TableCell>
        <TableCell>{dataObj.CreatedOn}</TableCell>
    </TableRow>
  )
}

export default ViolationsTableData
