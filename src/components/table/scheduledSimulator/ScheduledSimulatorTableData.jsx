import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { FormatDate, FormatTimeAmPm } from "../../../helper/Helpers";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button } from "@mui/material";

function ScheduledSimulatorTableData({ objct, handleShow }) {
  return (
    <TableRow key={ objct.gameSimulatorId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="center">{ objct.bbCardPerGame }</TableCell>
      <TableCell align="center">{ objct.f5CardPerGame }</TableCell>
      <TableCell align="center">{ objct.f6CardPerGame }</TableCell>
      <TableCell align="center">{ objct.f7CardPerGame }</TableCell>
      <TableCell align="center">{ objct.f8CardPerGame }</TableCell>
      <TableCell align="center">{ objct.noOfPlayer }</TableCell>
      <TableCell>{ FormatDate(objct.date) }</TableCell>
      <TableCell align="center">{ FormatTimeAmPm(objct.time) }</TableCell>
      <TableCell align="center">{ `${objct.timeInterval} sec` }</TableCell>
      <TableCell>{ (objct.status == 0) ? <b style={{color:'green'}}>Open</b> : <b style={{color:'red'}}>Close</b> }</TableCell>
      <TableCell>
        <Button style={{ textAlign:"center" }} variant="contained" size="small">Edit <EditOutlinedIcon/></Button>
      </TableCell>
    </TableRow>
  )
}

export default ScheduledSimulatorTableData
