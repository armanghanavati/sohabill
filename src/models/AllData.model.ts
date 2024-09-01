import { AsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../common/store/store";
import { ChangeEvent, } from "react";
import { DateObject } from "react-multi-date-picker";
import { Validate, ValidationRule } from "react-hook-form";
import { ZodIssue } from "zod";

type str = string;
type num = number;
type bool = boolean;

export type ReduxToolkitType = AsyncThunk<
  void,
  any,
  { dispatch: AppDispatch; getState: RootState }
>;
export type ReduxToolkitTypeCallBack = AsyncThunk<
  void,
  any,
  { dispatch: AppDispatch; getState: RootState }
>;

export type ChangeEventType = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | DateObject
>;

export interface FieldsReq {
  id: num;
  name: str;
  status: num;
  tableId: num;
}

export interface EditRow {
  typeId?: string | null;
  editValue: boolean;
}

export interface UserMenuItem {
  hasAccess: num;
  icon: null;
  id: num;
  isMenu: num;
  menuUrl: str;
  name: str;
  parentID: num;
  priority: num;
  status: num;
}

export interface GoodsType {
  modalFields: any;
  setEditRowGoods: React.Dispatch<React.SetStateAction<{}>>;
}

export interface StyleOprationRowState {
  styleOprationRow?: StyleTypeOperation;
  setStyleOprationRow?: React.Dispatch<
    React.SetStateAction<StyleTypeOperation>
  >;
}

export interface StyleTypeOperation extends StyleOprationRowState {
  subjectId_3?: bool;
  baseSubTaxReq?: bool;
  subjectId_2?: bool;
  subjectId_4?: bool;
}
export interface ForthStepType {
  setEditRowGoods: React.Dispatch<React.SetStateAction<{}>>;
}

export interface SecondStepsType {
  disabledDiv: bool;
  setDisabledDiv: React.Dispatch<React.SetStateAction<bool>>;
}

export interface ShowModal extends StyleTypeOperation {
  showAddModal: any;
  setShowAddModal: any;
}

export interface FirstStepType {
  shadowStyle: bool;
  setShadowStyle: React.Dispatch<React.SetStateAction<bool>>;
  shadowStylePattern: bool;
  setShadowStylePattern: React.Dispatch<React.SetStateAction<bool>>;
  pattern: any;
}

export interface AddTableGoodsType extends StyleTypeOperation {
  handleAddItems: (data: ValidSteps) => void;
  showAddModal: any;
  setShowAddModal: any;
  editRowGoods: any;
  fixCurrencyOptionType?: any;
  setEditRowGoods: React.Dispatch<React.SetStateAction<{}>>;
  currIR?: any;
}

export interface AllCurrencyType {
  id?: num | str;
  title?: num | str;
  abbreviation?: str;
  country?: str;
  currencyCode?: str;
  nameEn?: str | null;
  nameFa?: str;
}

export interface PaginationTableType {
  page?: num;
  sizePerPage?: num;
  totalSize?: num;
  totalPages?: num;
}

export interface BillListItems {
  billPattern: str;
  buyerPerson: str;
  createDate: str;
  patternId: num | str;
  typeId: num | str;
  id: num;
  issueDate: str;
  serial: str | null;
  status: str;
  subject: str;
  taxId: str;
}

export interface ServiceBillList {
  hasNextPage: bool;
  hasPreviousPage: bool;
  items: BillListItems[];
  pageNumber: num;
  pageSize: num;
  totalCount: num;
  totalPages: num;
}

export interface AllServiceMaster {
  code: num;
  message?: str;
  result?: ServiceBillList;
}

export interface BillList {
  taxId?: str;
  buyerPersonCode?: num;
  stautsId?: num;
  serial?: str;
  issueDate?: str;
  createDate?: str;
  page?: num;
  size?: num;
}

export interface PersonBuyerTable {
  buyerBranchCode?: str;
  companyName?: null | str;
  economicCode?: str;
  firstName?: str;
  lastName?: str;
  passportNumber?: str | num;
  personCode?: str;
  personTypeId?: any;
  postCode?: str;
  editeMode?: bool;
}

export interface Role {
  billSerial?: str;
  name?: str;
  economicCode?: str;
  lastName?: str;
  memoryId?: str;
  nationalId?: str;
  refreshToken?: str;
  sessionExpireTime?: num;
  token?: str;
}

export interface FieldsAddTableGoodsType {
  setShowSettlementMod: React.Dispatch<React.SetStateAction<boolean>>;
  fixCurrencyOptionType: SelectOption;
  disableOtherTax: bool;
  setDisableOtherTax: React.Dispatch<React.SetStateAction<boolean>>;
  tooltip: JSX.Element;
  disableOtherLegalFunds: bool;
  setDisableOtherLegalFunds: React.Dispatch<React.SetStateAction<boolean>>;
  state: {
    subjectId: num;
  };
}

export interface TableStepValues {
  templateGoods?: boolean;
  acceptanceNumber?: str | num;
  payerCardNumber?: str | num;
  payerCodeNumber?: str | num;
  paymentSwitchNumber?: str | num;
  trackingNumber?: str | num;
  valueIncreasedTaxRate?: str | num | null;
  itemValueIncreasedTaxPrice?: str | num;
  otherTaxRate?: str | num;
  priceBeforeDiscount?: str | num;
  otherTaxPrice?: num;
  otherLegalFundsRate?: num;
  otherLegalFundsPrice?: num;
  measurementUnitCode?: SelectOption;
  otherTaxSubject?: num;
  otherLegalFundsSubject?: num;
  registerContractId?: num;
  commission?: num;
  constructionFee?: any;
  equivalentWithRial?: num;
  serviceOrProductId?: num;
  sellerProfit?: num;
  description?: str;
  paymentDate?: Date | null | str;
  currencyCode?: str | num;
  terminalNumber?: str | num;
  paidAmount?: str | num;
  paymentType?: str;
  count?: str | num;
  settlementType?: str | num;
  totalItemsPrice?: str | num;
  CurrencyId?: str | num;
  priceAfterDiscount?: str | num;
  unitPrice?: str;
  numGoods?: str;
  discount?: str | num;
  des?: str;
  currencyTypeGoods?: SelectOption | null;
  goodsNoun?: str | num;
  paymentAmount?: str;
  paymantMethod?: null;
  weigth?: str;
  date?: Date | null;
  datePay?: Date | null;
  expenses?: str | num;
  id?: str | num;
  goodsType?: SelectOption | null;
  title?: str;
}

export interface Toastify {
  title: str;
  bg: str;
  show: bool;
}

export type ValidatorFunction = (value: any, param?: any) => true | str;

export interface FormErrors {
  [key: str]: str[];
}

export interface Filters {
  [key: str]: any;
}

export interface CurrencyType {
  abbreviation: str;
  country: str;
  currencyCode: str;
  nameEn: null | str | num;
  nameFa: str;
}

export interface StepOneField {
  DebtPrice: str;
  settlementType: str;
  issueDate: str;
  BillPatternTypeId: null | str | num;
  nameFa: str;
}
export interface Role {
  lastName?: str;
  name?: str;
  refreshToken?: str;
  sessionExpireTime?: num;
  keysunMemoryId?: str;
  token?: str;
}

export interface PatternTypeId {
  subjectId?: num | str;
  billType?: SelectOption | null;
  billPattern?: SelectOption | null;
}

export interface Login {
  loadingName?: str;
  username?: str | null;
  password?: str | null;
  session?: {
    browserName?: str;
    browserVersion?: str;
    operatingSystem?: str;
  };
  activationCode?: num;
}

export interface SelectOption {
  id?: num | str;
  title?: str;
}

export interface ServiceGetField extends SelectOption {
  patternId?: str | num;
  typeId?: str | num;
  subjectId?: str | num;
}

export interface BillId {
  id?: num;
  billId?: num;
}

export interface SignUpAccount extends Login {
  name?: str | null;
  strategyType?: SelectOption;
  PrivateKey?: str;
  nationalCode?: str;
  lastName?: str | null;
  nationalId?: str | null;
  personTypeId?: any;
  mobileNumber?: str | null;
  birthDate?: any;
  twoStageLogin?: num | null;
  confirmPassword?: str | null;
  economicCode?: str | null;
  memoryId?: str | null;
}

export interface UpdateAccount extends SignUpAccount {
  keysunUsername?: str;
  keysunPassword?: str;
  shouldKeysunInfoBeUpdated?: bool;
  keysunMemoryId?: str;
}

// export interface  {
//   name: "",
//   lastName: "",
//   password: "",
//   mobilenum: "",
//   username: "",
//   nationalCode: "",
//   birthDate: ""
// }


export interface GeneralLayoutType {
  children: JSX.Element[] | JSX.Element

}

export interface BuyerPersonFilterField {
  loadingName?: str;
  personCode?: str;
  economicCode?: str;
  postCode?: str;
  buyerBranchCode?: str;
  passportNumber?: str;
  firstName?: str;
  lastName?: str;
  companyName?: str;
  pageNumber?: num;
  pageSize?: num;
  BuyerPersonCode?: str | num;
}
export interface ValidSteps extends BuyerPersonFilterField {
  billSerial?: str | num;
  personTypeDescription?: str | num;
  paymentDate?: Date | null;
  SellerBranchCode?: str | num;
  CustomsLicenseNumber?: str | num;
  creditPrice?: str | num;
  CustomsCode?: str | num;
  CotageNumber?: str | num;
  RegistrationNumber?: str | num;
  SubscriptionNumber?: str | num;
  Article17TaxPrice?: str | num;
  CotageDate?: str | num;
  FlightType?: str | num;
  terminalNumber?: str | num;
  paidAmount?: str | num;
  paymentType?: SelectOption | null;
  itemValueIncreasedTaxPrice?: str | num;
  currencyCode?: str | num;
  BillPatternTypeId?: SelectOption;
  issueDate?: Date | any;
  settlementType?: str | num;
  DebtPrice?: Date | any;
  personTypeId?: SelectOption;
  PersonCode?: str;
  EconomicCode?: str;
  buyerPersonId?: str;
  PostCode?: str;
  BuyerBranchCode?: str;
  serviceOrProductId?: num;
  unitPrice?: str;
  priceBeforeDiscount?: str | num;
  discount?: str;
  priceAfterDiscount?: str | num;
  valueIncreasedTaxRate?: num | str | null;
  otherTaxRate?: str | num;
  otherTaxPrice?: num;
  otherTaxSubject?: num;
  otherLegalFundsRate?: num;
  otherLegalFundsPrice?: num;
  otherLegalFundsSubject?: num;
  registerContractId?: num;
  totalItemsPrice?: str | num;
  count?: str | num;
  commission?: num;
  constructionFee: any;
  equivalentWithRial?: num;
  sellerProfit?: num;
  MeasurementUnitId?: SelectOption;
  CurrencyId?: SelectOption;
  description?: str;
  measurementUnitCode?: SelectOption;
  id?: str | num;
}

export interface TablePostSteps {
  inputModel: {
    specialOrGeneral?: str;
    vat?: num;
    vatCustomPurposes?: num;
    descriptionOfID?: str;
    taxableOrFree?: str;
    type?: str;
    code?: str;
    page?: num;
    size?: num;
    stuffCode?: str;
    description?: str;
    stuffType?: num;
  };
}

export interface BillItems {
  serviceOrProductId?: str | num;
  description?: str | num;
  count?: str | num;
  measurementUnitCode?: str | num;
  unitPrice?: str | num;
  currencyCode?: str;
  priceBeforeDiscount?: str | num;
  discount?: str | num;
  priceAfterDiscount?: str | num;
  equivalentWithRial?: str | num;
  valueIncreasedTaxRate?: str | num;
  itemValueIncreasedTaxPrice?: str | num;
  otherTaxRate?: str | num;
  otherTaxPrice?: str | num;
  otherTaxSubject?: str | num;
  otherLegalFundsRate?: str | num;
  otherLegalFundsPrice?: str | num;
  otherLegalFundsSubject?: str | num;
  registerContractId?: str | num;
  constructionFee: any;
  sellerProfit?: str | num;
  commission?: str | num;
  totalItemsPrice?: str | num;
}

export interface HookForm {
  control?: any;
  watch?: any;
  register?: any;
  getValues?: any;
  errors?: any;
  clearErrors?: any;
  resetField?: any;
  reset?: any;
  setValue?: any;
  handleSubmit?: any;
  setError?: any;
}

export interface Checkout {
  inputModel: {
    bill?: {
      referenceTaxId?: str | num | null;
      billSerial?: str | num;
      billPatternId?: str;
      billTypeId?: str;
      id?: num | str;
      issueDate?: any;
      billPatternTypeId?: str | num;
      buyerPersonId?: str | num;
      flightType?: num;
      customsLicenseNumber?: str | num;
      customsCode?: str | num;
      cotageNumber?: str | num;
      cotageDate?: any;
      subjectType?: str | num;
      registrationNumber?: str | num;
      subscriptionNumber?: str | num;
      settlementType?: str | num;
      creditPrice?: str | num | null;
      personTypeId?: str | num;
      sellerBranchCode?: str | num;
      buyerBranchCode?: str | num;
      article17TaxPrice?: null | num;
      buyerPerson?: {
        id: str | num;
        personTypeId: str | num;
        personTypeDescription: str | num;
        personCode: str | num;
        economicCode: str | num;
        postCode: str | num;
        passportNumber: str | num;
        firstName: str | num;
        lastName: str | num;
        companyName: str | num;
      };
    };
    billItems?: BillItems[];
    billPayments?: BillPaymentsType[];
  };
}

export interface BillPaymentsType {
  paymentDate?: str | num;
  paidAmount?: str | num;
  paymentType?: str | num;
  payerCardNumber?: str | num;
  payerCodeNumber?: str | num;
  acceptanceNumber?: str | num;
  terminalNumber?: str | num;
  trackingNumber?: str | num;
  paymentSwitchNumber?: str | num;
  description?: str | num;
  paymentDescription?: str | num;
  id?: str | num;
}

export interface FAQType {
  question: string;
  answer: string;
  id?: number;
}

export interface BatchEntryPageType {
  billsErrors: ZodIssue | undefined;
  setBillsErrors: React.Dispatch<React.SetStateAction<any[][]>>;
  excelBase64: str;
  setExcelBase64: React.Dispatch<React.SetStateAction<str>>;
}


export interface IconPropsType {
  color?: string;
  className?: string;
  id?: string;
  gradient?: React.ReactNode;
}

export interface ContactUsType {
  name: string;
  phoneNumber: number;
  email: string;
  message: string;
}

export interface ErrorsType {
  type?: string;
  message?: string;
  ref?: object;
}
