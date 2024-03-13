import "./customCard.scss"
import React from 'react';
import { Box } from "@mui/material";

export const CustomCard = ({ header, body, action, style, description }) => {

    return (
        <Box className="card-container" sx={style}>
            {
                <div className="header">
                    <h2>{header}</h2>
                    <div className="card-action">
                    </div>
                </div>
            }
            <div className="card-body">
                <div className="main-content">
                    {body}
                </div>
                <div className="card-edit" onClick={action}>
                    <img src={require("./../../assets/icons/edit-card.png")} />
                    <p>Edit</p>
                </div>
            </div>
            <p className="card-description">{description}</p>
        </Box>
    )
}