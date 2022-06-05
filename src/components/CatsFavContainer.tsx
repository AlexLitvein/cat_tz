import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICat2 } from '../models/types'; //ICat2,
import { catAdd, catFavRemoveOne, catRemoveOne, catsFavSelectors, catUpdate } from '../store/slice/catFavSlicer';
import { CatCard } from './Cat';
import catStyle from './Cat.module.css';

export const CatsFavContainer = () => {
  const dispatch = useDispatch();
  const cats = useSelector(catsFavSelectors.selectAll);
  const onChildClick = (cat: ICat2) => {
    dispatch(catUpdate({ id: cat.id, changes: { isChecked: false } }));
    dispatch(catFavRemoveOne(cat.id));
  };

  const renderList = () => {
    return cats && cats.map((el) => <CatCard cat={el} onClick={onChildClick} key={el.id} />);
  };

  if (cats.length) {
    return <div className={catStyle.сardCont}>{renderList()}</div>;
  } else {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Нет любимых котиков</h1>;
      </div>
    );
  }
};
