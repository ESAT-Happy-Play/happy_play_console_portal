import "./userverification.scss";
import React, { useEffect, useState } from 'react';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import { Card } from '../../components/card/Card';
import { ContentLoader } from "../../components/mui";

import VerificationListTable from './VerificationListTable';
import { UserService } from "../../services";

const UserVerification = () => {
  const [pageLoader, setPageLoader] = useState(false);
  const [verificationData, setverificationData] = useState(null);
  const [header, setheader] = useState(1);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageSize, setpageSize] = useState(10);

  const tabComponents = () => { return [
    { label: "Verification", itemId: 0, isHeader: true },
    { label: "Verification List", itemId: 1, Component: (verificationData !== null) 
      ? <VerificationListTable 
          page={page} rowsPerPage={rowsPerPage} pageSize={pageSize} 
          triggerCallback={triggerCallback} data={verificationData} /> 
      : <div style={{padding:'100px'}}>Loading... Please wait.</div> },
    { label: "History", itemId: 2, Component: <div style={{padding:'100px'}}>Not yet!</div> }
  ]};

  const triggerCallback = async (val = 0, reqType = 0) => {
    setPageLoader(true);
    let oldData = verificationData;
    let result = (reqType === 0) ? await handleInitData(val + 1) : await handleInitData(1, val);

    if (reqType === 0) {
      result.verificationUsers.map((item) => {
        oldData.push(item);
      })
    }

    setverificationData((reqType === 0) ? oldData : result.verificationUsers);
    setpageSize(parseInt(result.total));
    setRowsPerPage(parseInt(result.pageSize));
    setPage(parseInt(result.pageNumber) - 1);

    setPageLoader(false);
  }

  const handeTabChange = (newVal) => { setheader(newVal); }

  const handleInitData = (pageNum = null, perPage = null, searchVal = null) => {
      return new Promise((resolve, reject) => {
        UserService.getForVerificationData({
            companyId: null,
            dateFrom: null,
            dateTo: null,
            pagedQuery: {
                search: (searchVal !== null) ? searchVal : "",
                pageNumber: (pageNum !== null) ? pageNum : page,
                pageSize: (perPage !== null) ? perPage : rowsPerPage,
                sortOrder: true
            }
        }).then((res) => {
            if (res.success) { 
              return resolve(res.data);
            } else { reject("Error"); }
        })
      });
  }

  useEffect( () => {
    setPageLoader(true);
    handleInitData().then((res) => {
      setverificationData(res.verificationUsers);
      setpageSize(parseInt(res.total));
      setRowsPerPage((res.pageSize));
      setPage(parseInt(res.pageNumber));

      setPageLoader(false);
    });
  }, []);

  return (
    <>
      <Card 
        style={{width:"98%", margin:'10px', padding:'0px'}} 
        bodystyle={{padding:'0px'}}
        header={(header === 1) ? "Verification List" : "History"
        }
        body={
          <div className="tab-container">
            <CustomVerticalTab
              changeEvent={handeTabChange}
              tabList={tabComponents()} />
          </div>
        }
      />
      <ContentLoader isLoadingPage={ pageLoader } />
    </>
  )
}

export default UserVerification
