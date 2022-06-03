import React, { useState, useEffect } from 'react';
import { ICat } from '../models/types';
import catStyle from './Cat.module.css';

interface CatCardProp {
  // idx: number;
  cat: ICat;
  onClick?: (id: number) => void;
}
export const CatCard = ({ cat, onClick: childOnClick }: CatCardProp) => {
  // export const CatCard = ({ idx, cat, onClick: childOnClick }: CatCardProp) => {
  const click = () => {
    childOnClick && childOnClick(cat.id);
  };

  return (
    <div className={catStyle.catCard} onClick={click}>
      <img className={catStyle.catImg} src={cat.url} alt={cat.title}></img>
    </div>
  );
};
