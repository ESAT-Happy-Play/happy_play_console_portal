import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Tabs as BaseTabs, TabPanel as BaseTabPanel, TabsList as BaseTabsList, Tab as BaseTab, tabClasses } from '@mui/base';
import { buttonClasses } from '@mui/base/Button';
import { COLORS } from '../../utils/common_helpers/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

/*
Use to create Vertical tab, require the ff:
  -Tablist
    -Content for every tab
    - obj : 
      {
        label: "NameOfTab",
        Component: <display-of-the-said-tab/>,
        isHeader?: optional, display as category header of the vertical nav
      }
*/

const ProfileVerticalTab = ({ tabList, changeEvent = () => { } }) => {
  let defaultVal = (tabList[0].itemId !== undefined) 
    ? tabList.filter(obj => !obj.isHeader)[0].itemId : 0;

  const [value, setValue] = React.useState(defaultVal);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeEvent(newValue);
    // console.log(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} orientation="vertical">
      <Box sx={{ borderRight: `1px solid ${COLORS.transparentFont}` }}>
        <TabsList>
          {tabList?.map((tabs, i) => (
            tabs.isHeader ?
              <HeaderTab key={i} value={ (tabs.itemId !== undefined) ? tabs.itemId : i } disabled>{tabs.label}</HeaderTab>
              :
              <Tab key={i} value={ (tabs.itemId !== undefined) ? tabs.itemId : i }>{tabs.label}</Tab>
          ))}

          <br/>
          <br/>
          <br/>
          <Button variant="text">Logout &nbsp; <LogoutIcon style={{fontSize:'15px'}} /></Button>
        </TabsList>
      </Box>
      {tabList?.map(({ Component, itemId }, i) => (
        <TabPanel key={i} value={ (itemId !== undefined) ? itemId : i }>
          {Component}
        </TabPanel>
      ))}
    </Tabs>
  )
}


const Tab = styled(BaseTab)`
    cursor: pointer;
    font-size: 0.875rem;
    background-color: transparent;
    min-width: 200px;
    padding: 10px 20px;
    border: none;
    display: flex;

    &:hover {
        background-color: ${COLORS.background};
    }

    &.${tabClasses.selected} {
        background-color: ${COLORS.violetMain};
        color: white;
    }

    &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;


const HeaderTab = styled(BaseTab)`
    justify-content:center;
    color: ${COLORS.transparentFont};
    font-size: 0.875rem;
    background-color: transparent;
    min-width: 200px;
    padding: 10px 20px;
    border: none;
    display: flex;
`;

const Tabs = styled(BaseTabs)`
  display: flex;
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
    width: 100%;
    padding: 15px;
    font-size: 0.875rem;
    `,
);

const TabsList = styled(BaseTabsList)`
    border-radius: 12px;
    margin-bottom: 16px;
    background-color:white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

export default ProfileVerticalTab