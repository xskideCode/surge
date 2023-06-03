'use client';
import { useState } from "react";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const handlePageChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
      setInputPage(value);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <a
        className="flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200  border rounded-md gap-x-2 bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800 mr-2 sm:mr-0"
        onClick={handlePrevious}
      >
        <HiArrowNarrowLeft />
        <span>Previous</span>
      </a>

      <div className="flex items-center gap-x-3">
        {pages.length > 6 && !pages.includes(1) && (
          <a
            className="px-2 py-1 text-sm text-blue-500 rounded-md bg-gray-800"
            onClick={() => setCurrentPage(1)}
          >
            1
          </a>
        )}

        {pages.map((page, index) => {
          if (
            (index === 0 || index === pages.length - 1 || pages.length <= 6) ||
            (pages.length > 6 && (index === 1 || index === pages.length - 2))
          ) {
            return (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? "px-2 py-1 text-sm text-blue-500 rounded-md bg-gray-800"
                    : "px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300"
                }
              >
                {page}
              </button>
            );
          } else if (
            pages.length > 6 &&
            (index === 2 )
          ) {
            return (
              <input
                type="number"
                min="1"
                max={totalPages}
                value={inputPage}
                onChange={handlePageChange}
                className="px-2 py-1 text-sm text-center rounded-md bg-gray-700"
                style={{ width: "50px" }}
              />
            );
          }
          return null;
        })}

        {pages.length > 6 && !pages.includes(totalPages) && (
          <a
            className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300"
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </a>
        )}
      </div>

      <a
        className="flex items-center px-5 py-2 text-sm  capitalize transition-colors duration-200 border rounded-md gap-x-2 bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800 ml-2 sm:ml-0"
        onClick={handleNext}
      >
        <span>Next</span>
        <HiArrowNarrowRight />
      </a>
    </div>
  );
};

export default Pagination;
