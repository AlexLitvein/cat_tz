import React, { useState, useEffect } from 'react';
import { ICatDTO } from '../models/types'; //ICat2,
import catStyle from './Cat.module.css';

import heartFilled from '../media/heart-filled.svg';
import heartOutline from '../media/heart-outline.svg';

interface CatCardProp {
  // idx: number;
  cat: ICatDTO;
  // onClick?: (id: number) => void;
  onClick?: (cat: ICatDTO) => void;
}
export const CatCard = ({ cat, onClick: childOnClick }: CatCardProp) => {
  // export const CatCard = ({ idx, cat, onClick: childOnClick }: CatCardProp) => {
  const click = () => {
    // childOnClick && childOnClick(cat.id);
    cat.isChecked = true;
    childOnClick && childOnClick(cat);
  };

  return (
    <div className={catStyle.catCard} onClick={click}>
      <img className={catStyle.catImg} src={cat.url} alt={cat.title}></img>
      {/* <img className='' src='media/heart-filled.svg' alt=''></img> */}
      <img className={cat.isChecked ? catStyle.heart : catStyle.heartHidden} src={heartOutline} alt=''></img>
    </div>
  );
};
