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
        <TableCell>{dataObj.TYP_DSCRPTN}</TableCell>
        <TableCell>{dataObj.MobileNumber}</TableCell>
        <TableCell>{dataObj.OngoiongCases}</TableCell>
        <TableCell>{dataObj.TotalCases}</TableCell>
        <TableCell>
            <Button onClick={e => handleProcessAct(e, dataObj)} className="btnWarning" variant="contained" size="small">
                Act &nbsp; <VisibilityIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default ViolationsTableData
