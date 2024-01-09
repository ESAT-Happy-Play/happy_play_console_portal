import "./card.scss"
import React from 'react';

export const Card = ({header, body, actions}) => {

  return (
    <div className="container">
        <div className="header">
            <h2>{header}</h2>
            {actions}
        </div>
        <div className="body">
            {body}
        </div>
    </div>
  )
}