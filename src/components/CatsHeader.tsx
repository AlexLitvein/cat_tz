import React from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { CatsContainer } from './CatsContainer';
import { CatsFavContainer } from './CatsFavContainer';
import catsHeaderStyle from './CatsHeader.module.css';

const CatsHeader = () => {
  const linkActive = ({ isActive }: { isActive: boolean }): string | undefined =>
    isActive ? catsHeaderStyle.buttActive + ' ' + catsHeaderStyle.butt : catsHeaderStyle.butt;
  return (
    <BrowserRouter>
      <nav className={catsHeaderStyle.catsHeader}>
        <NavLink to='/' className={linkActive}>
          Все котики
        </NavLink>
        <NavLink to='/fav-cats' className={linkActive}>
          Любимые котики
        </NavLink>
      </nav>

      <Routes>
        <Route path='/' element={<CatsContainer />} />
        <Route path='/fav-cats' element={<CatsFavContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CatsHeader;
