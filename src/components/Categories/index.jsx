import { useSelector, useDispatch } from "react-redux";
import { setActiveCategoryId } from "../../redux/slices/categoriesSlice";

function Categories() {
  const { items, activeCategoryId } = useSelector((state) => state.categories);
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
