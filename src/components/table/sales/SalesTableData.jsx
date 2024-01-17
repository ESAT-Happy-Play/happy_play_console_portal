import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';

import { Button } from "@mui/material";

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import "../table.scss";

function SalesTableData({ dataObj, uniqKey }) {
  return (
    <TableRow key={uniqKey} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell component="th" scope="row"> {dataObj.day}</TableCell>
        <TableCell>{dataObj.pm1}</TableCell>
        <TableCell>{dataObj.pm2}</TableCell>
        <TableCell>{dataObj.pm3}</TableCell>
        <TableCell>{dataObj.pm4}</TableCell>
        <TableCell>{dataObj.pm5}</TableCell>
        <TableCell>{dataObj.pm6}</TableCell>
        <TableCell>{dataObj.pm7}</TableCell>
        <TableCell>{dataObj.pm8}</TableCell>
        <TableCell>{dataObj.pm9}</TableCell>
        <TableCell>{dataObj.pm10}</TableCell>
        <TableCell>{dataObj.pm11}</TableCell>
    </TableRow>
  )
}

export default SalesTableData
