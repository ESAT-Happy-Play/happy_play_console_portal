import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../table.scss";

function ForApprovalTableData({ dataObj, handleShowInfo }) {
  return (
    <TableRow key={dataObj.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.registrationDate}</TableCell>
        <TableCell>{dataObj.fullName}</TableCell>
        <TableCell>{dataObj.mobileNumber}</TableCell>
        <TableCell>{dataObj.registrationType}</TableCell>
        <TableCell style={{ display:'flex', gap:'5px'}}>
            <Button onClick={e => handleShowInfo(e, dataObj) } className="btnEdit" variant="contained" size="small">
                View Details &nbsp; <VisibilityIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default ForApprovalTableData
