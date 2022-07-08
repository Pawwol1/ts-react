import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserDetails from './components/userDetails/userDetails';
import PageNotFound from './components/pageNotFound/pageNotFound';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/user" element={<UserDetails/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
