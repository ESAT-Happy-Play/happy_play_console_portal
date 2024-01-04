import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const OperatorTableData = ({ objct }) => {
  return (
    <TableRow key={ objct.userid } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.companyName }</TableCell>
    <TableCell>{ objct.operatorBranch }</TableCell>
    <TableCell>{ objct.operatorFullname }</TableCell>
    <TableCell>{ objct.operatorMobileNumber }</TableCell>
    <TableCell>{ objct.registrationDate }</TableCell>
    </TableRow>
  )
}

export default OperatorTableData
