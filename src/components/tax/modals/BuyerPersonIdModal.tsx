import React, { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Form,
  Table,
  DropdownButton,
  Dropdown,
  Container,
  Collapse,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import {
  RsetPersonBuyerList,
  handleBuyerPersonList,
} from "../../../common/slices/taxSlice";
import { useForm } from "react-hook-form";
import InputText from "../../../common/InputText";
import {
  RsetShowLoading,
  RsetShowModal,
  RsetShowToast,
} from "../../../common/slices/mainSlice";
import { paymantMethodItems } from "../../../utils/Options";
import Btn from "../../../common/Btn";
import PaginationTable from "../submitTaxReq/table/PaginationTable";
import {
  BuyerPersonFilterField,
  HookForm,
  PersonBuyerTable,
  ValidSteps,
} from "../../../models/AllData.model";
import AddBuyPerForTableModal from "./AddBuyPerForTableModal";
import Loading from "../../../common/Loading";
import { useMediaQuery } from "react-responsive";

interface Props extends HookForm {
  handleAddItemToStep: any;
  // showAddModal: boolean;
  // setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  // handleAddItems: (event: FormEvent) => void;
}

const BuyerPersonIdModal: React.FC<Props> = ({
  control,
  clearErrors,
  setValue,
  errors,
  getValues,
  handleAddItemToStep,
}) => {
  const dispatch = useAppDispatch();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const [isClickOnRow, setIsClickOnRow] = useState<any>({});
  const [appMounted, setAppMounted] = useState<boolean>(false);
  const { main, tax } = useAppSelector((state) => state);
  const totalPages: number = 10;
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const [paginationOption, setPaginationOption] = useState({
    page: 1,
    sizePerPage: 10,
    totalSize: 10,
    totalPages: 1,
  });

  useEffect(() => {
    setAppMounted(true);
  }, []);

  useEffect(() => {
    if (appMounted) {
      setPaginationOption((prev) => ({
        ...prev,
        page: tax?.personBuyerList?.pageNumber || 1,
        totalPages: tax?.personBuyerList?.totalPages,
        totalSize: tax?.personBuyerList?.totalCount,
        sizePerPage: tax?.personBuyerList?.pageSize,
      }));
    }
  }, [tax?.personBuyerList]);

  const handleStyleRow = (id: number) => {
    setIsClickOnRow((prev: BuyerPersonFilterField) => {
      return {
        [id]: true,
      };
    });
  };

  const onPageChange = (data: any) => {
    setPaginationOption((prev) => ({
      ...prev,
      page: data || 1,
    }));
  };

  const handleSearching = (e: FormEvent) => {
    e.preventDefault();
    const controllerValues = getValues();
    dispatch(
      handleBuyerPersonList({ ...controllerValues, loadingName: "search" }),
    );
  };

  useEffect(() => {
    dispatch(
      handleBuyerPersonList({
        pageNumber: paginationOption?.page,
        pageSize: paginationOption?.sizePerPage,
      }),
    );
  }, [paginationOption?.page, paginationOption?.sizePerPage]);

  const opratiOnDoubleClickForWeb = () => {
    setValue(
      "buyerPersonId",
      `${tax?.allFieldSteps?.rowTableBuyerPer?.firstName || ""} ${tax?.allFieldSteps?.rowTableBuyerPer?.lastName || ""} `,
    );
    setValue(
      "personTypeDescription",
      tax?.allFieldSteps?.rowTableBuyerPer?.personTypeDescription,
    );
    setValue("personCode", tax?.allFieldSteps?.rowTableBuyerPer?.personCode);
    setValue(
      "economicCode",
      tax?.allFieldSteps?.rowTableBuyerPer?.economicCode,
    );
    setValue("postCode", tax?.allFieldSteps?.rowTableBuyerPer?.postCode);
    setValue(
      "passportNumber",
      tax?.allFieldSteps?.rowTableBuyerPer?.passportNumber,
    );

    dispatch(RsetShowModal({ showModal: false }));
  };

  const opratiOnClickForPhone = (item?: any) => {
    handleStyleRow(item?.id);
    handleAddItemToStep(item);
    if (isSmallScreen) {
      setValue("buyerPersonId", `${item?.firstName} ${item?.lastName} `);
      setValue(
        "personTypeDescription",
        tax?.allFieldSteps?.rowTableBuyerPer?.personTypeDescription,
      );
      setValue("personCode", tax?.allFieldSteps?.rowTableBuyerPer?.personCode);
      setValue(
        "economicCode",
        tax?.allFieldSteps?.rowTableBuyerPer?.economicCode,
      );
      setValue("postCode", tax?.allFieldSteps?.rowTableBuyerPer?.postCode);
      setValue(
        "passportNumber",
        tax?.allFieldSteps?.rowTableBuyerPer?.passportNumber,
      );
      dispatch(RsetShowModal({ showModal: false }));
    }
  };

  const handleAddToField = (event: FormEvent) => {
    if (tax?.allFieldSteps?.rowTableBuyerPer?.firstName !== undefined) {
      dispatch(RsetShowModal({ showModal: false }));
      setValue(
        "buyerPersonId",
        `${tax?.allFieldSteps?.rowTableBuyerPer?.firstName || ""} ${tax?.allFieldSteps?.rowTableBuyerPer?.lastName || ""} `,
      );
      setValue(
        "personTypeDescription",
        tax?.allFieldSteps?.rowTableBuyerPer?.personTypeDescription,
      );
      setValue("personCode", tax?.allFieldSteps?.rowTableBuyerPer?.personCode);
      setValue(
        "economicCode",
        tax?.allFieldSteps?.rowTableBuyerPer?.economicCode,
      );
      setValue("postCode", tax?.allFieldSteps?.rowTableBuyerPer?.postCode);
      setValue(
        "passportNumber",
        tax?.allFieldSteps?.rowTableBuyerPer?.passportNumber,
      );
      clearErrors("buyerPersonId");
    } else {
      dispatch(
        RsetShowToast({
          show: true,
          title: "!لطفا یک شناسه برای افزودن انتخاب کنید",
          bg: "danger",
        }),
      );
    }
  };

  return (
    <>
      <Modal
        size="xl"
        keyboard={true}
        backdrop="static"
        centered
        show={main.showModal.showModal && main.showModal.typeModal === 1}
        onHide={() =>
          dispatch(RsetShowModal({ showModal: false, typeModal: 1 }))
        }
      >
        <Modal.Header
          style={{ transform: "scale(-1, 1)", direction: "ltr" }}
          className="d-flex bgSuccessWhite text-white justify-content-center"
          closeButton
        >
          <span style={{ transform: "scale(-1, 1)" }} className="fw-bold">
            شناسه خریدار
          </span>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xl="12">
                <Col
                  className="mb-4 d-flex align-items-center justify-content-center"
                  title="جستجو"
                >
                  <span
                    onClick={() => setOpenFilter(!openFilter)}
                    className="btnLight d-flex align-items-center rounded-pill cursorPointer border-none p-2 px-4 bg-light shadow text-dark ms-3"
                  >
                    <i
                      onClick={() => setOpenFilter(!openFilter)}
                      className={`cursorPointer d-flex align-items-center ${
                        openFilter
                          ? "bi bi-caret-up-fill"
                          : "bi bi-caret-down-fill"
                      } text-dark font20 ms-2`}
                    />
                    جستجو
                  </span>
                </Col>
                <Row className="d-flex justify-content-center">
                  <Collapse in={openFilter} className="col-sm-12 col-md-12">
                    <Row className="shadow rounded-4 bg-light py-4 mb-4">
                      <InputText
                        control={control}
                        label="نام:"
                        name="firstName"
                        errmsg="لطفا نام را وارد کنید"
                        errmsgmin="نام حداقل باید 3 حرف باشد"
                        length_num={30}
                        errminimum={3}
                        errors={errors}
                      />
                      <InputText
                        control={control}
                        name="lastName"
                        label="نام خانوادگی:"
                        errmsg="لطفا نام خانوادگی را وارد کنید"
                        errmsgmin="نام خانوادگی حداقل باید 3 حرف باشد"
                        length_num={30}
                        errminimum={3}
                        errors={errors}
                      />
                      <InputText
                        length_num={12}
                        control={control}
                        name="personCode"
                        type="number"
                        label="شناسه/شماره ملی:"
                      />
                      <InputText
                        length_num={14}
                        control={control}
                        name="economicCode"
                        type="number"
                        label="شماره اقتصادی:"
                      />
                      <Col xs={11} xl={4} className=" d-flex align-items-end">
                        <Btn
                          loadingName="search"
                          xl={5}
                          onClick={handleSearching}
                          className="mt-4"
                          name="search"
                          variant="outline-success"
                          title="جستجو"
                        />
                        <Btn
                          loadingName="cancelSearch"
                          xl={5}
                          onClick={(e: any) => {
                            dispatch(handleBuyerPersonList({}));
                          }}
                          className="mt-4 me-2"
                          variant="outline-danger"
                          title="لغو"
                        />
                      </Col>
                    </Row>
                  </Collapse>
                </Row>
                <Row>
                  <Col xs="3" md="2" xl="1">
                    <DropdownButton
                      style={{ direction: "ltr" }}
                      variant="light"
                      className="shadow"
                      id="dropdown-basic-button"
                      title={tax?.personBuyerList?.pageSize}
                    >
                      <Dropdown.Item
                        onClick={() =>
                          dispatch(handleBuyerPersonList({ pageSize: 10 }))
                        }
                        className="d-flex border-bottom border-sucsess justify-content-center"
                      >
                        10
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          dispatch(handleBuyerPersonList({ pageSize: 25 }))
                        }
                        className="d-flex border-bottom border-sucsess justify-content-center"
                      >
                        25
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          dispatch(handleBuyerPersonList({ pageSize: 50 }))
                        }
                        className="d-flex border-bottom border-sucsess justify-content-center"
                      >
                        50
                      </Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </Row>
                <Table
                  responsive
                  striped
                  bordered
                  hover
                  size="lg"
                  className=" bg-danger"
                >
                  <thead className="">
                    <tr>
                      <th className="minWidth50 headColorTable select text-center text-white fw-normal">
                        ردیف
                      </th>
                      <th className="minWidth200 headColorTable select text-center text-white fw-normal">
                        نام
                      </th>
                      <th className="minWidth200 headColorTable select text-center text-white fw-normal width15">
                        نام خانوادگی
                      </th>
                      <th className="minWidth200 headColorTable select my-2 text-center text-white fw-normal">
                        نام شرکت
                      </th>
                      <th className="minWidth150 headColorTable select text-center text-white fw-normal">
                        شناسه/شماره ملی
                      </th>
                      <th className="minWidth150 headColorTable select text-center text-white fw-normal width15">
                        شماره اقتصادی
                      </th>
                      <th className="minWidth150 headColorTable select text-center text-white fw-normal width10">
                        کد پستی
                      </th>
                      <th className="minWidth150 headColorTable select text-center text-white fw-normal">
                        شماره گذرنامه
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{ verticalAlign: "center" }}
                    className="text-center"
                  >
                    {tax?.personBuyerList?.items?.length !== 0 ? (
                      tax?.personBuyerList?.items?.map(
                        (item: any, index: number) => {
                          // const oparationDate: string = String(item?.date?.convert(persian, persian_fa))
                          // const oparationExpenses: string = StringHelpers.formatNumber(item.expenses)
                          return (
                            <tr key={item.id}>
                              <td
                                onDoubleClick={opratiOnDoubleClickForWeb}
                                onClick={() => opratiOnClickForPhone(item)}
                                className={`${
                                  isClickOnRow[item?.id] &&
                                  "bg-secondary text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {(paginationOption.page - 1) *
                                  paginationOption?.sizePerPage +
                                  index +
                                  1}
                              </td>

                              <td
                                onDoubleClick={opratiOnDoubleClickForWeb}
                                onClick={() => opratiOnClickForPhone(item)}
                                className={`${
                                  isClickOnRow[item?.id] &&
                                  "bg-secondary text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item?.firstName}
                              </td>
                              <td
                                onDoubleClick={opratiOnDoubleClickForWeb}
                                onClick={() => opratiOnClickForPhone(item)}
                                className={`${
                                  isClickOnRow[item?.id] &&
                                  "bg-secondary text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item?.lastName}
                              </td>
                              <td
                                onDoubleClick={opratiOnDoubleClickForWeb}
                                onClick={() => opratiOnClickForPhone(item)}
                                className={`${
                                  isClickOnRow[item?.id] &&
                                  "bg-secondary text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item?.companyName}
                              </td>

                              <td
                                onDoubleClick={opratiOnDoubleClickForWeb}
                                onClick={() => opratiOnClickForPhone(item)}
                                className={`${
                                  isClickOnRow[item?.id] &&
                                  "bg-secondary text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item?.personCode}
                              </td>

                              <td
                                onDoubleClick={opratiOnDoubleClickForWeb}
                                onClick={() => opratiOnClickForPhone(item)}
                                className={`${
                                  isClickOnRow[item?.id] &&
                                  "bg-secondary text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item?.economicCode}
                              </td>

                              <td
                                onDoubleClick={opratiOnDoubleClickForWeb}
                                onClick={() => opratiOnClickForPhone(item)}
                                className={`${
                                  isClickOnRow[item?.id] &&
                                  "bg-secondary text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item?.postCode}
                              </td>
                              <td
                                onDoubleClick={opratiOnDoubleClickForWeb}
                                onClick={() => opratiOnClickForPhone(item)}
                                className={`${
                                  isClickOnRow[item?.id] &&
                                  "bg-secondary text-white"
                                } cursorPointer addRowTable fitTable`}
                              >
                                {item?.passportNumber}
                              </td>
                            </tr>
                          );
                        },
                      )
                    ) : (
                      <tr>
                        <td className="fitTable" colSpan={9}>
                          اطلاعاتی برای نمایش وجود ندارد
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Col className="mt-4">
                  <PaginationTable
                    currentPage={paginationOption.page}
                    totalPages={paginationOption.totalPages}
                    onPageChange={onPageChange}
                  />
                </Col>
                <Col
                  className="mb-4 d-flex align-items-center justify-content-center"
                  title="جستجو"
                >
                  <span
                    onClick={() => {
                      dispatch(
                        RsetShowModal({
                          ...main.showModal,
                          showModal2: true,
                          typeModal2: 2,
                        }),
                      );
                    }}
                    className="btnLight d-flex align-items-center rounded-pill cursorPointer border-none fw-bold p-3 px-4 bg-light shadow text-dark ms-3"
                  >
                    <i className="cursorPointer d-flex align-items-center bi bi-plus-lg text-dark font20 fw-bold ms-2" />
                    افزودن خریدار
                  </span>
                </Col>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Btn
            title="تایید"
            variant="success"
            onClick={(event: FormEvent) => handleAddToField(event)}
          />
        </Modal.Footer>
      </Modal>
      {main.showModal.showModal2 && main.showModal.typeModal2 === 2 && (
        <AddBuyPerForTableModal />
      )}
    </>
  );
};

export default BuyerPersonIdModal;
