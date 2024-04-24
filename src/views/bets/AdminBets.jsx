import React, { useState, useEffect } from 'react';
import CustomTab from "../../components/tab/CustomTab";
import "./bets.scss";
import { mockBetsHistory } from "../../helper/mocks";
import CustomVerticalTab from "../../components/tab/CustomVerticalTab";
import BetsTable from "./BetsTable";
import { TextField, MenuItem  } from "@mui/material";

import { CompanyGameList } from "../../utils/common/CompanyGameList";
import { CompanyList } from "../../utils/common/CompanyList";
import { StoreExt } from "../../utils/helpers";
import { ContentLoader } from "../../components/mui";

function AdminBets() {
  let loginObj = StoreExt.getStore("auth");
  let tokenObj = StoreExt.getDecodeJWT(loginObj.token);

  const [pageLoader, setPageLoader] = useState(false);
  const [companyGames, setcompanyGames] = useState(null);
  const [companyGuid, setcompanyGuid] = useState(tokenObj.companyId);
  const [selectedGameId, setselectedGameId] = useState(null);

  const [compObjId, setcompObjId] = useState("");
  const [companies, setcompanies] = useState([]);

  const handleFilterByCompany = async event => {
    let companyObjId = event.target.getAttribute('data-value');
    if (companyObjId !== null) {
      setPageLoader(true);
      setcompObjId(companyObjId);
      await handleListGames(companyObjId);
      setPageLoader(false);
    }
  }

  const handleChangeGame = (newValue) => {

    console.log(newValue);
  }

  const handleVerticalChange = (newValue) => {
    console.log(newValue);
  }

  const handleListGames = async (compObjId) => {
    setPageLoader(true);
    await CompanyGameList.getGameList(compObjId, true).then((res) => {
      setcompanyGuid(res.companyId);

      if (res.gameList.length > 0) {
        setcompanyGames(res.gameList);
        // for new load default company
        setselectedGameId(res.gameList[0].id);
      } else {
        setcompanyGames([]);
      }
      setPageLoader(false);
    });
  }

  useEffect(() => {
    // handleListGames();
    CompanyList.getCompanyList().then((res) => {
      setcompanies(res.companyList);
    });
  }, []);

  const tabs = (companyGames !== null) ? companyGames.map((game) => {
    const verticalTabs = [];
    if (game.child) {
      game.child.forEach((subType) => {
        verticalTabs.push({
          label: subType.gameName,
          itemId: subType.id,
          Component: (
            <BetsTable
              data={[]}
              gameName={game.gameName}
              subTypeName={subType.gameName}
              subType={subType}
            />
          ),
        });
      });
    }
    return {
      label: game.gameName,
      itemId: game.id,
      Component: (
        <div className="tab-container">
          <div className="tab-header">
            <h1>Game Bet History</h1>
          </div>
          {game.child ? (
            <CustomVerticalTab changeEvent={handleVerticalChange} tabList={verticalTabs} />
          ) : (
            <BetsTable data={mockBetsHistory} gameName={game.gameName} subType={game} />
          )}
        </div>
      ),
    };
  }) : <div style={{ padding: '25px' }}>Loading...Please wait.</div>;

  return (
    <div className="container">
        <div className="search" style={{borderBottom:'2px solid #e3e3e3', padding:'15px', marginBottom:'15px'}}>
            <TextField type="text" sx={{width:'200px'}} defaultValue={compObjId}
            label="Select Company" size="small" onClick={handleFilterByCompany} select>
            <MenuItem value=""><em>Select company</em></MenuItem>
            { 
                (companies.length > 0) ?
                companies.map((item, index) => (
                    <MenuItem key={item.companyId} data-obj={item.companyObjectId} value={item.companyObjectId}>
                        {item.companyName}
                    </MenuItem>
                ))
                : <MenuItem value=""><em>No data found!</em></MenuItem>
            }
            </TextField>
        </div>
      {
        (companyGames !== null && companyGames !== undefined)
        ? (companyGames.length > 0)
        ? <CustomTab changeEvent={handleChangeGame} tabList={tabs} />
        : <div style={{ padding:'25px' }}>No available game for the selected company</div>
        : <div style={{ padding:'25px' }}>Please select company.</div>
      }

      <ContentLoader isLoadingPage={pageLoader} />
    </div>
  );
}

export default AdminBets;
