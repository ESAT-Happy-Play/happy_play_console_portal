import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const AdminAgentTableData = ({ objct }) => {
  return (
    <TableRow key={ objct.userId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.companyName }</TableCell>
    <TableCell>{ objct.branchName }</TableCell>
    <TableCell>{ objct.agentFullName }</TableCell>
    <TableCell>{ objct.agentCount }</TableCell>
    <TableCell>{ objct.playerCount }</TableCell>
    <TableCell>{ objct.mobileNumber }</TableCell>
    <TableCell>{ objct.recruiterFullName }</TableCell>
    <TableCell>{ objct.registrationDate }</TableCell>
    </TableRow>
  )
}

export default AdminAgentTableData
