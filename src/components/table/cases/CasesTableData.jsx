import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from "@mui/material";

import "../table.scss";

function CasesTableData({ dataObj, handleProcessCase }) {
  return (
    <TableRow key={dataObj.caseId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.category}</TableCell>
        <TableCell>{dataObj.title}</TableCell>
        <TableCell>{dataObj.description}</TableCell>
        <TableCell>0</TableCell>
        <TableCell>{dataObj.createdOn}</TableCell>
        <TableCell>
            <Button onClick={e => handleProcessCase(e, dataObj)} className="btnShow" variant="contained" size="small">
                Process
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default CasesTableData
