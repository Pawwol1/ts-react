import React from 'react'
import './header.css';

function Header() {

const title: string = "Meet ReqRes users"
const text: string = "Application created with free ReqRes API"

  return (
    <header>
      <div className="header_box">
        <h1 className="header_box--title">{title}</h1>
        <p className="header_box--text">{text}</p>
      </div>
    </header>
  )
}

export default Header;

