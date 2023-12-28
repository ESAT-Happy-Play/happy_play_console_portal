import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

import ScheduledSimulatorList from '../../../components/table/scheduledSimulator/ScheduledSimulatorList';
import AddEditSimulator from '../../../components/Dialog/forms/AddEditSimulator';

const GameSimulator = () => {

  let _PAGESIZE = 5;
  const [pageLoader, setPageLoader] = useState(true);

  // table state
  // const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [PageSize, setPageSize] = useState(_PAGESIZE);
  
  const [simulatorList, setSimulatorList] = useState([]);

  // handle table next page
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage + 1);
    setPageLoader(true);
  }

  // handle table change page size
  const handleRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPageNumber(0);
    setPageLoader(true);
  }

  const [openDialog, setDialog] = React.useState(false);
  const handleDialogClose = () => { setDialog(false); };
  const handleDialogOpen = () => {
    setDialog(true); 
  };

  return (
    <div className="content">
      <div  className="container">
        <div className="top">
          <h2 className="title">List Scheduled Simulator</h2>
          <Button variant="contained" size="medium" onClick={handleDialogOpen}>
            New Simulator Schedule <AddIcon />
          </Button>
        </div>

        <div className="row p-15">
          <div className="col-12">
            <ScheduledSimulatorList
                SearchResults={ simulatorList }
                ChangePage = { handleChangePage }
                RowsPerPage = { handleRowsPerPage }
                pageNumber = { (PageNumber === 0) ? PageNumber : (PageNumber - 1) }
                pageSize = { PageSize } 
                totalCount = { totalRows }
                loading = { pageLoader } />
          </div>
        </div>
      </div>

      <AddEditSimulator 
        isOpenModal={ openDialog }
        handleCloseModal={ handleDialogClose }/>
    </div>
  )
}

export default GameSimulator
