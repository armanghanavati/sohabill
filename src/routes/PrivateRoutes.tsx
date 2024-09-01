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
import BuyerPerson from "src/components/tax/modals/BuyerPerson";
import AddBuyer from "src/pages/addBuyer";
import Billing from "src/pages/billing";
import BillsList from "src/pages/billsList";
import AddGoods from "src/pages/addGoods";
import BuyersList from "src/pages/buyersList";
import GoodsList from "../pages/goodsList";
import ViewBill from "src/pages/billsList/viewBill";

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
      <Route path="/billsList" element={<BillsList />} />
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
      <Route path="/buyerPerson" element={<BuyerPerson />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/editBill/:id/:subjectTypeId/:taxId" element={<Billing />} />
      <Route path="/viewBill/:id/" element={<ViewBill />} />
      <Route path="/addBuyer" element={<AddBuyer />} />
      <Route path="/addGoods" element={<AddGoods />} />
      <Route path="/BuyersList" element={<BuyersList />} />
      <Route path="/goodsList" element={<GoodsList />} />
    </Routes>
  );
};

export default PrivateRoutes;
