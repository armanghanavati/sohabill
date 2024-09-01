import React, { useEffect, useState } from "react";
import Sidebar from "../../components/tax/sidebar";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { handleGetInvoiceTemp } from "../../common/slices/taxSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { billTypeId } from "../../services/masterServices";
import BaseSubmitTaxReq from "../../components/tax/submitTaxReq/BaseSubmitTaxReq";
import { Route, Routes } from "react-router-dom";
import ChangeProfile from "../../components/changeProfile/ChangeProfile";
import ListBills from "../../components/tax/listBills/ListBills";
import BatchEntryPage from "../batchEntry/BatchEntryPage";
import { SignUpAccount } from "../../models/AllData.model";
import Loading from "../../common/Loading";
import BillsList from "../billsList";

const TaxPage = () => {
  const [showSide, setShowSide] = useState<boolean>(true);
  const [key, setKey] = useState<number>(0);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });
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
    <>
      <Container fluid className="pe-0 ">
        <div className="d-flex  ">
          {isSmallScreen && !showSide ? (
            <>
              <div className="showIcon containerSideAnimatOff bg-info sitShowSideIcon mt-4">
                <i
                  onClick={() => setShowSide(!showSide)}
                  className="px-2 py-4 position-fixed bg-success font20 bi cursorPointer bi-chevron-double-left text-white rounded-start-4  "
                />
              </div>
            </>
          ) : null}
          {isSmallScreen ? (
            <Collapse
              in={showSide}
              className="col-9 col-sm-6 col-md-5 col-lg-4"
              dimension="width"
            >
              <Row className="containerSideAnimat position-fixed">
                <div className="bg-success rounded-start-4 mt-4">
                  <Sidebar
                    reloadRoute={reloadRoute}
                    showSide={showSide}
                    setShowSide={setShowSide}
                  />
                </div>
              </Row>
            </Collapse>
          ) : (
            <Col
              xs="3"
              sm="3"
              md="3"
              lg="2"
              xl="2"
              style={{ backgroundColor: "rgb(255,255,255)" }}
              className="mt-4"
            >
              <div
                style={{ position: "fixed", maxHeight: "500px" }}
                className="shadow col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-3 positionRelative rounded-start-4 baseBtn"
              >
                <Sidebar
                  reloadRoute={reloadRoute}
                  showSide={showSide}
                  setShowSide={setShowSide}
                />
              </div>
            </Col>
          )}
          <Col
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="10"
            className="ps-2 ps-sm-3 ps-md-3 ps-lg-4 / pe-3 pe-sm-3 pe-md-0 justify-content-end"
          >
            <Container fluid>
              <Row className=" fitContainerContentTax positionRelative d-flex rounded-4 shadow-lg mt-4 me-sm-0 me-md-4">
                <Routes>
                  <Route path="/billsList" element={<BillsList />} />
                  {/* <Route path="/listBills" element={<ListBills />} /> */}
                  <Route
                    path="/baseSubmitTaxReq"
                    element={
                      <BaseSubmitTaxReq
                        keyState={key}
                        reloadRoute={reloadRoute}
                        pattern={pattern}
                      />
                      // <TaxRedesign/>
                    }
                  />
                  <Route path="/batchEntry" element={<BatchEntryPage />} />
                </Routes>
              </Row>
            </Container>
          </Col>
        </div>
      </Container>
    </>
  );
};

export default TaxPage;
