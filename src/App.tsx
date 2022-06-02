import React, { useCallback, useEffect, useMemo } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { CatsContainer } from './components/CatsContainer';
import CatsHeader from './components/CatsHeader';

function App() {
  // const dispatch = useDispatch();

  const btnOnClick = () => {
    // dispatch(catAdded({ id: 1, name: "Cat 1" }));
  };

  return (
    <div className='App'>
      {/* <button onClick={btnOnClick}>clk</button> */}
      <CatsHeader />
      {/* <CatsContainer /> */}
    </div>
  );
}

export default App;
