import { useCallback, FC, useMemo } from "react";
import {
  Pagination as UiPagination,
  PaginationContent,
  PaginationItem,
} from "../../common/ui/pagination";
import NextEnd from "src/assets/icons/NextEnd";
import StartPaginationIcon from "src/assets/icons/StartPaginationIcon";

export interface TableParamsType {
  current: number;
  pageSize: number;
  total: number;
}

type Props = {
  tableParams: TableParamsType;
  setTableParams: (params: TableParamsType) => void;
};

const Pagination: FC<Props> = ({ tableParams, setTableParams }) => {
  const totalPages = useMemo(() => {
    return Math.ceil((tableParams.total || 1) / (tableParams.pageSize || 20));
  }, [tableParams.total, tableParams.pageSize]);

  const getPageNumbers = useCallback(() => {
    const currentPage = tableParams.current;

    const maxPagesToShow =
      currentPage === 1 ||
      currentPage === Math.ceil(tableParams.total / tableParams.pageSize)
        ? 3
        : 5;
    const halfWindow = Math.floor(maxPagesToShow / 2);
    let endPage = Math.min(currentPage + halfWindow, totalPages);
    let startPage = Math.max(currentPage - halfWindow, 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
      } else {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }
    }

    let pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );

    if (startPage > 1) {
      if (startPage > 2) {
        pages.unshift(900000001);
      }
      pages.unshift(1);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(900000000);
      }
      pages.push(totalPages);
    }

    return pages;
  }, [tableParams.current, totalPages]);

  const pagesArray = useMemo(() => getPageNumbers(), [getPageNumbers]);

  return (
    <div className="mt-4">
      <UiPagination>
        <PaginationContent className="tw-flex tw-flex-wrap tw-justify-center tw-p-0">
          {tableParams.current > 1 && (
            <PaginationItem
              className={`${tableParams.current > 1 ? "" : "tw-bg-gray-100"}`}
              onClick={() => {
                if (tableParams.current > 1)
                  setTableParams({
                    ...tableParams,
                    current: tableParams.current - 1,
                  });
              }}
            >
              <StartPaginationIcon />
            </PaginationItem>
          )}

          {pagesArray.map((pageNumber, index) => (
            <>
              <PaginationItem
                key={pageNumber}
                className={`${
                  pageNumber === tableParams.current
                    ? "tw-border-primary tw-text-primary"
                    : ""
                }`}
                onClick={() => {
                  if (pageNumber !== tableParams.current) {
                    if (pageNumber === 900000000 || pageNumber === 900000001) {
                      setTableParams({
                        ...tableParams,
                        current:
                          pageNumber === 900000000
                            ? pagesArray[index - 1] + 1
                            : pagesArray[index + 1] - 1,
                      });
                    } else {
                      setTableParams({
                        ...tableParams,
                        current: pageNumber,
                      });
                    }
                  }
                }}
              >
                {pageNumber === 900000000 || pageNumber === 900000001
                  ? "..."
                  : pageNumber}
              </PaginationItem>
            </>
          ))}
          {tableParams.current === totalPages ||
            (pagesArray?.map(
              (pageNumber) => pageNumber === tableParams.current,
            ) && (
              <PaginationItem
                className={`${
                  tableParams.current < totalPages ? "" : "tw-bg-gray-100"
                }`}
                onClick={() => {
                  if (tableParams.current < totalPages) {
                    setTableParams({
                      ...tableParams,
                      current: tableParams.current + 1,
                    });
                  }
                }}
              >
                <span className="tw-py-6 tw-text-red" aria-label="Next">
                  <NextEnd color="gray" />
                </span>
              </PaginationItem>
            ))}
        </PaginationContent>
      </UiPagination>
    </div>
  );
};

export default Pagination;
