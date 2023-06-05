import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { setCurrentPage } from "./PagintionSlice";
import { useDispatch } from "react-redux"; 

function Pagination() {

  const dispatch = useDispatch()
  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  }
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
        // forcePage={currentPage - 1}
      />
    </div>
  );
}

export default Pagination;
