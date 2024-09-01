import { ReactNode } from "react";
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../common/ui/table";
import PaginationTable, { TableParamsType } from "./Pagination";
import { stringOfNumbers } from "src/utils/schemas/billsSchema";
import { Skeleton } from "src/common/Skeleton";
import DropDownComponent from "src/components/DropDown";
import Plus from "src/assets/icons/Plus";

interface ColumnsType<T> {
  render?: (item: T) => ReactNode;
  accessor?: string;
  header: string;
  type?: "Text" | "DropDown" | "Icon" | "Plus";
  count?: number;
}

interface TableProps<T> {
  data: T[];
  columns: ColumnsType<T>[];
  tableParams: TableParamsType;
  loading?: boolean;
  setTableParams: (params: TableParamsType) => void;
}

const Table = <T extends object>({
  data = [],
  columns,
  tableParams,
  setTableParams,
  loading,
}: TableProps<T>) => {
  return (
    <div className="tw-mt-3">
      <UiTable className="tw-mt-4 tw-w-full tw-table-auto">
        <TableHeader>
          <TableRow>
            {columns?.map((item: ColumnsType<T>, index: number) => {
              return (
                <TableHead
                  key={index}
                  className={`tw-w-auto  tw-text-nowrap tw-p-2 first:tw-rounded-r-xl last:tw-rounded-l-xl`}
                >
                  {item?.header}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody style={{ verticalAlign: "center" }} className="text-center">
          {data?.length !== 0 ? (
            data?.map((item, index) => {
              return (
                <TableRow key={index}>
                  {columns?.map(
                    ({ accessor, render, type, count }: ColumnsType<T>) => (
                      <TableCell className="first:tw-rounded-r-xl last:tw-rounded-l-xl">
                        {(() => {
                          if (!!render) {
                            return loading ? (
                              <div className="tw-flex tw-min-w-fit tw-items-center tw-justify-center tw-gap-2">
                                {count &&
                                  stringOfNumbers(count)?.map((num) =>
                                    type === "Icon" ? (
                                      <Skeleton
                                        className=" tw-h-5 tw-w-5 tw-rounded-full"
                                        key={num}
                                      />
                                    ) : (
                                      <Skeleton className="tw-h-4 tw-w-full" />
                                    ),
                                  )}
                                {type === "DropDown" && (
                                  <DropDownComponent
                                    data={[]}
                                    disabled={true}
                                  />
                                )}
                                {type === "Plus" && <Plus disabled={true} />}
                              </div>
                            ) : (
                              render(item)
                            );
                          } else {
                            return loading ? (
                              <Skeleton className="tw-h-4 tw-w-full" />
                            ) : (
                              item[accessor]
                            );
                          }
                        })()}
                      </TableCell>
                    ),
                  )}
                </TableRow>
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
      </UiTable>
      {tableParams.total > tableParams.pageSize && (
        <PaginationTable
          setTableParams={setTableParams}
          tableParams={tableParams}
        />
      )}
    </div>
  );
};

export { Table };
export type { TableParamsType, ColumnsType };
