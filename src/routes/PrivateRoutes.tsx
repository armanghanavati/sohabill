import React, { useEffect, useState } from "react";
import Sidebar from "../components/tax/sidebar";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { handleGetInvoiceTemp } from "../common/slices/taxSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { billTypeId } from "../services/masterServices";
import BaseSubmitTaxReq from "../components/tax/submitTaxReq/BaseSubmitTaxReq";
import { Route, Routes } from "react-router-dom";
import ChangeProfile from "../components/changeProfile/ChangeProfile";
import ListBills from "../components/tax/listBills/ListBills";
import BatchEntryPage from "../pages/batchEntry/BatchEntryPage";
import { SignUpAccount } from "../models/AllData.model";
import Loading from "../common/Loading";
import BaseTaxLayout from "../layouts/BaseTaxLayout";

const PrivateRoutes = () => {
  const [key, setKey] = useState<number>(0);
  const { tax } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [pattern, setPattern] = useState<any>();

  const handlebillTypeId = async () => {
    const postData: string | number | undefined =
      tax?.patternTypeId?.billType?.id;
    const resTypeId = await billTypeId(postData);
    setPattern(resTypeId?.data?.result);
  };

  useEffect(() => {
    dispatch(handleGetInvoiceTemp());
    // dispatch(handleBuyerPersonIdModal())
  }, []);

  useEffect(() => {
    handlebillTypeId();
    // dispatch(handleGetFields())
  }, [tax?.patternTypeId]);

  const reloadRoute = (): void => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <Routes>
      <Route path="/listBills" element={<ListBills />} />
      <Route
        path="/baseSubmitTaxReq"
        element={
          <BaseSubmitTaxReq
            keyState={key}
            reloadRoute={reloadRoute}
            pattern={pattern}
          />
        }
      />
      <Route path="/baseTax" element={<BaseTaxLayout />} />
    </Routes>
  );
};

export default PrivateRoutes;
