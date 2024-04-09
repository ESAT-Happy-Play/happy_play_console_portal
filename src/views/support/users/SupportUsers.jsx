import "./supportUsers.scss";
import React, { useState } from "react";
import { SupportUsersTable } from "./SupportUsersTable";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { COLORS } from "../../../helper/colors";
import FormControl from "@mui/material/FormControl";
import { SupportUserDetails } from "./SupportUserDetails";
import { mockSupportUsersList } from "../../../helper/mocks";

const SupportUsers = () => {
  const [supportUsersList, setSupportUsersList] =
    useState(mockSupportUsersList);
  const [branch, setBranch] = useState("");
  const [company, setCompany] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);

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

  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
  };

  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
  };

  const handleOnClickUser = () => {
    setShowUserDetails((prev) => !prev);
  };

  return (
    <div className="support-users-container">
      <p className="support-users-title">List of Support Users</p>
      <div
        style={{
          display: "flex",
          gap: "20px",
          borderTop: "1px solid #ccc",
        }}
      >
        <div
          style={{
            width: "20%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              borderRight: "1px solid #ccc",
              paddingRight: "20px",
              paddingTop: "15px",
              height: "100%",
            }}
          >
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={company}
                onChange={handleChangeCompany}
                placeholder="Company"
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <p style={{ margin: "0px", color: "lightgray" }}>
                        Company
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
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={branch}
                onChange={handleChangeBranch}
                placeholder="Branch"
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <p style={{ margin: "0px", color: "lightgray" }}>
                        Branch
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
        </div>
        <div
          style={{
            width: "80%",
            paddingTop: "15px",
          }}
        >
          {showUserDetails ? (
            <SupportUserDetails handleGoBack={handleOnClickUser} />
          ) : (
            <SupportUsersTable
              data={supportUsersList}
              onClickUserRow={handleOnClickUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportUsers;
