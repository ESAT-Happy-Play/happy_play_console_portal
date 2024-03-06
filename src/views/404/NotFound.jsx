import "./404.scss";
import React from 'react';
import { Link } from "react-router-dom";

export function NotFound() {
  return (
        <div className="notfound">
            <div className="nfcontent">
                <h1>Oops! You seem to be lost.</h1>
                <p>Here are some helpful links:</p>
                <Link to='/'>Home</Link>
            </div>
        </div>
    )
}