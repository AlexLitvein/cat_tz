import React, { useState, useEffect } from "react";
import { ICat } from "../types";
import catStyle from "./Cat.module.css";

interface ICatProp {
  cat: ICat;
}

export const CatCard = ({ cat }: ICatProp) => {
  return (
    <div className={catStyle.catCard}>
      <img className="" ref={cat.path} alt={cat.name}></img>
    </div>
  );
};

interface IPropCatList {
  cats: ICat[];
}

export const CatList = ({ cats }: IPropCatList) => {
  const renderList = () => {
    return cats.map((el) => <CatCard cat={el} key={el.id} />);
  };

  return <div className="class">{renderList()}</div>;
};
