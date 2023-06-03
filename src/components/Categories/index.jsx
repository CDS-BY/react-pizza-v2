import { useSelector, useDispatch } from "react-redux";
import { onToggleActiveCategory } from "./CategoriesSlice";

function Categories() {

  const {items, activeCategory} = useSelector(state => state.categories)
  const dispatch = useDispatch()

  return (
    <div className="categories">
      <ul>
        {items.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => dispatch(onToggleActiveCategory(i))}
            className={activeCategory === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
