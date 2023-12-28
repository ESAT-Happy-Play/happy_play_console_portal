import { ListItemButton, ListItemIcon } from "@mui/material";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const { appState } = useSelector((state) => state.appState);
  let isSelected = (appState === item.state) ? true : false;

  return (
      item.sidebarProps && item.path ? (
      <ListItemButton sx={
        { 
          padding: "7px 0 7px 20px", 
          "borderBottom": "0.5px solid rgb(19 219 219)", 
          background: (isSelected) ? "#e9e6e6" : "white" 
        }} component={Link} to={item.path} >
          
        <ListItemIcon sx={{ color: "#0f0e0e", "minWidth": "35px!important" }}>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;