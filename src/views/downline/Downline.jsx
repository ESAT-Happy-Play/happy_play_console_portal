import './downline.scss';
import React, { useEffect, useState } from 'react';
import CustomVerticalTab from '../../components/tab/CustomVerticalTab';
import { Card } from '../../components/card/Card';
import { ContentLoader } from "../../components/mui";

import RegistrationApprovalTable from './RegistrationApprovalTable';
import AgentsTable from './AgentsTable';
import PlayersTable from './PlayersTable';

import { UserService } from "../../services";

export const Downline = () => {
  const [pageLoader, setPageLoader] = useState(false);
  const [approvalData, setapprovalData] = useState(null);

  const [header, setheader] = useState(1);
  const tabComponents = () => { return [
    { label: "Registration Approval", isHeader: true },
    { label: "Approval", Component: (approvalData !== null) 
      ? <RegistrationApprovalTable data={approvalData} /> 
      : <div style={{padding:'100px'}}>Loading... Please wait.</div> },
    { label: "Your Downline", isHeader: true },
    { label: "Agents", Component: <AgentsTable/> },
    { label: "Players", Component: <PlayersTable/> }
  ]};

  const handeTabChange = (newVal) => { setheader(newVal); }

  const handleForApproval = () => {
    setPageLoader(true);
    UserService.getUsersForApprove().then((res) => {
      if (res) { setapprovalData(res.data.listData); }
      setPageLoader(false);
    })
  }

  useEffect(() => {
    handleForApproval();
  }, []);
  
  return (
    <>
      <Card 
        style={{width:"98%", margin:'10px'}} 
        bodystyle={{padding:'0px'}}
        header={(header === 1) ? "Registration Approval" : 
          (header === 3) ? "Your Agents" : 
          (header === 4) ? "Your Players" : "" 
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
