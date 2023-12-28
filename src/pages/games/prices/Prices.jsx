import "./prices.scss";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { toast } from 'react-toastify';

import PriceAndPrizes from "../../../components/widget/PriceAndPrizes";

import PageLoader from "../../../components/widget/PageLoader";

const Prices = () => {
  let _PAGESIZE = 10;

  const [SearchValue, setSearchValue] = useState('');
  const [PageNumber, setPageNumber] = useState(0);
  const [totalRows, setTotalRows] = useState(10);
  const [PageSize, setPageSize] = useState(_PAGESIZE);

  const [pageLoader, setPageLoader] = useState(true);
  const [gameTypeList, setGameTypeList] = React.useState([]);

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCallBackRefresh = () => {
    setPageLoader(true);
    setTotalRows(totalRows + 1);
  }

  return (
    <div className="content">
      <div className="container">
        <div className="divPrices">
          {
            (gameTypeList.length !== 0) ?
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                      {
                        (gameTypeList.length !== 0) ? gameTypeList.map((item, index) => (
                          <Tab key={index} label={item.gameTypeName} value={item.gameTypeId.toString()} />
                        )) : ""
                      }
                    </TabList>
                  </Box>
                  { 
                      (gameTypeList.length !== 0) ? gameTypeList.map((item, index) => (
                        <TabPanel key={index} value={item.gameTypeId.toString()}>
                          <PriceAndPrizes GameTypeObj={item} CallbackRefresh={ handleCallBackRefresh } />
                        </TabPanel>
                      )) : ""
                  }
                </TabContext>
              </Box>
            : (pageLoader) ? <>Loading... Please wait!</> : <>No Records Found!</>
          }
          
        </div>
      </div>

      <PageLoader isLoadingPage={ pageLoader } />
    </div>
  )
}

export default Prices
