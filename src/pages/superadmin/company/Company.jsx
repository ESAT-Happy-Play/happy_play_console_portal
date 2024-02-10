// import "./company.scss";

// import React, { useState, useEffect } from 'react';
// import AddIcon from '@mui/icons-material/Add';
// import { Button } from "@mui/material";

// import CompanySearchBar from "../../../components/table/companyList/CompanySearchBar";
// import CompanyList from "../../../components/table/companyList/CompanyList";

// // import PageLoader from "../../../components/widget/PageLoader";
// import { toast } from 'react-toastify';

// import { GETFetch } from "../../../api/ApiFetchBuilder";
// import AddCompany from "../../../components/Dialog/forms/company/AddCompany";
// import EditCompany from "../../../components/Dialog/forms/company/EditCompany";

// const Company = () => {
//   /**
//    * Company table list constants and functions
//    */
//   let _PAGESIZE = 5;
//   const [pageLoader, setPageLoader] = useState(false);

//   // company table state
//   const [companySearchValue, setCompanySearchValue] = useState('');
//   const [pageNumber, setpageNumber] = useState(1);
//   const [totalRows, setTotalRows] = useState(0);
//   const [pageSize, setpageSize] = useState(_PAGESIZE);
//   const [companies, setCompanies] = useState([]);

//   const handleComapanyData = async () => {
//     setPageLoader(true);
//     let response = await GETFetch(`${process.env.REACT_APP_API_URL}/companies?rowsperpage=${pageSize}&pagenumber=${pageNumber}&companysearch=${companySearchValue}`);
//     setPageLoader(false);

//     if(response.status) {
//       setCompanies(response.data.companies);

//       setTotalRows(response.data.totalRows);
//       setpageNumber(response.data.currentPage);
//       setpageSize(response.data.rowsPerPage);
//     }

//     if(!response.status) {
//       toast.error(response.data.errorMessage);
//     }
//   }

//   // trigger call API endpoint if state change
//   useEffect(() => {
//     handleComapanyData();
//   }, [pageNumber, companySearchValue, pageSize, totalRows]);

//   // On click search company
//   const handleCompanySearch = (event, value) => { 
//     setCompanySearchValue(value);
//     setpageNumber(1);
//     setpageSize(_PAGESIZE);
//   }

//   // Trigger on search company empty
//   const handleCompanySearchEmpty = (event, value) => {
//     if (value === "") {
//       setCompanySearchValue("");
//       setpageNumber(1);
//       setpageSize(_PAGESIZE);
//     }
//   }

//   // handle company table next page
//   const handleCompanyChangePage = (event, newPage) => {
//     setpageNumber(newPage + 1);
//     setPageLoader(true);
//   }

//   // handle company table change page size
//   const handleCompanyRowsPerPage = (event) => {
//     setpageSize(+event.target.value);
//     setpageNumber(1);
//     setPageLoader(true);
//   }

//   // Add company dialog
//   const [openAddCompany, setAddCompany] = React.useState(false);
//   const handleAddCompanyOpen = () => { setAddCompany(true); };
//   const handleAddCompanyClose = () => { setAddCompany(false); };

//   const handleCompanyCallback = () => {
//     setPageLoader(true);
//     setTotalRows(totalRows + 1);
//   }

//   // trigger to edit company
//   const handleEditCompanyProfile = ( event, objData) => {
//     setcompanyObj(objData);
//     handleEditCompanyOpen();
//   };

//   // Edit company dialog
//   const [companyObj, setcompanyObj] = React.useState(null);
//   const [openEditCompany, setEditCompany] = React.useState(false);
//   const handleEditCompanyOpen = () => { setEditCompany(true); };
//   const handleEditCompanyClose = () => { setEditCompany(false); };

//   const handleEditCompanyCallback = () => {
//     setPageLoader(true);
//     setTotalRows(totalRows + 1);
//     handleEditCompanyClose();
//   }

//   return (
//     <div className="company">
//       <div className="container">
//         <div className="top">
//           <h2 className="title">LIST OF COMPANIES</h2>
//           <Button className="btn-success" variant="outlined" size="large" onClick={ handleAddCompanyOpen }>
//             Register New Company <AddIcon />
//           </Button>
//         </div>
//         <div style={{display:'flex',justifyContent:'space-between'}}>
//           <div></div>
//           <div className="bottom" style={{width:'50%'}}>
//             <div className="search">
//               <CompanySearchBar handleCompanySearch={ handleCompanySearch } handleCompanySearchEmpty={ handleCompanySearchEmpty } />
//             </div>
//           </div>
//         </div>
//         <CompanyList 
//           companySearchResults={ companies }
//           totalCount={ totalRows }
//           editCompanyProfile={ handleEditCompanyProfile }
//           companyRowsPerPage={ handleCompanyRowsPerPage }
//           pageNumber = { (pageNumber === 0) ? pageNumber : (pageNumber - 1) }
//           pageSize = { pageSize }
//           companyChangePage={ handleCompanyChangePage }
//           isLoading = { pageLoader }
//         />
//       </div>

//       <AddCompany isOpenAdd={ openAddCompany } handleCloseAdd={ handleAddCompanyClose } handleCallback={ handleCompanyCallback } />
//       <EditCompany 
//         isOpenEdit={ openEditCompany } 
//         handleCloseEdit={ handleEditCompanyClose } 
//         handleEditCallback={ handleEditCompanyCallback }
//         objData={ companyObj } />

//       {/* <PageLoader isLoadingPage={ pageLoader } /> */}
//     </div>
//   )
// }

// export default Company
