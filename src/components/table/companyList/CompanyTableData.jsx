import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../table.scss";

function CompanyTableData({ company, handleShowCompanyProfile }) {
  return (
    <TableRow key={company.companyId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {company.companyName}</TableCell>
        <TableCell align="center">{company.numberOfBranch}</TableCell>
        <TableCell>{company.mainBranch}</TableCell>
        <TableCell>{company.branchOperator}</TableCell>
        <TableCell>{company.branchContact}</TableCell>
        <TableCell>
            <Button onClick={e => handleShowCompanyProfile(e, company.companyId, company.companyName) } className="btnShow" variant="contained" size="small">
                Show <VisibilityIcon />
            </Button>
        </TableCell>
    </TableRow>
  )
}

export default CompanyTableData
