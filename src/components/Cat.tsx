import React, { useState, useEffect } from "react";
import { ICat } from "../types";
import catStyle from "./Cat.module.css";

export const CatCard = ({ cat }: { cat: ICat }) => {
  return (
    <div className={catStyle.catCard}>
      <img className={catStyle.catImg} src={cat.url} alt={cat.title}></img>
    </div>
  );
};

export const CatList = ({ cats }: { cats: ICat[] }) => {
  console.log("render CatList");

  const renderList = () => {
    return cats.map((el) => <CatCard cat={el} key={el.id} />);
  };

  return <div className={catStyle.сardCont}>{renderList()}</div>;
};
