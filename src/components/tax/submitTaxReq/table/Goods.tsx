import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Row,
  Col,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../../hooks/hook";
import {
  RsetProductList,
  RsetWeigthGoods,
  selectExpensesGoods,
  selectWeigthGoods,
} from "../../../../common/slices/taxSlice";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import StringHelpers from "../../../../helpers/string-helpers";
import ComboBox from "../../../../common/ComboBox";
import { Controller, useForm } from "react-hook-form";
import QuestionModal from "../../../../common/QuestionModal";
import {
  RsetQuestionModal,
  RsetShowModal,
  RsetShowToast,
  selectQuseTionModal,
} from "../../../../common/slices/mainSlice";
import Select from "react-select";
import { goodsNounItems, goodsTypeItems } from "../../../../utils/Options";
import InputText from "../../../../common/InputText";
import Datepicker from "../../../../common/DatePicker";
import PaginationTable from "./PaginationTable";
import PaginReactTable from "./TestTable";
import {
  EditRow,
  GoodsType,
  HookForm,
  StyleTypeOperation,
  ValidSteps,
} from "../../../../models/AllData.model";
import { useLocation } from "react-router-dom";

type GoodsTable = HookForm & GoodsType & StyleTypeOperation;
const Goods: React.FC<GoodsTable> = ({
  watch,
  setValue,
  setEditRowGoods,
  styleOprationRow,
  setStyleOprationRow,
  modalFields,
}) => {
  const [deleteFastRow, setDeleteFastRow] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  const totalPages: number = 10;
  const [editRow, setEditRow] = useState<EditRow>({
    typeId: "",
    editValue: false,
  });
  const [getId, setGetId] = useState<string>("");
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { tax, main, account } = useAppSelector((state) => state);

  const productList: any = tax?.productList || [];

  const deleteItems = () => {
    const filterItems = tax?.productList?.filter(
      (item: any) => getId !== item.id
    );
    dispatch(RsetProductList(filterItems));
    dispatch(RsetQuestionModal({ show: false, answer: false }));
  };

  const onchangeTable = (e: any, name: string, i: number) => {
    const arr = [...tax?.productList];
    const temp = { ...arr[i] };
    temp[name] = e;
    arr[i] = temp;
    dispatch(RsetProductList(arr));
  };

  const handlerEditGoodsType = (item: any, index: number) => {
    if (!styleOprationRow?.subjectId_3) {
      dispatch(RsetShowModal({ showModal: true, typeModal: 1 }));
      setEditRowGoods({ ...item });
    }
  };

  useEffect(() => {
    if (main.showQuestionModal.answer) {
      deleteItems();
    } else {
      dispatch(RsetQuestionModal({ show: false, answer: false }));
    }
  }, [main.showQuestionModal.answer]);

  useEffect(() => {
    dispatch(RsetQuestionModal({ show: false, answer: false }));
  }, [!deleteFastRow]);

  const handleDeleteRowTable = (item: any) => {
    if (!styleOprationRow?.subjectId_3) {
      if (styleOprationRow?.subjectId_4) {
        if (tax?.productList?.length > 1) {
          setGetId(item.id);
          dispatch(RsetQuestionModal({ show: true, answer: false }));
          if (deleteFastRow) {
            deleteItems();
          }
        }
      } else {
        setGetId(item.id);
        dispatch(RsetQuestionModal({ show: true, answer: false }));
        if (deleteFastRow) {
          deleteItems();
        }
      }
    }
  };

  return (
    <Container className="">
      <Col xl="12">
        <Table
          responsive
          striped
          bordered
          hover
          size="sm"
          className=" mt-4 bg-danger"
        >
          <thead className="">
            <tr>
              <th className="minWidth50 headColorTable minWidth100 select text-center text-white fw-normal">
                ردیف
              </th>
              <th className="minWidth150 headColorTable minWidth100 select text-center text-white fw-normal width15">
                تعداد
              </th>
              <th className="minWidth150 headColorTable minWidth100 select text-center text-white fw-normal width10">
                تخفیف
              </th>
              <th className="minWidth150 headColorTable minWidth100 select text-center text-white fw-normal">
                نوع ارز
              </th>
              <th className="minWidth150 headColorTable minWidth100 select text-center text-white fw-normal width15">
                مبلغ واحد
              </th>
              <th className="minWidth150 headColorTable minWidth100 select text-center text-white fw-normal width15">
                مبلغ کل
              </th>
              <th className="minWidth150 headColorTable minWidth100 select my-2 text-center text-white fw-normal">
                عملیات
                {/* {
                                    deleteFastRow === true ?
                                        (
                                            <i
                                                className=" rounded-pill text-danger  font20 cursorPointer align-items-center me-2 bi bi-shield-fill-x"
                                                onClick={() => {
                                                    setDeleteFastRow(false)
                                                }}
                                            />
                                        ) : (<i
                                            className=" text-white font20 cursorPointer align-items-center me-2 bi bi-shield-fill-x"
                                            onClick={() => {
                                                dispatch(RsetShowToast({ show: true, title: "!حذف سریع ردیف های جدول", bg: "warning" }))
                                                setDeleteFastRow(true)
                                            }}
                                        />)
                                } */}
              </th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "center" }} className="text-center">
            {productList?.length !== 0 ? (
              Object.values(productList)?.map((item: any, index: number) => {
                // const oparationDate: string = String( item?.date?.convert(persian, persian_fa));
                //   const oparationExpenses: string = StringHelpers.formatNumber( item.expenses);
                return (
                  <tr key={item.id}>
                    <td className="fitTable">{index + 1}</td>
                    <td className="fitTable">
                      <div className="">
                        {item?.editeMode === true ? (
                          <InputText
                            className="text-center"
                            type="number"
                            length_num={16}
                            onChange={(e) =>
                              onchangeTable(
                                e.target.value,
                                "numberGoods",
                                index
                              )
                            }
                            defaultValue={item?.numberGoods}
                          />
                        ) : (
                          item?.count
                        )}
                      </div>
                    </td>
                    <td className="fitTable">
                      {item?.editeMode === true ? (
                        <Select
                          className="select"
                          placeholder=""
                          loadingMessage={() => "درحال بارگذاری"}
                          noOptionsMessage={() => "موجود نیست"}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
                          defaultValue={item?.discount}
                          options={goodsNounItems}
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          onChange={(e) => onchangeTable(e, "Discount", index)}
                        />
                      ) : (
                        StringHelpers.formatNumber(item?.discount)
                      )}
                    </td>
                    <td className="fitTable">
                      {item?.editeMode === true ? (
                        <InputText
                          type="number"
                          className="text-center"
                          length_num={16}
                          onChange={(e) =>
                            onchangeTable(e.target.value, "weigth", index)
                          }
                          defaultValue={item?.currencyTypeGoods}
                        />
                      ) : item?.currencyCode !== undefined &&
                        item?.currencyCode?.nameFa !== undefined ? (
                        item?.currencyCode?.nameFa
                      ) : (
                        item?.currencyCode?.title
                      )}
                    </td>
                    <td className="fitTable">
                      {item?.editeMode === true ? (
                        <Select
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
                          defaultValue={item?.currencyTypeGoods}
                          className="select"
                          // options={currencyGoodsItems}
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          loadingMessage={() => "درحال بارگذاری"}
                          noOptionsMessage={() => "موجود نیست"}
                          onChange={(e: any) =>
                            onchangeTable(e, "currencyTypeGoods", index)
                          }
                        />
                      ) : (
                        StringHelpers.formatNumber(item?.unitPrice)
                      )}
                    </td>
                    <td className="fitTable">
                      {item?.editeMode === true ? (
                        <Select
                          className="select"
                          placeholder=""
                          loadingMessage={() => "درحال بارگذاری"}
                          noOptionsMessage={() => "موجود نیست"}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
                          defaultValue={item?.totalItemsPrice}
                          options={goodsTypeItems}
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          onChange={(e) =>
                            onchangeTable(e, "totalItemsPrice", index)
                          }
                        />
                      ) : (
                        StringHelpers.formatNumber(item?.totalItemsPrice)
                      )}
                    </td>
                    <td className="fitTable">
                      <div className="my-1">
                        <i
                          className={`
                          ${
                            !styleOprationRow?.subjectId_3
                              ? "textPrimary"
                              : "text-white"
                          }
                          border textPrimary font20 fw-bold cursorPointer align-items-center ms-2 px-2 pt-1 bi bi-pencil-square  rounded-pill`}
                          onClick={() => handlerEditGoodsType(item, index)}
                        />
                        <i
                          className={` ${
                            styleOprationRow?.subjectId_3
                              ? "text-white"
                              : !styleOprationRow?.subjectId_4 ||
                                tax?.productList?.length > 1
                              ? " textPrimary"
                              : "text-white"
                          } border font20 fw-bold cursorPointer align-items-center px-2 pt-1 rounded-pill bi bi-trash`}
                          onClick={() => handleDeleteRowTable(item)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="fitTable" colSpan={9}>
                  <div className="">
                    <span className="text-secondary p-2">
                      کالایی برای نمایش وجود ندارد
                      <i className="font20 textPrimary me-2 bi bi-exclamation-triangle-fill" />
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {main.showQuestionModal && deleteFastRow === false && (
            <QuestionModal title="آیا از حذف آن اطمینان دارید؟" />
          )}
        </Table>
      </Col>
    </Container>
  );
};

export default Goods;
