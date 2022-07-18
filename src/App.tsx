import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDetails from './components/userDetails/userDetails';
import PageNotFound from './components/pageNotFound/pageNotFound';
import Main from './components/Main';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/user/:userID" element={<UserDetails/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>  
  );
}

export default App;
