import './userprofile.scss';
import React, { useEffect, useState } from 'react';

import { StoreExt } from "../../utils/helpers";
import AdminMasterAgentTable from './AdminMasterAgentTable';
import MasterAgentTable from './MasterAgentTable';

import { ContentLoader } from '../../components/mui';

const MasterAgents = () => {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);
  const [isloading, setisloading] = useState(false);
  const loadingCallback = (val) => {
    setisloading(val);
  }
  return (
    <>
      {
        (loginObj.companyId === -1)
        ? <AdminMasterAgentTable loadingCallback={loadingCallback} /> 
        : <MasterAgentTable companyObjId={tokenObj.companyId} companyId={loginObj.companyId} loadingCallback={loadingCallback} />
      }

      <ContentLoader isLoadingPage={isloading} />
    </>
  )
}

export default MasterAgents
