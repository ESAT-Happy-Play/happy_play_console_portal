import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import "../table.scss";

function CommissionTableData({ uniqueId, dataObj }) {
  return (
    <TableRow key={uniqueId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.drawDate}</TableCell>
        <TableCell>
          {
            (dataObj.gameType === "01") ? "Regular"
            : (dataObj.gameType === "02") ? "Jackpot 3.3"
            : "Jackpot 3.4"
          }
        </TableCell>
        <TableCell>{dataObj.drawType}</TableCell>
        <TableCell>N/A</TableCell>
        <TableCell>{dataObj.fromDownlineName}</TableCell>
        <TableCell>{dataObj.amount}</TableCell>
    </TableRow>
  )
}

export default CommissionTableData
