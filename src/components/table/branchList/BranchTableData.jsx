import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function BranchTableData({ branch }) {
  return (
    <TableRow key={branch.branchId} x={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {branch.branchName}</TableCell>
        <TableCell>{branch.companyName}</TableCell>
        <TableCell>{branch.branchOperator}</TableCell>
        <TableCell>{branch.branchContact}</TableCell>
    </TableRow>
  )
}

export default BranchTableData
