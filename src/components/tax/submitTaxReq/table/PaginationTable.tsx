import NextEnd from "../../../../assets/icons/NextEnd";
import StartPaginationIcon from "../../../../assets/icons/StartPaginationIcon";
import { Button } from "../../../Button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationPrevious,
} from "../../../../common/ui/pagination";

type Props = {
  currentPage?: any;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const PaginationTable: React.FC<Props> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const getPageNumbersToShow = () => {
    const pagesToShow = [];
    const maxPageItems = 5; // Number of page items to show

    // Calculate the range of page numbers to show
    let startPage = Math.max(currentPage - Math.floor(maxPageItems / 2), 1);
    let endPage = Math.min(startPage + maxPageItems - 1, totalPages);

    // Adjust startPage if endPage is at the maximum limit
    if (endPage === totalPages) {
      startPage = Math.max(endPage - maxPageItems + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    return pagesToShow;
  };
  const pageNumbersToShow = getPageNumbersToShow();

  console.log(currentPage);

  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          {/* {currentPage > 2 && (
            <PaginationItem onClick={() => handlePageChange(1)}>
              ss
            </PaginationItem>
          )} */}
          {currentPage > 1 && (
            <PaginationItem onClick={() => handlePageChange(currentPage - 1)}>
              {/* <PaginationEllipsis /> */}
              <StartPaginationIcon />
            </PaginationItem>
          )}
          {pageNumbersToShow.map((pageNumber) => (
            <PaginationItem
              key={pageNumber}
              //   active={pageNumber === currentPage}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationItem>
          ))}
          {currentPage < totalPages && (
            <PaginationItem onClick={() => handlePageChange(currentPage + 1)}>
              <span className="tw-py-6 tw-text-red" aria-label="Next">
                <NextEnd color="gray" />
              </span>
            </PaginationItem>
          )}
          {/* {currentPage < totalPages - 1 && (
            <PaginationItem onClick={() => handlePageChange(totalPages)}>
              End
            </PaginationItem>
          )} */}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
{
  /* 
  
    
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination> */
}
export default PaginationTable;
