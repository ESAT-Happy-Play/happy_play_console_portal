import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Tabs as BaseTabs, TabPanel as BaseTabPanel, TabsList as BaseTabsList, Tab as BaseTab, tabClasses } from '@mui/base';
import { buttonClasses } from '@mui/base/Button';
import { COLORS } from '../../helper/colors';

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

const CustomVerticalTab = ({ tabList, changeEvent = () => { } }) => {
  const [value, setValue] = React.useState(tabList[0].isHeader ? 1 : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeEvent(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} orientation="vertical">
      <Box sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.4)" }}>
        <TabsList>
          {tabList?.map((tabs, i) => (
            tabs.isHeader ?
              <HeaderTab key={i} disabled>{tabs.label}</HeaderTab>
              :
              <Tab key={i} value={i}>{tabs.label}</Tab>
          ))}
        </TabsList>
      </Box>
      {tabList?.map(({ Component }, i) => (
        <TabPanel key={i} value={i}>
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
        color: #fff;
    }

    &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;


const HeaderTab = styled(BaseTab)`
    justify-content:center;
    color: #403d3980;
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
    background-color:#fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

export default CustomVerticalTab