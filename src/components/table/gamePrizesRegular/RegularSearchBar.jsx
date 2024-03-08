import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

const RegularSearchBar = ({ handleSearch, handleSearchEmpty }) => {
  //declarations
  const [searchVal, setSearchVal] = useState("");

  // submit form if buttons submit available
  const handleSubmit = (e) => e.preventDefault();

  // onchange trigger
  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
    handleSearchEmpty(e, e.target.value);
  };

  // on search icon trigger
  const handleSearchSubmit = (e) => {
    handleSearch(e, searchVal);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch(e, searchVal);
    }
  };

  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <TextField
          size="small"
          placeholder="Search Name, Combination, or Transaction #"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment onClick={handleSearchSubmit} position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              fontSize: "15px",
              "&.MuiOutlinedInput-notchedOutline": { fontSize: "15px" },
            },
          }}
        />
      </form>
    </header>
  );
};

export default RegularSearchBar;
