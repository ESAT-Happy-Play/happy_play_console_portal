import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from 'react';

const BranchSearchBar = ({ handleBranchSearch, handleBranchSearchEmpty }) => {
    //declarations
    const [searchVal, setSearchVal] = useState('');

    // submit form if buttons submit available
    const handleSubmit = (e) => e.preventDefault();

    // onchange trigger
    const handleBranchSearchChange = (e) => {
        setSearchVal(e.target.value);
        handleBranchSearchEmpty(e, e.target.value);
    }

    // on search icon trigger
    const handleSearchSubmit = (e) => {
        handleBranchSearch(e, searchVal);
    }

    const handleKeyDown = (e) => {
      if(e.keyCode === 13){
         handleBranchSearch(e, searchVal);
      }
    }

  return (
    <header>
        <form className="search" onSubmit={ handleSubmit }>
            <TextField
                size="small"
                label="Search Branch Name"
                variant="outlined"
                fullWidth
                onChange={ handleBranchSearchChange }
                onKeyDown={ handleKeyDown }
                InputProps={{
                    endAdornment: (
                    <InputAdornment onClick={ handleSearchSubmit } position="end">
                        <SearchIcon />
                    </InputAdornment>
                    )
                }}
            />
        </form>
    </header>
  )
}

export default BranchSearchBar
