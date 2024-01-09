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
          padding: "12px 0px", 
          borderRadius: "14px",
          margin: "5px 10px",
          fontSize:"14px",
          fontWeight: (isSelected) ? "bold" : null,
          display: "flex",
          justifyContent: "center",
          // "borderBottom": "0.5px solid rgb(19 219 219)", 
          background: (isSelected) ? "rgba(72, 69, 210, 0.15)" : null,
          color: (isSelected) ? "#4845d2" : "rgba(66, 66, 66, 0.85)",
          zIndex:1
        }} component={Link} to={item.path} >
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;