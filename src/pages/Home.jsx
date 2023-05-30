import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";

import { useEffect, useState } from "react";

function Home() {
  // https://647323b9d784bccb4a3c4b0d.mockapi.io/items

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({
    name: "популярности (DESC)",
    sortProperty: "-rating",
  });

  useEffect(() => {
    setIsLoading(true);

    const order = activeSort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = activeSort.sortProperty.replace("-", "");
    const category = activeCategory ? `category=${activeCategory}` : ""
    const url = `https://647323b9d784bccb4a3c4b0d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`;

    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      })
      .catch((e) => {
        throw new Error(e);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort]);

  return (
    <>
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onToggleActiveCategory={(i) => setActiveCategory(i)}
        />
        <Sort
          activeSort={activeSort}
          onToggleActiveSort={(obj) => setActiveSort(obj)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
}

export default Home;
