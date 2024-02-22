// import "./branch.scss";

// import React, { useState, useEffect } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import { TextField, MenuItem, Button  } from "@mui/material"
// import { toast } from 'react-toastify';

// import BranchSearchBar from "../../../components/table/branchList/BranchSearchBar";
// import BranchList from "../../../components/table/branchList/BranchList";

// import { GETFetch } from "../../../api/ApiFetchBuilder";
// import AddBranch from "../../../components/Dialog/forms/branch/AddBranch";
// import EditBranch from "../../../components/Dialog/forms/branch/EditBranch";

// import { GetStoreObject } from "../../../helper/Helpers";

// const Branch = () => {
//   let loginObj = GetStoreObject("auth");

//   /**
//    * Branch table list constants and functions
//    */
//   let _PAGESIZE = 5;
//   // let _CompanyCode = loginObj.companyId;
//   const [pageLoader, setPageLoader] = useState(false);

//   // company table state
//   const [branchSearchValue, setbranchSearchValue] = useState('');
//   const [companyCode, setcompanyCode] = useState(null);
//   const [pageNumber, setpageNumber] = useState(1);
//   const [totalRows, setTotalRows] = useState(0);
//   const [pageSize, setpageSize] = useState(_PAGESIZE);
//   const [braches, setbraches] = useState([]);
//   const [allCompanies, setallCompanies] = useState([]);

//   const handleBranchData = async () => {
//     setPageLoader(true);
//     let url = (companyCode === null) ? `${process.env.REACT_APP_API_URL}/branches?rowsperpage=${pageSize}&pagenumber=${pageNumber}&branchsearch=${branchSearchValue}`
//       : `${process.env.REACT_APP_API_URL}/branches?rowsperpage=${pageSize}&pagenumber=${pageNumber}&companyid=${companyCode}&branchsearch=${branchSearchValue}`;

//     let response = await GETFetch(url);
//     setPageLoader(false);

//     if(response.status) {
//       setbraches(response.data.branches);

//       setTotalRows(response.data.totalRows);
//       setpageNumber(response.data.currentPage);
//       setpageSize(response.data.rowsPerPage);
//     }

//     if(!response.status) {
//       toast.error(response.data.errorMessage);
//     }
//   }

//   const handleComapanyAll = async () => {
//     let response = await GETFetch(`${process.env.REACT_APP_API_URL}/companies/all`);
//     if(response.status) {
//       setallCompanies(response.data.companies);
//     }

//     if(!response.status) {
//       toast.error(response.data.errorMessage);
//     }
//   }

//   // trigger call API endpoint if state change
//   useEffect(() => {
//     handleBranchData();
//     handleComapanyAll();
//   }, [pageNumber, branchSearchValue, pageSize, totalRows, companyCode]);

//   // On click search company
//   const handleBranchSearch = (event, value) => { 
//     setbranchSearchValue(value);
//     setpageNumber(1);
//     setpageSize(_PAGESIZE);
//   }

//   // Trigger on search company empty
//   const handleBranchSearchEmpty = (event, value) => {
//     if (value === "") {
//       setbranchSearchValue("");
//       setpageNumber(1);
//       setpageSize(_PAGESIZE);
//     }
//   }

//   // handle company table next page
//   const handleBranchChangePage = (event, newPage) => {
//     setpageNumber(newPage + 1);
//     setPageLoader(true);
//   }

//   // handle company table change page size
//   const handleBranchRowsPerPage = (event) => {
//     setpageSize(+event.target.value);
//     setpageNumber(1);
//     setPageLoader(true);
//   }

//   const handleSelect = (e, value) => {
//     setcompanyCode(value);
//   }

//   // Add company dialog
//   const [openAddBranch, setAddBranch] = React.useState(false);
//   const handleAddBranchOpen = () => { setAddBranch(true); };
//   const handleAddBranchClose = () => { setAddBranch(false); };

//   const handleBranchCallback = () => {
//     setPageLoader(true);
//     setTotalRows(totalRows + 1);
//   }

//   // trigger to edit company
//   const handleEditBranchProfile = ( event, objData) => {
//     setbranchObj(objData);
//     handleEditBranchOpen();
//   };

//   // Edit company dialog
//   const [branchObj, setbranchObj] = React.useState(null);
//   const [openEditBranch, setEditBranch] = React.useState(false);
//   const handleEditBranchOpen = () => { setEditBranch(true); };
//   const handleEditBrachClose = () => { setEditBranch(false); };

//   const handleEditBranchCallback = () => {
//     setPageLoader(true);
//     setTotalRows(totalRows + 1);
//     handleEditBrachClose();
//   }

//   return (
//     <div className="branch">
//       <div className="container">
//         <div className="top">
//           <h2 className="title">LIST OF BRANCHES</h2>
//           <Button className="btn-success" variant="outlined" size="large" onClick={ handleAddBranchOpen }>
//             Register New Branch <AddIcon />
//           </Button>
//         </div>
//         <div style={{display:'flex',justifyContent:'space-between'}}>
//           <div className="bottom">
//             <span>Company</span>
//             <TextField 
//                 onChange={e => handleSelect(e, e.target.value) }
//                 label="Select Company" style={{ minWidth: "250px" }} defaultValue="" variant="outlined" size="small" select>
//                 <MenuItem value=''><em>Select Company</em></MenuItem>
//                 { 
//                     (allCompanies.length !== 0) ? allCompanies.map((item) => (
//                     <MenuItem data-province-code={item.companyId} key={item.companyId} value={item.companyId}>
//                         {item.companyName}
//                     </MenuItem>
//                     )) 
//                     : (pageLoader) ? <MenuItem value=''>Loading options...</MenuItem>
//                     : <MenuItem value=''>No records found!</MenuItem>
//                 }
//               </TextField>
//           </div>
//           <div className="bottom" style={{width:'50%'}}>
//             <div className="search">
//               <BranchSearchBar handleSearch={ handleBranchSearch } handleSearchEmpty={ handleBranchSearchEmpty } />
//             </div>
//           </div>
//         </div>
//         <BranchList 
//           searchResults={ braches }
//           totalCount={ totalRows }
//           EditProfile={ handleEditBranchProfile }
//           RowsPerPage={ handleBranchRowsPerPage }
//           pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
//           pageSize = { pageSize }
//           ChangePage={ handleBranchChangePage }
//           isLoading = { pageLoader }
//         />
//       </div>

//       <AddBranch isOpenAdd={ openAddBranch } handleCloseAdd={ handleAddBranchClose } handleCallback={ handleBranchCallback } />
//       <EditBranch 
//         isOpenEdit={ openEditBranch } 
//         handleCloseEdit={ handleEditBrachClose } 
//         handleEditCallback={ handleEditBranchCallback }
//         objData={ branchObj } />
//     </div>
//   )
// }

// export default Branch
