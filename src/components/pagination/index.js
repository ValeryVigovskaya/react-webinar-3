import React, { memo, useMemo } from 'react';
import './style.css';

const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start);
}
const usePaginationRange = ({
  pagesCount,
  currentPage,
  dots
}) => {
  const paginationRange = useMemo(() => {
    const leftIndex = Math.max(currentPage - 1, 1);
    const lastPageIndex = pagesCount;
    //сделала условие для правого идекса, если последняя страница будет совпадать с кликнутой, то продолжаться увеличение серединных индексов не должно
    const rightIndex = () => {
      if (currentPage < lastPageIndex) {
        return Math.min(
          currentPage + 1,
          3);
      } else if (currentPage === lastPageIndex){
        return Math.min(
          currentPage,
          2);
      }

    };
    const shouldShowLeftDots = leftIndex > 2;
    const shouldShowRightDots = rightIndex() <= pagesCount - 2;

    const firstPageIndex = 1;


    //отображение точек только справа
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 4;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, dots, pagesCount];
    }
    //отображение точек только слева
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3;
      let rightRange = range(
        pagesCount - rightItemCount + 1,
        pagesCount
      );

      return [firstPageIndex, dots, ...rightRange];
    }
    //отображение точек с обеих сторон
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftIndex, rightIndex());
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }
  }, [pagesCount, currentPage]);

  return paginationRange;
};

function PaginationItem({ page, currentPage, onPageChange }) {
  return (
    <>
      {page && <button onClick={() => onPageChange(page)} className={'list__item' + (currentPage === page ? ' list__item_active' : '')}>
        <span>{page}</span>
      </button>}
      {!page &&
        <div>
          <span className='dots'>...</span>
        </div>
      }
    </>
  )
}

function Pagination({ totalPages, currentPage, onPageChange, limit }) {
  // Создаем массив с числами страниц
  const pagesCount = Math.ceil(totalPages / limit);

  const paginationRange = usePaginationRange({
    pagesCount,
    currentPage,
  });
  return (
    <div className='list'>
      {paginationRange?.length && paginationRange?.map((page, index) => (
        <PaginationItem page={page} key={index} currentPage={currentPage} onPageChange={onPageChange} pagesCount={pagesCount} />
      ))}
    </div>
  );
};

export default memo(Pagination);