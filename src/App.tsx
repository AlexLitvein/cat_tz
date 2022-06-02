import React, { useCallback, useEffect, useMemo } from "react";
import "./App.css";
import {
  catAdded,
  // catsLoading,
  // catsReceived,
  catsSelectors,
  fetchCats,
  useAppSelector,
} from "./catStore";
import { useDispatch, useSelector } from "react-redux";
import { CatList } from "./components/Cat";

function App() {
  const dispatch = useDispatch();
  const { isLoading, error } = useAppSelector((state) => state.cats);
  const cats = useSelector(catsSelectors.selectAll);

  const btnOnClick = () => {
    // dispatch(catAdded({ id: 1, name: "Cat 1" }));
  };

  useEffect(() => {
    // https://jsonplaceholder.typicode.com/photos?_limit=5&_page=2
    dispatch<any>(
      fetchCats({
        url: "https://jsonplaceholder.typicode.com/photos111?_limit=5",
        options: {
          method: "GET",
        },
      })
    );
  }, []);

  return (
    <div className="App">
      <button onClick={btnOnClick}>clk</button>
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>{error}</h1>}
      <CatList cats={cats} />
    </div>
  );
}

export default App;
