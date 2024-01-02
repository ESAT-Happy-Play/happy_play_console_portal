import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import "../table.scss";

function CompanyTableData({ company, handleEditCompanyProfile }) {
  return (
    <TableRow key={company.companyId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {company.companyName}</TableCell>
        <TableCell align="center">{company.branchCount}</TableCell>
        <TableCell align="center">{company.operatorCount}</TableCell>
        <TableCell>{company.registrationDate}</TableCell>
        <TableCell style={{ display:'flex', gap:'5px'}}>
            <Button onClick={e => handleEditCompanyProfile(e, company) } className="btnEdit" variant="contained" size="small">
                Edit <EditOutlinedIcon />
            </Button>
            <Button component={Link} href={`/company/${company.companyId}`} className="btnShow" variant="contained" size="small">
                View Details<VisibilityIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default CompanyTableData
