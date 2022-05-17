import { useState } from 'react';

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    if (itemsPerPage === 0) {
      return data;
    }

    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((newPage) => Math.min(newPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((newPage) => Math.max(newPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return {
    next, prev, jump, currentData, currentPage, maxPage,
  };
}

export default usePagination;
