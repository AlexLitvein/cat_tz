import React, { useEffect } from "react";
import "./App.css";
import {
  catAdded,
  catsLoading,
  // catsReceived,
  catsSelectors,
  fetchCats,
} from "./catStore";
import { useDispatch, useSelector } from "react-redux";
import { CatList } from "./components/Cat";

function App() {
  const dispatch = useDispatch();
  const cats = useSelector(catsSelectors.selectAll);
  const btnOnClick = () => {
    // dispatch(catAdded({ id: 1, name: "Cat 1" }));
  };

  useEffect(() => {
    dispatch(catsLoading(null));

    // https://jsonplaceholder.typicode.com/photos?_limit=5&_page=2
    // [
    //   {
    //     "albumId": 1,
    //     "id": 1,
    //     "title": "accusamus beatae ad facilis cum similique qui sunt",
    //     "url": "https://via.placeholder.com/600/92c952",
    //     "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    //   },
    // ]
    dispatch<any>(
      fetchCats({
        url: "https://jsonplaceholder.typicode.com/photos?_limit=5",
        options: {
          method: "GET",
        },
      })
    );
  }, []);

  return (
    <div className="App">
      <button onClick={btnOnClick}>clk</button>
      <CatList cats={cats} />
    </div>
  );
}

export default App;
