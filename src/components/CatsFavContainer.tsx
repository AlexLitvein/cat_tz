import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catsAPI } from '../services/CatsService';
import { catRemoveOne, catsFavSelectors } from '../store/slice/catFavSlicer';
import { CatCard } from './Cat';
import catStyle from './Cat.module.css';

export const CatsFavContainer = () => {
  console.log('render CatsContainer');

  const dispatch = useDispatch();
  // const [limit, setLimit] = useState(10);
  // const { data: cats, error, isLoading } = catsAPI.useFetchCatsQuery(limit);
  const cats = useSelector(catsFavSelectors.selectAll);

  const onChildClick = (idx: number) => {
    dispatch(catRemoveOne(idx));
    // cats?.splice(idx, 1);
  };

  const renderList = () => {
    return cats && cats.map((el) => <CatCard cat={el} onClick={onChildClick} key={el.id} />);
    // return cats && cats.map((el, i) => <CatCard idx={i} cat={el} onClick={onChildClick} key={el.id} />);
  };

  return <div className={catStyle.сardCont}>{renderList()}</div>;
};
