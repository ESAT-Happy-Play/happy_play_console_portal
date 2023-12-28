import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const GameResultsTableData = ({ objct, onView }) => {
  return (
    <TableRow key={ objct.gameScheduleId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>{ objct.betTypeName }</TableCell>
      <TableCell>{ objct.drawDate }</TableCell>
      <TableCell>{ objct.gameDrawTypeName }</TableCell>
      <TableCell>{ objct.combo }</TableCell>
    </TableRow>
  )
}

export default GameResultsTableData
