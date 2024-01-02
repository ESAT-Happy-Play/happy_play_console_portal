import "./branch.scss";

import * as React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import PageLoader from "../../../components/widget/PageLoader";
import { GETFetch } from "../../../api/ApiFetchBuilder";

const BranchDetails = () => {
  // get url parameter
  const { branchCode } = useParams();
  const { companyId } = useParams();

  const [pageLoader, setPageLoader] = useState(false);
  const [branchInfo, setbranchInfo] = useState(null);
  const [operators, setOperators] = useState([]);

  const handleBranchProfile = async () => {
    setPageLoader(true);
    let response = await GETFetch(`${process.env.REACT_APP_API_URL}/branches/${branchCode}?companyid=${companyId}`);
    setPageLoader(false);

    if(response.status) {
      setbranchInfo(response.data.branchInfo[0]);
      setOperators(response.data.branchOperators);
    }

    if(!response.status) {
      toast.error(response.data.errorMessage);
    }
  }

  useEffect(() => {
    handleBranchProfile();
  }, [branchCode, companyId]);

  return (
    <div className="branch">
      <div id="divBranchProfile" className="show container">
        <div className="top" style={{borderBottom:'2px solid #efefef'}}>
          <h2 className="title">BRANCH PROFILE INFORMATION</h2>
        </div>
        <div className="bottomProfile">
          <div className="left">
            <div className="divInfo">
              <span>Company Name</span>
              <b>{ (branchInfo !== null) ? branchInfo.companyName : "" }</b>
            </div>
            <div className="divInfo">
              <span>Banch Name</span>
              <b>{ (branchInfo !== null) ? branchInfo.branchName : "" }</b>
            </div>

            <div className="divInfo">
              <span>Address</span>
              <b>{ (branchInfo !== null) ? `${branchInfo.branchSitio} ${branchInfo.branchBarangay}, ${branchInfo.branchMunicipality}, ${branchInfo.branchProvince}` : "" }</b>
            </div>
          </div>

          <div>
            <h2 className="title" style={{textTransform:'capitalize', margin:'0 0 33px 0'}}>Branch Operators</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Fullname</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Registration Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    (operators.length > 0) ?
                    operators.map((operator, index) => (
                      <TableRow key={index} x={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row"> {operator.operatorFullname}</TableCell>
                        <TableCell>{operator.operatorMobileNumber}</TableCell>
                        <TableCell>{operator.registrationDate}</TableCell>
                    </TableRow>
                    ))
                    : <TableRow key={ 1 } sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                          <TableCell component="th" scope="row" colSpan={6}> No Operator found! </TableCell>
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

export default BranchDetails
