import React from 'react';
import { CatCardProp } from '../models/types';
import catStyle from './Cat.module.css';

import heartFilled from '../media/heart-filled.svg';
import heartOutline from '../media/heart-outline.svg';

export const CatCard = ({ cat, onClick: childOnClick }: CatCardProp) => {
  const click = () => {
    childOnClick && childOnClick(cat);
  };

  return (
    <div className={catStyle.catCard}>
      <img className={catStyle.catImg} src={cat.url} alt={cat.title}></img>
      <img
        className={cat.isChecked ? catStyle.heart : catStyle.heartHidden}
        src={cat.isChecked ? heartFilled : heartOutline}
        alt=''
        onClick={click}
      ></img>
    </div>
  );
};
