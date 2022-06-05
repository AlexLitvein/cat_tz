import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICat2 } from '../models/types'; //ICat2,
import { catAdd, catFavRemoveOne, catRemoveOne, catsFavSelectors } from '../store/slice/catFavSlicer';
import { CatCard } from './Cat';
import catStyle from './Cat.module.css';

export const CatsFavContainer = () => {
  console.log('render CatsContainer');

  const dispatch = useDispatch();
  const cats = useSelector(catsFavSelectors.selectAll);

  // const onChildClick = (idx: number) => {
  //   dispatch(catRemoveOne(idx));
  // };
  const onChildClick = (cat: ICat2) => {
    // dispatch(catAdd(cat));
    dispatch(catFavRemoveOne(cat.id));
  };

  const renderList = () => {
    return cats && cats.map((el) => <CatCard cat={el} onClick={onChildClick} key={el.id} />);
  };

  return <div className={catStyle.сardCont}>{renderList()}</div>;
};
