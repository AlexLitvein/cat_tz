import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { catAdded, catsLoading, catsReceived, catsSelectors } from "./catStore";
import { useDispatch, useSelector } from "react-redux";
import { CatList } from "./components/Cat";

function App() {
  const dispatch = useDispatch();
  const cats = useSelector(catsSelectors.selectAll);
  const btnOnClick = () => {
    dispatch(catAdded({ id: 1, name: "Cat 1" }));
  };

  useEffect(() => {
    dispatch(catsLoading(null));
    dispatch(
      catsReceived([
        { id: 3, name: "Cat 3" },
        { id: 2, name: "Cat 2" },
      ])
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={btnOnClick}>clk</button>
      <CatList cats={cats} />
    </div>
  );
}

export default App;
