import { useState } from 'react';

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const maxPage = Math.ceil(data.length / rowsPerPage);

  function currentData() {
    if (rowsPerPage === 0) {
      return data;
    }

    const begin = currentPage * rowsPerPage;
    const end = begin + rowsPerPage;
    return data.slice(begin, end);
  }

  function jump(page) {
    const pageNumber = Math.max(0, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  function setRowCount(rowCount) {
    setRowsPerPage(rowCount);
    jump(0)
  }

  return {
    jump, currentData, setRowCount, currentPage, maxPage, rowsPerPage,
  };
}

export default usePagination;
