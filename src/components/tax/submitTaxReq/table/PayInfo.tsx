import React, { useEffect, useState } from "react";
import { Table, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "../../../../hooks/hook";
import {
  RsetProductList,
  RsetListPay,
  selectListPay,
} from "../../../../common/slices/taxSlice";
import Datepicker from "../../../../common/DatePicker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import StringHelpers from "../../../../helpers/string-helpers";
import Select from "react-select";
import { paymantMethodItems } from "../../../../utils/Options";
import InputText from "../../../../common/InputText";
import {
  RsetQuestionModal,
  RsetShowModal,
  selectQuseTionModal,
} from "../../../../common/slices/mainSlice";
import QuestionModal from "../../../../common/QuestionModal";
import persian_en from "react-date-object/locales/persian_en";
import {
  ForthStepType,
  StyleTypeOperation,
} from "../../../../models/AllData.model";

type Props = ForthStepType & StyleTypeOperation;
const PayInfo: React.FC<Props> = ({ setEditRowGoods, styleOprationRow }) => {
  const [deleteFastRow, setDeleteFastRow] = useState<boolean>(false);
  const [getId, setGetId] = useState<string>("");
  const dispatch = useDispatch();
  const showQuestionModal = useAppSelector(selectQuseTionModal);
  const listPay = useAppSelector(selectListPay);
  //(listPay);

  const handleOnchange = (e: any, name: string, index: number) => {
    let array = [...listPay];
    let temp = { ...array[index] };
    temp[name] = e;
    array[index] = temp;
    dispatch(RsetListPay(array));
  };

  const handleEditRows = (item: any, index: number) => {
    if (!styleOprationRow?.subjectId_3) {
      dispatch(RsetShowModal({ showModal: true, typeModal: 1 }));
      setEditRowGoods(item);
    }
  };

  const handleDeleteRows = () => {
    const filterListPay = listPay.filter((item) => getId !== item.id);
    dispatch(RsetListPay(filterListPay));
  };

  useEffect(() => {
    if (showQuestionModal.answer) {
      handleDeleteRows();
    } else {
      dispatch(RsetQuestionModal({ show: false, answer: false }));
    }
  }, [showQuestionModal.answer]);

  return (
    <Table striped bordered hover responsive size="sm" className="mt-4">
      <thead>
        <tr>
          <th className="minWidth50 headColorTable text-center text-white fw-normal">
            ردیف
          </th>
          <th className="minWidth150 headColorTable text-center text-white fw-normal">
            روش پرداخت
          </th>
          <th className="minWidth150 headColorTable text-center text-white fw-normal">
            مبلغ پرداختی (تومان)
          </th>
          {/* <th className="minWidth150 headColorTable text-center text-white fw-normal">
            شماره پایانه
          </th> */}
          <th className="minWidth150 headColorTable text-center text-white fw-normal">
            تاریخ پرداخت
          </th>
          <th className="minWidth150 headColorTable text-center text-white fw-normal">
            عملیات
          </th>
        </tr>
      </thead>
      <tbody style={{ verticalAlign: "center" }} className="text-center">
        {listPay?.length !== 0 && listPay !== undefined ? (
          listPay?.map((item: any, index: number) => {
            const oparationDate: string = String(
              item?.datePay?.convert(persian, persian_fa),
            );
            const oparationExpenses: string = StringHelpers.formatNumber(
              item?.paymentAmount,
            );
            //(listPay);
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="fitTable">
                  <div className="">
                    {item?.isEditingRow === true ? (
                      <Select
                        className=""
                        placeholder=""
                        loadingMessage={() => "درحال بارگذاری"}
                        noOptionsMessage={() => "موجود نیست"}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        defaultValue={item?.paymantMethod}
                        options={paymantMethodItems}
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        onChange={(e) =>
                          handleOnchange(e, "paymantMethod", index)
                        }
                      />
                    ) : (
                      item?.paymentType?.title
                    )}
                  </div>
                </td>
                <td className="fitTable">
                  {/* مبلغ پرداختی */}
                  <div>
                    {item?.isEditingRow === true ? (
                      <InputText
                        length_num={16}
                        type="number"
                        defaultValue={item?.paymentAmount}
                        onChange={(e) =>
                          handleOnchange(e.target.value, "paymentAmount", index)
                        }
                      />
                    ) : (
                      item?.paidAmount
                    )}
                  </div>
                </td>
                {/* <td className="fitTable">
                  {item?.isEditingRow === true ? (
                    <InputText
                      length_num={8}
                      type="number"
                      defaultValue={item?.terminalNumber}
                      onChange={(e) =>
                        handleOnchange(e.target.value, "terminalNumber", index)
                      }
                    />
                  ) : (
                    item?.terminalNumber
                  )}
                </td> */}
                <td className="fitTable">
                  {/* تاریخ پرداخت */}
                  {item?.isEditingRow === true ? (
                    <Datepicker
                      persianType="per"
                      name="paymentDate"
                      value={
                        typeof item?.paymentDate === "object"
                          ? item?.paymentDate
                              ?.convert(persian, persian_fa)
                              ?.format("YYYY/MM/DD")
                          : item?.paymentDate
                      }
                      maxDate={new Date()}
                      onChange={(e: any) =>
                        handleOnchange(e, "paymentDate", index)
                      }
                    />
                  ) : typeof item?.paymentDate === "object" ? (
                    item?.paymentDate
                      ?.convert(persian, persian_fa)
                      ?.format("YYYY/MM/DD")
                  ) : (
                    item?.paymentDate
                  )}
                </td>
                <td className="">
                  <div className="justify-content-center d-flex">
                    <i
                      className={`${
                        !styleOprationRow?.subjectId_3
                          ? "textPrimary"
                          : "text-white"
                      } d-flex justify-content-center border font20 fw-bold cursorPointer align-items-center p-2 bi bi-pencil-square  rounded-pill`}
                      onClick={() => handleEditRows(item, index)}
                    />
                    <i
                      className={` ${
                        styleOprationRow?.subjectId_3
                          ? "text-white"
                          : !styleOprationRow?.subjectId_4 ||
                              listPay?.length > 1
                            ? " textPrimary"
                            : "text-white"
                      } d-flex justify-content-center border font20 fw-bold cursorPointer align-items-center me-2 p-2 rounded-pill bi bi-trash`}
                      onClick={() => {
                        if (!styleOprationRow?.subjectId_3) {
                          if (
                            styleOprationRow?.subjectId_3 ||
                            styleOprationRow?.subjectId_4
                          ) {
                            if (listPay?.length > 1) {
                              setGetId(item.id);
                              dispatch(
                                RsetQuestionModal({
                                  show: true,
                                  answer: false,
                                }),
                              );
                              if (deleteFastRow) {
                                handleDeleteRows();
                              }
                            }
                          } else {
                            setGetId(item.id);
                            dispatch(
                              RsetQuestionModal({ show: true, answer: false }),
                            );
                            if (deleteFastRow) {
                              handleDeleteRows();
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7}>
              <div className="">
                <span className="text-secondary p-2">
                  پرداختی برای نمایش وجود ندارد
                  <i className="font20 textPrimary me-2 bi bi-exclamation-triangle-fill" />
                </span>
              </div>
            </td>
          </tr>
        )}
      </tbody>
      {showQuestionModal && deleteFastRow === false && (
        <QuestionModal title="آیا از حذف آن اطمینان دارید؟" />
      )}
    </Table>
  );
};

export default PayInfo;
