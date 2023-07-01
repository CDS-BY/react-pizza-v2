import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { setCurrentPage } from "../../redux/slices/pagintionSlice";
import { useDispatch } from "react-redux";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
