import { Button } from '@mui/material';
import './header.css';
import React from 'react'

function Header() {
  return (
    <header>
      <div className="header_box">
        <h1 className="header_title">Meet ReqRes users!</h1>
        <p className="header_text">Application created with free ReqRes API</p>
      </div>
    </header>
  )
}

export default Header;

