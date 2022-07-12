import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Userlist from './userlist/userlist';

function Main() {
  return (
    <>
      <Header/>
      <Userlist/>
      <Sidebar/>
    </>
  );
}

export default Main;
