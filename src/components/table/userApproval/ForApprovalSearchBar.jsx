import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from 'react';

const ForApprovalSearchBar = ({ handleForApprovalSearch, handleForApprovalSearchEmpty }) => {
    //declarations
    const [searchVal, setSearchVal] = useState('');

    // submit form if buttons submit available
    const handleSubmit = (e) => e.preventDefault();

    // onchange trigger
    const handleForApprovalSearchChange = (e) => {
        setSearchVal(e.target.value);
        handleForApprovalSearchEmpty(e, e.target.value);
    }

    // on search icon trigger
    const handleSearchSubmit = (e) => {
        handleForApprovalSearch(e, searchVal);
    }

    const handleKeyDown = (e) => {
      if(e.keyCode === 13){
         handleForApprovalSearch(e, searchVal);
      }
    }

  return (
    <header>
        <form className="search" onSubmit={ handleSubmit }>
            <TextField
                size="small"
                label="Search Name"
                variant="outlined"
                fullWidth
                onChange={ handleForApprovalSearchChange }
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

export default ForApprovalSearchBar
