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

  const tabComponents = () => { return [
    { label: "Verification", itemId: 0, isHeader: true },
    { label: "Verification List", itemId: 1, Component: (verificationData !== null) 
      ? <VerificationListTable data={verificationData} /> 
      : <div style={{padding:'100px'}}>Loading... Please wait.</div> },
    { label: "History", itemId: 2, Component: <div style={{padding:'100px'}}>Not yet!</div> }
  ]};

  const handeTabChange = (newVal) => { setheader(newVal); }

  const handleInitData = () => {
      setPageLoader(true);
      UserService.getForVerificationData({
          companyId: null,
          dateFrom: null,
          dateTo: null,
          pagedQuery: {
              search: "",
              pageNumber: 0,
              pageSize: 10,
              sortOrder: true
          }
      }).then((res) => {
          if (res.success) { 
            setverificationData(res.data.verificationUsers); 
          }
          setPageLoader(false);
      })
  }

  useEffect(() => {
    handleInitData();
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
