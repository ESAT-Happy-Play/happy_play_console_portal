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
  handleResetFilters
}) => {
  const [dateInterval, setDateInterval] = useState(initFilters?.dateInterval ?? "1D");
  const [company, setCompany] = useState(initFilters?.company?.value ?? "");
  const [branch, setBranch] = useState(initFilters?.branch?.value ?? "");
  const [priority, setPriority] = useState(initFilters?.priority?.value ?? "");
  const [status, setStatus] = useState(initFilters?.status?.value ?? []);
  const [assignedTo, setAssignedTo] = useState(initFilters?.assignedTo?.value ?? "");
  const [department, setDepartment] = useState(initFilters?.department?.value ?? "");

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

    if (company != "")
      newFilters.push({ key: "company", label: mockCompanies[company - 1].name, value: company, id: mockCompanies[company - 1].id });

    if (branch != "")
      newFilters.push({ key: "branch", label: mockBranches[branch - 1].name, value: branch, id: mockBranches[branch - 1].id });

    if (status != "")
      newFilters.push({ key: "status", label: mockStatus[status - 1].name, value: status, id: mockStatus[status - 1].id });

    if (priority != "")
      newFilters.push({ key: "priority", label: mockPriority[priority - 1].name, value: priority, id: mockPriority[priority - 1].id });

    if (assignedTo != "")
      newFilters.push({ key: "assignedTo", label: "Assigned to " + mockUsers[assignedTo - 1].name, value: assignedTo, id: mockUsers[assignedTo - 1].id });

    if (department != "")
      newFilters.push({ key: "department", label: mockDepartments[department - 1].name, value: department, id: mockDepartments[department - 1].id });

    onSubmit(newFilters);
    onClose();
  }

  const resetFilters = () => {
    setCompany('');
    setBranch('');
    setStatus('');
    setPriority('');
    setAssignedTo('');
    setDepartment('');
    setDateInterval('1D');
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
                  return mockCompanies[selected - 1]?.name;
                }}
                sx={selectBorderStyle}
              >
                {mockCompanies.map((company, index) => (
                  <MenuItem value={index + 1} key={company.id}>
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
                  return mockBranches[selected - 1]?.name;
                }}
                sx={selectBorderStyle}
              >
                {mockBranches.map((branch, index) => (
                  <MenuItem value={index + 1} key={branch.id}>
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
                  return mockStatus[selected - 1]?.name;
                }}
                sx={selectBorderStyle}
              >
                {mockStatus.map((status, index) => (
                  <MenuItem value={index + 1} key={status.id}>
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
                  return mockPriority[selected - 1]?.name;
                }}
                sx={selectBorderStyle}
              >
                {mockPriority.map((priority, index) => (
                  <MenuItem value={index + 1} key={priority.id}>
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
                  return mockUsers[selected - 1].name;
                }}
                sx={selectBorderStyle}
              >
                {mockUsers.map((assigned, index) => (
                  <MenuItem value={index + 1} key={assigned.id}>
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
                  return mockDepartments[selected - 1]?.name;
                }}
                sx={selectBorderStyle}
              >
                {mockDepartments.map((department, index) => (
                  <MenuItem value={index - 1} key={department.id}>
                    {department.name}
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
            <Button onClick={() => handleSubmit()} className="apply-button" size="small">
              Apply Filters
              <CheckIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketsFilterModal;
