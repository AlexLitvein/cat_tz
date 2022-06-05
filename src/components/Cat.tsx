import React, { useState, useEffect } from 'react';
import { ICat2 } from '../models/types'; //ICat2,
import catStyle from './Cat.module.css';

import heartFilled from '../media/heart-filled.svg';
import heartOutline from '../media/heart-outline.svg';

interface CatCardProp {
  // idx: number;
  cat: ICat2;
  // onClick?: (id: number) => void;
  onClick?: (cat: ICat2) => void;
}
export const CatCard = ({ cat, onClick: childOnClick }: CatCardProp) => {
  // export const CatCard = ({ idx, cat, onClick: childOnClick }: CatCardProp) => {
  const click = () => {
    // childOnClick && childOnClick(cat.id);
    // cat.isChecked = true;
    childOnClick && childOnClick(cat);
  };

  return (
    <div className={catStyle.catCard} onClick={click}>
      <img className={catStyle.catImg} src={cat.url} alt={cat.title}></img>
      {/* <img className='' src='media/heart-filled.svg' alt=''></img> */}
      <img
        className={cat.isChecked ? catStyle.heart : catStyle.heartHidden}
        src={cat.isChecked ? heartFilled : heartOutline}
        alt=''
      ></img>
    </div>
  );
};
