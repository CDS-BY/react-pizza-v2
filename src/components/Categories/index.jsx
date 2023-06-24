import { useSelector, useDispatch } from "react-redux";
import { selectCategories, setActiveCategoryId } from "../../redux/slices/categoriesSlice";

function Categories() {
  const { items, activeCategoryId } = useSelector(selectCategories);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {items.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => dispatch(setActiveCategoryId(i))}
            className={activeCategoryId === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
