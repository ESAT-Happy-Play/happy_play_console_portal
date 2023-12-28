import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from 'react';

const CompanySearchBar = ({ handleCompanySearch, handleCompanySearchEmpty }) => {
    //declarations
    const [searchVal, setSearchVal] = useState('');

    // submit form if buttons submit available
    const handleSubmit = (e) => e.preventDefault();

    // onchange trigger
    const handleCompanySearchChange = (e) => {
        setSearchVal(e.target.value);
        handleCompanySearchEmpty(e, e.target.value);
    }

    // on search icon trigger
    const handleSearchSubmit = (e) => {
        handleCompanySearch(e, searchVal);
    }

    const handleKeyDown = (e) => {
      if(e.keyCode === 13){
         handleCompanySearch(e, searchVal);
      }
    }

  return (
    <header>
        <form className="search" onSubmit={ handleSubmit }>
            <TextField
                size="small"
                label="Search Company Name"
                variant="outlined"
                fullWidth
                onChange={ handleCompanySearchChange }
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

export default CompanySearchBar
