import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import DataEditor, {
  DataEditorRef,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  Theme,
  useTheme,
} from "@glideapps/glide-data-grid";
import { ZodIssue, z } from "zod";
import { RsetShowToast } from "../../common/slices/mainSlice";
import { WorkSheet, utils } from "xlsx-js-style";
import { BillsType, billsIndexes } from "../../utils/schemas/billsSchema";
import { ItemsType, itemsIndexes } from "../../utils/schemas/itemsSchema";
import {
  PaymentsType,
  paymentsIndexes,
} from "../../utils/schemas/paymentsSchema";

type DataType = BillsType | ItemsType | PaymentsType;

interface ExcelSheetProps<T> {
  gridData: T[];
  indexes: typeof billsIndexes | typeof itemsIndexes | typeof paymentsIndexes;
  header: string[];
  schema: z.ZodEffects<z.AnyZodObject>;
  file?: File;
  sheet?: WorkSheet;
  gridErrors: (ZodIssue | undefined)[][];
  setGridErrors: React.Dispatch<
    React.SetStateAction<(ZodIssue | undefined)[][]>
  >;
  setGridData: any;
}

const ExcelSheetDataGrid = ({
  gridData,
  indexes,
  header,
  file,
  schema,
  sheet,
  gridErrors,
  setGridErrors,
  setGridData,
}: ExcelSheetProps<DataType>) => {
  const dispatch = useAppDispatch();
  const [tableCols, setTableCols] = useState<GridColumn[]>([]); // gdg column objects
  const [tableRows, setTableRows] = useState<number>(0); // number of rows

  const ref = useRef<DataEditorRef>(null); // gdg ref

  const theme = useTheme();
  const invalidTheme: Theme = {
    ...theme,
    bgCell: "#f77272",
  };

  const getTableContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = gridData[row];

      const dataErrors = gridErrors[row]?.filter(
        (err) => err?.path[0] === indexes[col]
      );

      const error = dataErrors?.find((err) => err?.path[0] === indexes[col]);

      const cellObj: GridCell = {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        //@ts-ignore
        displayData: String(dataRow[indexes[col]] ?? ""),
        themeOverride: !!error ? invalidTheme : theme,
        //@ts-ignore
        data: String(dataRow[indexes[col]]) ?? "",
      };

      return cellObj;
    },
    [gridErrors]
  );

  useEffect(() => {
    parseWorksheet();
  }, [file]);

  const parseWorksheet = () => {
    getBillColRows();

    validateBillsData();

    if (gridData.length > 0) {
      const cells = gridData
        .map((_, R) =>
          Array.from({ length: header.length }, (_, C) => ({
            cell: [C, R] as Item,
          }))
        )
        .flat();
      ref.current?.updateCells(cells);
    }
  };

  const getBillColRows = () => {
    if (!!!sheet) return;
    console.log(sheet);
    setGridData(
      //@ts-ignore
      utils.sheet_to_json<DataType>(sheet, { header: indexes }).slice(1)
    );

    const range = utils.decode_range(sheet["!ref"] ?? "A1");
    range.e.r = range.s.r;
    // billsHeader = utils.sheet_to_json<string[]>(sheet, { header: 1, range })[0];
    setTableCols(header.map((h) => ({ title: h, id: h } as GridColumn)));
    setTableRows(gridData.length);
  };

  const validateBillsData = () => {
    const thisSheetErrors = gridData.map((item, index) => {
      const result = schema.safeParse(item);

      if (!result.success) {
        return result.error.errors;

        // const dat = Object.keys(item).map((key) =>
        //   result.error.errors.find((err) => err.path[0] === key)
        // );

        // return dat;
      } else return [];
    });
    setGridErrors(thisSheetErrors);
  };

  return (
    <div>
      <DataEditor
        getCellContent={getTableContent}
        columns={tableCols}
        width={1000}
        height={500}
        rows={tableRows}
        // onCellEdited={onCellEdited}
        onCellClicked={(cell, e) => {
          e.preventDefault();
          const [col, row] = cell;
          const cellError = gridErrors[row].find(
            (err) => err?.path[0] === indexes[col]
          );

          if (cellError) {
            dispatch(
              RsetShowToast({
                show: true,
                title: cellError.message,
                bg: "success",
              })
            );
          }
        }}
        ref={ref}
      />
    </div>
  );
};

export default ExcelSheetDataGrid;
