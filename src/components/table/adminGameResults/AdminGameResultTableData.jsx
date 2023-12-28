import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const AdminGameResultTableData = ({ objct, onView }) => {
  return (
    <TableRow onClick={() => onView(objct)} key={ objct.gameScheduleId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell>{ objct.accountName }</TableCell>
      <TableCell>{ objct.trasactionNo }</TableCell>
      <TableCell>{ objct.noOfCards }</TableCell>
      <TableCell>{ objct.totalWinning }</TableCell>
      <TableCell>{ objct.recruiterName }</TableCell>
    </TableRow>
  )
}

export default AdminGameResultTableData
