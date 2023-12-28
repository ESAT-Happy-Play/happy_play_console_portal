import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SidebarItem from "./SidebarItem";

const SidebarItemCollapse = ({ item }) => {
  const [open, setOpen] = useState(false);

  const { appState } = useSelector((state) => state.appState);
  useEffect(() => {
    let itemState = (appState.split(".")[0]);
    if (itemState === item.state) {
      setOpen(true);
    }
  }, [appState, item]);

  return (
    item.sidebarProps ? (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            "&: hover": {
              backgroundColor: "#067c7c"
            },
            backgroundColor: "#13dbdb",
            border: "0.5px solid rgb(230, 227, 227)"
          }}
        >
        <ListItemText disableTypography
            primary={
              <Typography sx={{ "fontSize": "14px" }}>
                {item.sidebarProps.displayText}
              </Typography>
            }
          />
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List sx={{ padding: 0 }}>
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