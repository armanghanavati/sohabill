// import { Row, Col, Container, Button, Form } from "react-bootstrap";

// import Btn from "../../common/Btn";

// import {
//   DataEditor,
//   DataEditorRef,
//   GridCell,
//   GridCellKind,
//   GridColumn,
//   Item,
//   Theme,
//   useTheme,
// } from "@glideapps/glide-data-grid";
// import "@glideapps/glide-data-grid/dist/index.css";

// import {
//   billsRowSchema,
//   // billsHeader,
//   billsIndexes,
//   type BillsType,
// } from "../../utils/billsSchema";

// import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
// import { ZodIssue } from "zod";
// import {
//   WorkBook,
//   WorkSheet,
//   read,
//   utils,
//   writeFile,
//   writeFileXLSX,
// } from "xlsx-js-style";
// import { useAppDispatch } from "../../hooks/hook";
// import { RsetShowToast } from "../../common/slices/mainSlice";
// import { useDropzone } from "react-dropzone";
// import MainTitle from "../../common/MainTitle";
// import { ItemsType, itemsHeader, itemsIndexes } from "../../utils/itemsSchema";
// import {
//   PaymentsType,
//   paymentsHeader,
//   paymentsIndexes,
// } from "../../utils/paymentsSchema";
// import ExcelSheetDataGrid from "../../components/dataGrid/excel-sheet-data-grid";

// // let billsData: BillsType[] = [];
// let itemsData: ItemsType[] = [];
// let paymentsData: PaymentsType[] = [];

// const BatchEntryPage = () => {
//   const [file, setFile] = useState<File>();
//   const [billsData, setBillsData] = useState<BillsType[]>([]);
//   const dispatch = useAppDispatch();
//   const [billsCols, setBillsCols] = useState<GridColumn[]>([]); // gdg column objects
//   const [billsRows, setBillsRows] = useState<number>(0); // number of rows
//   const [billsErrors, setBillsErrors] = useState<(ZodIssue | undefined)[][]>(
//     []
//   );
//   const [itemsErrors, setItemsErrors] = useState<(ZodIssue | undefined)[][]>(
//     []
//   );
//   const [paymentsErrors, setPaymentsErrors] = useState<
//     (ZodIssue | undefined)[][]
//   >([]);
//   const [billsSheet, setBillsSheet] = useState<WorkSheet>();
//   const [itemsSheet, setItemsSheet] = useState<WorkSheet>();
//   const [paymentsSheet, setPaymentsSheet] = useState<WorkSheet>();

//   const ref = useRef<DataEditorRef>(null); // gdg ref

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     // setFiles(acceptedFiles.map(file => Object.assign(file, {
//     //   preview: URL.createObjectURL(file)
//     // })));
//     parse_wb(read(await acceptedFiles[0].arrayBuffer()));
//     setFile(acceptedFiles[0]);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const parse_wb = (wb: WorkBook) => {
//     setBillsSheet(wb.Sheets[wb.SheetNames[0]]);
//     setItemsSheet(wb.Sheets[wb.SheetNames[1]]);
//     setPaymentsSheet(wb.Sheets[wb.SheetNames[2]]);

//     // getBillColRows(billsSheet);

//     // validateBillsData();

//     // if (billsData.length > 0) {
//     //   const cells = billsData
//     //     .map((_, R) =>
//     // Array.from({ length: billsHeader.length }, (_, C) => ({
//     //         cell: [C, R] as Item,
//     //       }))
//     //     )
//     //     .flat();
//     //   ref.current?.updateCells(cells);
//     // }
//   };

//   const handleChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target?.files) return;
//     parse_wb(read(await e.target.files[0].arrayBuffer()));
//   }, []);

//   function generateAlphabets(n: number) {
//     const alphabets = [];
//     for (let i = 0; i < n; i++) {
//       let alphabet = "";
//       let num = i;

//       while (num >= 0) {
//         alphabet = String.fromCharCode((num % 26) + 65) + alphabet;
//         num = Math.floor(num / 26) - 1;
//       }

//       alphabets.push(alphabet);
//     }

//     return alphabets;
//   }

//   function generateErrorMap(
//     errors: (ZodIssue | undefined)[][],
//     header: string[],
//     indexes: string[]
//   ) {
//     const columnMap = generateAlphabets(header.length);

//     /*
//      * برای به دست آوردن مپ ارورهای قابل استفاده در xlsx
//      */
//     const errorList = errors
//       .map((row, rowIndex) => {
//         const rowErrorMap = indexes.map((idx, columnIndex) => {
//           const cellName = columnMap[columnIndex] + (rowIndex + 2);
//           const foundError = row.find((item) => item?.path[0] === idx);
//           if (!!foundError) {
//             return [cellName, foundError.message];
//           }
//           return [cellName, ""];
//         });
//         return rowErrorMap;
//       })
//       .flat()
//       .filter((item) => item[1] !== "");

//     return Object.fromEntries(errorList);
//   }

//   const exportXLSX = useCallback(() => {
//     // const billsErrorMap = generateErrorMap(
//     //   billsErrors,
//     //   // billsHeader,
//     //   billsIndexes
//     // );
//     const itemsErrorMap = generateErrorMap(
//       itemsErrors,
//       itemsHeader,
//       itemsIndexes
//     );
//     const paymentsErrorMap = generateErrorMap(
//       paymentsErrors,
//       paymentsHeader,
//       paymentsIndexes
//     );

//     const arrayOfbillsData = billsData.map((row) =>
//       billsIndexes.map((index) => row[index])
//     );

//     const arrayOfItemsData = itemsData.map((row) =>
//       itemsIndexes.map((index) => row[index])
//     );

//     const arrayOfPaymentsData = paymentsData.map((row) =>
//       paymentsIndexes.map((index) => row[index])
//     );

//     // generate worksheets using data with the order specified in the columns array
//     const billsWorksheet = utils.aoa_to_sheet([
//       billsIndexes,
//       ...arrayOfbillsData,
//     ]);

//     const itemsWorksheet = utils.aoa_to_sheet([
//       itemsIndexes,
//       ...arrayOfItemsData,
//     ]);

//     const paymetsWorksheet = utils.aoa_to_sheet([
//       paymentsIndexes,
//       ...arrayOfPaymentsData,
//     ]);

//     billsWorksheet["!cols"] = [
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//       { wch: 20 },
//     ];

//     for (const row in billsWorksheet) {
//       // if (billsWorksheet[row] && billsWorksheet[row].v && billsErrorMap[row]) {
//         billsWorksheet[row].s = {
//           fill: { fgColor: { rgb: "FFCC00" }, bgColor: { rgb: "FF0000" } },
//         };
//         if (!billsWorksheet[row].c) billsWorksheet[row].c = [];
//         billsWorksheet[row].c.hidden = true;
//         // billsWorksheet[row].c.push({ t: billsErrorMap[row] });
//       }
//     }

//     // rewrite header row with titles
//     utils.sheet_add_aoa(
//       billsWorksheet,
//       [billsCols.map((c) => c.title ?? c.id)],
//       {
//         origin: "A1",
//       }
//     );

//     // create workbook
//     const wb = utils.book_new();
//     utils.book_append_sheet(wb, billsWorksheet, "صورتحساب");

//     // download file
//     writeFile(wb, "Invoice_PatternId_1.xlsx", { cellStyles: true });
//   }, [billsCols]);

//   console.log(
//     "🚀 ~ file: BatchEntryPage.tsx:302 ~ BatchEntryPage ~ billsData:",
//     billsData
//   );
//   return (
//     <>
//       {/* <div className="d-flex flex-column gap-2 rounded-4 shadow-lg p-4 h-100 mt-4 me-sm-0"> */}
//       {/* <Row className="d-flex flex-md-row flex-column align-items-center justify-content-md-between justify-content-center" > */}
//       <MainTitle label="وارد کردن دسته‌ای صورتحساب" />
//       {/* <Col className="w-auto"> */}
//       {/* <p></p> */}
//       {/* </Col> */}
//       {/* <hr className="" /> */}
//       {/* </Row > */}
//       <Container className="mt-4">
//         <Row className=" d-flex justify-content-center">
//           <Col xl="12" className="">
//             <a href="/Example.xlsx" download="Example">
//               <button className="signUpBtn rounded-3">دانلود فایل نمونه</button>
//             </a>
//           </Col>
//           {!!file && (
//             <Col xl="12">
//               <Row className="d-flex flex-row align-items-center">
//                 <Col md={4} className="w-auto">
//                   <p className="m-0">
//                     نام فایل: <span className="text-info">{file.name}</span>
//                   </p>
//                 </Col>

//                 <Col>
//                   <Form.Group
//                     controlId="formFile"
//                     className="d-flex h-auto flex-row align-items-center"
//                   >
//                     <Form.Label className="w-auto m-0">
//                       آپلود فایل جدید
//                     </Form.Label>
//                     <Form.Control
//                       className="h-100 w-auto"
//                       onChange={handleChange}
//                       type="file"
//                     />
//                   </Form.Group>
//                   {/* <label htmlFor="file"></label>
//               <input type="file" id="file" onChange={handleChange} /> */}
//                 </Col>
//                 {billsErrors.length > 0 && (
//                   <Col className="w-auto" md={4}>
//                     <Button variant="outline-info" onClick={exportXLSX}>
//                       دانلود فایل به همراه خطاها
//                     </Button>
//                   </Col>
//                 )}
//               </Row>
//             </Col>
//           )}
//           <Col xs="11" md="11" xl="11" className="justify-content-center my-4 ">
//             {billsData.length > 0 ? (
//               <Row className="">
//                 {/* <ExcelSheetDataGrid
//                   gridData={billsData}
//                   setGridData={setBillsData}
//                   gridErrors={billsErrors}
//                   // header={billsHeader}
//                   indexes={billsIndexes}
//                   schema={billsRowSchema}
//                   setGridErrors={setBillsErrors}
//                   sheet={billsSheet}
//                 /> */}
//                 {/* <DataEditor
//                   getCellContent={getUserContent}
//                   columns={billsCols}
//                   width={1000}
//                   height={500}
//                   rows={billsRows}
//                   // onCellEdited={onCellEdited}
//                   onCellClicked={(cell, e) => {
//                     e.preventDefault();
//                     const [col, row] = cell;
//                     const cellError = billsErrors[row].find(
//                       (err) => err?.path[0] === billsIndexes[col]
//                     );

//                     if (cellError) {
//                       dispatch(
//                         RsetShowToast({
//                           show: true,
//                           title: cellError.message,
//                           bg: "success",
//                         })
//                       );
//                     }
//                   }}
//                   ref={ref}
//                 /> */}
//               </Row>
//             ) : (
//               <Row className="justify-content-center">
//                 <div
//                   {...getRootProps({
//                     role: "button",
//                     className: `${
//                       isDragActive
//                         ? "bg-secondary text-light"
//                         : "bg-secondary-subtle text-light-emphasis"
//                     } rounded-4 p-3 border border-secondary text-center w-100 d-flex flex-column justify-content-center align-items-center`,
//                   })}
//                 >
//                   <i className="fs-1 bi bi-upload"></i>
//                   <input {...getInputProps({ onChange: handleChange })} />
//                   <p className="sm-fs-6">
//                     فایل خود را اینجا بکشید، یا کلیک کنید
//                   </p>
//                 </div>
//               </Row>
//             )}
//           </Col>
//           <div id="portal"></div>
//         </Row>
//       </Container>
//     </>
//   );
// };

export default {};
