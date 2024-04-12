import React, { useEffect, useState } from "react";
import "./supportUsersFilterModal.scss";
import { FormatFullDate } from "../../../helper/Helpers";
import { Close } from "@mui/icons-material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { COLORS } from "../../../helper/colors";
import {
  drawTypeList,
  mockDepartments,
  mockUserStatus,
  mockUsers,
  mockUserType,
} from "../../../helper/mocks";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const SupportUsersFilterModal = ({
  open,
  onClose,
  onSubmit,
  initFilters,
  handleResetFilters,
}) => {
  const [dateInterval, setDateInterval] = useState(
    initFilters?.dateInterval ?? "1D"
  );
  const [userType, setUserType] = useState(initFilters?.userType?.value ?? "");
  const [status, setStatus] = useState(initFilters?.status?.value ?? []);
  const [assignedTo, setAssignedTo] = useState(
    initFilters?.assignedTo?.value ?? ""
  );
  const [department, setDepartment] = useState(
    initFilters?.department?.value ?? ""
  );

  const dateIntervals = ["1D", "1W", "1M", "1Y", "Custom"];

  const selectBorderStyle = {
    borderRadius: "25px",
    fontSize: "12px",
    height: "25px",
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

    const formattedStartDate = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;
    const formattedEndDate = `${
      endDate.getMonth() + 1
    }/${endDate.getDate()}/${endDate.getFullYear()}`;

    var return_string = FormatFullDate(new Date(formattedStartDate));

    if (dateInterval != "1D")
      return_string += " - " + FormatFullDate(new Date(formattedEndDate));

    return return_string;
  };

  const handleSubmit = () => {
    var newFilters = [];

    if (status != "")
      newFilters.push({
        key: "status",
        label: mockUserStatus[status - 1].name,
        value: status,
        id: mockUserStatus[status - 1].id,
      });

    if (userType != "")
      newFilters.push({
        key: "userType",
        label: mockUserType[userType - 1].name,
        value: userType,
        id: mockUserType[userType - 1].id,
      });

    if (assignedTo != "")
      newFilters.push({
        key: "assignedTo",
        label: "Assigned to " + mockUsers[assignedTo - 1].name,
        value: assignedTo,
        id: mockUsers[assignedTo - 1].id,
      });

    if (department != "")
      newFilters.push({
        key: "department",
        label: mockDepartments[department - 1].name,
        value: department,
        id: mockDepartments[department - 1].id,
      });

    onSubmit(newFilters);
    onClose();
  };

  const resetFilters = () => {
    setStatus("");
    setUserType("");
    setAssignedTo("");
    setDepartment("");
    setDateInterval("1D");
    handleResetFilters();
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
        <div className="filter-container" onClick={(e) => e.stopPropagation()}>
          <div className="filter-header">
            <p>Filters</p>
            <Close onClick={onClose} sx={{ cursor: "pointer" }} />
          </div>
          <div className="dropdown">
            <p>Type</p>
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
                value={userType}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <p style={{ fontSize: "12px", color: "lightgray" }}>
                        Select User Type
                      </p>
                    );
                  }
                  return mockUserType[selected - 1]?.name;
                }}
                sx={selectBorderStyle}
              >
                {mockUserType.map((type, index) => (
                  <MenuItem value={index + 1} key={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="dropdown">
            <p>Status</p>
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <p style={{ fontSize: "12px", color: "lightgray" }}>
                        Select Status
                      </p>
                    );
                  }
                  return mockUserStatus[selected - 1]?.name;
                }}
                sx={selectBorderStyle}
              >
                {mockUserStatus.map((status, index) => (
                  <MenuItem value={index + 1} key={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="date-interval-container">
            {dateIntervals.map((date, index) => (
              <div
                key={index + 1}
                onClick={() => setDateInterval(date)}
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
          <div className="modal-buttons">
            <Button
              onClick={resetFilters}
              className="reset-button"
              size="small"
            >
              Reset Filters
            </Button>
            <Button
              onClick={() => handleSubmit()}
              className="apply-button"
              size="small"
            >
              Apply Filters
              <CheckIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
