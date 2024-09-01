<!--  edit rows -->

    // let tempetorryRows: any = [];
    // listPay?.map((item, index) => {
    //     //(listPay);
    //     if (index === i) {
    //         tempetorryRows.push({
    //             ...item,
    //             isEditingRow: !item?.isEditingRow
    //         })
    //     } else {
    //         tempetorryRows.push({
    //             ...item,
    //             isEditingRow: false

    //         })
    //     }
    // })
    // dispatch(RsetListPay(tempetorryRows))

<!-- goods clear by bug -->

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
const Goods: React.FC<GoodsTable> = ({ setEditRowGoods, styleOprationRow }) => {
const [getId, setGetId] = useState<string>("");
const dispatch = useDispatch();
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

const handleDeleteRowTable = (getId: string): void => {
if (styleOprationRow?.subjectId_3 || styleOprationRow?.subjectId_4) {
if (tax?.productList?.length > 1) {
setGetId(getId);
deleteItems();
}
} else {
setGetId(getId);
dispatch(RsetQuestionModal({ show: true, answer: false }));
// deleteItems();
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
{/_ {
deleteFastRow === true ?
(
<i
className=" rounded-pill text-danger font20 cursorPointer align-items-center me-2 bi bi-shield-fill-x"
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
} _/}
</th>
</tr>
</thead>
<tbody style={{ verticalAlign: "center" }} className="text-center">
{productList?.length !== 0 ? (
Object.values(productList)?.map((item: any, index: number) => {
// const oparationDate: string = String( item?.date?.convert(persian, persian_fa));
// const oparationExpenses: string = StringHelpers.formatNumber( item.expenses);
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
                          border font20 fw-bold cursorPointer align-items-center ms-2 px-2 pt-1 bi bi-pencil-square  rounded-pill`}
onClick={() => handlerEditGoodsType(item, index)}
/>
<i
className={` ${
                            (!styleOprationRow?.subjectId_3 &&
                              !styleOprationRow?.subjectId_4) ||
                            tax?.productList?.length > 1
                              ? "textPrimary"
                              : "text-white"
                          } border font20 fw-bold cursorPointer align-items-center px-2 pt-1 rounded-pill bi bi-trash`}
onClick={() => {
handleDeleteRowTable(item.id);
}}
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
</Table>
</Col>
<QuestionModal title="آیا از حذف آن اطمینان دارید؟" />
</Container>
);
};

export default Goods;

<!-- pay table clean by bugs -->

import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";
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
BillPaymentsType,
ChangeEventType,
Checkout,
ForthStepType,
StyleTypeOperation,
TableStepValues,
} from "../../../../models/AllData.model";
import { DateObject } from "react-multi-date-picker";

type Props = ForthStepType & StyleTypeOperation;
const PayInfo: React.FC<Props> = ({ setEditRowGoods, styleOprationRow }) => {
const { tax, main } = useAppSelector((state) => state);
const [getId, setGetId] = useState<string>("");
const dispatch = useDispatch();
const listPay = useAppSelector(selectListPay);

const handleOnchange = (e: ChangeEventType, name: string, index: number) => {
let array = [...listPay];
let temp = { ...array[index] };
temp[name] = e;
array[index] = temp;
dispatch(RsetListPay(array));
};

const handleEditRows = (item: BillPaymentsType, index: number) => {
if (!styleOprationRow?.subjectId_3) {
dispatch(RsetShowModal({ showModal: true, typeModal: 1 }));
setEditRowGoods(item);
}
};

const handleDeleteRows = () => {
const filterListPay = listPay.filter(
(item: BillPaymentsType) => getId !== item.id
);
dispatch(RsetListPay(filterListPay));
};

const oparationDalate = (getId: string): void => {
if (styleOprationRow?.subjectId_3 || styleOprationRow?.subjectId_4) {
if (tax?.productList?.length > 1) {
setGetId(getId);
dispatch(RsetQuestionModal({ show: true, answer: false }));
handleDeleteRows();
}
} else {
setGetId(getId);
dispatch(RsetQuestionModal({ show: true, answer: false }));
handleDeleteRows();
}
};

useEffect(() => {
if (main.showQuestionModal.answer) {
handleDeleteRows();
} else {
dispatch(RsetQuestionModal({ show: false, answer: false }));
}
}, [main.showQuestionModal.answer]);

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
<th className="minWidth150 headColorTable text-center text-white fw-normal">
شماره پایانه
</th>
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
listPay?.map((item, index: number) => {
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
{/_ مبلغ پرداختی _/}
<div>
{item?.isEditingRow === true ? (
<InputText
length_num={16}
type="number"
defaultValue={item?.paymentAmount}
onChange={(e: ChangeEventType) =>
handleOnchange(e, "paymentAmount", index)
}
/>
) : (
item?.paidAmount
)}
</div>
</td>
<td className="fitTable">
{/_ شماره پایانه _/}
{item?.isEditingRow === true ? (
<InputText
length_num={8}
type="number"
defaultValue={item?.terminalNumber}
onChange={(e: ChangeEventType) =>
handleOnchange(e, "terminalNumber", index)
}
/>
) : (
item?.terminalNumber
)}
</td>
<td className="fitTable">
{/_ تاریخ پرداخت _/}
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
className={`
                      ${
                        !styleOprationRow?.subjectId_3
                          ? "textPrimary"
                          : "text-white"
                      }
                      border font20 fw-bold cursorPointer align-items-center ms-2 px-2 pt-1 bi bi-pencil-square  rounded-pill`}
onClick={() => handleEditRows(item, index)}
/>
<i
className={` ${
                        (!styleOprationRow?.subjectId_3 &&
                          !styleOprationRow?.subjectId_4) ||
                        tax?.productList?.length > 1
                          ? " textPrimary"
                          : "text-white"
                      } border font20 fw-bold cursorPointer align-items-center px-2 pt-1 rounded-pill bi bi-trash`}
onClick={() => oparationDalate(item.id)}
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
{main.showQuestionModal.show && (
<QuestionModal title="آیا از حذف آن اطمینان دارید؟" />
)}
</Table>
);
};

export default PayInfo;
