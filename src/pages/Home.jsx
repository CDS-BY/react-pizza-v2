import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import { setCurrentPage } from "../components/Pagination/PagintionSlice";
import { onSetActiveSort } from "../components/Sort/SortSlice";
import { setActiveCategoryId } from "../components/Categories/CategoriesSlice";

import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const { activeCategoryId } = useSelector((state) => state.categories);
  const { searchValue } = useSelector((state) => state.search);
  const { activeSort, sortList } = useSelector((state) => state.sort);
  const { currentPage } = useSelector((state) => state.pagination);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = () => {
    setIsLoading(true);

    const order = activeSort.sortProperty.includes("-") ? "desc" : "asc";
    const sortBy = activeSort.sortProperty.replace("-", "");
    const category = activeCategoryId ? `&category=${activeCategoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const url = `https://647323b9d784bccb4a3c4b0d.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`;

    axios.get(url).then((response) => {
      setItems(response.data);
      setIsLoading(false);
    });
  };

  // Если это НЕ ПЕРВЫЙ рендер, то вшиваем параметры в URL-строку (если первый, то ничего не делаем)
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        activeCategoryId,
        activeSort: activeSort.sortProperty,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryId, activeSort, searchValue, currentPage]);

  // Если это первый рендер, то проверяем параметры в URL-строке и сохраняем их а РЕДАКСЕ
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.activeSort
      );

      dispatch(onSetActiveSort(sort));
      dispatch(setCurrentPage(Number(params.currentPage)));
      dispatch(setActiveCategoryId(Number(params.activeCategoryId)));

      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Если при первом рендере мы не получали данных из URL-строки, то рендерим все пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryId, activeSort, searchValue, currentPage]);

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
