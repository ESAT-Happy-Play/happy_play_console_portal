import "./company.scss";

import * as React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import PageLoader from "../../components/widget/PageLoader";
import { CompanyService } from "../../services/CompanyService";

const CompanyDetails = () => {
  // get url parameter
  const { id } = useParams();

  const [pageLoader, setPageLoader] = useState(false);
  const [companyInfo, setcompanyInfo] = useState(null);

  // const handleComapanyProfile = async () => {
  //   setPageLoader(true);
  //   let response = await GETFetch(`${process.env.REACT_APP_API_URL}/companies/${id}`);
  //   setPageLoader(false);

  //   if(response.status) {
  //     setcompanyInfo(response.data.companyInfo[0]);
  //     setbranches(response.data.branches);
  //   }

  //   if(!response.status) {
  //     toast.error(response.data.errorMessage);
  //   }
  // }

  useEffect(() => {
    setPageLoader(true);
    CompanyService.getCompanyDetails(id).then((resp) => {
      if(resp) {
        console.log(resp);
        setcompanyInfo(resp.data);
        setPageLoader(false);
      }
    });
  }, [id]);

  return (
    <div className="div-table">
      <div className="div-container">
        <div className="div-head" style={{borderBottom:'2px solid #efefef'}}>
          <h2 className="title">COMPANY PROFILE INFORMATION</h2>
        </div>
        <div className="bottomProfile">
          <div className="left">
            <h2 className="title">{ (companyInfo !== null) ? companyInfo.companyName : "" }</h2>

            <div className="widget1">
              <div className="left">
                <label>Branches</label>
                <div>
                  <h3>{ (companyInfo !== null) ? companyInfo.numberOfBranch : "" }</h3>
                </div>
              </div>
              <div className="right">
                <label>Operators</label>
                <div>
                  <h3>{ (companyInfo !== null) ? companyInfo.numberOfOperator : "" }</h3>
                </div>
              </div>
            </div>

          </div>

          <div>
            <h2 className="title" style={{textTransform:'capitalize', margin:'0 0 33px 0'}}>Company Branches</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Branch Name</TableCell>
                    <TableCell>Branch Operator</TableCell>
                    <TableCell>Branch Contact</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    (companyInfo !== null) ?
                    (companyInfo.branches.length > 0) ?
                    companyInfo.branches.map((branch, index) => (
                      <TableRow key={branch.branchId} x={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row"> {branch.branchName}</TableCell>
                        <TableCell>{branch.branchOperator}</TableCell>
                        <TableCell>{branch.branchContact}</TableCell>
                    </TableRow>
                    ))
                    : <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                          <TableCell component="th" scope="row" colSpan={6}> No Branch found! </TableCell>
                      </TableRow>
                    : <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                          <TableCell component="th" scope="row" colSpan={6}> Loading! </TableCell>
                      </TableRow>
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
      </div>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default CompanyDetails
