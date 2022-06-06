import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICat2 } from '../models/types';
import { catsAPI } from '../services/CatsService';
import {
  catAdd,
  catAddMany,
  catFavAdd,
  catFavRemoveOne,
  catsSelectors,
  catUpdate,
  fetchCats,
} from '../store/slice/catFavSlicer';
import { CatCard } from './Cat';
import catStyle from './Cat.module.css';

export const CatsContainer = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const {
    data: catsFetched = [],
    error = '',
    isLoading = false,
    isFetching = false,
  } = catsAPI.useFetchCatsQuery({ limit: 7, page });

  const cats = useSelector(catsSelectors.selectAll);

  const onChildClick = (cat: ICat2) => {
    const updArg = { id: cat.id, changes: { isChecked: false } };
    if (cat.isChecked) {
      dispatch(catFavRemoveOne(cat.id));
    } else {
      updArg.changes.isChecked = true;
      dispatch(catFavAdd({ ...cat, isChecked: true }));
    }
    dispatch(catUpdate(updArg));
  };

  useEffect(() => {
    dispatch(catAddMany(catsFetched.map((catDTO) => ({ ...catDTO, isChecked: false }))));
  }, [catsFetched]);

  const scrollHandler = () => {
    let isStart = false;
    return (e: any) => {
      let sz = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight);
      if (!isStart && sz <= 100) {
        isStart = true;
        setPage((prev) => prev + 1);
      }
      if (sz > 100) {
        isStart = false;
      }
    };
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler());
    return () => {
      document.removeEventListener('scroll', scrollHandler());
    };
  }, []);

  const renderList = () => {
    return cats && cats.map((cat) => <CatCard cat={cat} onClick={onChildClick} key={cat.id} />);
  };

  const getErrorStr = (e: FetchBaseQueryError | SerializedError | undefined) => {
    let errMsg = '';
    if (e) {
      if ('status' in e) {
        errMsg = 'error' in e ? e.error : JSON.stringify(e.data);
      } else {
        errMsg = e.message || '';
      }
      return errMsg;
    }
  };

  // console.log('render CatList');
  return (
    <>
      <div className={catStyle.сardCont}>{renderList()}</div>
      {(isFetching || error) && (
        <div className={catStyle.catLoadCont}>
          {isFetching && <h1 style={{ height: '100px' }}>... загружаем еще котиков ...</h1>}
          {error && <h1>{'Не удалось загрузить котиков :('}</h1>}
        </div>
      )}
    </>
  );
};
