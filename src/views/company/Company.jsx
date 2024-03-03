import "./company.scss";

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { toast } from 'react-toastify';

import { TableSearchBar, CompanyList} from "../../components/mui/tables";
import { ConfirmMessage, AddEditCompany } from "../../components/mui/modals";
import { CompanyService } from "../../services";

export const Company = () => {
  /**
   * Company table list constants and functions
   */
  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(false);

  // company table state
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [pageNumber, setpageNumber] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setpageSize] = useState(_PAGESIZE);
  const [companies, setCompanies] = useState([]);
  const [clickCounter, setclickCounter] = useState(0);

  const handleLoadCompanies = () => {
    setPageLoader(true);
    CompanyService.getPaginateCompany(companySearchValue, pageNumber, pageSize)
    .then((resp) => {
      if (resp) {
        setTotalRows(resp.data.total);
        setpageNumber(resp.data.pageNumber);
        setpageSize(resp.data.pageSize);
        setCompanies(resp.data.companyList);

        setPageLoader(false);
      }
    });
  }

  // trigger call API endpoint if state change
  useEffect(() => {
    handleLoadCompanies();
  }, [clickCounter]);

  // On click search company
  const handleCompanySearch = (event, value) => { 
    setCompanySearchValue(value);
    setpageNumber(1);
    setpageSize(_PAGESIZE);
    setclickCounter(clickCounter + 1);
  }

  // Trigger on search company empty
  const handleCompanySearchEmpty = (event, value) => {
    if (value === "") {
      setCompanySearchValue("");
      setpageNumber(1);
      setpageSize(_PAGESIZE);
      setclickCounter(clickCounter + 1);
    }
  }

  // handle company table next page
  const handleCompanyChangePage = (event, newPage) => {
    setpageNumber(newPage + 1);
    setclickCounter(clickCounter + 1);
  }

  // handle company table change page size
  const handleCompanyRowsPerPage = (event) => {
    setpageSize(+event.target.value);
    setpageNumber(1);
    setclickCounter(clickCounter + 1);
  }

  // Add company dialog
  const [openAddCompany, setAddCompany] = React.useState(false);
  const handleAddCompanyOpen = () => { setAddCompany(true); };
  const handleAddCompanyClose = () => { setAddCompany(false); };

  const [formData, setFormData] = React.useState({});
  const handleCallback = (data) => {
    console.log(data);
    setFormData(data)
    handleSubmitOpen();
  }

  // Confiration dialog message for add company
  const [openConfirmSubmit, setConfirmSubmit] = React.useState(false);
  const handleSubmitOpen = () => { setConfirmSubmit(true); };
  const handleSubmitClose = () => { setConfirmSubmit(false); };
  const handleSubmitOkay = async () => {
    setPageLoader(true);
    CompanyService.addCompany(formData)
    .then((resp) => {
      if (resp) {
        toast.success(`${formData.companyName} added successfully.`);
        handleSubmitClose();
        handleAddCompanyClose();

        //reload page after 2 sec
        setTimeout(function() {
          window.location.reload(false);
        }, 2000);
      }
      setPageLoader(false);
    });
  };

  return (
    <div className="div-table">
      <div className="div-container">
        <div className="div-head">
          <h2 className="title">Company List</h2>
          <Button variant="outlined" size="medium" onClick={ handleAddCompanyOpen }>
            New Company <AddIcon />
          </Button>
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div></div>
          <div className="div-content" style={{width:'50%'}}>
            <div className="div-search">
              <TableSearchBar handleSearch={handleCompanySearch} handleSearchEmpty={handleCompanySearchEmpty} searchTitle="Search" />
            </div>
          </div>
        </div>
        <CompanyList
          listData={companies}
          totalCount={ totalRows }
          rowsPerPage={handleCompanyRowsPerPage}
          changePage={ handleCompanyChangePage }
          pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
          pageSize = { pageSize }
          isLoading = { pageLoader }
        />
      </div>

      <AddEditCompany isOpen={ openAddCompany } handleClose={ handleAddCompanyClose } handleCallback={handleCallback} />
      <ConfirmMessage 
        isOpenMessage={ openConfirmSubmit } 
        handleCloseMessage={ handleSubmitClose } 
        handleOkay={ handleSubmitOkay } 
        title={ "Confirmation" } 
        content={ "Are you sure you want to add new company?" }
        color={ "success" }
        isLoading={ pageLoader }/>
    </div>
  )
}