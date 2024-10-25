import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationItems = Array.from({ length: totalPages }, (_, index) => index + 1).map(
    (number) => (
      <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
        <a
          href="javascript:void(0)"
          className="page-link"
          onClick={() => onPageChange(number)}
        >
          {number}
        </a>
      </li>
    )
  );

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            href="javascript:void(0)"
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>

        {/* Page Numbers */}
        {paginationItems}

        {/* Next button */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <a
            href="javascript:void(0)"
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
