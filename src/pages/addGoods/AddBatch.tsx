import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
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
  goodsBaseSchema,
  GoodsType,
  goodsIndexes,
} from "src/utils/schemas/goodsSchema";
import { ZodIssue, z } from "zod";
import { WorkBook, WorkSheet, read, utils, writeFile } from "xlsx-js-style";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RsetMessageModal, RsetShowToast } from "../../common/slices/mainSlice";
import { useDropzone } from "react-dropzone";
import { GoodsBatchInsert, downloadFile } from "../../services/masterServices";
import { AxiosResponse } from "axios";
import { useMediaQuery } from "react-responsive";
import { BaseResponseType } from "src/pages/batchEntry/types";
import Loading from "src/common/Loading";
import { Button } from "src/components/Button";
import PaperDownload from "src/assets/icons/PaperDownload";
import DeleteIcon from "src/assets/icons/DeleteIcon";
import DownlaodIcon from "src/assets/icons/DownlaodIcon";
import ErrorIcon from "src/assets/icons/ErrorIcon";
import { Tabs } from "../../common/ui/tabs";
import Group3 from "src/assets/icons/Group3";
import { useLocation, useNavigate } from "react-router-dom";
import TaxHelpers from "src/helpers/tax-helpers";
import {
  PropsBillingInformation,
  SelectOption,
} from "src/models/AllData.model";

let goodsData: GoodsType[] = [];
let goodsHeader: string[];
type ErrorListType = {
  sheetsNumber?: string;
  goodsSheet?: string;
  goodsData?: string;
  invalidFileType?: string;
};

const AddBatch: React.FC<PropsBillingInformation> = ({
  billInitializeData,
}) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const currencyList = billInitializeData?.currencies?.map((cur) => cur.id);

  const unitTypes: SelectOption[] | undefined = billInitializeData?.unitTypes;

  const unitTypeList = unitTypes?.map((type) => String(type.id));
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [loading, setLoading] = useState(false);
  const [mainErrors, setMainErrors] = useState<ErrorListType>({});
  const [file, setFile] = useState<File>();
  const dispatch = useAppDispatch();
  const [goodsCols, setGoodsCols] = useState<GridColumn[]>([]);
  const [goodsRows, setGoodsRows] = useState<number>(0);
  const [excelBase64, setExcelBase64] = useState("");
  const goodsRef = useRef<DataEditorRef>(null);
  const [goodsErrors, setGoodsErrors] = useState<(ZodIssue | undefined)[][]>(
    [],
  );

  useEffect(() => {
    resetAllData();
  }, []);

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
  const getGoodsContent = useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = goodsData[row];

      const dataErrors = goodsErrors[row]?.filter(
        (err) => err?.path[0] === goodsIndexes[col],
      );

      const error = dataErrors?.find(
        (err) => err?.path[0] === goodsIndexes[col],
      );

      const cellObj: GridCell = {
        kind: GridCellKind.Text,
        allowOverlay: true,
        readonly: false,
        displayData: String(dataRow[goodsIndexes[col]] ?? ""),
        themeOverride: !!error ? invalidTheme : theme,
        data: String(dataRow[goodsIndexes[col]]) ?? "",
      };

      return cellObj;
    },
    [goodsErrors, file],
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
    goodsData = utils
      .sheet_to_json<GoodsType>(sheets[0], {
        header: goodsIndexes,
      })
      .slice(1);
    goodsData = goodsData.map((row) => setEmptyStringsToUndefined(row));

    if (goodsData.length <= 0) {
      return { goodsData: "هیچ دیتایی در شیت صورت حساب وجود ندارد" };
    }

    const goodsRange = utils.decode_range(sheets[0]["!ref"] ?? "A1");
    goodsRange.e.r = goodsRange.s.r;
    goodsHeader = utils
      .sheet_to_json<string[]>(sheets[0], {
        header: 1,
        range: goodsRange,
      })[0]
      ?.filter((item) => item !== "");
    if (goodsHeader.length !== 12) {
      //TODO: update number of columns to the new value
      return {
        goodsSheet: "تعداد ستون های اکسل کالا باید 12 عدد باشد",
      };
    }

    setGoodsCols(
      goodsHeader.map(
        (h) =>
          ({
            title: h,
            id: h,
            width: Math.min(h.length * 10, 300),
          }) as GridColumn,
      ),
    );
    setGoodsRows(goodsData.length);
  };

  //*/ اسکیما مربوط به الگوی انتخاب شده
  const selectedPatternSchema = () => {
    return goodsBaseSchema;
  };

  const validateData = () => {
    const goodsSheetErrors = goodsData.map((item, index) => {
      const result = selectedPatternSchema()
        .superRefine((val, ctx) => {
          if (!currencyList?.includes(val?.currencies?.toUpperCase()?.trim())) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "نوع ارز در لیست اعلامی وجود داشته باشد",
              path: ["currencies"],
            });
          }
          if (!unitTypeList?.includes(val.unitTypes!)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "واحد اندازه گیری در لیست اعلامی باشد",
              path: ["unitTypes"],
            });
          }
        })
        .safeParse(item);
      if (!result.success) {
        return result.error.errors;
      } else return [];
    });
    setGoodsErrors(goodsSheetErrors);
  };

  const parse_wb = (wb: WorkBook) => {
    let errorObject: ErrorListType = {};
    if (wb.SheetNames.length !== 1) {
      errorObject.sheetsNumber = "تعداد شیت ها باید 1 عدد باشد";
      setMainErrors((prevErrors) => ({
        ...prevErrors,
        sheetsNumber: "تعداد شیت ها باید 1 عدد باشد",
      }));
    }

    const allSheets = [
      wb.Sheets[wb.SheetNames[0]],
      wb.Sheets[wb.SheetNames[1]],
      wb.Sheets[wb.SheetNames[2]],
    ];

    if (allSheets.length > 0) {
      errorObject = { ...errorObject, ...getColRows(allSheets) };
    }
    setMainErrors(errorObject);
    if (Object.entries(errorObject).length > 0) return;

    validateData();

    if (goodsData.length > 0) {
      const cells = goodsData
        .map((_, R) =>
          Array.from({ length: goodsHeader.length }, (_, C) => ({
            cell: [C, R] as Item,
          })),
        )
        .flat();
      goodsRef.current?.updateCells(cells);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const newFile = e.target?.files[0];
    setGoodsErrors([]);
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
    indexes: (keyof GoodsType)[],
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
    const goodsErrorMap = generateErrorMap(
      goodsErrors,
      goodsHeader,
      goodsIndexes,
    );

    const arrayOfgoodsData = goodsData.map((row) =>
      goodsIndexes.map((index) => row[index] ?? ""),
    );

    // generate worksheet using data with the order specified in the columns array
    const goodsWorksheet = utils.aoa_to_sheet([
      goodsIndexes,
      ...arrayOfgoodsData,
    ]);

    //*/ بزرگتر کردن عرض هر ستون در شیت اکسل
    goodsCols.forEach((_, idx) => {
      if (!goodsWorksheet["!cols"]) goodsWorksheet["!cols"] = [];
      goodsWorksheet["!cols"][idx] = { wch: 30 };
    });

    //*/ اضافه کردن کامنت ارور و استایل سلول هایی که ارور دارند
    for (const row in goodsWorksheet) {
      if (goodsErrorMap[row]) {
        goodsWorksheet[row].s = {
          fill: { fgColor: { rgb: "FFCC00" }, bgColor: { rgb: "FF0000" } },
        };
        if (!goodsWorksheet[row].c) goodsWorksheet[row].c = [];
        goodsWorksheet[row].c.hidden = true;
        goodsWorksheet[row].c.push({ t: goodsErrorMap[row] });
      }
    }

    //*/ اضافه کردن هدر هر شیت
    utils.sheet_add_aoa(
      goodsWorksheet,
      [goodsCols.map((c) => c.title ?? c.id)],
      {
        origin: "A1",
      },
    );

    //*/ ساخت ورکبوک اکسل و اضافه کردن شیت ها بهش
    const wb = utils.book_new();
    utils.book_append_sheet(wb, goodsWorksheet, "صورت حساب");
    // download file
    writeFile(wb, "Invoice_PatternId_1.xlsx", { cellStyles: true });
  }, [goodsCols, goodsErrors, goodsIndexes]);

  const resetAllData = () => {
    goodsData = [];

    setMainErrors({});
    setGoodsErrors([]);
    setFile(undefined);
    setGoodsCols([]);
    setGoodsRows(0);
    setExcelBase64("");
  };

  const sendValidatedFile = async () => {
    if (
      Object.values(mainErrors).length === 0 &&
      goodsErrors.flat().length === 0
    ) {
      const postData: FormData = new FormData();
      if (!file) return;
      postData.append("File", file, file.name);
      try {
        const response: AxiosResponse<BaseResponseType<string>> =
          await GoodsBatchInsert(postData);
        if (response.data.code === 0) {
          dispatch(
            RsetShowToast({
              show: true,
              title: response.data.message,
              bg: "success",
            }),
          );
          resetAllData();
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
        setLoading(false);
      }
    }
  };

  const downloadFileButton = async (type: "help" | "example") => {
    const selectedPatternUrl =
      type === "example"
        ? "/Excel/Sample/stuff_sample.xlsx"
        : "Excel/Help/stuffs.xlsx";
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
          افزودن دسته‌ای کالا
        </h4>
        <span
          className="tw-flex tw-cursor-pointer tw-justify-end tw-text-xs tw-font-bold tw-text-primary hover:tw-text-primary-hover md:tw-text-base"
          onClick={() => downloadFileButton("help")}
        >
          دانلود فایل راهنما
        </span>
      </div>
      <section className="tw-mx-auto tw-w-full tw-justify-start">
        <div className="tw-flex tw-grid-cols-1 tw-items-end tw-justify-end 2xl:tw-w-auto">
          {loading && <Loading />}
          {!isSmallScreen && (
            <Button
              icon={<PaperDownload className="#A0A0A0" />}
              type="submit"
              variant="outLine_gray"
              onClick={() => downloadFileButton("example")}
              size="default"
              title="دانلود قالب"
            />
          )}
        </div>
        {!!file && (
          <div className="tw-row-auto tw-flex tw-w-full tw-items-center ">
            <div className="d-flex tw-my-8 tw-w-96 tw-items-center tw-justify-between tw-rounded-lg tw-bg-gray-100 tw-px-6 tw-py-2">
              <p className="m-0">
                نام فایل:{" "}
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
        ) : !isSmallScreen && goodsData.length > 0 ? (
          <>
            <div className="tw-flex tw-w-full tw-items-center tw-justify-center">
              <Tabs
                dir="rtl"
                defaultValue="aBuyer"
                className="tw-bg-pri tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4"
              >
                {(excelBase64 !== "" || goodsErrors.flat().length > 0) && (
                  <div className="tw-flex tw-w-[50%] tw-justify-end">
                    <Button
                      variant={"outLine_default"}
                      title="دانلود فایل کالا با خطاها"
                      onClick={
                        goodsErrors.flat().length > 0
                          ? exportXLSX
                          : downloadExcelFromService
                      }
                      icon={<DownlaodIcon />}
                    />
                  </div>
                )}
                <div className="tw-w-[50%] tw-overflow-scroll">
                  <TabsContent key="aBuyer" value="aBuyer">
                    <DataEditor
                      getCellContent={getGoodsContent}
                      columns={goodsCols}
                      height={500}
                      rows={goodsRows}
                      rowMarkers="number"
                      maxColumnAutoWidth={200}
                      onCellClicked={(cell, e) => {
                        e.preventDefault();
                        const [col, row] = cell;
                        const cellError = goodsErrors[row].find(
                          (err) => err?.path[0] === goodsIndexes[col],
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
                      ref={goodsRef}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </>
        ) : !isSmallScreen ? (
          <div className="justify-content-center">
            <div
              {...getRootProps({
                role: "button",
                className: `${
                  isDragActive
                    ? "tw-bg-gray-100 text-light"
                    : "tw-bg-gray-100 text-light-emphasis"
                } tw-rounded-lg tw-flex tw-flex-col tw-my-10 tw-text-center tw-justify-center tw-items-center tw-p-3 tw-border-dashed tw-border-2 tw-border-indigo-600`,
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
            <span className="tw-mb-6 tw-text-smm">
              برای بارگذاری، از اینجا فایل خود را انتخاب کنید.
            </span>
            <div className="tw-mt-6 tw-flex tw-items-center tw-gap-4 tw-text-center">
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
              <div className="tw-flex tw-items-center tw-justify-end tw-text-center">
                <Button
                  className="tw-my-0"
                  icon={<PaperDownload className="green" />}
                  type="submit"
                  variant="outLine_default"
                  onClick={() => downloadFileButton("example")}
                  size="default"
                  title="دانلود قالب"
                />
              </div>
            </div>
            {goodsErrors.flat().length > 0 && (
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
                  در شیت کالا تعداد {goodsErrors.flat().length} ارور وجود دارد
                </span>
              </p>
            )}
            {(excelBase64 !== "" || goodsErrors.flat().length > 0) && (
              <div className="tw-mt-4 tw-flex tw-w-full">
                <Button
                  variant={"outLine_default"}
                  title="دانلود فایل کالا با خطاها"
                  onClick={
                    goodsErrors.flat().length > 0
                      ? exportXLSX
                      : downloadExcelFromService
                  }
                  icon={<DownlaodIcon />}
                />
              </div>
            )}
          </>
        ) : null}
        <div className="tw-mb-0 tw-mt-44 tw-flex tw-justify-end tw-gap-7 lg:tw-mt-64">
          {state?.url === "billing" ? (
            <Button
              onClick={() => navigate("/users/billing")}
              variant={"outLine_secondary"}
              size="sm"
              title="لغو"
            />
          ) : (
            ""
          )}
          <Button
            type="submit"
            variant={"secondary"}
            size="sm"
            title="ذخیره لیست کالا"
            onClick={sendValidatedFile}
            disabled={
              (file === undefined ||
                goodsErrors.flat().length > 0 ||
                Object.values(mainErrors).some((err) => !!err)) &&
              true
            }
          />
        </div>
      </section>
    </>
  );
};

export default AddBatch;
