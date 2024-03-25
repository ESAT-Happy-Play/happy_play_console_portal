import React, { useEffect, useState } from "react";
import CustomTable, {
  StyledPagination,
  StyledTableCell,
  StyledTableRow,
} from "../../components/table/customTable/CustomTable";

import { Box } from "@mui/material";
import RegularSearchBar from "../../components/searchbar/RegularSearchBar";
import { FormatAmount, FormatFullDate } from "../../helper/Helpers";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import FileExportIcon from "../../assets/icons/FileExportIcon";
import FilterListIcon from "@mui/icons-material/FilterList";
import BetsDetailModal from "./BetsDetailModal";
import CustomFilterModal from "../../components/modals/CustomFilterModal";
import ScanModal from "../../components/modals/ScanModal";
import ExportModal from "../../components/modals/ExportModal";

const BetsTable = ({ data, gameName, subTypeName }) => {
  const [displayList, setDisplayList] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [showScanNowModal, setShowScanNowModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const [selectedRowData, setSelectedRowData] = useState();

  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [dateInterval, setDateInterval] = useState("1D");
  const [timeSlot, setTimeSlot] = useState("ALL");

  useEffect(() => {
    var search = data.filter((row) => {
      return Object.values(row)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });

    setPage(0);
    setDisplayList(search);
  }, [searchValue, data]);

  // On click search
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

  const toggleModal = (data) => {
    setSelectedRowData(data);
    setShowModal((prev) => !prev);
  };

  const toggleFilter = () => {
    setShowFilterModal((prev) => !prev);
  };

  const toggleScanModal = () => {
    setShowScanNowModal((prev) => !prev);
  };

  const toggleExportModal = () => {
    setShowExportModal((prev) => !prev);
  };

  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
  };

  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
  };

  const handleChangeDateInterval = (selectedDateInterval) => {
    setDateInterval(selectedDateInterval);
  };

  const handleChangeTimeSlot = (selectedTimeSlot) => {
    setTimeSlot(selectedTimeSlot);
  };

  const handleResetFilters = () => {
    setCompany("");
    setBranch("");
    setDateInterval("1D");
    setTimeSlot("ALL");
  };

  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <div style={{ display: "flex", gap: 20 }}>
          <RegularSearchBar
            handleSearch={handleSearch}
            searchTitle="Search Combination"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <div className="buttons" onClick={toggleScanModal}>
              <QrCodeScannerIcon />
              Scan Ticket QR
            </div>
            <div className="buttons" onClick={toggleExportModal}>
              <FileExportIcon size={20} />
              Export
            </div>
          </div>
        </div>
        <div className="filter-button" onClick={toggleFilter}>
          Filters
          <FilterListIcon />
        </div>
      </Box>
      <CustomTable
        headers={[
          "Display Name",
          "Transaction Number",
          "Combination",
          "Amount",
          "Game Time",
          "Date",
        ]}
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
            .map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={() => toggleModal(row)}
                sx={{ cursor: "pointer" }}
              >
                <StyledTableCell align="center">
                  {row.displayName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.transactionNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.combination}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {FormatAmount(row.amount)}
                </StyledTableCell>
                <StyledTableCell align="center">{row.gameTime}</StyledTableCell>
                <StyledTableCell align="center">
                  {FormatFullDate(new Date(row.date))}
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
      <BetsDetailModal
        open={showModal}
        onClose={() => toggleModal(null)}
        transactionId={selectedRowData?.transactionNumber}
        gameName={gameName}
        subTypeName={subTypeName}
        gameTime={selectedRowData?.gameTime}
        date={selectedRowData?.date}
      />
      <CustomFilterModal
        open={showFilterModal}
        onClose={() => toggleFilter(null)}
        onSubmit={() => toggleFilter(null)}
        company={company}
        branch={branch}
        dateInterval={dateInterval}
        timeSlot={timeSlot}
        gameName={gameName}
        subTypeName={subTypeName}
        gameTime={selectedRowData?.gameTime}
        date={selectedRowData?.date}
        handleChangeCompany={handleChangeCompany}
        handleChangeBranch={handleChangeBranch}
        handleChangeDateInterval={handleChangeDateInterval}
        handleChangeTimeSlot={handleChangeTimeSlot}
        handleResetFilters={handleResetFilters}
      />
      <ScanModal
        open={showScanNowModal}
        onClose={toggleScanModal}
        handleScan={() => {}}
        handleUpload={() => {}}
      />
      <ExportModal
        open={showExportModal}
        onClose={toggleExportModal}
        handleToCsv={() => {}}
        handleToPdf={() => {}}
      />
    </div>
  );
};

export default BetsTable;
