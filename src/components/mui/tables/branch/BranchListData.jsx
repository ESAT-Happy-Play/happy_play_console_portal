import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoIcon from '@mui/icons-material/Info';

import { DateExt } from "../../../../utils/helpers";

function BranchListData({ branch }) {
  return (
    <TableRow key={branch.branchId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {branch.companyName}</TableCell>
        <TableCell>{branch.branchName}</TableCell>
        <TableCell align="center">{branch.numberOfUsers}</TableCell>
        <TableCell>{DateExt.readableDate(branch.createdOn)}</TableCell>
        <TableCell width="50px">
            <Button component={Link} href={`/branches/${branch.branchId}`} variant="text" size="small">
                <InfoIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default BranchListData
