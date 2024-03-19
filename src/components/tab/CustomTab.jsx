import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Tabs, TabPanel as BaseTabPanel, TabsList as BaseTabsList, Tab as BaseTab, tabClasses } from '@mui/base';
import { buttonClasses } from '@mui/base/Button';
import { COLORS } from '../../utils/common_helpers/colors';

const CustomTab = ({ tabList, changeEvent = () => { } }) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeEvent(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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