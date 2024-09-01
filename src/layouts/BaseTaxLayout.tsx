import React, { useState } from "react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "../common/ui/tabs";
import dashedArrow from "../../assets/icons/dashed-arrow.svg";
import { cn } from "../utils/tailwind-utils";
import BatchEntryPage from "../pages/batchEntry/BatchEntryPage";
import BaseSubmitTaxReq from "../components/tax/submitTaxReq/BaseSubmitTaxReq";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../components/Button";
import { useMediaQuery } from "react-responsive";
import { ZodIssue } from "zod";
import { RsetMessageModal, RsetShowToast } from "../common/slices/mainSlice";
import { AxiosResponse } from "axios";
import { BaseResponseType } from "../pages/batchEntry/types";
import { useAppDispatch } from "../hooks/hook";

const BaseTaxLayout: React.FC = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<String>("addSingleTax");
  const [key, setKey] = useState<number>(0);
  // const [excelBase64, setExcelBase64] = useState("");
  // const [billsErrors, setBillsErrors] = useState<(ZodIssue | undefined)[][]>(
  //   [],
  // );
  const reloadRoute = (): void => {
    setKey((prevKey) => prevKey + 1);
  };

  console.log(selectedTab);

  const tabsArrays = [
    {
      value: "addBatchTax",
      title: "افزودن دسته‌ای صورتحساب",
    },
    {
      value: "addSingleTax",
      title: "افزودن تکی صورتحساب",
    },
  ];

  // const sendValidatedFile = async () => {
  //   if (
  //     Object.values(mainErrors).length === 0 &&
  //     billsErrors.flat().length === 0 &&
  //     itemsErrors.flat().length === 0 &&
  //     paymentsErrors.flat().length === 0
  //   ) {
  //     const postData: FormData = new FormData();
  //     if (!file || !selectedPattern?.id) return;
  //     setLoading(true);
  //     postData.append("File", file, file.name);
  //     postData.append("Id", String(selectedPattern?.id));

  //     try {
  //       const response: AxiosResponse<BaseResponseType<string>> =
  //         await batchInsert(postData);
  //       if (response.data.code === 0) {
  //         dispatch(
  //           RsetShowToast({
  //             show: true,
  //             title: response.data.message,
  //             bg: "success",
  //           }),
  //         );
  //         resetAllData();
  //       } else if (response.data.code === 1) {
  //         RsetMessageModal({ show: true, title: response.data.message });
  //         setExcelBase64(response.data.result);
  //       } else {
  //         console.log("error");
  //         dispatch(
  //           RsetMessageModal({ show: true, title: response.data.message }),
  //         );
  //       }
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <>
      <div className="">
        <Tabs dir="rtl" defaultValue="addSingleTax" className="">
          <TabsList className="tw-mb-10 md:tw-flex md:tw-justify-start">
            <TabsTrigger
              className=""
              value="addSingleTax"
              onClick={() => setSelectedTab("addSingleTax")}
            >
              افزودن تکی صورتحساب
            </TabsTrigger>
            <TabsTrigger
              value="addBatchTax"
              onClick={() => setSelectedTab("addBatchTax")}
            >
              افزودن دسته‌ای صورتحساب
            </TabsTrigger>
          </TabsList>
          {tabsArrays.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {selectedTab === "addSingleTax" && (
                <>
                  <BaseSubmitTaxReq keyState={key} reloadRoute={reloadRoute} />
                </>
              )}
              {selectedTab === "addBatchTax" && <BatchEntryPage />}
            </TabsContent>
          ))}
        </Tabs>
        {/* <div className="tw-relative tw-mt-4 tw-h-9 tw-w-full">
          <div className="tw-bg-dark tw-absolute tw-left-0 tw-flex tw-justify-end ">
            <Button
              type="submit"
              variant="outLine_secondary"
              // onClick={() => downloadFileButton("example")}
              size="default"
              title="ذخیره"
            />
            <Button
              onClick={sendValidatedFile}
              variant="secondary"
              className="tw-ms-4"
              // size={isSmallScreen ? "md" : "xxl"}
              title="ذخیره و ارسال صورتحساب"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default BaseTaxLayout;
