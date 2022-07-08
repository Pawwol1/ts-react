import React from 'react';
import Header from './components/header/header';
import PageNotFound from './components/pageNotFound/pageNotFound';
import Sidebar from './components/sidebar/sidebar';
import UserDetails from './components/userDetails/userDetails';
import Userlist from './components/userlist/userlist';

function App() {
  return (
    <>
      <Header/>
      <Userlist/>
      <UserDetails/>
      <PageNotFound/>
      <Sidebar/>
    </>
  );
}

export default App;
