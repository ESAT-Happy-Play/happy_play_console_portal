import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from "@mui/material";

const PlayerTableData = ({ objct , addWallet}) => {
  return (
    <TableRow key={ objct.accountInfoId } sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell>{ objct.companyName }</TableCell>
    <TableCell>{ objct.branchName }</TableCell>
    {/* <TableCell>{ objct.masterName }</TableCell> */}
    <TableCell>{ objct.agentName }</TableCell>
    <TableCell>{ objct.playerName }</TableCell>
    <TableCell>
      <Button style={{ textTransform:'capitalize'}} 
      onClick={e => addWallet(e, objct.accountInfoId)}
      variant="contained" size="small">Add Wallet</Button>
    </TableCell>
    </TableRow>
  )
}

export default PlayerTableData
