import React, { useEffect } from "react";
import "./customFilterModal.scss";
import { FormatFullDate } from "../../helper/Helpers";
import { Close } from "@mui/icons-material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { COLORS } from "../../helper/colors";
import { drawTypeList } from "../../helper/mocks";
import { TextField, InputAdornment } from "@mui/material";
import TollIcon from "@mui/icons-material/Toll";
import { CustomRadioButton } from "../radio/CustomRadioGroup";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const CustomFilterModal = ({
  open,
  onClose,
  onSubmit,
  width,
  company,
  branch,
  dateInterval,
  timeSlot,
  handleChangeCompany,
  handleChangeBranch,
  handleChangeDateInterval,
  handleChangeTimeSlot,
  handleResetFilters,
}) => {
  const companies = [
    { value: "Company 1", label: "Company 1" },
    { value: "Company 2", label: "Company 2" },
    { value: "Company 3", label: "Company 3" },
  ];

  const branches = [
    { value: "Branch 1", label: "Branch 1" },
    { value: "Branch 2", label: "Branch 2" },
    { value: "Branch 3", label: "Branch 3" },
  ];

  const dateIntervals = ["1D", "1W", "1M", "1Y", "Custom"];

  const betsFilterOptions = [
    { value: "All Bets", label: "All Bets" },
    { value: "Successful Bets", label: "Successful Bets" },
    { value: "Soldout Bets", label: "Soldout Bets" },
  ];

  const selectBorderStyle = {
    borderRadius: "25px",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.violetMain,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.violetMain,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.violetMain,
    },
  };

  const datePickerStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: COLORS.violetMain,
        borderRadius: "25px",
      },
      "&:hover fieldset": {
        borderColor: COLORS.violetMain,
        borderRadius: "25px",
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.violetMain,
        borderRadius: "25px",
      },
    },
  };

  const displayDateRange = (selectedDateInterval) => {
    const today = new Date();
    let startDate, endDate;

    switch (selectedDateInterval) {
      case "1D":
        startDate = today;
        endDate = today;
        break;
      case "1W":
        startDate = new Date(today);
        endDate = new Date(today);
        endDate.setDate(startDate.getDate() + 6);
        break;
      case "1M":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "1Y":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      case "Custom":
        return (
          <>
            <div className="custom-date-range">
              <p>From</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={datePickerStyle}
                  slotProps={{
                    textField: {
                      size: "small",
                      placeholder: "Month dd, year",
                    },
                  }}
                  placeholder="Sad"
                />
              </LocalizationProvider>
            </div>
            <div className="custom-date-range">
              <p>To</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={datePickerStyle}
                  slotProps={{
                    textField: { size: "small", placeholder: "Month dd, year" },
                  }}
                />
              </LocalizationProvider>
            </div>
          </>
        );
      default:
        break;
    }

    const formattedStartDate = `${startDate.getMonth() + 1
      }/${startDate.getDate()}/${startDate.getFullYear()}`;
    const formattedEndDate = `${endDate.getMonth() + 1
      }/${endDate.getDate()}/${endDate.getFullYear()}`;

    return `${FormatFullDate(new Date(formattedStartDate))} - ${FormatFullDate(
      new Date(formattedEndDate)
    )}`;
  };

  useEffect(() => {
    if (!drawTypeList.some((item) => item.name === "ALL")) {
      drawTypeList.unshift({
        gameTypeId: -1,
        name: "ALL",
      });
    }
  }, []);

  return (
    <>
      {open && (
        <div className="filter-modal-container">
          <div
            className="filter-container"
            style={{ width: width }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="filter-header">
              <p>Filters</p>
              <Close onClick={onClose} sx={{ cursor: "pointer" }} />
            </div>
            <div className="dropdown">
              <p>Company</p>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  value={company}
                  onChange={handleChangeCompany}
                  placeholder="Company Name"
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <p style={{ margin: "0px", color: "lightgray" }}>
                          Company Name
                        </p>
                      );
                    }

                    return selected;
                  }}
                  sx={selectBorderStyle}
                >
                  {companies.map((company, index) => (
                    <MenuItem value={company.value} key={index}>
                      {company.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div
              className="dropdown"
              style={{
                borderBottom: "solid 1px lightGray",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <p>Branch</p>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  value={branch}
                  onChange={handleChangeBranch}
                  placeholder="Branch Name"
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <p style={{ margin: "0px", color: "lightgray" }}>
                          Branch Name
                        </p>
                      );
                    }
                    return selected;
                  }}
                  sx={selectBorderStyle}
                >
                  {branches.map((branch, index) => (
                    <MenuItem value={branch.value} key={index}>
                      {branch.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="date-interval-container">
              {dateIntervals.map((date, index) => (
                <div
                  key={index}
                  onClick={() => handleChangeDateInterval(date)}
                  className={
                    dateInterval === date ? "date-interval-selected" : ""
                  }
                >
                  {" "}
                  {date}{" "}
                </div>
              ))}
            </div>
            <div className="date-interval-display">
              {displayDateRange(dateInterval)}
            </div>
            <div className="time-slots-container">
              {drawTypeList.map((drawType, index) => (
                <div
                  className={
                    timeSlot === drawType.name
                      ? "time-slot-item-selected"
                      : "time-slot-item"
                  }
                  key={index}
                  onClick={() => handleChangeTimeSlot(drawType.name)}
                >
                  <p>{drawType.name.split(" ")[0]}</p>
                  <p>{drawType.name.split(" ")[1]}</p>
                </div>
              ))}
            </div>
            <div className="denomination-container">
              <p>Denomination</p>
              <div className="range-container">
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={() => { }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment onClick={() => { }} position="end">
                        <TollIcon />
                      </InputAdornment>
                    ),
                    sx: selectBorderStyle,
                  }}
                />
                -
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={() => { }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment onClick={() => { }} position="end">
                        <TollIcon />
                      </InputAdornment>
                    ),
                    sx: selectBorderStyle,
                  }}
                />
              </div>
            </div>
            <div className="radio-buttons">
              <CustomRadioButton
                options={betsFilterOptions}
                handleRadioChange={() => { }}
                defaultValue={betsFilterOptions[0]}
                size={"small"}
              />
            </div>
            <div className="modal-buttons">
              <Button
                onClick={handleResetFilters}
                className="reset-button"
                size="small"
              >
                Reset Filters
              </Button>
              <Button onClick={onSubmit} className="apply-button" size="small">
                Apply Filters
                <CheckIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomFilterModal;
