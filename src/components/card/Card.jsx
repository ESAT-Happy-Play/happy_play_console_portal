import { Box } from "@mui/material";
import "./card.scss"
import React from 'react';

export const Card = ({header, body, actions, style}) => {

  return (
    <Box className="container" sx={style}>
        {
          (header !== null) ? 
            <div className="header">
              <h2>{header}</h2>
              {actions}
            </div>
          : <></>
        }
        <div className="body">
            {body}
        </div>
    </Box>
  )
}