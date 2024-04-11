import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

const RegularSearchBar = ({ handleSearch, searchTitle }) => {
  //declarations
  const [searchVal, setSearchVal] = useState("");

  // submit form if buttons submit available
  const handleSubmit = (e) => e.preventDefault();

  // onchange trigger
  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
    setTimeout(() => {
      handleSearch(e, e.target.value);
    }, 1500);
  };

  // on search icon trigger
  const handleSearchSubmit = (e) => {
    handleSearch(e, searchVal);
  };


  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <TextField
          size="small"
          placeholder={searchTitle}
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
          sx={{ width: '350px' }}
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
