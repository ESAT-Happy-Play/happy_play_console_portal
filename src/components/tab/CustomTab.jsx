import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Tabs, TabPanel as BaseTabPanel, TabsList as BaseTabsList, Tab as BaseTab, tabClasses } from '@mui/base';
import { buttonClasses } from '@mui/base/Button';
import { COLORS } from '../../helper/colors';

const CustomTab = ({ tabList, changeEvent = () => { } }) => {
  // const [value, setValue] = React.useState((tabList[0].itemId !== undefined) ? tabList[0].itemId : 0);
  let defaultVal = (tabList[0].itemId !== undefined) ? tabList[0].itemId : 0;
  const [value, setValue] = React.useState(null);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeEvent(newValue);
  };

  useEffect(() => {
    if (tabList.findIndex(m => m.itemId === value) < 0) {
      setValue(null);
    }
  }, [tabList]);

  return (
    <Tabs value={(value !== null) ? value : defaultVal} onChange={handleChange} >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TabsList>
          {tabList?.map(({ label, itemId }, i) => (
            <Tab key={i} value={ (itemId !== undefined) ? itemId : i }>{label}</Tab>
          ))}
        </TabsList>
      </Box>
      {tabList?.map(({ Component, itemId }, i) => (
        <TabPanel key={i} value={(itemId !== undefined) ? itemId : i}>
          {Component}
        </TabPanel>
      ))}
    </Tabs>
  )
}


const Tab = styled(BaseTab)`
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-family: "Inter";
    min-width: 160px;
    background-color: transparent;
    line-height: 1.5;
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: ${COLORS.violetHover};
    }

    &.${tabClasses.selected} {
        background-color: white;
        color: black;
    }

    &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
    width: 100%;
    font-size: 0.875rem;
    `,
);

const TabsList = styled(BaseTabsList)`
    border-radius: 12px;
    margin-bottom: 16px;
    background-color: ${COLORS.violetMain};
    display: flex;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
    padding:5px;
    gap:5px;
    `;

export default CustomTab