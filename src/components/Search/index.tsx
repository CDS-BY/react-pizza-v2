import styles from "./Search.module.scss";
import searchIcon from "../../assets/img/search_icon.svg";
import clearIcon from "../../assets/img/clear_icon.svg";

import { useDispatch } from "react-redux";
import {
  onChangeSearchValue,
  onDeleteSearchValue,
} from "../../redux/slices/searchSlice";
import { useRef } from "react";
import debounce from "lodash.debounce";
import { useState, useCallback } from "react";

const Search: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(onChangeSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClearInput = () => {
    dispatch(onDeleteSearchValue());
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <img className={styles.serchIcon} src={searchIcon} alt="Лупа и Пупа" />
      <input
        ref={inputRef}
        value={value}
        className={styles.input}
        onChange={(e) => onChangeInput(e)}
        type="text"
        placeholder="Поиск"
      />
      {value && (
        <img
          onClick={onClearInput}
          className={styles.clearIcon}
          src={clearIcon}
          alt="Крестик"
        />
      )}
    </div>
  );
};

export default Search;
