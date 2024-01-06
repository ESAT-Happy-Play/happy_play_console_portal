import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function VerificationTableData({ objct }) {
  return (
    <TableRow key={ objct.userId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.nameFull}</TableCell>
    <TableCell>{ objct.requestDate }</TableCell>
    <TableCell>
        <div className="row">
          <Button component={Link} href="#" className="btnShow" variant="contained" size="small">
                View Details<VisibilityIcon />
            </Button>
        </div>
    </TableCell>
    </TableRow>
  )
}

export default VerificationTableData
