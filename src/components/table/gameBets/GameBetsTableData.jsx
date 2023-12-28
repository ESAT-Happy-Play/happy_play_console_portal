import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const GameBetsTableData = ({ objct, onView }) => {
  return (
    <TableRow key={ objct.gameScheduleId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>{ objct.drawDate }</TableCell>
      <TableCell>{ objct.accountNumber }</TableCell>
      <TableCell>{ objct.accountName }</TableCell>
      <TableCell>{ objct.location }</TableCell>
      <TableCell>{ objct.transactionNo }</TableCell>
      <TableCell>{ objct.gameCombo }</TableCell>
      <TableCell>{ objct.amount }</TableCell>
      <TableCell>{ objct.totalAmount }</TableCell>
      <TableCell>{ objct.recruiterName }</TableCell>
    </TableRow>
  )
}

export default GameBetsTableData
