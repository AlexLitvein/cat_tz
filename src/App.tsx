import React, { useCallback, useEffect, useMemo } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { CatsContainer } from './components/CatsContainer';

function App() {
  // const dispatch = useDispatch();

  const btnOnClick = () => {
    // dispatch(catAdded({ id: 1, name: "Cat 1" }));
  };

  return (
    <div className='App'>
      <button onClick={btnOnClick}>clk</button>
      <CatsContainer />
    </div>
  );
}

export default App;
