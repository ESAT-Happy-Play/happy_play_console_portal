import React, { useEffect, useState } from "react";
import "./ticketFilterModal.scss";
import { FormatFullDate } from "../../helper/Helpers";
import { Close } from "@mui/icons-material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { COLORS } from "../../helper/colors";
import { drawTypeList, mockCompanies, mockBranches, mockDepartments, mockStatus, mockUsers, mockPriority, } from "../../helper/mocks";
import { TextField, InputAdornment } from "@mui/material";
import TollIcon from "@mui/icons-material/Toll";
import { CustomRadioButton } from "../radio/CustomRadioGroup";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const TicketsFilterModal = ({
  open,
  onClose,
  onSubmit,
  initFilters,
  handleResetFilters,
}) => {
  const [dateInterval, setDateInterval] = useState(initFilters?.dateInterval ?? "1D");
  const [company, setCompany] = useState(initFilters?.company ?? "");
  const [branch, setBranch] = useState(initFilters?.branch ?? "");
  const [priority, setPriority] = useState(initFilters?.priority ?? "");
  const [status, setStatus] = useState(initFilters?.status ?? []);
  const [assignedTo, setAssignedTo] = useState(initFilters?.assignedTo ?? "");
  const [department, setDepartment] = useState(initFilters?.department ?? "");

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
    }
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

    var return_string = FormatFullDate(new Date(formattedStartDate))

    if (dateInterval != '1D')
      return_string += " - " + FormatFullDate(new Date(formattedEndDate))

    return return_string;
  };

  const handleSubmit = () => {
    var newFilters = [];

    if (company)
      newFilters.push({ key: "company", label: company.name, value: company.id });

    if (branch)
      newFilters.push({ key: "branch", label: branch.name, value: branch.id });

    if (status)
      newFilters.push({ key: "status", label: status.name, value: status.id });

    onSubmit(newFilters);
    onClose();
  }

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
                  onChange={(e) => { setCompany(e.target.value) }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <p style={{ fontSize: "12px", color: "lightgray" }}>
                          Company Name
                        </p>
                      );
                    }
                    return selected.name;
                  }}
                  sx={selectBorderStyle}
                >
                  {mockCompanies.map((company, index) => (
                    <MenuItem value={company} key={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="dropdown">
              <p>Branch</p>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  value={branch}
                  onChange={(e) => { setBranch(e.target.value) }}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <p style={{ fontSize: "12px", color: "lightgray" }}>
                          Branch Name
                        </p>
                      );
                    }
                    return selected.name;
                  }}
                  sx={selectBorderStyle}
                >
                  {mockBranches.map((branch, index) => (
                    <MenuItem value={branch} key={branch.id}>
                      {branch.name}
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
                  onChange={(e) => { setStatus(e.target.value) }}
                  value={status}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <p style={{ fontSize: "12px", color: "lightgray" }}>
                          Select Status
                        </p>
                      );
                    }
                    return selected.name;
                  }}
                  sx={selectBorderStyle}
                >
                  {mockStatus.map((status, index) => (
                    <MenuItem value={status} key={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="dropdown">
              <p>Priority Level</p>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  onChange={(e) => { setPriority(e.target.value) }}
                  value={priority}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <p style={{ fontSize: "12px", color: "lightgray" }}>
                          Select Priority Level
                        </p>
                      );
                    }
                    return selected;
                  }}
                  sx={selectBorderStyle}
                >
                  {mockPriority.map((priority, index) => (
                    <MenuItem value={priority.name} key={priority.id}>
                      {priority.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="dropdown">
              <p>Assigned To</p>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  onChange={(e) => { setAssignedTo(e.target.value) }}
                  value={assignedTo}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <p style={{ fontSize: "12px", color: "lightgray" }}>
                          Select Assigned
                        </p>
                      );
                    }
                    return selected;
                  }}
                  sx={selectBorderStyle}
                >
                  {mockUsers.map((assigned, index) => (
                    <MenuItem value={assigned.name} key={assigned.id}>
                      {assigned.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="dropdown">
              <p>Department</p>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  onChange={(e) => { setDepartment(e.target.value) }}
                  value={department}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <p style={{ fontSize: "12px", color: "lightgray" }}>
                          Select Department
                        </p>
                      );
                    }
                    return selected;
                  }}
                  sx={selectBorderStyle}
                >
                  {mockDepartments.map((department, index) => (
                    <MenuItem value={department.name} key={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="date-interval-container">
              {dateIntervals.map((date, index) => (
                <div
                  key={index}
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
                onClick={handleResetFilters}
                className="reset-button"
                size="small"
              >
                Reset Filters
              </Button>
              <Button onClick={() => handleSubmit()} className="apply-button" size="small">
                Apply Filters
                <CheckIcon />
              </Button>
            </div>
          </div>
        </div >
      )}
    </>
  );
};

export default TicketsFilterModal;
