import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const GameBetsTableData = ({ objct, uniqueKey }) => {
  return (
    <TableRow key={ uniqueKey } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>{ objct.bettorUserId }</TableCell>
      <TableCell>{ objct.bettorNameDisplay }</TableCell>
      <TableCell>{ objct.trn }</TableCell>
      <TableCell>{ objct.numBet }</TableCell>
      <TableCell>{ objct.betAmount }</TableCell>
      <TableCell>{ objct.betDate }</TableCell>
      <TableCell>{ objct.gameType }</TableCell>
      <TableCell>{ objct.recruiterNameDisplay }</TableCell>
    </TableRow>
  )
}

export default GameBetsTableData
