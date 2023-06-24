import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import { setCurrentPage } from "../redux/slices/pagintionSlice";
import { onSetActiveSort, selectSort } from "../redux/slices/sortSlice";
import { selectCategories, setActiveCategoryId } from "../redux/slices/categoriesSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { searchValue } = useSelector((state) => state.search);
  const { items, status } = useSelector((state) => state.pizza);
  
  const { activeSort, sortList } = useSelector(selectSort);
  const { activeCategoryId } = useSelector(selectCategories);
  const { currentPage } = useSelector((state) => state.pagination);

  const isSearch = useRef(false);

  const getPizzas = async () => {
    const sortBy = activeSort.sortProperty.replace("-", "");
    const order = activeSort.sortProperty.includes("-") ? "desc" : "asc";
    const category = activeCategoryId ? `&category=${activeCategoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));

    window.scrollTo(0, 0);
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

  // Если при первом рендере мы не получали данных из URL-строки, то рендерим все пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
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

  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination />
    </>
  );
}

export default Home;
