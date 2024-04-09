import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { TableRow, TableCell, Box } from "@mui/material";
import CustomTable, {
  StyledPagination,
} from "../../../components/table/customTable/CustomTable";
import RegularSearchBar from "../../../components/searchbar/RegularSearchBar";
import FileExportIcon from "../../../assets/icons/FileExportIcon";
import ExportModal from "../../../components/modals/ExportModal";
import FilterListIcon from "@mui/icons-material/FilterList";
import { COLORS } from "../../../helper/colors";

export const SupportUsersTable = ({ data, onClickUserRow }) => {
  const head = ["Name", "Type", "Status", "Registration Date"];
  const [displayList, setDisplayList] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    setDisplayList(data);
  }, [data]);

  useEffect(() => {
    var statusData = [];
    if (searchValue.length > 0) {
      var search = statusData.filter((row) => {
        return Object.values(row)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setDisplayList(search);
    } else {
      setDisplayList(data);
    }

    setPage(0);
  }, [searchValue]);

  const toggleExportModal = () => {
    setShowExportModal((prev) => !prev);
  };

  const handleSearch = (event, value) => {
    setSearchValue(value);
    setPage(0);
  };

  const handleChangePage = (event, newpage) => {
    setPage(newpage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <div style={{ display: "flex", gap: 20 }}>
          <RegularSearchBar
            handleSearch={handleSearch}
            searchTitle="Search Name"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <div className="buttons" onClick={toggleExportModal}>
              <FileExportIcon size={20} />
              Export
            </div>
          </div>
        </div>
        <div className="filter-button">
          Filters
          <FilterListIcon />
        </div>
      </Box>
      <CustomTable
        headers={head}
        pagination={
          <StyledPagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={displayList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      >
        {displayList?.length >= 1 ? (
          displayList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, i) => (
              <StyledTableRow key={i} onClick={onClickUserRow}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.type}</StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        padding: "0px 5px",
                        color:
                          row.status === "Active"
                            ? COLORS.green
                            : COLORS.redWarn,
                        backgroundColor:
                          row.status === "Active"
                            ? COLORS.lightGreen
                            : COLORS.lightRed,
                      }}
                    >
                      {row.status}
                    </p>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.registrationDate}
                </StyledTableCell>
              </StyledTableRow>
            ))
        ) : (
          <StyledTableRow>
            <StyledTableCell align="center" colSpan={9}>
              No available data
            </StyledTableCell>
          </StyledTableRow>
        )}
      </CustomTable>
      <ExportModal
        open={showExportModal}
        onClose={toggleExportModal}
        handleToCsv={() => {}}
        handleToPdf={() => {}}
      />
    </div>
  );
};

const StyledTableRow = styled(TableRow)(`
border-bottom: 1px solid black;
gap: 10px;
cursor: pointer;
`);

const StyledTableCell = styled(TableCell)(`
padding: 8px ;
`);
