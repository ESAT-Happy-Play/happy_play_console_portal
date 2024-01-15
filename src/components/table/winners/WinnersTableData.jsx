import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import "../table.scss";

function WinnersTableData({ uniqueId, dataObj }) {
  return (
    <TableRow key={uniqueId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.bettorUserId}</TableCell>
        <TableCell>{dataObj.bettorNameDisplay}</TableCell>
        <TableCell>{dataObj.trn}</TableCell>
        <TableCell>{dataObj.wonBet}</TableCell>
        <TableCell>{dataObj.betAmount}</TableCell>
        <TableCell>{dataObj.winAmount}</TableCell>
        <TableCell>{dataObj.recruiterNameDisplay}</TableCell>
        <TableCell>{dataObj.drawType}</TableCell>
    </TableRow>
  )
}

export default WinnersTableData
