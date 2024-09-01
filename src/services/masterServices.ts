import axios from "axios";
import {
  Checkout,
  GetListSearch,
  Login,
  PersonBuyerTable,
  SignUpAccount,
  TablePostSteps,
} from "../models/AllData.model";
import { BillsListFiltersType } from "src/pages/billsList/types";
import { BuyersListType } from "src/pages/buyersList/types";
import { GoodsListType } from "src/pages/addGoods/types";
import { AddGoodsInterFace } from "src/common/GoodsModal/type";
import { PersonalizedGoodsType } from "src/pages/goodsList/type";

const baseURL: string | undefined = import.meta.env.VITE_URL;

// لیست اطلاعات
export const getBillInitializeData = async () => {
  return axios.get(`${baseURL}/api/Bill/GetBillInitializeData`);
};

// ارسال فایل اکسل دسته ای  خریدار
export const buyerPersonBatchInsert = async (postData: FormData) => {
  return axios.post(`${baseURL}/api/BuyerPerson/BatchInsert`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ارسال فایل اکسل دسته ای کالا
export const GoodsBatchInsert = async (postData: FormData) => {
  return axios.post(`${baseURL}/api/Stuff/BatchInsert`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// تنظیمات فیلد ها
export const getFields = (
  patternId: number | string | undefined,
  typeId: number | string | undefined,
  subjectId?: number | string,
) => {
  return axios.get(
    `${baseURL}/api/Bill/GetFields?PatternId=${patternId}&TypeId=${typeId}&SubjectType=${subjectId}`,
  );
};

//  نوع صورتحساب
export const billTypeId = (invoiceId: number) => {
  return axios.get(
    `${baseURL}/api/Bill/GetBillPatternsByTypeQuery?TypeId=${invoiceId}`,
  );
};

// دریافت جدول خریداران کالا
export const getPersonBuyer = (postData: TablePostSteps) => {
  return axios.post(`${baseURL}/api/Bill/GetServiceProductList`, postData);
};

// دریافت جدول لیست کالا/خدمات
export const getServiceProductList = (postData: TablePostSteps) => {
  return axios.post(`${baseURL}/api/Bill/GetServiceProductList`, postData);
};

// دریافت جدول شناسه کالا
export const getBuyerPersonList = (postData: BuyersListType) => {
  return axios.post(`${baseURL}/api/Bill/GetBuyerPersonList`, postData);
};

// ذخیره موقت
export const saveBill = (postData: Checkout) => {
  return axios.post(`${baseURL}/api/Bill/SaveBill`, postData);
};

// ذخیره نهایی
export const upsert = (postData: Checkout) => {
  return axios.post(`${baseURL}/api/Bill/InsertBill`, postData);
};

// اضافه کردن خریدار
export const upsertBuyerPerson = (postData: PersonBuyerTable) => {
  return axios.post(`${baseURL}/api/BuyerPerson/Insert`, postData);
};

// ثبت نام
export const createAccount = (postData: SignUpAccount) => {
  return axios.post(`${baseURL}/api/User/CreateAccount`, postData);
};

// شخص حقیقی
export const getUserTypes = () => {
  return axios.get(`${baseURL}/api/User/GetUserTypes`);
};

// ورود کاربر
export const login = (postData: Login) => {
  return axios.post(`${baseURL}/api/User/Login`, postData);
};

// به روز رسانی اطلاعات
export const getUserProfileInfo = () => {
  return axios.get(`${baseURL}/api/User/GetUserProfileInfo`);
};

// به روز رسانی پروفایل
export const updateAccount = (data: SignUpAccount) => {
  return axios.post(`${baseURL}/api/User/UpdateAccount`, data);
};

// خروج کاربر
export const logout = () => {
  return axios.get(`${baseURL}/api/User/Logout`);
};

// روش ارسال صورتحساب
export const getStrategies = () => {
  return axios.get(`${baseURL}/api/User/GetStrategies`);
};

// دریافت منوهای کاربر
export const getUserMenuList = () => {
  return axios.get(`${baseURL}/api/User/GetUserMenuList`);
};

// دانلود اطلاعات کاربر
export const generateKeys = () => {
  return axios.get(`${baseURL}/api/User/GenerateKeys`, {
    headers: {
      Accept: "*/*",
    },
  });
};

// دریافت لیست صورتحساب
export const getBillsList = (postData: BillsListFiltersType) => {
  return axios.post(`${baseURL}/api/Bill/GetBillsList`, postData);
};

// دریافت صورتحساب با شناسه
export const getBill = (billId: number, subjectType: number) => {
  return axios.get(
    `${baseURL}/api/Bill/GetBill?Id=${billId}&SubjectType=${subjectType}`,
  );
};

// ثبت صورتحساب ویرایش شده
export const updateBill = (postData: Checkout) => {
  return axios.post(`${baseURL}/api/Bill/UpdateBill`, postData);
};

// چاپ صورتحساب
export const PrintBill = (billId: number) => {
  return axios.get(`${baseURL}/api/Bill/PrintBill?BillId=${billId}`);
};

// دریافت لیست الگوهای صورتحساب برای کمبوباکس
export const getPatternTypeList = async () => {
  return axios.get(`${baseURL}/api/Bill/GetPatternTypeList`);
};

// ارسال فایل اکسل دسته ای صورت حساب
export const batchInsert = async (postData: FormData) => {
  return axios.post(`${baseURL}/api/Bill/BatchInsert`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// -----سرویس دریافت لیست خریداران-----
export const getList = async (postData: BuyersListType) => {
  return axios.post(`${baseURL}/api/BuyerPerson/GetList`, postData);
};

// -----سرویس دریافت لیست کالا-----
export const getPersonalizedList = async (postData: GetListSearch) => {
  return axios.post(`${baseURL}/api/Stuff/GetPersonalizedList`, postData);
};

// -----سرویس دریافت حذف خریدار از لیست خریداران-----
export const deleteBuyer = async (id: number) => {
  return axios.delete(`${baseURL}/api/BuyerPerson/Delete?Id=${id}`);
};

// حذف صورتحساب
export const removeBill = async (id?: number | string) => {
  return axios.post(`${baseURL}/api/Bill/RemoveBill`, { id });
};

export const downloadFile = async (url: string) => {
  return axios.get(`${baseURL}/${url}`, { responseType: "blob" });
};
// ---------سرویس دریافت لیست کالاها مالیات ----------------------
export const getGoodsList = async (postData: GoodsListType) => {
  return axios.post(`${baseURL}/api/Stuff/GetTaxStuffList`, postData);
};

// ---------------------لیست منتخب کالا ها-------------------------------------
export const getPersonalizedGoods = async (postData: PersonalizedGoodsType) => {
  return axios.post(
    `${baseURL}/api/Stuff/GetPersonalizedListWithFilters`,
    postData,
  );
};
// -----سرویس دریافت حذف خریدار از لیست خریداران-----
export const deletePersonalizedGoods = async (id: number) => {
  return axios.delete(`${baseURL}/api/Stuff/Delete?Id=${id}`);
};
// ---------سرویس اضافه کردن   کالا از مالیات ----------------------
export const addGoods = async (postData: AddGoodsInterFace) => {
  return axios.post(`${baseURL}/api/Stuff/Insert`, postData);
};
// ---------سرویس ویرایش   کالا از لیست کالا ----------------------
export const editGoods = async (postData: AddGoodsInterFace) => {
  return axios.put(`${baseURL}/api/Stuff/Update`, postData);
};
// --------------------دریافت جزئیات کالا----------------------
export const stuffDetail = async (id: number) => {
  return axios.get(`${baseURL}/api/Stuff/GetStuff?Id=${id}`);
};

export const printBill = (id: number) => {
  return axios.get(`${baseURL}/api/Bill/PrintBill?BillId=${id}`);
};
// دریافت لیست خریداران با فیلتر
export const getBuyersListWithFilter = async (inputModel: BuyersListType) => {
  return axios.post(`${baseURL}/api/BuyerPerson/GetListWithFilter`, {
    inputModel,
  });
};
// سرویس ویرایش خریدار
export const serBuyerUpdate = (inputModel: BuyersListType) => {
  return axios.put(`${baseURL}/api/BuyerPerson/Update`, {
    inputModel,
  });
};

// ---------ارسال مستقیم به مالیات  ----------------------
export const serSendBill = async (id: number) => {
  return axios.post(`${baseURL}/api/Bill/SendBill?Id=${id}`, null);
};
// get tempdata-------------------------------
export const tempData = async (postData: any) => {
  return axios.post(`${baseURL}/api/Common/TempData`, postData);
};
