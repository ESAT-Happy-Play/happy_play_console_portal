import React, { useEffect, useState } from 'react';
import CustomTable, { StyledPagination, StyledTableCell, StyledTableRow } from '../../components/table/customTable/CustomTable';
import { TextField, MenuItem, Button  } from "@mui/material";
import { Box, Chip } from '@mui/material';
import { COLORS } from '../../helper/colors';
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import FileExportIcon from "../../assets/icons/FileExportIcon";

import RegularSearchBar from '../../components/searchbar/RegularSearchBar';
import { DateExt } from "../../utils/helpers";
import { UserService } from "../../services";
import UserProfile from '../master_agents/UserProfile';

import { CompanyList } from "../../utils/common/CompanyList";

const AdminPlayersTable = ({ loadingCallback }) => {
  const [companies, setcompanies] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  const [maxpage, setmaxpage] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageSize, setpageSize] = useState(0);

  const [compObjId, setcompObjId] = useState("");
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
        result.playersList.map((item) => {
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
    setDisplayList(result.playersList);
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

  const handleInitData = (pageNum = null, perPage = null, searchVal = null, companyObjectId = null) => {
      loadingCallback(true);
      return new Promise((resolve, reject) => {
        UserService.getAgentPlayerList({
            companyId: (companyObjectId !== null) ? companyObjectId : compObjId,
            branchId: null,
            userType: 0,
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

  const handleFilterByCompany = async event => {
    let companyObjId = event.target.getAttribute('data-value');
    if (companyObjId !== null) {
      let result = await handleInitData(null, null, null, companyObjId);

      setpageSize(parseInt(result.total));
      setDisplayList(result.playersList);
      setcompObjId(companyObjId);
    }
  }

  useEffect(() => {
    CompanyList.getCompanyList().then((res) => {
      setcompanies(res.companyList);
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
              <Box display="flex" justifyContent="space-between" gap="15px">
                <div className="search">
                  <TextField type="text" sx={{width:'200px'}} defaultValue={compObjId}
                    label="Select Company" size="small" onClick={handleFilterByCompany} select>
                    <MenuItem value=""><em>Select company</em></MenuItem>
                    { 
                        (companies.length > 0) ?
                        companies.map((item, index) => (
                            <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyObjectId}>
                                {item.companyName}
                            </MenuItem>
                        ))
                        : <MenuItem value=""><em>No data found!</em></MenuItem>
                    }
                    </TextField>
                </div>
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
                  headers={["Name", "Company", "Branch", "mobileNumber", "Status", "Regisration Date", ""]}
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
                  { (compObjId !== "") ? (displayList !== null && displayList !== undefined && displayList.length !== 0) ?
                      displayList.slice(page * rowsPerPage, page *
                          rowsPerPage + rowsPerPage).map((row, i) => (
                              <StyledTableRow key={i} >
                                  <StyledTableCell align="center" >{row.fullname}</StyledTableCell>
                                  <StyledTableCell align="center" >{row.companyName}</StyledTableCell>
                                  <StyledTableCell align="center" >{row.branchName}</StyledTableCell>
                                  <StyledTableCell align="center" >{row.mobileNumber}</StyledTableCell>
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
                      <StyledTableRow ><StyledTableCell align="center" colSpan={8}>No available data</StyledTableCell></StyledTableRow>
                    :
                    <StyledTableRow ><StyledTableCell align="center" colSpan={8}>Please select company.</StyledTableCell></StyledTableRow>
                  }
              </CustomTable>
          </div>
        }
      </div>
    </div>
  )
}

export default AdminPlayersTable
