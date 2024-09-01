import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useTable, useSortBy, usePagination, ColumnInstance } from "react-table";

// interface TableItem {
//     reqSerial: string;
//     reqDate: string;
//     reqUser: string;
//     reqDep: string;
//     reqStatus: string;
//     reqOperation: string;
// }

// type CustomTableInstanceProps = {
//     canPreviousPage: boolean;
//     canNextPage: boolean;
//     pageOptions: number[];
//     gotoPage: (page: number) => void;
//     nextPage: () => void;
//     previousPage: () => void;
//     setPageSize: (pageSize: number) => void;
// };

// type CustomColumn = ColumnInstance<TableItem>;

// type TableInstance = CustomTableInstanceProps &
//     TableInstance<TableItem> & {
//         columns: CustomColumn[];
//     };

// type Column = {
//     Header: string;
//     accessor: keyof TableItem;
//     sortType?: "basic";
//     desc?: boolean
// };

// type Props = {
//     requests: any;
//     columns: Array<Column>;
//     data: any;
//     onSort: (props: any) => void;
//     fetchData: (props: any) => void;
//     loading: boolean;
//     pageCount: number;
// };

const ItemCommodify = ({
    requests,
    columns,
    data,
    onSort,
    fetchData,
    loading,
    pageCount: controlledPageCount,
}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, sortBy },
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            manualSortBy: true,
            autoResetPage: false,
            autoResetSortBy: false,
            pageCount: controlledPageCount,
        },
        useSortBy,
        usePagination
    );


    useEffect(() => {
        gotoPage(0);
    }, [requests]);

    useEffect(() => {
        fetchData({ pageIndex, pageSize, requests });
        onSort({ sortBy, pageIndex, pageSize, requests });
    }, [onSort, sortBy, fetchData, pageIndex, pageSize, requests]);
    return (
        <section >
            <Table bordered hover responsive size="sm" {...getTableProps()}>
                <thead >
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    className="col-1 bg-secondary text-white fw-normal"
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={i}>
                                {row.cells.map((cell, index) => {
                                    return <td key={index}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                    <tr>
                        {loading ? (
                            <td colSpan={10000}>Loading...</td>
                        ) : (
                            <td colSpan={10000}>
                                نمایش {page.length} از ~{controlledPageCount * pageSize} نتیجه
                            </td>
                        )}
                    </tr>
                </tbody>
            </Table>
            <Row>
                <Col lg="9" xl="8" className=" mx-auto">
                    <div className="row pagination justify-content-center align-items-center">
                        <div className="col-12 col-md-2">
                            <select
                                className="form-control py-1 px-2"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[10, 15, 20, 25, 30, 35, 40, 45, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        نمایش {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-4 d-flex align-items-center justify-content-around">
                            برو به صفحه:{" "}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(page);
                                }}
                                className="form-control w-50 py-1 px-2"
                            />{" "}
                        </div>
                        <div className="col-12 col-md-2">
                            صفحه{" "}
                            <strong>
                                {pageIndex + 1} از {pageOptions.length}
                            </strong>
                        </div>
                        <div className="d-flex col-12 col-md-4">
                            <Button
                                variant="outline-secondary"
                                className="me-2 py-0"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <i className="bi bi-chevron-double-right"></i>
                            </Button>{" "}
                            <Button
                                variant="outline-secondary"
                                className="me-2 py-0"
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <i className="bi bi-chevron-right"></i>
                            </Button>{" "}
                            <Button
                                variant="outline-secondary"
                                className="me-2 py-0"
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <i className="bi bi-chevron-left"></i>
                            </Button>{" "}
                            <Button
                                variant="outline-secondary"
                                className="me-2 py-0"
                                onClick={() => gotoPage(controlledPageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <i className="bi bi-chevron-double-left"></i>
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </section>
    );
};

export default ItemCommodify;