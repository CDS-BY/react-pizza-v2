import React from "react";
import PizzaBlock from "../PizzaBlock";

import styles from "./PizzaList.module.scss";

function PizzaList({ items }) {
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return <div className={styles.root}>{pizzas}</div>;
}

export default PizzaList;
