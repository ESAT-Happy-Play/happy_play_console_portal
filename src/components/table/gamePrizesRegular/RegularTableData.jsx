import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { FormatAmount } from "../../../helper/Helpers";

import { DateExt } from "../../../utils/helpers/DateExt";

import "../table.scss";

function RegularTableData({ data }) {
  return (
    <TableRow
      key={data.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {" "}
        {data.displayName}
      </TableCell>
      <TableCell align="center">{data.transactionNumber}</TableCell>
      <TableCell align="center">{data.combination}</TableCell>
      <TableCell>{FormatAmount(data.amount)}</TableCell>
      <TableCell>{data.gameTime}</TableCell>
      <TableCell>{DateExt.readableDate(data.date)}</TableCell>
    </TableRow>
  );
}

export default RegularTableData;
