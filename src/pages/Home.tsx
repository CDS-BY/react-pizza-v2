import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import SortPopup from "../components/Sort";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import {
  selectPagination,
  setCurrentPage,
} from "../redux/slices/pagintionSlice";
import { onSetActiveSort, selectSort } from "../redux/slices/sortSlice";
import {
  selectCategories,
  setActiveCategoryId,
} from "../redux/slices/categoriesSlice";
import {
  SearchPizzaParams,
  fetchPizzas,
  selectPizza,
} from "../redux/slices/pizzaSlice";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { sortList } from "../components/Sort";
import { onChangeSearchValue, selectSearch } from "../redux/slices/searchSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const { searchValue } = useSelector(selectSearch);
  const { items, status } = useSelector(selectPizza);

  const { activeSort } = useSelector(selectSort);
  const { activeCategoryId } = useSelector(selectCategories);
  const { currentPage } = useSelector(selectPagination);

  const isSearch = useRef(false);

  const getPizzas = async () => {
    const sortBy = activeSort.sortProperty.replace("-", "");
    const order = activeSort.sortProperty.includes("-") ? "desc" : "asc";
    const category = activeCategoryId ? `&category=${activeCategoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: activeCategoryId > 0 ? activeCategoryId : null,
  //       sortProperty: activeSort.sortProperty,
  //       currentPage,
  //     };

  //     const queryString = qs.stringify(params, { skipNulls: true });
  //     console.log(queryString);

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeCategoryId, activeSort, searchValue, currentPage]);

  // Если при первом рендере мы не получали данных из URL-строки, то рендерим все пиццы
  useEffect(() => {
    // if (!isSearch.current) {
      getPizzas();
    // }

    // isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryId, activeSort, searchValue, currentPage]);

  // Парсим параметры при первом рендере
  // useEffect(() => {
  //   if (window.location.search) {

  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(onSetActiveSort(sort || sortList[0]));
  //     dispatch(setCurrentPage(Number(params.currentPage)));
  //     dispatch(onChangeSearchValue(params.search));
  //     params.category
  //       ? dispatch(setActiveCategoryId(Number(params.category)))
  //       : dispatch(setActiveCategoryId(Number(0)));

  //     // isSearch.current = true;
  //   }
  //   isMounted.current = true;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <SortPopup />
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
};

export default Home;
