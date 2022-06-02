import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { catsAPI } from '../services/CatsService';
import { catsSelectors } from '../store/slice/catFavSlicer';
import { CatCard } from './Cat';
import catStyle from './Cat.module.css';

export const CatsFavContainer = () => {
  console.log('render CatsContainer');

  // const [limit, setLimit] = useState(10);
  // const { data: cats, error, isLoading } = catsAPI.useFetchCatsQuery(limit);
  const cats = useSelector(catsSelectors.selectAll);

  const renderList = () => {
    return cats && cats.map((el) => <CatCard cat={el} key={el.id} />);
  };

  return <div className={catStyle.сardCont}>{renderList()}</div>;
};
