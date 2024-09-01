import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import PaginationTable from "../components/tax/submitTaxReq/table/PaginationTable";
import { useAppSelector } from "../hooks/hook";

type PaginationType = {
  page: number;
  columns: any;
  sizePerPage: number;
  totalSize: number;
  totalPages: number;
  existDetail: boolean;
  setExpandedRow: (index: string) => void;
};

const TableTW: React.FC<any> = ({
  data = [],
  tableHeader,
  existDetail = false,
  columns,
  expandedRow,
  setExpandedRow,
}) => {
  const [paginationOption, setPaginationOption] = useState<any>({
    page: 1,
    sizePerPage: 10,
    totalSize: 10,
    totalPages: 1,
  });

  console.log(columns?.header);

  const toggleAccordion = (rowIndex: number) => {
    if (existDetail) {
      if (expandedRow === rowIndex) {
        setExpandedRow(null);
      } else {
        setExpandedRow(rowIndex);
      }
    }
  };
  const onPageChange = (data: any) => {
    setPaginationOption((prev: any) => ({
      ...prev,
      page: data || 1,
    }));
  };

  // const mapData = [...data].map((item: any, index: number) => ({
  const mapData: any = !!data.length ? data : [];
  return (
    <div className="tw-mt-4">
      <Table className="tw-mt-4 tw-w-full tw-table-fixed">
        <TableHeader className="tw-bg-danger">
          <TableRow className="">
            {columns?.map((item: any, index: number) => {
              console.log(item, index);
              return (
                <TableHead
                  className={`tw-w-[180px] tw-p-2  first:tw-w-[80px]  first:tw-rounded-r-xl   last:tw-rounded-l-xl`}
                >
                  {item?.header}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody style={{ verticalAlign: "center" }} className="text-center">
          {data?.length !== 0 ? (
            data?.map((item: any, index: number) => {
              return (
                <>
                  <TableRow
                    onClick={() => toggleAccordion(index)}
                    key={item.id}
                  >
                    {columns?.map((column: any, columnIndex: number) => (
                      <TableCell className="first:tw-rounded-r-xl last:tw-rounded-l-xl">
                        {/* {!!item?.title ? item?.title : item?.render()} */}
                        {column?.render
                          ? column?.render(
                              item,
                              (newValue: any, index: number) => {
                                const newData = [...data];
                                newData[index] = {
                                  ...newData[index],
                                  [column.accessor]: newValue,
                                };
                              },
                            )
                          : item[column?.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="fitTable" colSpan={10}>
                اطلاعاتی برای نمایش وجود ندارد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationTable
        currentPage={paginationOption.page}
        totalPages={paginationOption.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TableTW;
