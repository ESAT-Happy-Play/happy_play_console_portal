import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Tabs as BaseTabs, TabPanel as BaseTabPanel, TabsList as BaseTabsList, Tab as BaseTab, tabClasses } from '@mui/base';
import { buttonClasses } from '@mui/base/Button';
import { COLORS } from '../../helper/colors';

const CustomVerticalTab = ({ tabList, changeEvent = () => { } }) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeEvent(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} orientation="vertical">
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
    background-color: transparent;
    min-width: 150px;
    padding: 10px 15px;
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

const Tabs = styled(BaseTabs)`
  display: flex;
  gap: 16px;
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
    padding-left:20px;
    background-color:#fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

export default CustomVerticalTab