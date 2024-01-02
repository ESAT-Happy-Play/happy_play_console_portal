import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import "../table.scss";

function BranchTableData({ branch, handleEditProfile }) {
  return (
    <TableRow key={branch.branchCode} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {branch.companyName}</TableCell>
        <TableCell >{branch.branchName}</TableCell>
        <TableCell align="center">{branch.operatorCount}</TableCell>
        <TableCell>{branch.registrationDate}</TableCell>
        <TableCell style={{ display:'flex', gap:'5px'}}>
            <Button onClick={e => handleEditProfile(e, branch) } className="btnEdit" variant="contained" size="small">
                Edit <EditOutlinedIcon />
            </Button>
            <Button component={Link} href={`/branch/${branch.branchCode}/${branch.companyId}`} className="btnShow" variant="contained" size="small">
                View Details<VisibilityIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default BranchTableData
