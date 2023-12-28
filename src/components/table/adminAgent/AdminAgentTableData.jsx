import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const AdminAgentTableData = ({ objct }) => {
  return (
    <TableRow key={ objct.accountInfoId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.companyName }</TableCell>
    <TableCell>{ objct.branchName }</TableCell>
    <TableCell>{ objct.masterName }</TableCell>
    <TableCell>{ objct.agentName }</TableCell>
    </TableRow>
  )
}

export default AdminAgentTableData
