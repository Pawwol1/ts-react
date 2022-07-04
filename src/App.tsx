import React from 'react';
import Header from './components/header/header';
import PageNotFound from './components/pageNotFound/pageNotFound';
import Sidebar from './components/sidebar/sidebar';
import UserDetails from './components/userDetails/userDetails';
import Userlist from './components/userlist/userlist';
import UserlistSearch from './components/userlistSearch/userlistSearch';


function App() {
  return (
    <>
      <Header/>
      <Userlist/>
      <UserlistSearch/>
      <UserDetails/>
      <PageNotFound/>
      <Sidebar/>
    </>
  );
}

export default App;
