import styles from "./Search.module.scss";
import searchIcon from "../../assets/img/search_icon.svg";
import clearIcon from "../../assets/img/clear_icon.svg";

import { useContext } from "react";
import { SearchContext } from "../../App";

function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={styles.root}>
      <img className={styles.serchIcon} src={searchIcon} alt="Лупа и Пупа" />
      <input
        value={searchValue}
        className={styles.input}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Поиск"
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue("")}
          className={styles.clearIcon}
          src={clearIcon}
          alt="Крестик"
        />
      )}
    </div>
  );
}

export default Search;
