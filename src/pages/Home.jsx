import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

function Home() {
  const { activeCategory } = useSelector((state) => state.categories);
  const { searchValue } = useSelector((state) => state.search);
  const { activeSort } = useSelector((state) => state.sort);
  const { currentPage } = useSelector((state) => state.pagination);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const order = activeSort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = activeSort.sortProperty.replace("-", "");
    const category = activeCategory ? `&category=${activeCategory}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const url = `https://647323b9d784bccb4a3c4b0d.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`;

    axios.get(url).then((response) => {
      setItems(response.data);
      setIsLoading(false);
    });

    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </>
  );
}

export default Home;
