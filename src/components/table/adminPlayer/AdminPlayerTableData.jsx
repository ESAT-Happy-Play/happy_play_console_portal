import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const PlayerTableData = ({ objct }) => {
  return (
    <TableRow key={ objct.userId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.companyName }</TableCell>
    <TableCell>{ objct.branchName }</TableCell>
    <TableCell>{ objct.playerFullName }</TableCell>
    <TableCell>{ objct.mobileNumber }</TableCell>
    <TableCell>{ objct.agentFullName }</TableCell>
    <TableCell>{ objct.registrationDate }</TableCell>
    </TableRow>
  )
}

export default PlayerTableData
