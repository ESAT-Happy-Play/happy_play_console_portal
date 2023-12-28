import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const OperatorTableData = ({ objct }) => {
  return (
    <TableRow key={ objct.operatorId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.operatorName }</TableCell>
    <TableCell>{ objct.companyName }</TableCell>
    <TableCell>{ objct.branch }</TableCell>
    <TableCell>{ objct.contactNumber }</TableCell>
    </TableRow>
  )
}

export default OperatorTableData
