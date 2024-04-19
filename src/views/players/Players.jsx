import '../master_agents/userprofile.scss';
import React, { useEffect, useState } from 'react';

import { StoreExt } from "../../utils/helpers";

import { ContentLoader } from '../../components/mui';
import AdminPlayersTable from './AdminPlayersTable';
import PlayersTable from './PlayersTable';

const Players = () => {
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
        ? <AdminPlayersTable /> 
        : <PlayersTable companyObjId={tokenObj.companyId} companyId={loginObj.companyId} loadingCallback={loadingCallback} />
      }

      <ContentLoader isLoadingPage={isloading} />
    </>
  )
}

export default Players
