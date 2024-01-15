import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Tabs, TabPanel as BaseTabPanel, TabsList as BaseTabsList, Tab as BaseTab, tabClasses } from '@mui/base';
import { buttonClasses } from '@mui/base/Button';
import {COLORS} from '../../helper/colors';

const CustomTab = ({tabList, changeEvent = () => {}}) => {

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      changeEvent(newValue);
    };
  
  return (
    <Tabs value={value}  onChange={handleChange}>
      <Box>
        <TabsList>
          {tabList?.map(({ label }, i) => (
            <Tab key={i} value={i}>{label}</Tab>
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
    color: ${COLORS.violetMain};
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    line-height: 1.5;
    padding: 8px 12px;
    margin: 6px;
    border: none;
    border-radius: 10px;
    display: flex;
    justify-content: center;

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

const TabPanel = styled(BaseTabPanel)(
    ({ theme }) => `
    width: 100%;
    font-size: 0.875rem;
    `,
);

const TabsList = styled(BaseTabsList) `
    border-radius: 12px;
    margin-bottom: 16px;
    padding-left:20px;
    background-color:#fff;
    display: flex;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
    `;

export default CustomTab