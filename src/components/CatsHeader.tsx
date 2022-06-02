import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { CatsContainer } from './CatsContainer';
import catsHeaderStyle from './CatsHeader.module.css';

const CatsHeader = () => {
  return (
    <BrowserRouter>
      <nav className={catsHeaderStyle.catsHeader}>
        <Link to='/'>
          <button style={{ height: '32px' }}>all cats</button>
        </Link>
        <Link to='/fav-cats'>fav cats</Link>
      </nav>

      <Routes>
        <Route path='/' element={<CatsContainer />} />
        <Route path='/fav-cats' element={<h2>Контакты</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default CatsHeader;
