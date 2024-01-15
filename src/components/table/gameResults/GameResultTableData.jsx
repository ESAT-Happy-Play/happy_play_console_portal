import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../table.scss";

function GameResultTableData({ uniqueId, dataObj, handleShow }) {
  return (
    <TableRow key={uniqueId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.formattedDate}</TableCell>
        <TableCell>{dataObj.drawType}</TableCell>
        <TableCell>{dataObj.numRes}</TableCell>
        <TableCell style={{ display:'flex', gap:'5px'}}>
            <Button onClick={e => handleShow(e, dataObj)} className="btnShow" variant="contained" size="small">
                View Details <VisibilityIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default GameResultTableData
