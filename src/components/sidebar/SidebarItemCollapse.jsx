import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SidebarItem from "./SidebarItem";

const SidebarItemCollapse = ({ item, selected, setSelected }) => {

  const { appState } = useSelector((state) => state.appState);
  useEffect(() => {
    let itemState = (appState.split(".")[0]);
    if (itemState === item.state) {
      setSelected(item.sidebarProps.displayText);
    }
  }, [appState, item]);

  return (
    item.sidebarProps ? (
      <>
        <ListItemButton
          onClick={() => setSelected(selected ? "" : item.sidebarProps.displayText)}
          sx={{
            "p: hover": {
              fontWeight: "bold"
            },
            flexGrow: 0,
            gap: "5px"
          }}
        >
          {item.sidebarProps.icon}
          <ListItemText disableTypography
            primary={
              <Typography sx={{
                "fontSize": "14px",
                fontFamily: "Inter",
                fontWeight: (selected) ? "bold" : "normal",
              }}>
                {item.sidebarProps.displayText}
              </Typography>
            }
          />
          {selected ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={selected} timeout="auto">
          <List sx={{
            padding: 0
          }}>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  <SidebarItem item={route} key={index} />
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;