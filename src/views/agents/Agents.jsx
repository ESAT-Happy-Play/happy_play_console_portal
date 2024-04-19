import '../master_agents/userprofile.scss';
import React, { useEffect, useState } from 'react';

import { StoreExt } from "../../utils/helpers";

import { ContentLoader } from '../../components/mui';
import AdminAgentsTable from './AdminAgentsTable';
import AgentsTable from './AgentsTable';

const Agents = () => {
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
        ? <AdminAgentsTable /> 
        : <AgentsTable companyObjId={tokenObj.companyId} companyId={loginObj.companyId} loadingCallback={loadingCallback} />
      }

      <ContentLoader isLoadingPage={isloading} />
    </>
  )
}

export default Agents
