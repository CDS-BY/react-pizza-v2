import styles from "./Search.module.scss";
import searchIcon from "../../assets/img/search_icon.svg";
import clearIcon from "../../assets/img/clear_icon.svg";

import { useSelector, useDispatch } from "react-redux";
import { onChangeSearchValue, onDeleteSearchValue } from "./SearchSlice";

function Search() {
  const { searchValue } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <img className={styles.serchIcon} src={searchIcon} alt="Лупа и Пупа" />
      <input
        value={searchValue}
        className={styles.input}
        onChange={(e) => dispatch(onChangeSearchValue(e.target.value))}
        type="text"
        placeholder="Поиск"
      />
      {searchValue && (
        <img
          onClick={() => dispatch(onDeleteSearchValue())}
          className={styles.clearIcon}
          src={clearIcon}
          alt="Крестик"
        />
      )}
    </div>
  );
}

export default Search;
