import styles from "./Search.module.scss";
import searchIcon from "../../assets/img/search_icon.svg";
import clearIcon from "../../assets/img/clear_icon.svg";

function Search({searchValue, onChangeSearchValue}) {

  return (
    <div className={styles.root}>
      <img className={styles.serchIcon} src={searchIcon} alt="Лупа и Пупа" />
      <input
        value={searchValue}
        className={styles.input}
        onChange={(e) => onChangeSearchValue(e.target.value)}
        type="text"
        placeholder="Поиск"
      />
      {searchValue && (
        <img
          onClick={() => onChangeSearchValue("")}
          className={styles.clearIcon}
          src={clearIcon}
          alt="Крестик"
        />
      )}
    </div>
  );
}

export default Search;
