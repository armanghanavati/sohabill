// import React, { useEffect, useMemo } from "react";
// import { useTable, useSortBy, usePagination } from "react-table";
// import { Table } from "react-bootstrap";

// interface TableItem {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
// }

// const generateData = (rowCount: number): TableItem[] => {
//     const data: TableItem[] = [];

//     for (let i = 1; i <= rowCount; i++) {
//         data.push({
//             id: i,
//             name: `Person ${i}`,
//             age: Math.floor(Math.random() * 80) + 18,
//             email: `person${i}@example.com`,
//         });
//     }

//     return data;
// };

// const TestTable: React.FC = () => {
//     const data = useMemo(() => generateData(1000), []);
//     const columns = useMemo(
//         () => [
//             { Header: "ID", accessor: "id" },
//             { Header: "Name", accessor: "name" },
//             { Header: "Age", accessor: "age" },
//             { Header: "Email", accessor: "email" },
//         ],
//         []
//     );

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         page,
//         canPreviousPage,
//         canNextPage,
//         pageOptions,
//         gotoPage,
//         nextPage,
//         previousPage,
//         setPageSize,
//         state: { pageIndex, pageSize },
//     } = useTable<TableItem>(
//         {
//             columns,
//             data,
//             manualPagination: true,
//             autoResetPage: false,
//         },
//         useSortBy,
//         usePagination
//     );

//     useEffect(() => {
//         gotoPage(0);
//     }, [data, gotoPage]);

//     return (
//         <div>
//             <Table bordered hover responsive size="sm" {...getTableProps()}>
//                 <thead>
//                     {headerGroups.map((headerGroup) => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map((column) => (
//                                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                                     {column.render("Header")}
//                                     <span>
//                                         {column.isSorted
//                                             ? column.isSortedDesc
//                                                 ? " 🔽"
//                                                 : " 🔼"
//                                             : ""}
//                                     </span>
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {page.map((row) => {
//                         prepareRow(row);
//                         return (
//                             <tr {...row.getRowProps()} key={row.id}>
//                                 {row.cells.map((cell) => {
//                                     return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//                                 })}
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </Table>
//             <div>
//                 <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//                     Previous
//                 </button>{" "}
//                 <button onClick={() => nextPage()} disabled={!canNextPage}>
//                     Next
//                 </button>{" "}
//                 <span>
//                     Page{" "}
//                     <strong>
//                         {pageIndex + 1} of {pageOptions.length}
//                     </strong>{" "}
//                 </span>
//                 <span>
//                     | Go to page:{" "}
//                     <input
//                         type="number"
//                         defaultValue={pageIndex + 1}
//                         onChange={(e) => {
//                             const page = e.target.value ? Number(e.target.value) - 1 : 0;
//                             gotoPage(page);
//                         }}
//                         style={{ width: "50px" }}
//                     />
//                 </span>{" "}
//                 <select
//                     value={pageSize}
//                     onChange={(e) => {
//                         setPageSize(Number(e.target.value));
//                     }}
//                 >
//                     {[10, 20, 30, 40, 50].map((pageSize) => (
//                         <option key={pageSize} value={pageSize}>
//                             Show {pageSize}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//         </div>
//     );
// };

// export default TestTable;
import React from 'react'

const TestTable = () => {
    return (
        <div>TestTable</div>
    )
}

export default TestTable