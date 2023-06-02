import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";

import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";

function Home() {
  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({
    name: "популярности (DESC)",
    sortProperty: "-rating",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const order = activeSort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = activeSort.sortProperty.replace("-", "");
    const category = activeCategory ? `&category=${activeCategory}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const url = `https://647323b9d784bccb4a3c4b0d.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`;

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
  }, [activeCategory, activeSort, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(i) => setCurrentPage(i)} />
    </>
  );
}

export default Home;
