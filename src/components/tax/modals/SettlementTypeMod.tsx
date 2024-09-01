import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Form,
  Table,
  DropdownButton,
  Dropdown,
  Collapse,
  Container,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  handleBuyerPersonList,
  handleGetServiceProductList,
} from "../../../common/slices/taxSlice";
import { useForm } from "react-hook-form";
import InputText from "../../../common/InputText";
import Btn from "../../../common/Btn";
import PaginationTable from "../submitTaxReq/table/PaginationTable";
import { RsetShowModal, RsetShowToast } from "../../../common/slices/mainSlice";
import {
  BuyerPersonFilterField,
  HookForm,
  ValidSteps,
} from "../../../models/AllData.model";
import Loading from "../../../common/Loading";
import { useMediaQuery } from "react-responsive";

interface Props extends HookForm {
  handleAddItemToStep: any;
  setShowSettlementMod: React.Dispatch<React.SetStateAction<boolean>>;
  showSettlementMod: boolean;
  rowTable: any;
  setValue: any;
}

const SettlementTypeMod: React.FC<Props> = ({
  control,
  rowTable,
  showSettlementMod,
  setValue,
  clearErrors,
  getValues,
  setShowSettlementMod,
  handleAddItemToStep,
}) => {
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [isClickOnRow, setIsClickOnRow] = useState<any>({});
  const [styleRowTable, setStyleRowTable] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [appMounted, setAppMounted] = useState<boolean>(false);
  const [paginationOption, setPaginationOption] = useState({
    page: 1,
    sizePerPage: 10,
    totalSize: 10,
    totalPages: 1,
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const { main, tax } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appMounted) {
      setPaginationOption((prev) => ({
        ...prev,
        // sizePerPage: ,
        page: tax?.settlementTable?.pageNumber || 1,
        totalPages: tax?.settlementTable?.totalPages,
        totalSize: tax?.settlementTable?.totalCount,
        sizePerPage: tax?.settlementTable?.pageSize,
      }));
    }
  }, [tax?.settlementTable]);

  const handleStyleRow = (id: number) => {
    setIsClickOnRow({ [id]: true });
  };

  const onPageChange = (data: any) => {
    setPaginationOption((prev) => ({
      ...prev,
      page: data || 1,
    }));
  };

  const handleContollerSearch = (e: FormEvent) => {
    // (prev: any) => ({ ...prev, controllerValues: getValues() })
    e.preventDefault();
    const controllerValues = getValues();
    dispatch(
      handleGetServiceProductList({
        ...controllerValues,
        loadingName: "search",
      }),
    );
  };

  useEffect(() => {
    dispatch(
      handleGetServiceProductList({
        pageNumber: paginationOption?.page,
        pageSize: paginationOption?.sizePerPage,
        paginationOption: paginationOption,
      }),
    );
  }, [paginationOption?.page, paginationOption?.sizePerPage]);

  useEffect(() => {
    setAppMounted(true);
  }, []);

  const handleOprationViewInWeb = () => {
    setValue(
      "settlementType",
      tax?.allFieldSteps?.rowProductGoods?.descriptionOfID,
    );
    setValue("valueIncreasedTaxRate", tax?.allFieldSteps?.rowProductGoods?.vat);
    clearErrors("settlementType");
    clearErrors("valueIncreasedTaxRate");
    setShowSettlementMod(false);
  };
  const handleOprationViewInPhone = (item: any) => {
    handleAddItemToStep(item);
    handleStyleRow(item?.code);
    if (isSmallScreen) {
      setValue(
        "valueIncreasedTaxRate",
        tax?.allFieldSteps?.rowProductGoods?.vat,
      );
      setValue("settlementType", item?.descriptionOfID);
      clearErrors("settlementType");
      clearErrors("valueIncreasedTaxRate");
      setShowSettlementMod(false);
    }
  };
  return (
    <>
      <Modal
        size="xl"
        keyboard={true}
        backdrop="static"
        centered
        show={showSettlementMod}
        onHide={() => setShowSettlementMod(false)}
      >
        <Modal.Header
          style={{ transform: "scale(-1, 1)", direction: "ltr" }}
          className="d-flex bgSuccessWhite text-white justify-content-center"
          closeButton
        >
          <span style={{ transform: "scale(-1, 1)" }} className="fw-bold">
            خدمت / کالا
          </span>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xl="12">
                <Col className="mb-4 d-flex align-items-center justify-content-center">
                  <span
                    onClick={() => setOpenFilter(!openFilter)}
                    className="d-flex align-items-center rounded-pill cursorPointer border-none p-2 px-4 bg-light shadow text-dark ms-3"
                  >
                    <i
                      onClick={() => setOpenFilter(!openFilter)}
                      className="cursorPointer d-flex align-items-center bi bi-caret-down-fill text-dark font20 ms-2"
                    />
                    جستجو
                  </span>
                </Col>
                <Row className="d-flex justify-content-center">
                  <Collapse in={openFilter} className="col-sm-12 col-md-12">
                    <Row className="shadow rounded-4 bg-light py-4 mb-4">
                      <InputText
                        label="شناسه کالا:"
                        name="code"
                        control={control}
                      />
                      <InputText
                        label="شرح تجاری کالا:"
                        name="descriptionOfID"
                        control={control}
                      />
                      <Col className="d-flex  align-items-end">
                        <Btn
                          xl={5}
                          onClick={handleContollerSearch}
                          className=" mt-4 "
                          name="search"
                          loadingName="search"
                          variant="outline-success"
                          title="جستجو"
                        />
                        <Btn
                          xl={5}
                          onClick={() =>
                            dispatch(
                              handleGetServiceProductList({
                                loadingName: "cancelSearch",
                              }),
                            )
                          }
                          className="mt-4 me-2"
                          loadingName="cancelSearch"
                          variant="outline-danger"
                          title="لغو"
                        />
                      </Col>
                    </Row>
                  </Collapse>
                </Row>
                <Row>
                  <Col xs="3" md="2" xl="1" className="">
                    <DropdownButton
                      style={{ direction: "ltr" }}
                      variant="light"
                      className="shadow rounded-pill"
                      id="dropdown-basic-button"
                      title={tax?.settlementTable?.pageSize}
                    >
                      <Dropdown.Item
                        onClick={() =>
                          dispatch(
                            handleGetServiceProductList({ pageSize: 10 }),
                          )
                        }
                        className="d-flex border-bottom border-sucsess justify-content-center"
                      >
                        10
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          dispatch(
                            handleGetServiceProductList({ pageSize: 25 }),
                          )
                        }
                        className="d-flex border-bottom border-sucsess justify-content-center"
                      >
                        25
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          dispatch(
                            handleGetServiceProductList({ pageSize: 50 }),
                          )
                        }
                        className="d-flex border-bottom border-sucsess justify-content-center"
                      >
                        50
                      </Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
                <Table responsive striped bordered hover size="lg">
                  <thead className="">
                    <tr>
                      <th className="minWidth100 headColorTable select text-center text-white fw-normal maxWidth400">
                        ردیف
                      </th>
                      <th className=" headColorTable select text-center text-white fw-normal width15">
                        شناسه کالا
                      </th>
                      <th className=" headColorTable select my-2 text-center text-white fw-normal">
                        شرح تجاری کالا
                      </th>
                      <th className=" headColorTable select text-center text-white fw-normal">
                        مشمول یا معاف
                      </th>
                      <th className=" headColorTable select text-center text-white fw-normal width15">
                        نرخ ارزش افزوده
                      </th>
                      <th className=" headColorTable select text-center text-white fw-normal width10">
                        عمومی یا خصوصی
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{ verticalAlign: "center" }}
                    className="text-center"
                  >
                    {tax?.settlementTable?.items?.length !== 0 ? (
                      tax?.settlementTable?.items?.map(
                        (item: any, index: number) => {
                          return (
                            <tr key={item.id}>
                              <td
                                onDoubleClick={handleOprationViewInWeb}
                                onClick={() => handleOprationViewInPhone(item)}
                                className={`${
                                  isClickOnRow[item?.code] &&
                                  "headColorTable text-white"
                                } addRowTable fitTable`}
                              >
                                {(paginationOption.page - 1) *
                                  paginationOption?.sizePerPage +
                                  index +
                                  1}
                              </td>
                              <td
                                onDoubleClick={handleOprationViewInWeb}
                                onClick={() => handleOprationViewInPhone(item)}
                                className={`${
                                  isClickOnRow[item?.code] &&
                                  "headColorTable text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item.code}
                              </td>
                              <td
                                onDoubleClick={handleOprationViewInWeb}
                                onClick={() => handleOprationViewInPhone(item)}
                                className={`${
                                  isClickOnRow[item?.code] &&
                                  "headColorTable text-white"
                                } cursorPointer addRowTable`}
                              >
                                {item.descriptionOfID}
                              </td>
                              <td
                                onDoubleClick={handleOprationViewInWeb}
                                onClick={() => handleOprationViewInPhone(item)}
                                className={`${
                                  isClickOnRow[item?.code] &&
                                  "headColorTable text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item.taxableOrFree}
                              </td>
                              <td
                                onDoubleClick={handleOprationViewInWeb}
                                onClick={() => handleOprationViewInPhone(item)}
                                className={`${
                                  isClickOnRow[item?.code] &&
                                  "headColorTable text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item.vat}%
                              </td>
                              <td
                                onDoubleClick={handleOprationViewInWeb}
                                onClick={() => handleOprationViewInPhone(item)}
                                className={`${
                                  isClickOnRow[item?.code] &&
                                  "headColorTable text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item.specialOrGeneral}
                              </td>
                            </tr>
                          );
                        },
                      )
                    ) : (
                      <tr>
                        <td className="fitTable" colSpan={7}>
                          لیست موجود نیست
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <PaginationTable
                  currentPage={paginationOption.page}
                  totalPages={paginationOption.totalPages}
                  onPageChange={onPageChange}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Btn
            title="افزودن"
            variant="success"
            onClick={(event: FormEvent) => {
              if (!!tax?.allFieldSteps?.rowProductGoods?.code) {
                console.log(tax?.allFieldSteps?.rowProductGoods);

                setShowSettlementMod(false);
                setValue(
                  "settlementType",
                  tax?.allFieldSteps?.rowProductGoods?.descriptionOfID,
                );
                setValue(
                  "valueIncreasedTaxRate",
                  tax?.allFieldSteps?.rowProductGoods?.vat,
                );
                clearErrors("settlementType");
                clearErrors("valueIncreasedTaxRate");
              } else {
                dispatch(
                  RsetShowToast({
                    show: true,
                    title: "!لطفا یک شناسه برای افزودن انتخاب کنید",
                    bg: "danger",
                  }),
                );
              }
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettlementTypeMod;
