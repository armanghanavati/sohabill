import axios from "axios";
import {
  BillList,
  BuyerPersonFilterField,
  Checkout,
  Login,
  PersonBuyerTable,
  SignUpAccount,
  TablePostSteps,
} from "../models/AllData.model";

const baseURL: string | undefined = import.meta.env.VITE_URL;

// لیست اطلاعات
export const getBillInitializeData = () => {
  return axios.get(`${baseURL}/api/Bill/GetBillInitializeData`);
};

// تنظیمات فیلد ها
export const getFields = (
  patternId: number | string = 1,
  typeId: number | string = 1,
  subjectId?: number | string
) => {
  return axios.get(
    `${baseURL}/api/Bill/GetFields?PatternId=${patternId}&TypeId=${typeId}&SubjectType=${subjectId}`
  );
};

//  نوع صورتحساب
export const billTypeId = (invoiceId: string | number | undefined) => {
  return axios.get(
    `${baseURL}/api/Bill/GetBillPatternsByTypeQuery?TypeId=${invoiceId}`
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
export const getBuyerPersonList = (postData: BuyerPersonFilterField) => {
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
  return axios.post(`${baseURL}/api/Bill/InsertBuyerPerson`, postData);
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
export const getBillsList = (postData: BillList) => {
  return axios.post(`${baseURL}/api/Bill/GetBillsList`, postData);
};

// دریافت صورتحساب با شناسه
export const getBill = (billId: number) => {
  return axios.get(`${baseURL}/api/Bill/GetBill?Id=${billId}`);
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

// حذف دسته ای صورتحساب
export const removeBill = async (postData: FormData) => {
  return axios.post(`${baseURL}/api/Bill/RemoveBill`, postData
  );
};

export const downloadFile = async (url: string) => {
  return axios.get(`${baseURL}/${url}`, { responseType: "blob" });
};