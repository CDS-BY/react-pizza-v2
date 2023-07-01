import { useSelector, useDispatch } from "react-redux";
import {
  selectCategories,
  setActiveCategoryId,
} from "../../redux/slices/categoriesSlice";

const Categories: React.FC = () => {
  const { items, activeCategoryId } = useSelector(selectCategories);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {items.map((categoryName: string, i: number) => (
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
};

export default Categories;
