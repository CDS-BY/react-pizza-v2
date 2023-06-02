import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import PizzaList from "../PizzaList";

function Pagination({ items }) {
  const itemsPerPage = 3;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    window.scrollTo(0,0)
    setItemOffset(newOffset);
  };
  return (
    <div>
      <PizzaList items={currentItems} />
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Pagination;
