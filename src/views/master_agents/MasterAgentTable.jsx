import React, { useEffect, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import { Button } from "@mui/material";
import { Box, Chip } from '@mui/material';
import { COLORS } from '../../helper/colors';
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import FileExportIcon from "../../assets/icons/FileExportIcon";

import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import { DateExt } from "../../utils/helpers";
import { UserService } from "../../services";
import UserProfile from './UserProfile';

const MasterAgentTable = ({ companyObjId, companyId, loadingCallback}) => {

  const [displayList, setDisplayList] = useState([]);

  const [maxpage, setmaxpage] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageSize, setpageSize] = useState(0);

  const [compObjId, setcompObjId] = useState(companyObjId);
  const [isUserDetails, setisUserDetails] = useState(false);
  const [selectedUser, setselectedUser] = useState(null);
  const [agentCount, setagentCount] = useState(null);
  const [playerCount, setplayerCount] = useState(null);

  const [filters, setFilters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleChangePage = async (event, newpage) => {
    let newVal = newpage - 1;
        
    if (maxpage < newVal) {
        let result = await handleInitData(newVal);
    
        let oldData = displayList;
        result.agentList.map((item) => {
            oldData.push(item);
        });

        setpageSize(parseInt(result.total));

        setDisplayList(oldData);
        setmaxpage(newVal);
    }

    setPage(newVal);
  };

  const handleChangeRowsPerPage = async (event) => {
    let result = await handleInitData(0, parseInt(event.target.value, 10));
    setDisplayList(result.agentList);
    setpageSize(result.total);

    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (chipToDelete) => () => {
    setShowFilterModal(false);
    setFilters((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const toggleFilter = () => {
    setShowFilterModal((prev) => !prev);
  };

  const handleSearch = (event, value) => {
  };

  const handeClickRows = (data) => {
        loadingCallback(true);

        setagentCount(data.agentsCount);
        setplayerCount(data.playersCount);
        UserService.getUsersByObjectID(data.accountObjectId).then((resp) => {
            if(resp) {
                loadingCallback(false);
                
                setselectedUser(resp.data);
                setisUserDetails(true);
            }
        })
    }

  const handleInitData = (pageNum = null, perPage = null, searchVal = null) => {
      loadingCallback(true);
      return new Promise((resolve, reject) => {
        UserService.getAgentPlayerList({
            companyId: compObjId,
            branchId: null,
            userType: 1,
            pagedQuery: {
                search: (searchVal !== null) ? searchVal : "",
                pageNumber: (pageNum !== null) ? pageNum : page,
                pageSize: (perPage !== null) ? perPage : rowsPerPage,
                sortOrder: true
            }
        }).then((res) => {
            loadingCallback(false);
            if (res.success) { 
              return resolve(res.data);
            } else { reject("Error"); }
        })
      });
  }

  const handeBackToList = () => {
      setisUserDetails(false);
  }

  useEffect( () => {
    handleInitData().then((res) => {
      setDisplayList(res.agentList);
      setpageSize(parseInt(res.total));
      setRowsPerPage((res.pageSize));
      setPage(parseInt(res.pageNumber));
    });
  }, []);

  return (
    <div className="div-table">
      <div className="div-container">
        <div className="div-head">
          <h2 className="title" style={{fontSize:'20px'}}>Master Agent List</h2>
        </div>
        {
          (isUserDetails) ? 
            <UserProfile objData={selectedUser} agentCount={agentCount} playerCount={playerCount} hasDownline={true} callBack={handeBackToList} />
          :
          <div style={{ padding:'15px' }}>
              <Box display="flex" justifyContent="space-between">
                  <RegularSearchBar
                      handleSearch={handleSearch}
                      searchTitle="Search"
                  />
                  <div className="buttons" style={{borderLeft:'none', padding:'5px 10px'}}>
                    <FileExportIcon size={20} />
                    Export
                </div>
                <Box marginLeft="auto" display="flex" alignItems="center" gap='2px'>
                    {filters.map((filter, index) =>
                        <Chip
                            sx={{ color: COLORS.violetMain, height: '22px', background: COLORS.tableBackground }}
                            key={index}
                            color='primary'
                            label={filter.label}
                            onDelete={handleDelete(filter)}
                            deleteIcon={<CloseIcon sx={{ color: `${COLORS.violetMain} !important`, width: '16px' }} />}
                        />
                    )}
                    <Box position='relative' display='flex' alignItems='center' sx={{ '&:hover': { cursor: 'pointer' } }} onClick={toggleFilter}>
                        Filters
                        <FilterListIcon />
                    </Box>
                </Box>
              </Box>
              <CustomTable
                  // headAlign="left"
                  headers={["Name", "Agents", "Status", "Regisration Date", ""]}
                  pagination={
                      <StyledPagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={ pageSize }
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                      />}
              >
                  { (displayList !== null) ?
                      displayList.slice(page * rowsPerPage, page *
                          rowsPerPage + rowsPerPage).map((row, i) => (
                              <StyledTableRow key={i} >
                                  <StyledTableCell align="center" >{row.fullname}</StyledTableCell>
                                  <StyledTableCell align="center" >{row.agentsCount}</StyledTableCell>
                                  <StyledTableCell align="center" >
                                      {
                                          (row.status === 1) ? <span style={{color:'green',background:'#bbf3bd', padding:'1px', borderRadius:'3px'}}>Active</span>
                                          : <span style={{color:'red',background:'#f6aca3', padding:'1px', borderRadius:'3px'}}>Inactive</span>
                                      }
                                  </StyledTableCell>
                                  <StyledTableCell align="center" >{DateExt.readableDate(row.createdOn)}</StyledTableCell>
                                  <StyledTableCell align="center" width={50} >
                                      <Button variant="text" size='small' onClick={e => handeClickRows(row)}>
                                        <InfoIcon sx={{fontSize:'14px'}} />
                                      </Button>
                                  </StyledTableCell>
                              </StyledTableRow>
                          )
                          ) :
                      <StyledTableRow ><StyledTableCell align="center" colSpan={5}>No available data</StyledTableCell></StyledTableRow>
                  }
              </CustomTable>
          </div>
        }
      </div>
    </div>
  )
}

export default MasterAgentTable
