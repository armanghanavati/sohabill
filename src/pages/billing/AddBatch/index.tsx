import { TabsContent } from "@radix-ui/react-tabs";
import {
  DataEditor,
  DataEditorRef,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  Theme,
  useTheme,
} from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import {
  billsIndexes,
  type BillsType,
  patternTypes,
  billsBaseSchema,
  BillsSchemaKeys,
} from "../../../utils/schemas/billsSchema";
import {
  ItemsSchemaKeys,
  ItemsType,
  itemsBaseSchema,
  itemsIndexes,
  itemsRowSchema,
} from "../../../utils/schemas/itemsSchema";
import {
  PaymentsType,
  paymentsIndexes,
  paymentsRowSchema,
} from "../../../utils/schemas/paymentsSchema";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ZodIssue, z } from "zod";
import { WorkBook, WorkSheet, read, utils, writeFile } from "xlsx-js-style";
import { useAppDispatch } from "../../../hooks/hook";
import {
  RsetMessageModal,
  RsetShowToast,
} from "../../../common/slices/mainSlice";
import { useDropzone } from "react-dropzone";
import {
  batchInsert,
  downloadFile,
  getPatternTypeList,
} from "../../../services/masterServices";
import { AxiosResponse } from "axios";
import { BaseResponseType } from "./types";
import Select from "react-select";
import { SelectOption } from "../../../models/AllData.model";
import {
  typeOneBillsSchema,
  typeOneBillsIndexes,
  // typeOneBuyerIndexes,
} from "../../../utils/schemas/type-one-schema/type-one-bills-schema";
import {
  typeTwoBillsIndexes,
  typeTwoBillsSchema,
  // typeTwoBuyerIndexes,
} from "../../../utils/schemas/type-two-schema/type-two-bills-schema";
import Loading from "../../../common/Loading";
import Group3 from "../../../assets/icons/Group3";
import { Button } from "../../../components/Button";
import PaperDownload from "../../../assets/icons/PaperDownload";
import { useMediaQuery } from "react-responsive";
import DownlaodIcon from "../../../assets/icons/DownlaodIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import ErrorIcon from "../../../assets/icons/ErrorIcon";
import { Tabs, TabsList, TabsTrigger } from "../../../common/ui/tabs";
import {
  GoldItemsSchemaKeys,
  GoldItemsType,
  goldItemsBaseSchema,
  goldItemsIndexes,
} from "src/utils/schemas/gold-items-schema/gold-items-schema";
import Paper from "src/assets/icons/Paper.svg";
import { useNavigate } from "react-router-dom";
import {
  exportItemsBaseSchema,
  exportItemsIndexes,
} from "src/utils/schemas/export-schema/export-items-schema";
import {
  exportBillsIndexes,
  exportBillsSchema,
} from "src/utils/schemas/export-schema/export-bills-schema";
import {
  AllItemsSchemaKeys,
  AllItmesType,
} from "src/utils/schemas/allItemsSchema";

let billsData: BillsType[] = [];
let itemsData: AllItmesType[] = [];
let paymentsData: PaymentsType[] = [];

let billsHeader: string[];
let itemsHeader: string[];
let paymentsHeader: string[];

type ErrorListType = {
  sheetsNumber?: string;
  billsSheet?: string;
  itemsSheet?: string;
  paymentsSheet?: string;
  billsData?: string;
  itemsData?: string;
  paymentsData?: string;
  invalidFileType?: string;
};

const BatchEntryPage = ({ billInitializeData }: any) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const currencyList = billInitializeData?.currencies?.map(
    (cur: SelectOption) => cur?.id,
  );
  const unitTypes: { id: number; title: string }[] =
    billInitializeData?.unitTypes;
  const unitTypeList = unitTypes?.map((type) => String(type.id));
  const [loading, setLoading] = useState(false);
  const [patternTypeList, setPatternTypeList] = useState<SelectOption[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<SelectOption | null>(
    null,
  );

  const [selectedTab, setSelectedTab] = useState<String>("aBill");
  const [mainErrors, setMainErrors] = useState<ErrorListType>({});

  const [file, setFile] = useState<File>();
  const dispatch = useAppDispatch();

  const [billsCols, setBillsCols] = useState<GridColumn[]>([]); // gdg column objects
  const [billsRows, setBillsRows] = useState<number>(0); // number of rows
  const [billsErrors, setBillsErrors] = useState<(ZodIssue | undefined)[][]>(
    [],
  );
  const [selectedPatternBillsIndexes, setSelectedPatternBillsIndexes] =
    useState<BillsSchemaKeys>(billsIndexes);

  const [selectedItemsIndexes, setSelectedItemsIndexes] =
    useState<AllItemsSchemaKeys>(itemsIndexes);

  const [itemsCols, setItemsCols] = useState<GridColumn[]>([]);
  const [itemsRows, setItemsRows] = useState<number>(0);
  const [itemsErrors, setItemsErrors] = useState<(ZodIssue | undefined)[][]>(
    [],
  );

  const [paymentsCols, setPaymentsCols] = useState<GridColumn[]>([]);
  const [paymentsRows, setPaymentsRows] = useState<number>(0);
  const [paymentsErrors, setPaymentsErrors] = useState<
    (ZodIssue | undefined)[][]
  >([]);
  const [excelBase64, setExcelBase64] = useState("");
  const billsRef = useRef<DataEditorRef>(null); // gdg ref
  const itemsRef = useRef<DataEditorRef>(null);
  const paymentsRef = useRef<DataEditorRef>(null);
  const selectedPatternRef = useRef<SelectOption | null>(null);
  const selectedPatternBillsIndexesRef = useRef<BillsSchemaKeys>(
    selectedPatternBillsIndexes,
  );
  const selectedItemsIndexesRef =
    useRef<AllItemsSchemaKeys>(selectedItemsIndexes);

  selectedPatternRef.current = selectedPattern;
  selectedPatternBillsIndexesRef.current = selectedPatternBillsIndexes;

  selectedItemsIndexesRef.current = selectedItemsIndexes;

  useEffect(() => {
    getComboboxOptions();
    resetAllData();
  }, []);

  const onChange = (selectedOption: SelectOption | null) => {
    resetAllData();
    switch (selectedOption?.id) {
      case "1":
        setSelectedPatternBillsIndexes(typeOneBillsIndexes);
        setSelectedItemsIndexes(itemsIndexes);
        break;
      case "3":
        setSelectedPatternBillsIndexes(typeOneBillsIndexes);
        setSelectedItemsIndexes(goldItemsIndexes);
        break;
      case "8":
        setSelectedPatternBillsIndexes(typeTwoBillsIndexes);
        setSelectedItemsIndexes(itemsIndexes);
        break;
      case "10":
        setSelectedPatternBillsIndexes(typeTwoBillsIndexes);
        setSelectedItemsIndexes(goldItemsIndexes);
        break;
      case "14":
        setSelectedPatternBillsIndexes(exportBillsIndexes);
        setSelectedItemsIndexes(exportItemsIndexes);
        break;
      default:
        setSelectedPatternBillsIndexes(billsIndexes);
        setSelectedItemsIndexes(itemsIndexes);
    }
    setSelectedPattern(selectedOption);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    if (acceptedFiles[0].name.split(".")[1] !== "xlsx") {
      setMainErrors((prevErrors) => ({
        ...prevErrors,
        invalidFileType: "فرمت فایل ارسالی باید xlsx باشد",
      }));
      return;
    }

    parse_wb(read(await acceptedFiles[0].arrayBuffer()));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const theme = useTheme();
  const invalidTheme: Theme = {
    ...theme,
    bgCell: "#f77272",
  };
  const getBillsContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = billsData[row];

      const dataErrors = billsErrors[row]?.filter(
        (err) => err?.path[0] === selectedPatternBillsIndexesRef.current[col],
      );

      const error = dataErrors?.find(
        (err) => err?.path[0] === selectedPatternBillsIndexesRef.current[col],
      );

      const cellObj: GridCell = {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        displayData: String(
          dataRow[selectedPatternBillsIndexesRef.current[col]] ?? "",
        ),
        themeOverride: !!error ? invalidTheme : theme,
        data:
          String(dataRow[selectedPatternBillsIndexesRef.current[col]]) ?? "",
      };

      return cellObj;
    },
    [billsErrors, file],
  );

  const getItemsContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = itemsData[row];

      const dataErrors = itemsErrors[row]?.filter(
        (err) => err?.path[0] === selectedItemsIndexesRef.current[col],
      );

      const error = dataErrors?.find(
        (err) => err?.path[0] === selectedItemsIndexesRef.current[col],
      );

      const cellObj: GridCell = {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        displayData: String(
          dataRow[selectedItemsIndexesRef.current[col]] ?? "",
        ),
        themeOverride: !!error ? invalidTheme : theme,
        data: String(dataRow[selectedItemsIndexesRef.current[col]]) ?? "",
      };

      return cellObj;
    },
    [itemsErrors, file],
  );

  const billListTabs = [
    {
      value: "aBill",
      title: "صورت حساب",
    },
    {
      value: "aBillItems",
      title: "اقلام صورت حساب",
    },
    {
      value: "aBillPayments",
      title: "پرداخت‌های صورتحساب",
    },
  ];

  const getPaymentsContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = paymentsData[row];

      const dataErrors = paymentsErrors[row]?.filter(
        (err) => err?.path[0] === paymentsIndexes[col],
      );

      const error = dataErrors?.find(
        (err) => err?.path[0] === paymentsIndexes[col],
      );

      const cellObj: GridCell = {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        displayData: String(dataRow[paymentsIndexes[col]] ?? ""),
        themeOverride: !!error ? invalidTheme : theme,
        data: String(dataRow[paymentsIndexes[col]]) ?? "",
      };

      return cellObj;
    },
    [paymentsErrors, billsErrors, itemsErrors, file],
  );

  function setEmptyStringsToUndefined(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === "") {
        obj[key] = undefined;
      }
    }
    return obj;
  }

  const getColRows = (sheets: WorkSheet[]) => {
    billsData = utils
      .sheet_to_json<BillsType>(sheets[0], {
        header: selectedPatternBillsIndexesRef.current,
      })
      .slice(1);
    billsData = billsData.map((row) => setEmptyStringsToUndefined(row));

    itemsData = utils
      .sheet_to_json<AllItmesType>(sheets[1], {
        header: selectedItemsIndexesRef.current,
      })
      .slice(1);
    itemsData = itemsData.map((row) => setEmptyStringsToUndefined(row));
    if (selectedPatternRef.current?.id !== "14") {
      paymentsData = utils
        .sheet_to_json<PaymentsType>(sheets[2], { header: paymentsIndexes })
        .slice(1);
      paymentsData = paymentsData.map((row) => setEmptyStringsToUndefined(row));
    }
    if (billsData.length <= 0) {
      return { billsData: "هیچ دیتایی در شیت صورت حساب وجود ندارد" };
    }
    if (itemsData.length <= 0) {
      return { itemsData: "هیچ دیتایی در شیت صورت حساب وجود ندارد" };
    }
    const billsRange = utils.decode_range(sheets[0]["!ref"] ?? "A1");
    billsRange.e.r = billsRange.s.r;
    billsHeader = utils
      .sheet_to_json<string[]>(sheets[0], {
        header: 1,
        range: billsRange,
      })[0]
      ?.filter((item) => item !== "");
    if (selectedPatternRef.current?.id === "14" && billsHeader.length !== 15) {
      return {
        billsSheet:
          "تعداد ستون های شیت صورت حساب در الگوی صادرات باید 15 عدد باشد",
      };
    }
    if (selectedPatternRef.current?.id === "1" && billsHeader.length !== 18) {
      return {
        billsSheet:
          "تعداد ستون های شیت صورت حساب در الگوی فروش نوع 1 باید 18 عدد باشد",
      };
    } else if (
      selectedPatternRef.current?.id === "8" &&
      billsHeader.length !== 12
    ) {
      return {
        billsSheet:
          "تعداد ستون های شیت صورت حساب در الگوی فروش نوع 2 باید 12 عدد باشد",
      };
    }

    const itemsRange = utils.decode_range(sheets[1]["!ref"] ?? "A1");
    itemsRange.e.r = itemsRange.s.r;
    itemsHeader = utils.sheet_to_json<string[]>(sheets[1], {
      header: 1,
      range: itemsRange,
    })[0];
    if (selectedItemsIndexesRef.current.length !== itemsHeader.length) {
      return {
        itemsSheet:
          "تعداد ستون های شیت اقلام صورت حساب باید " +
          selectedItemsIndexesRef.current.length +
          " عدد باشد",
      };
    }

    if (selectedPatternRef.current?.id !== "14") {
      const paymentsRange = utils.decode_range(sheets[2]["!ref"] ?? "A1");
      paymentsRange.e.r = paymentsRange.s.r;
      paymentsHeader = utils.sheet_to_json<string[]>(sheets[2], {
        header: 1,
        range: paymentsRange,
      })[0];

      if (paymentsHeader.length !== 7) {
        return {
          paymentsSheet:
            "تعداد ستون های شیت پرداخت های صورت حساب باید 7 عدد باشد",
        };
      }
    }

    setBillsCols(
      billsHeader.map(
        (h) =>
          ({
            title: h,
            id: h,
            width: Math.min(h.length * 10, 300),
          }) as GridColumn,
      ),
    );
    setBillsRows(billsData.length);
    setItemsCols(
      itemsHeader.map(
        (h) =>
          ({
            title: h,
            id: h,
            width: Math.min(h.length * 10, 300),
          }) as GridColumn,
      ),
    );
    setItemsRows(itemsData.length);
    if (selectedPatternRef.current?.id !== "14") {
      setPaymentsCols(
        paymentsHeader.map(
          (h) =>
            ({
              title: h,
              id: h,
              width: Math.min(h.length * 10, 300),
            }) as GridColumn,
        ),
      );
      setPaymentsRows(paymentsData.length);
    }
  };

  //*/ اسکیما مربوط به الگوی انتخاب شده
  const selectedPatternSchema = () => {
    switch (selectedPatternRef.current?.id) {
      case "1":
        return typeOneBillsSchema;
      case "3":
        return typeOneBillsSchema;
      case "8":
        return typeTwoBillsSchema;
      case "10":
        return typeTwoBillsSchema;
      case "14":
        return exportBillsSchema;
      default:
        return billsBaseSchema;
    }
  };

  const selectedPatternItemsSchema = () => {
    switch (selectedPatternRef.current?.id) {
      case "1":
        return itemsBaseSchema;
      case "3":
        return goldItemsBaseSchema;
      case "8":
        return itemsBaseSchema;
      case "10":
        return goldItemsBaseSchema;
      case "14":
        return exportItemsBaseSchema;
      default:
        return itemsBaseSchema;
    }
  };

  const validateData = () => {
    const billsSheetErrors = billsData.map((item, index) => {
      const result = selectedPatternSchema()
        .superRefine((val, ctx) => {
          const serialFound = itemsData.find((obj) => {
            return String(obj.Serial) === String(val.Serial);
          });

          if (!serialFound) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "کالایی با این شماره سریال در شیت اقلام وجود ندارد",
              path: ["Serial"],
            });
            return;
          }

          let sumOfValueIncreasedTax = 0;
          const filteredItems = itemsData?.filter(
            (item) =>
              val.Serial === item.Serial && val.IssueDate === item.IssueDate,
          );
          filteredItems.forEach((item) => {
            sumOfValueIncreasedTax +=
              ((Number(item.Count) * Number(item.UnitPrice) -
                Number(item.Discount)) *
                Number(item.ValueIncreasedTaxRate)) /
              100;
          });

          if (
            !!val.Article17TaxPrice &&
            Number(val.Article17TaxPrice) > sumOfValueIncreasedTax
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "موضوع ماده 17 کوچک تر یا مساوی مجموع ارزش افزوده صورتحساب باشد",
              path: ["Article17TaxPrice"],
            });
          }

          if (val.SettlementType === "3") {
            let sumOfPricesMinusDiscount = 0;
            filteredItems.forEach((item) => {
              sumOfPricesMinusDiscount +=
                Number(item.Count) * Number(item.UnitPrice) -
                Number(item.Discount);
            });

            if (
              !!val.CashPrice &&
              Number(val.CashPrice) >= sumOfPricesMinusDiscount
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                  "اگر روش تسویه 3 بود مبلغ نقدی از مجموع مبلغ پس از کسر تخفیف کوچکتر باشد",
                path: ["CashPrice"],
              });
            }
          }
        })
        .safeParse(item);
      if (!result.success) {
        return result.error.errors;
      } else return [];
    });
    setBillsErrors(billsSheetErrors);
    const itemsSheetErrors = itemsData.map((item, index) => {
      const result = selectedPatternItemsSchema()
        .superRefine((val, ctx) => {
          const serialFound = billsData.find((obj) => {
            return String(obj.Serial) === String(val.Serial);
          });
          const issueDateFound = serialFound?.IssueDate === val.IssueDate;
          if (!serialFound) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "صورت حسابی با این شماره سریال در شیت صورت حساب وجود ندارد",
              path: ["Serial"],
            });
          }
          if (!issueDateFound) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "تاریخ این قلم کالا با تاریخ ثبت شده با این شماره صورت حساب در شیت اول برابر نیست",
              path: ["IssueDate"],
            });
          }
          if (!currencyList.includes(val.CurrencyCode.toUpperCase().trim())) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "نوع ارز در لیست اعلامی وجود داشته باشد",
              path: ["CurrencyCode"],
            });
          }
          if (!unitTypeList.includes(val.MeasurementUnitCode)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "واحد اندازه گیری در لیست اعلامی باشد",
              path: ["MeasurementUnitCode"],
            });
          }
          if (val.CurrencyCode.toUpperCase() === "IRR") {
            if (!val.EquivalentWithRial) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "این فیلد برای ارز ریال اجباری است",
                path: ["EquivalentWithRial"],
              });
            }
          }
        })
        .safeParse(item);

      if (!result.success) {
        return result.error.errors;
      } else return [];
    });

    setItemsErrors(itemsSheetErrors);

    const paymentsSheetErrors = paymentsData.map((item, index) => {
      const result = paymentsRowSchema
        .superRefine((val, ctx) => {
          const serialFound = billsData.find((obj) => {
            return String(obj.Serial) === String(val.Serial);
          });
          const issueDateFound = serialFound?.IssueDate === val.IssueDate;
          if (!serialFound) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "صورت حسابی با این شماره سریال در شیت صورت حساب وجود ندارد",
              path: ["Serial"],
            });
            return;
          }
          if (!issueDateFound) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "تاریخ این پرداخت با تاریخ ثبت شده با این شماره صورت حساب در شیت اول برابر نیست",
              path: ["IssueDate"],
            });
          }
        })
        .safeParse(item);

      if (!result.success) {
        return result.error.errors;
      } else return [];
    });
    setPaymentsErrors(paymentsSheetErrors);
  };

  const parse_wb = (wb: WorkBook) => {
    let errorObject: ErrorListType = {};
    if (selectedPatternRef.current?.id === "14") {
      if (wb.SheetNames.length !== 2) {
        errorObject.sheetsNumber = "تعداد شیت ها باید 2 عدد باشد";
        setMainErrors((prevErrors) => ({
          ...prevErrors,
          sheetsNumber: "تعداد شیت ها باید 2 عدد باشد",
        }));
      }
    } else {
      if (wb.SheetNames.length !== 3) {
        errorObject.sheetsNumber = "تعداد شیت ها باید 3 عدد باشد";
        setMainErrors((prevErrors) => ({
          ...prevErrors,
          sheetsNumber: "تعداد شیت ها باید 3 عدد باشد",
        }));
      }
    }

    const allSheets = [
      wb.Sheets[wb.SheetNames[0]],
      wb.Sheets[wb.SheetNames[1]],
      ...(selectedPatternRef.current?.id !== "14"
        ? [wb.Sheets[wb.SheetNames[2]]]
        : []),
    ];

    if (allSheets.length > 0) {
      errorObject = { ...errorObject, ...getColRows(allSheets) };
    }
    setMainErrors(errorObject);
    if (Object.entries(errorObject).length > 0) return;

    validateData();

    if (billsData.length > 0) {
      const cells = billsData
        .map((_, R) =>
          Array.from({ length: billsHeader.length }, (_, C) => ({
            cell: [C, R] as Item,
          })),
        )
        .flat();
      billsRef.current?.updateCells(cells);
    }
    if (itemsData.length > 0) {
      const cells = itemsData
        .map((_, R) =>
          Array.from({ length: itemsHeader.length }, (_, C) => ({
            cell: [C, R] as Item,
          })),
        )
        .flat();
      itemsRef.current?.updateCells(cells);
    }

    if (paymentsData.length > 0) {
      const cells = paymentsData
        .map((_, R) =>
          Array.from({ length: paymentsHeader.length }, (_, C) => ({
            cell: [C, R] as Item,
          })),
        )
        .flat();
      paymentsRef.current?.updateCells(cells);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const newFile = e.target?.files[0];
    setBillsErrors([]);
    setItemsErrors([]);
    setPaymentsErrors([]);
    setFile(newFile);
    if (newFile.name.split(".")[1] !== "xlsx") {
      setMainErrors((prevErrors) => ({
        ...prevErrors,
        invalidFileType: "فرمت فایل ارسالی باید xlsx باشد",
      }));
      return;
    }
    parse_wb(read(await newFile?.arrayBuffer()));
  };

  function generateAlphabets(n: number) {
    const alphabets = [];
    for (let i = 0; i < n; i++) {
      let alphabet = "";
      let num = i;

      while (num >= 0) {
        alphabet = String.fromCharCode((num % 26) + 65) + alphabet;
        num = Math.floor(num / 26) - 1;
      }

      alphabets.push(alphabet);
    }

    return alphabets;
  }

  function generateErrorMap(
    errors: (ZodIssue | undefined)[][],
    header: string[],
    indexes:
      | (keyof BillsType)[]
      | (keyof AllItmesType)[]
      | (keyof PaymentsType)[],
  ) {
    const columnMap = generateAlphabets(header.length);

    /*
     * برای به دست آوردن مپ ارورهای قابل استفاده در xlsx
     */
    const errorList = errors
      .map((row, rowIndex) => {
        const rowErrorMap = indexes.map((idx, columnIndex) => {
          const cellName = columnMap[columnIndex] + (rowIndex + 2);
          const foundError = row.find((item) => item?.path[0] === idx);
          if (!!foundError) {
            return [cellName, foundError.message];
          }
          return [cellName, ""];
        });
        return rowErrorMap;
      })
      .flat()
      .filter((item) => item[1] !== "");

    return Object.fromEntries(errorList);
  }

  const exportXLSX = useCallback(() => {
    const billsErrorMap = generateErrorMap(
      billsErrors,
      billsHeader,
      selectedPatternBillsIndexesRef.current,
    );
    const itemsErrorMap = generateErrorMap(
      itemsErrors,
      itemsHeader,
      selectedItemsIndexesRef.current,
    );
    const paymentsErrorMap = generateErrorMap(
      paymentsErrors,
      paymentsHeader,
      paymentsIndexes,
    );
    const arrayOfBillsData = billsData.map((row) =>
      selectedPatternBillsIndexesRef.current.map((index) => row[index] ?? ""),
    );
    const arrayOfItemsData = itemsData.map((row) =>
      selectedItemsIndexesRef.current.map((index) => row[index] ?? ""),
    );
    const arrayOfPaymentsData = paymentsData.map((row) =>
      paymentsIndexes.map((index) => row[index] ?? ""),
    );
    // generate worksheet using data with the order specified in the columns array
    const billsWorksheet = utils.aoa_to_sheet([
      selectedPatternBillsIndexesRef.current,
      ...arrayOfBillsData,
    ]);
    const itemsWorksheet = utils.aoa_to_sheet([
      selectedItemsIndexesRef.current,
      ...arrayOfItemsData,
    ]);
    const paymentsWorksheet = utils.aoa_to_sheet([
      paymentsIndexes,
      ...arrayOfPaymentsData,
    ]);

    //*/ بزرگتر کردن عرض هر ستون در شیت اکسل
    billsCols.forEach((_, idx) => {
      if (!billsWorksheet["!cols"]) billsWorksheet["!cols"] = [];
      billsWorksheet["!cols"][idx] = { wch: 30 };
    });
    itemsCols.forEach((_, idx) => {
      if (!itemsWorksheet["!cols"]) itemsWorksheet["!cols"] = [];
      itemsWorksheet["!cols"][idx] = { wch: 30 };
    });
    paymentsCols.forEach((_, idx) => {
      if (!paymentsWorksheet["!cols"]) paymentsWorksheet["!cols"] = [];
      paymentsWorksheet["!cols"][idx] = { wch: 30 };
    });

    //*/ اضافه کردن کامنت ارور و استایل سلول هایی که ارور دارند
    for (const row in billsWorksheet) {
      if (billsErrorMap[row]) {
        billsWorksheet[row].s = {
          fill: { fgColor: { rgb: "FFCC00" }, bgColor: { rgb: "FF0000" } },
        };
        if (!billsWorksheet[row].c) billsWorksheet[row].c = [];
        billsWorksheet[row].c.hidden = true;
        billsWorksheet[row].c.push({ t: billsErrorMap[row] });
      }
    }
    for (const row in itemsWorksheet) {
      if (itemsErrorMap[row]) {
        itemsWorksheet[row].s = {
          fill: { fgColor: { rgb: "FFCC00" }, bgColor: { rgb: "FF0000" } },
        };
        if (!itemsWorksheet[row].c) itemsWorksheet[row].c = [];
        itemsWorksheet[row].c.hidden = true;
        itemsWorksheet[row].c.push({ t: itemsErrorMap[row] });
      }
    }
    for (const row in paymentsWorksheet) {
      if (paymentsErrorMap[row]) {
        paymentsWorksheet[row].s = {
          fill: { fgColor: { rgb: "FFCC00" }, bgColor: { rgb: "FF0000" } },
        };
        if (!paymentsWorksheet[row].c) paymentsWorksheet[row].c = [];
        paymentsWorksheet[row].c.hidden = true;
        paymentsWorksheet[row].c.push({ t: paymentsErrorMap[row] });
      }
    }
    //*/ اضافه کردن هدر هر شیت
    utils.sheet_add_aoa(
      billsWorksheet,
      [billsCols.map((c) => c.title ?? c.id)],
      {
        origin: "A1",
      },
    );
    utils.sheet_add_aoa(
      itemsWorksheet,
      [itemsCols.map((c) => c.title ?? c.id)],
      {
        origin: "A1",
      },
    );
    utils.sheet_add_aoa(
      paymentsWorksheet,
      [paymentsCols.map((c) => c.title ?? c.id)],
      {
        origin: "A1",
      },
    );

    //*/ ساخت ورکبوک اکسل و اضافه کردن شیت ها بهش
    const wb = utils.book_new();
    utils.book_append_sheet(wb, billsWorksheet, "صورت حساب");
    utils.book_append_sheet(wb, itemsWorksheet, "اقلام صورت حساب");
    utils.book_append_sheet(wb, paymentsWorksheet, "پرداخت های صورت حساب");
    // download file
    writeFile(wb, "Invoice_PatternId_1.xlsx", { cellStyles: true });
  }, [
    billsCols,
    itemsCols,
    paymentsCols,
    billsErrors,
    itemsErrors,
    paymentsErrors,
    selectedPatternBillsIndexesRef.current,
  ]);
  const getComboboxOptions = async () => {
    try {
      const response: AxiosResponse<BaseResponseType<SelectOption[]>> =
        await getPatternTypeList();

      setPatternTypeList(response.data.result);
    } catch (error) {
      console.log(error);
      throw Error;
    }
  };

  const resetAllData = () => {
    billsData = [];
    itemsData = [];
    paymentsData = [];
    setMainErrors({});
    setBillsErrors([]);
    setItemsErrors([]);
    setPaymentsErrors([]);
    setFile(undefined);
    setBillsCols([]);
    setBillsRows(0);
    setItemsCols([]);
    setItemsRows(0);
    setPaymentsCols([]);
    setPaymentsRows(0);
    setSelectedPatternBillsIndexes(billsIndexes);
    setSelectedPattern(null);
    setExcelBase64("");
  };

  const sendValidatedFile = async () => {
    if (
      Object.values(mainErrors).length === 0 &&
      billsErrors.flat().length === 0 &&
      itemsErrors.flat().length === 0 &&
      paymentsErrors.flat().length === 0
    ) {
      const postData: FormData = new FormData();
      if (!file || !selectedPattern?.id) return;
      setLoading(true);
      postData.append("File", file, file.name);
      postData.append("Id", String(selectedPattern?.id));

      try {
        const response: AxiosResponse<BaseResponseType<string>> =
          await batchInsert(postData);
        if (response.data.code === 0) {
          dispatch(
            RsetShowToast({
              show: true,
              title: response.data.message,
              bg: "success",
            }),
          );
          resetAllData();
          navigate("/users/billsList");
        } else if (response.data.code === 1) {
          RsetMessageModal({ show: true, title: response.data.message });
          setExcelBase64(response.data.result);
        } else {
          dispatch(
            RsetMessageModal({ show: true, title: response.data.message }),
          );
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const downloadFileButton = async (type: "help" | "example") => {
    const selectedPatternType:
      | {
          title: string;
          id: number;
          helpUrl: string;
          exampleUrl: string;
        }
      | undefined = patternTypes.find((pt) => pt.id == selectedPattern?.id);

    const selectedPatternUrl =
      type === "example"
        ? selectedPatternType?.exampleUrl
        : selectedPatternType?.helpUrl;
    if (!!selectedPatternUrl) {
      try {
        const res = await downloadFile(selectedPatternUrl);
        const blob = new Blob([res?.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = selectedPatternUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(a.href);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const downloadExcelFromService = () => {
    const linkSource = `data:application/vnd.ms-excel;base64,${excelBase64}`;
    const downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = "_self";
    downloadLink.download = "excel_file_with_errors.xlsx";
    downloadLink.click();

    document.body.removeChild(downloadLink);
  };
  return (
    <>
      <div className="tw-mb-10 tw-flex tw-w-full tw-items-center tw-justify-between">
        <h4 className="tw-mt-2 tw-flex tw-items-end tw-text-lg tw-text-gray-800 md:tw-text-2xl">
          ثبت دسته‌ای صورتحساب
        </h4>
        <span
          className="tw-flex tw-cursor-pointer tw-justify-end tw-text-xs tw-font-bold tw-text-primary hover:tw-text-primary-hover md:tw-text-base"
          onClick={() => downloadFileButton("help")}
        >
          دانلود فایل راهنما
        </span>
      </div>

      <section className="tw-mx-auto tw-w-full tw-justify-start">
        {
          <div className="tw-flex tw-grid-cols-1 tw-items-end tw-justify-between  2xl:tw-w-auto">
            {loading && <Loading />}
            <div className="tw-mt-4 tw-w-full md:tw-w-1/4">
              {/* xs={12} md={6} xl={4} */}
              <span className="tw-font-bold">الگوی صورتحساب</span>
              <Select
                value={selectedPattern}
                className="tw-mt-1"
                placeholder="انتخاب کنید"
                options={patternTypeList}
                getOptionLabel={(option) => option.title || ""}
                getOptionValue={(option) => String(option?.id)}
                onChange={onChange}
              />
            </div>
            {!isSmallScreen && (
              <Button
                icon={<PaperDownload />}
                type="submit"
                variant="outLine_default"
                onClick={() => downloadFileButton("example")}
                size="default"
                title="دانلود قالب"
                disabled={!!selectedPattern ? false : true}
              />
            )}
            {!!selectedPattern ? (
              <>
                {/* <a
                    href={
                      patternTypes.find((pt) => pt.id === selectedPattern.id)
                        ?.exampleUrl
                    }
                    download={selectedPattern.title}
                    className="btn btn-outline-dark"
                  >
                    دانلود فایل نمونه
                  </a> */}
                {/* <Button
                  type="submit"
                  onClick={() => downloadFileButton("example")}
                  variant="default"
                  size="default"
                  className="text-nowrap tw-mt-5"
                  title="دانلود فایل نمونه"
                /> */}
              </>
            ) : null}
          </div>
        }
        {!!file && (
          <div className="tw-row-auto tw-flex tw-w-full tw-items-center ">
            <div className="d-flex tw-my-5 tw-w-96 tw-items-center tw-justify-between tw-rounded-lg tw-bg-gray-100 tw-px-3 tw-py-4">
              <p className="m-0 tw-flex tw-gap-3 tw-text-xs">
                <img src={Paper} alt="Paper" />
                <span className="tw-me-8 tw-text-gray-200">{file.name}</span>
              </p>
              <span onClick={() => resetAllData()}>
                <DeleteIcon />
              </span>
            </div>
          </div>
        )}
        {Object.values(mainErrors).some((err) => !!err) ? (
          <div className="tw-text-red">
            {Object.entries(mainErrors).map((err) => (
              <p className="tw-flex ">
                <span className="tw-me-4 tw-rounded-full tw-bg-sausage tw-p-2">
                  <ErrorIcon />
                </span>
                <span className="tw-flex tw-items-center">{err[1]}</span>
              </p>
            ))}
          </div>
        ) : !isSmallScreen && billsData.length > 0 ? (
          <>
            <div>
              {billsErrors.flat().length > 0 && (
                <p className="tw-mt-4 tw-flex tw-text-red">
                  <span className="tw-me-4 tw-rounded-full tw-bg-sausage tw-p-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#F04438"
                    >
                      <path
                        d="M8.00016 5.33301V7.99967M8.00016 10.6663H8.00683M14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967Z"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>
                  <span className="tw-flex tw-items-center">
                    در شیت صورت حساب تعداد {billsErrors.flat().length} ارور وجود
                    دارد
                  </span>
                </p>
              )}
              {itemsErrors.flat().length > 0 && (
                <p className="tw-mt-4 tw-flex tw-text-red">
                  <span className="tw-me-4 tw-rounded-full tw-bg-sausage tw-p-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#F04438"
                    >
                      <path
                        d="M8.00016 5.33301V7.99967M8.00016 10.6663H8.00683M14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967Z"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>
                  <span className="tw-flex tw-items-center">
                    در شیت اقلام صورت حساب تعداد {itemsErrors.flat().length}{" "}
                    ارور وجود دارد
                  </span>
                </p>
              )}

              {paymentsErrors.flat().length > 0 && (
                <p className="tw-mt-4 tw-flex tw-text-red">
                  <span className="tw-me-4 tw-rounded-full tw-bg-sausage tw-p-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#F04438"
                    >
                      <path
                        d="M8.00016 5.33301V7.99967M8.00016 10.6663H8.00683M14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967Z"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>
                  <span className="tw-flex tw-items-center">
                    در شیت پرداخت های صورت حساب تعداد{" "}
                    {paymentsErrors.flat().length} ارور وجود دارد
                  </span>
                </p>
              )}
            </div>
            <div className="tw-flex tw-w-full tw-items-center tw-justify-center">
              <Tabs
                dir="rtl"
                defaultValue="aBill"
                className="tw-bg-pri tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-4 md:tw-gap-12"
              >
                <div className="tw-flex tw-justify-around">
                  <TabsList className="tw-grid tw-rounded-lg tw-bg-gray-100 md:tw-grid-cols-8 md:tw-rounded-full md:tw-bg-white">
                    <TabsTrigger
                      className="tw-col-span-2 tw-rounded-none tw-text-mainBlack-dark data-[state=active]:tw-border-b-2 data-[state=active]:tw-border-primary data-[state=active]:tw-bg-white  data-[state=active]:tw-pb-4 data-[state=active]:tw-text-mainBlack-dark data-[state=active]:tw-shadow-none"
                      value="aBill"
                      onClick={() => setSelectedTab("aBill")}
                    >
                      صورت حساب
                    </TabsTrigger>
                    <TabsTrigger
                      className="tw-col-span-2 tw-rounded-none tw-text-mainBlack-dark data-[state=active]:tw-border-b-2 data-[state=active]:tw-border-primary data-[state=active]:tw-bg-white  data-[state=active]:tw-pb-4 data-[state=active]:tw-text-mainBlack-dark data-[state=active]:tw-shadow-none"
                      value="aBillItems"
                      onClick={() => setSelectedTab("aBillItems")}
                    >
                      اقلام صورت حساب
                    </TabsTrigger>
                    {selectedPatternRef.current?.id !== "14" && (
                      <TabsTrigger
                        className="tw-col-span-2 tw-rounded-none tw-text-mainBlack-dark data-[state=active]:tw-border-b-2 data-[state=active]:tw-border-primary data-[state=active]:tw-bg-white  data-[state=active]:tw-pb-4 data-[state=active]:tw-text-mainBlack-dark data-[state=active]:tw-shadow-none"
                        value="aBillPayments"
                        onClick={() => setSelectedTab("aBillPayments")}
                      >
                        پرداخت‌های صورتحساب
                      </TabsTrigger>
                    )}
                  </TabsList>
                  {billsErrors.flat().length > 0 ||
                  itemsErrors.flat().length > 0 ||
                  paymentsErrors.flat().length > 0 ? (
                    <div
                      onClick={exportXLSX}
                      className="tw-flex tw-cursor-pointer tw-items-center tw-gap-5 "
                    >
                      <span className="tw-text-primary">
                        دانلود فایل صورتحساب با خطاها
                      </span>
                      <span>
                        <DownlaodIcon />
                      </span>
                    </div>
                  ) : excelBase64 !== "" ? (
                    <div className="tw-flex tw-w-auto tw-gap-2">
                      <Button
                        title="دانلود فایل به همراه خطا از سرور"
                        onClick={downloadExcelFromService}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="tw-w-[100%] tw-overflow-scroll">
                  <TabsContent value="aBill">
                    <DataEditor
                      getCellContent={getBillsContent}
                      columns={billsCols}
                      height={500}
                      rows={billsRows}
                      rowMarkers="number"
                      maxColumnAutoWidth={200}
                      onCellClicked={(cell, e) => {
                        e.preventDefault();
                        const [col, row] = cell;
                        const cellError = billsErrors[row].find(
                          (err) =>
                            err?.path[0] === selectedPatternBillsIndexes[col],
                        );

                        if (cellError) {
                          dispatch(
                            RsetShowToast({
                              show: true,
                              title: cellError.message,
                              bg: "danger",
                            }),
                          );
                        }
                      }}
                      ref={billsRef}
                    />
                  </TabsContent>
                  <TabsContent value="aBillItems">
                    <DataEditor
                      getCellContent={getItemsContent}
                      columns={itemsCols}
                      height={500}
                      rows={itemsRows}
                      rowMarkers="number"
                      onCellClicked={(cell, e) => {
                        e.preventDefault();
                        const [col, row] = cell;
                        const cellError = itemsErrors[row].find(
                          (err) => err?.path[0] === selectedItemsIndexes[col],
                        );

                        if (cellError) {
                          dispatch(
                            RsetShowToast({
                              show: true,
                              title: cellError.message,
                              bg: "danger",
                            }),
                          );
                        }
                      }}
                      ref={itemsRef}
                    />
                  </TabsContent>
                  <TabsContent value="aBillPayments">
                    <DataEditor
                      getCellContent={getPaymentsContent}
                      columns={paymentsCols}
                      height={500}
                      rows={paymentsRows}
                      rowMarkers="number"
                      onCellClicked={(cell, e) => {
                        e.preventDefault();
                        const [col, row] = cell;
                        if (!!!paymentsErrors[row]) return;
                        const cellError = paymentsErrors[row].find(
                          (err) => err?.path[0] === paymentsIndexes[col],
                        );

                        if (cellError) {
                          dispatch(
                            RsetShowToast({
                              show: true,
                              title: cellError.message,
                              bg: "danger",
                            }),
                          );
                        }
                      }}
                      ref={paymentsRef}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* <Tabs defaultActiveKey="bills" id="sheets" justify> */}
            {/* <Tab
                  title={"صورت حساب"}
                  eventKey="bills"
                  dir="ltr"
                  className="p-0"
                > */}
            {/* <DataEditor
                    getCellContent={getBillsContent}
                    columns={billsCols}
                    height={500}
                    rows={billsRows}
                    rowMarkers="number"
                    maxColumnAutoWidth={200}
                    onCellClicked={(cell, e) => {
                      e.preventDefault();
                      const [col, row] = cell;
                      const cellError = billsErrors[row].find(
                        (err) =>
                          err?.path[0] === selectedPatternBillsIndexes[col],
                      );

                      if (cellError) {
                        dispatch(
                          RsetShowToast({
                            show: true,
                            title: cellError.message,
                            bg: "danger",
                          }),
                        );
                      }
                    }}
                    ref={billsRef}
                  /> */}
            {/* </Tab>
                <Tab title="اقلام صورت حساب" dir="ltr" eventKey="items">
                  <DataEditor
                    getCellContent={getItemsContent}
                    columns={itemsCols}
                    height={500}
                    rows={itemsRows}
                    rowMarkers="number"
                    onCellClicked={(cell, e) => {
                      e.preventDefault();
                      const [col, row] = cell;
                      const cellError = itemsErrors[row].find(
                        (err) => err?.path[0] === itemsIndexes[col],
                      );

                      if (cellError) {
                        dispatch(
                          RsetShowToast({
                            show: true,
                            title: cellError.message,
                            bg: "danger",
                          }),
                        );
                      }
                    }}
                    ref={itemsRef}
                  />
                </Tab> */}
            {/* <Tab title="پرداخت های صورت حساب" dir="ltr" eventKey="payments">
                <DataEditor
                  getCellContent={getPaymentsContent}
                  columns={paymentsCols}
                  height={500}
                  rows={paymentsRows}
                  rowMarkers="number"
                  onCellClicked={(cell, e) => {
                    e.preventDefault();
                    const [col, row] = cell;
                    if (!!!paymentsErrors[row]) return;
                    const cellError = paymentsErrors[row].find(
                      (err) => err?.path[0] === paymentsIndexes[col],
                    );

                    if (cellError) {
                      dispatch(
                        RsetShowToast({
                          show: true,
                          title: cellError.message,
                          bg: "danger",
                        }),
                      );
                    }
                  }}
                  ref={paymentsRef}
                />
              </Tab> */}
            {/* </Tabs> */}
          </>
        ) : !!selectedPattern === true && !isSmallScreen ? (
          <div className="justify-content-center">
            <div
              {...getRootProps({
                role: "button",
                className: `${
                  isDragActive
                    ? "tw-bg-gray-100 text-light"
                    : "tw-bg-gray-100 text-light-emphasis"
                } tw-rounded-lg tw-flex tw-flex-col tw-my-8 tw-text-center tw-justify-center tw-items-center tw-p-3 tw-border-dashed tw-border-2 tw-border-indigo-600`,
              })}
            >
              <div className="tw-pb-4">
                <Group3 />
              </div>
              <input {...getInputProps({ onChange: handleChange })} />
              <p className=" sm-fs-6">
                برای بارگذاری، فایل خود را اینجا بکشید یا انتخاب کنید.
              </p>
              <Button
                variant="white"
                size="default"
                type="reset"
                className="tw-mt-5 tw-text-mainBlack-dark"
                title="انتخاب فایل"
              />
            </div>
          </div>
        ) : isSmallScreen ? (
          <>
            <span className="tw-my-8 tw-flex tw-font-bold">
              برای بارگذاری، از اینجا فایل خود را انتخاب کنید.
            </span>
            <div className="tw-flex tw-items-center tw-justify-center tw-text-center">
              {!selectedPattern ? (
                <div
                  onClick={(e) => e.preventDefault()}
                  className="tw-align-center tw-flex tw-w-1/3 tw-justify-center tw-rounded-lg tw-bg-primary-disabled tw-py-1 tw-text-md tw-text-sm tw-text-white tw-shadow"
                >
                  انتخاب فایل
                </div>
              ) : (
                <div
                  {...getRootProps({
                    role: "button",
                    className:
                      "tw-flex tw-text-sm tw-py-1 tw-align-center tw-justify-center tw-w-1/3 tw-bg-primary tw-text-white tw-text-md tw-shadow hover:tw-bg-primary-hover hover:tw-text-white tw-rounded-lg",
                  })}
                >
                  انتخاب فایل
                  <input {...getInputProps({ onChange: handleChange })} />
                </div>
              )}
              <Button
                className="tw-mx-2 tw-my-0 tw-w-1/2"
                icon={<PaperDownload className="green" />}
                type="submit"
                variant="outLine_default"
                onClick={() => downloadFileButton("example")}
                size="default"
                title="دانلود قالب"
                disabled={!!selectedPattern ? false : true}
              />
            </div>
            {!!file && (
              <div className="tw-row-auto tw-flex tw-w-full tw-items-center ">
                <div className="d-flex tw-my-8 tw-w-96 tw-items-center tw-justify-between tw-rounded-lg tw-bg-gray-100 tw-px-6 tw-py-2">
                  <p className="m-0">
                    نام فایل:{" "}
                    <span className="tw-me-8 tw-text-gray-200">
                      {file.name}
                    </span>
                  </p>
                  <span onClick={() => resetAllData()}>
                    <DeleteIcon />
                  </span>
                </div>
              </div>
            )}
            {billsErrors.flat().length > 0 && (
              <p className="tw-mt-4 tw-flex tw-text-red">
                <span className="tw-me-4 tw-rounded-full tw-bg-sausage tw-p-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#F04438"
                  >
                    <path
                      d="M8.00016 5.33301V7.99967M8.00016 10.6663H8.00683M14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967Z"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
                <span className="tw-flex tw-items-center">
                  در شیت صورت حساب تعداد {billsErrors.flat().length} ارور وجود
                  دارد
                </span>
              </p>
            )}
            {itemsErrors.flat().length > 0 && (
              <p className="tw-mt-4 tw-flex tw-text-red">
                <span className="tw-me-4 tw-rounded-full tw-bg-sausage tw-p-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#F04438"
                  >
                    <path
                      d="M8.00016 5.33301V7.99967M8.00016 10.6663H8.00683M14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967Z"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
                <span className="tw-flex tw-items-center">
                  در شیت اقلام صورت حساب تعداد {itemsErrors.flat().length} ارور
                  وجود دارد
                </span>
              </p>
            )}
            {paymentsErrors.flat().length > 0 && (
              <p className="tw-mt-4 tw-flex tw-text-red">
                <span className="tw-me-4 tw-rounded-full tw-bg-sausage tw-p-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#F04438"
                  >
                    <path
                      d="M8.00016 5.33301V7.99967M8.00016 10.6663H8.00683M14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967Z"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
                <span className="tw-flex tw-items-center">
                  در شیت پرداخت های صورت حساب تعداد{" "}
                  {paymentsErrors.flat().length} ارور وجود دارد
                </span>
              </p>
            )}
            {(excelBase64 !== "" || billsErrors.flat().length > 0) && (
              <div className="tw-mt-4 tw-flex tw-w-full">
                <Button
                  variant={"outLine_default"}
                  title="دانلود فایل صورت حساب با خطاها"
                  onClick={
                    billsErrors.flat().length > 0
                      ? exportXLSX
                      : downloadExcelFromService
                  }
                  icon={<DownlaodIcon />}
                />
              </div>
            )}
          </>
        ) : null}
        <div id="portal"></div>
      </section>
      <div className="tw-relative tw-mb-52 tw-mt-4 tw-h-9  tw-w-full">
        <div className="tw-bg-dark tw-absolute tw-left-0 tw-justify-end">
          <Button
            className=" md:tw-ms-4"
            onClick={sendValidatedFile}
            variant={"secondary"}
            title="ذخیره و ارسال صورتحساب"
          />
        </div>
      </div>
    </>
  );
};

export default BatchEntryPage;
