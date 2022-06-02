import React, { useState, useEffect } from "react";
import { ICat } from "../models/types";
import catStyle from "./Cat.module.css";

export const CatCard = ({ cat }: { cat: ICat }) => {
  return (
    <div className={catStyle.catCard}>
      <img className={catStyle.catImg} src={cat.url} alt={cat.title}></img>
    </div>
  );
};
