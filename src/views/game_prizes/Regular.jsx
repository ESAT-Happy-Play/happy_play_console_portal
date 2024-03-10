import React, { useState, useEffect } from "react";
import RegularSearchBar from "../../components/searchbar/RegularSearchBar";
import RegularTable from "../../components/table/gamePrizesRegular/RegularTable";
import { regularData } from "../../helper/mocks";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import FileExportIcon from "../../assets/icons/FileExportIcon";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./regular.scss";

const Regular = () => {
  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);

  const [regularSearchValue, setRegularSearchValue] = useState("");
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [data, setData] = useState(regularData.data);
  const [clickCounter, setclickCounter] = useState(0);

  const handleLoadRegular = () => {
    const filteredData = regularData.data.filter(
      (data) =>
        data.displayName.includes(regularSearchValue) ||
        data.combination.includes(regularSearchValue) ||
        data.transactionNumber.includes(regularSearchValue)
    );
    setPageLoader(true);
    setTotalRows(regularData.pageInfo.total);
    setpageNumber(regularData.pageInfo.pageNumber);
    setpageSize(regularData.pageInfo.pageSize);
    setData(filteredData);
    setPageLoader(false);
  };

  useEffect(() => {
    handleLoadRegular();
  }, [clickCounter]);

  // On click search
  const handleRegularSearch = (event, value) => {
    setRegularSearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
    setclickCounter(clickCounter + 1);
  };

  // Trigger on search empty
  const handleRegularSearchEmpty = (event, value) => {
    if (value === "") {
      setRegularSearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
      setclickCounter(clickCounter + 1);
    }
  };

  // handle company table next page
  const handleRegularChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
    setclickCounter(clickCounter + 1);
  };

  // handle company table change page size
  const handleRegularRowsPerPage = (event) => {
    setpageSize(+event.target.value);
    setpageNumber(1);
    setclickCounter(clickCounter + 1);
  };

  return (
    <div className="div-table">
      <div className="div-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <div
              className="div-content"
              style={{ width: "450px", padding: "10px" }}
            >
              <div className="div-search">
                <RegularSearchBar
                  handleSearch={handleRegularSearch}
                  handleSearchEmpty={handleRegularSearchEmpty}
                  searchTitle="Search Name, Combination, or Transaction"
                />
              </div>
            </div>
            <div className="buttons">
              <QrCodeScannerIcon />
              Scan Ticket QR
            </div>
            <div className="buttons">
              <FileExportIcon size={20} />
              Export
            </div>
          </div>
          <div className="filter-button">
            Filters
            <FilterListIcon />
          </div>
        </div>
        <RegularTable
          dataSearchResults={data}
          changePage={handleRegularChangePage}
          rowsPerPage={handleRegularRowsPerPage}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={totalRows}
          isLoading={pageLoader}
        />
      </div>
    </div>
  );
};

export default Regular;
