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
          "&: hover": {
            backgroundColor: "#FFDA18",
            fontWeight: "bold"
          },

          padding: "12px 15px",
          marginLeft: "10%",
          borderLeft: "2px solid rgba(255, 255, 255, 0.5)",
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: (isSelected) ? "bold" : null,
          flexGrow: '0',
          // "borderBottom": "0.5px solid rgb(19 219 219)", 
          background: (isSelected) ? "white" : null,
          color: (isSelected) ? "#4845d2" : "white",
          zIndex: 1
        }} component={Link} to={item.path} >
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;