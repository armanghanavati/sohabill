import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../store/store";
import {
  SelectOption,
  TableStepValues,
  TablePostSteps,
  Checkout,
  PersonBuyerTable,
  ValidSteps,
  BillItems,
  FieldsReq,
  ReduxToolkitType,
  BillList,
  ServiceBillList,
  AllServiceMaster,
  CurrencyType,
  ServiceGetField,
  PatternTypeId,
  BillId,
} from "../../models/AllData.model";
import { FormEvent } from "react";
import {
  RsetMessageModal,
  handleLoading,
  RsetShowLoadingBtn,
  RsetShowModal,
  RsetShowToast,
} from "./mainSlice";
import {
  getBillInitializeData,
  getBuyerPersonList,
  getPersonBuyer,
  getServiceProductList,
  saveBill,
  upsert,
  billTypeId,
  getFields,
  upsertBuyerPerson,
  getBillsList,
  getBill,
  PrintBill,
  updateBill,
  removeBill,
} from "../../services/masterServices";
import persian_en from "react-date-object/locales/persian_en";
import persian from "react-date-object/calendars/persian";
import StringHelpers from "../../helpers/string-helpers";
import TaxHelpers from "../../helpers/tax-helpers";
import { BuyersListType } from "src/pages/buyersList/types";

interface taxState {
  printBill?: any;
  billItem?: any;
  allBillList?: ServiceBillList;
  disableFields?: any;
  priceBeforeDiscount?: string;
  settlementTable: any;
  disableSaveBtn: boolean;
  personTypeId: number;
  allFieldSteps: any;
  perStatusFields: FieldsReq[];
  desGoods?: string;
  infoBuyer: boolean;
  stepsInfoList: any;
  allinvoiceTempOptions: any[];
  productList: any;
  listPay: any[];
  weigthGoods: string;
  expensesGoods: string;
  paymentAmount: string;
  personBuyer: SelectOption | null;
  multiCode: string | number;
  isReqStepsDate: boolean;
  isDisable: boolean;
  isReqStepsCombo: boolean;
  isReqStepsInput: boolean;
  personBuyerList: any;
  patternTypeId: PatternTypeId;
  pattern: SelectOption[];
  buyerPersonFilterField: BuyersListType;
}
interface MyData {}
interface MyKnownError {
  errorMessage: string;
}
const initialState: taxState = {
  billItem: {},
  printBill: {},
  allBillList: {
    hasNextPage: false,
    hasPreviousPage: false,
    items: [],
    pageNumber: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
  },
  buyerPersonFilterField: {},
  pattern: [],
  patternTypeId: null || { billType: {}, billPattern: {} },
  disableFields: {},
  priceBeforeDiscount: "",
  personTypeId: 0,
  disableSaveBtn: false,
  settlementTable: {},
  allFieldSteps: {},
  isReqStepsInput: false,
  isDisable: false,
  isReqStepsDate: false,
  isReqStepsCombo: false,
  perStatusFields: [],
  stepsInfoList: {},
  allinvoiceTempOptions: [],
  multiCode: "",
  desGoods: "",
  infoBuyer: true,
  expensesGoods: "",
  weigthGoods: "",
  productList: [],
  listPay: [],
  paymentAmount: "",
  personBuyer: {},
  personBuyerList: {},
};

// -> handle get invoice temp
export const handleGetInvoiceTemp = createAsyncThunk(
  "tax/handleGetInvoiceTemp",
  async (obj, { dispatch, getState }) => {
    try {
      dispatch(handleLoading({ loading: true }));
      const resHandleInvoiceTemp = await getBillInitializeData();
      console.log(resHandleInvoiceTemp);
      dispatch(handleLoading({ loading: false }));
      return resHandleInvoiceTemp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

//-> setting invoice temp
export const handleBuyerPersonList = createAsyncThunk(
  "tax/handleBuyerPersonList",
  async (data: BuyersListType, { dispatch, getState }) => {
    const postData: BuyersListType = {
      query: "",
      pageNumber: data?.pageNumber || 1,
      pageSize: data?.pageSize || 10,
    };
    try {
      dispatch(handleLoading({ loading: TransformStreamDefaultController }));
      const resBuyerPersonList = await getBuyerPersonList(postData);
      console.log(resBuyerPersonList);

      dispatch(handleLoading({ loading: false }));
      if (resBuyerPersonList.data.code === 0) {
        dispatch(RsetPersonBuyerList(resBuyerPersonList?.data?.result));
      } else {
        dispatch(
          RsetShowToast({
            show: true,
            title: resBuyerPersonList?.data?.message,
            bg: "danger",
          }),
        );
      }
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

//-> handle product table
export const handleGetServiceProductList: ReduxToolkitType = createAsyncThunk(
  "tax/handleGetServiceProductList",
  async (data: undefined | any, { dispatch, getState }) => {
    console.log(data);
    dispatch(handleLoading({ loading: true, btnName: data?.loadingName }));
    const postData: TablePostSteps = {
      inputModel: {
        page: data?.pageNumber || 1,
        size: data?.pageSize || 10,
        code: data?.code || "",
        type: "",
        specialOrGeneral: "",
        taxableOrFree: "",
        vat: 0,
        vatCustomPurposes: 0,
        descriptionOfID: data?.descriptionOfID || "",
      },
    };
    console.log(postData);
    try {
      const resGetServiceProductList = await getServiceProductList(postData);
      dispatch(handleLoading({ value: false, btnName: "" }));
      if (resGetServiceProductList?.data.code === 0) {
        dispatch(RsetSettlementTable(resGetServiceProductList?.data?.result));
      }
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

// -> handle get Bills List
export const handleGetBillsList = createAsyncThunk(
  "tax/handleGetBillsList",
  async (obj: any, { dispatch, getState }) => {
    dispatch(handleLoading({ loading: true, btnName: obj?.loadingName }));
    console.log(obj);
    // billSerialSearching
    const postData: BillList = {
      taxId: obj?.taxId || "",
      buyerPersonCode: obj?.buyerPersonCode || "",
      stautsId: obj?.stautsId?.id || 0,
      serial: obj?.serial || "",
      issueDate: StringHelpers.convertDatePer(obj?.issueDate) || "",
      createDate: StringHelpers.convertDatePer(obj?.createDate) || "",
      page: obj?.pageNumber || 1,
      size: obj?.pageSize || 10,
    };
    try {
      const resGetFields = await getBillsList(postData);
      dispatch(handleLoading({ value: false, btnName: "" }));
      return resGetFields.data;
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

// -> handle edit bill
export const handleGetBill = createAsyncThunk(
  "tax/handleGetBill",
  async (billId: number, { dispatch, getState }: any) => {
    const { productList, allFieldSteps } = getState()?.tax;
    try {
      dispatch(handleLoading({ loading: true }));
      const resGetBill = await getBill(billId);
      console.log(resGetBill?.data?.result);
      dispatch(handleLoading({ loading: false }));
      dispatch(
        RsetAllFieldSteps({
          rowTableBuyerPer: resGetBill?.data?.result?.bill?.buyerPersonId,
          editBillItem: resGetBill?.data?.result?.bill,
        }),
      );
      dispatch(RsetProductList([...resGetBill?.data?.result?.billItems]));
      dispatch(RsetListPay([...resGetBill?.data?.result?.billPayments]));
      // setPaginationOption((prev: any) => ({
      //   ...prev,
      //   page: data || 1,
      // }));
      // return resGetBill.data
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

//-> handle get fileds
export const handleGetFields: ReduxToolkitType = createAsyncThunk(
  "tax/handleGetFields",
  async (obj: ServiceGetField, { dispatch, getState }: any) => {
    try {
      const { patternTypeId } = getState().tax;

      const resGetFields = await getFields(
        obj?.patternId || patternTypeId?.billPattern?.id,
        obj?.typeId || patternTypeId?.billType?.id,
        obj?.subjectId,
      );
      dispatch(RsetPerStatusFields(resGetFields?.data?.result));
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

//-> handle Remove Bill
export const handleRemoveBill: ReduxToolkitType = createAsyncThunk(
  "tax/handleRemoveBill",
  async (obj: BillId, { dispatch, getState }: any) => {
    try {
      const resRemoveBill = await removeBill(obj?.billId);
      // dispatch(RsetPerStatusFields(resGetFields?.data?.result));
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

// -> چاپ صورت حساب
export const handlePrintBill = createAsyncThunk(
  "tax/handlePrintBill",
  async (billId: number, { dispatch, getState }: any) => {
    dispatch(handleLoading({ loading: true }));
    try {
      const res = await PrintBill(billId);
      dispatch(handleLoading({ loading: false }));
      return res.data;
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

// post Save And Upsert Data
export const postSaveAndUpsertData = (obj: any) => {
  const allCountList = obj?.productList?.map((item: any, index: number) => {
    console.log(Number(item?.valueIncreasedTaxRate));

    return {
      serviceOrProductId: item?.serviceOrProductId || null,
      description: item?.description || null,
      count: item?.count || null,
      measurementUnitCode: item?.measurementUnitCode?.id || null,
      unitPrice: StringHelpers.operationRemoveSep(item?.unitPrice) || null,
      currencyCode:
        (item?.currencyCode?.id ?? item?.currencyCode?.abbreviation) || null,
      priceBeforeDiscount:
        StringHelpers.operationRemoveSep(item?.priceBeforeDiscount) || null,
      discount: StringHelpers.operationRemoveSep(item?.discount) || null,
      priceAfterDiscount:
        StringHelpers.operationRemoveSep(item?.priceAfterDiscount) || null,
      equivalentWithRial:
        StringHelpers.operationRemoveSep(item?.equivalentWithRial) || null,
      valueIncreasedTaxRate:
        item?.valueIncreasedTaxRate === ""
          ? null
          : Number(item?.valueIncreasedTaxRate),
      itemValueIncreasedTaxPrice:
        StringHelpers.operationRemoveSep(item?.itemValueIncreasedTaxPrice) ||
        null,
      otherTaxRate:
        StringHelpers.operationRemoveSep(item?.otherTaxRate) || null,
      otherTaxPrice:
        StringHelpers.operationRemoveSep(item?.otherTaxPrice) || null,
      otherTaxSubject: item?.otherTaxSubject || null,
      otherLegalFundsRate: item?.otherLegalFundsRate || null,
      otherLegalFundsPrice:
        StringHelpers.operationRemoveSep(item?.otherLegalFundsPrice) || null,
      otherLegalFundsSubject: item?.otherLegalFundsSubject || null,
      registerContractId: item?.registerContractId || null,
      constructionFee:
        StringHelpers.operationRemoveSep(item?.constructionFee) || null,
      sellerProfit:
        StringHelpers.operationRemoveSep(item?.sellerProfit) || null,
      commission: StringHelpers.operationRemoveSep(item?.commission) || null,
      totalItemsPrice:
        StringHelpers.operationRemoveSep(item?.totalItemsPrice) || null,
    };
    //   unitPrice: StringHelpers.operationRemoveSep(obj?.productList[index]['unitPrice'] ?? item?.unitPrice) || null,
  });
  const allCountPay = obj?.listPay?.map((item: any, index: number) => {
    return {
      paymentDate:
        typeof item?.paymentDate === "object"
          ? StringHelpers.convertDatePer(item?.paymentDate)
          : item?.paymentDate || null,
      paidAmount: StringHelpers.operationRemoveSep(item?.paidAmount) || null,
      paymentType: item?.paymentType?.id || null,
      payerCardNumber: item?.payerCardNumber || null,
      payerCodeNumber: item?.payerCodeNumber || null,
      acceptanceNumber: item?.acceptanceNumber || null,
      terminalNumber: item?.terminalNumber || null,
      trackingNumber: item?.trackingNumber || null,
      paymentSwitchNumber: item?.paymentSwitchNumber || null,
      description: item?.description || null,
    };
  });

  const postData: Checkout = {
    inputModel: {
      bill: {
        id: 0,
        issueDate:
          typeof obj?.propsData?.step1_2?.issueDate === "object"
            ? StringHelpers.convertDatePer(obj?.propsData?.step1_2?.issueDate)
            : obj?.propsData?.step1_2?.issueDate || null,
        billPatternId: obj?.patternTypeId?.billPattern?.id || null,
        billTypeId: obj?.patternTypeId?.billType?.id || null,
        buyerPersonId: obj?.allFieldSteps?.rowTableBuyerPer?.id || null,
        flightType: obj?.propsData?.step1_2?.flightType?.id || null,
        customsLicenseNumber:
          obj?.propsData?.step1_2?.customsLicenseNumber || null,
        customsCode: obj?.propsData?.step1_2?.customsCode || null,
        cotageNumber: obj?.propsData?.step1_2?.cotageNumber || null,
        cotageDate:
          typeof obj?.propsData?.step1_2?.cotageDate === "object"
            ? StringHelpers.convertDatePer(obj?.propsData?.step1_2?.cotageDate)
            : obj?.propsData?.step1_2?.cotageDate || null,
        subjectType: obj?.propsData?.stateURL?.subjectId,
        referenceTaxId: obj?.propsData?.stateURL?.referenceTaxId || null,
        registrationNumber: obj?.propsData?.step1_2?.registrationNumber || null,
        subscriptionNumber: obj?.propsData?.step1_2?.subscriptionNumber || null,
        settlementType: obj?.propsData?.step1_2?.settlementType?.id || null,
        creditPrice:
          StringHelpers.operationRemoveSep(
            obj?.propsData?.step1_2?.creditPrice,
          ) || null,
        personTypeId: obj?.personTypeId?.id || null,
        sellerBranchCode: obj?.propsData?.step1_2?.sellerBranchCode || null,
        buyerBranchCode: obj?.propsData?.step1_2?.buyerBranchCode || null,
        article17TaxPrice:
          Number(
            StringHelpers.operationRemoveSep(
              obj?.propsData?.step1_2?.article17TaxPrice,
            ),
          ) || null,
        billSerial: obj?.propsData?.step1_2?.billSerial || null,
      },
      billItems: !!obj?.productList ? allCountList : [],
      billPayments: !!obj?.listPay ? allCountPay : [],
    },
  };

  return postData;
};

// -> save bill
export const handleSaveBill: ReduxToolkitType = createAsyncThunk(
  "tax/handleSaveBill",
  async (obj: any, { getState, dispatch }: any) => {
    const {
      allFieldSteps,
      invoiceTemp,
      listPay,
      productList,
      personTypeId,
      patternTypeId,
      billItem,
    } = getState().tax;
    const postData = postSaveAndUpsertData({
      allFieldSteps,
      invoiceTemp,
      listPay,
      billItem,
      productList,
      personTypeId,
      patternTypeId,
      propsData: obj,
    });
    dispatch(handleLoading({ loading: true }));
    console.log(postData);
    try {
      const resSaveBill = await saveBill(postData);
      dispatch(handleLoading({ loading: false }));
      if (resSaveBill?.data?.code === 0) {
        dispatch(
          RsetShowToast({
            show: true,
            title: resSaveBill?.data?.message,
            bg: "success",
          }),
        );
      }
      //(resSaveBill);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

// -> handle upsert
export const handleUpsert: ReduxToolkitType = createAsyncThunk(
  "tax/handleUpsert",
  async (obj: any, { getState, dispatch }: any) => {
    dispatch(handleLoading({ loading: true }));
    const {
      productList,
      disableFields,
      allFieldSteps,
      invoiceTemp,
      personTypeId,
      patternTypeId,
      listPay,
    } = getState().tax;
    const postData = postSaveAndUpsertData({
      allFieldSteps,
      invoiceTemp,
      listPay,
      productList,
      personTypeId,
      patternTypeId,
      propsData: obj,
    });
    try {
      const res = await upsert(postData);
      dispatch(handleLoading({ loading: false }));
      if (res?.data?.code === 0) {
        dispatch(
          RsetShowToast({
            show: true,
            title: res?.data?.message,
            bg: "success",
          }),
        );
        return res.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

// -> handle update bill
export const handleUpdateBill: ReduxToolkitType = createAsyncThunk(
  "tax/handleUpdateBill",
  async (obj: any, { getState, dispatch }: any) => {
    console.log("Hello world update");
    dispatch(handleLoading({ loading: true }));
    const {
      productList,
      disableFields,
      allFieldSteps,
      invoiceTemp,
      personTypeId,
      patternTypeId,
      listPay,
      billItem,
    } = getState().tax;

    const postData: Checkout = postSaveAndUpsertData({
      templateUpdate: true,
      billItem,
      allFieldSteps,
      invoiceTemp,
      listPay,
      productList,
      personTypeId,
      patternTypeId,
      propsData: obj,
    });

    console.log(postData);

    try {
      const res = await updateBill(postData);
      dispatch(handleLoading({ loading: false }));
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

// handle add buyer person
export const handleAddBuyerPerson: ReduxToolkitType = createAsyncThunk(
  "tax/handleAddBuyerPerson",
  async (obj: PersonBuyerTable, { dispatch, getState }: any) => {
    dispatch(handleLoading({ loading: true }));
    const { showModal } = getState().main;
    try {
      const postData: PersonBuyerTable = {
        personTypeId: obj?.personTypeId?.id,
        personCode: obj?.personCode,
        economicCode: obj?.economicCode,
        postCode: obj?.postCode,
        buyerBranchCode: obj?.buyerBranchCode,
        passportNumber: obj?.passportNumber,
        firstName: obj?.firstName,
        lastName: obj?.lastName,
        companyName: obj?.companyName,
      };
      console.log(postData);
      const resGetPersonBuyer = await upsertBuyerPerson(postData);
      dispatch(handleLoading({ loading: false }));
      if (resGetPersonBuyer.data.code === 0) {
        dispatch(
          RsetShowToast({
            show: true,
            title: resGetPersonBuyer?.data?.message,
            bg: "success",
          }),
        );
        dispatch(RsetShowModal({ ...showModal, showModal2: false }));
        dispatch(handleBuyerPersonList({}));
      }
    } catch (error) {
      console.log(error);
      throw Error;
    }
  },
);

const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {
    RsetBuyerPersonFilterField: (
      state,
      action: PayloadAction<BuyersListType>,
    ) => {
      return { ...state, buyerPersonFilterField: action.payload };
    },
    RsetPattern: (state, action: PayloadAction<SelectOption[]>) => {
      return { ...state, pattern: action.payload };
    },
    RsetPatternTypeId: (state, action: PayloadAction<PatternTypeId>) => {
      return { ...state, patternTypeId: action.payload };
    },
    RsetDisableFields: (state, action: PayloadAction<any>) => {
      return { ...state, disableFields: action.payload };
    },
    RsetPriceBeforeDiscount: (state, action: PayloadAction<string>) => {
      return { ...state, priceBeforeDiscount: action.payload };
    },
    RsetDisableSaveBtn: (state, action: PayloadAction<boolean>) => {
      return { ...state, disableSaveBtn: action.payload };
    },
    RsetPersonTypeId: (state, action: PayloadAction<any>) => {
      return { ...state, personTypeId: action.payload };
    },
    RsetSettlementTable: (state, action: PayloadAction<any>) => {
      return { ...state, settlementTable: action.payload };
    },
    RsetAllFieldSteps: (state, action: PayloadAction<any>) => {
      return { ...state, allFieldSteps: action.payload };
    },
    RsetPersonBuyerList: (state, action: PayloadAction<any>) => {
      return { ...state, personBuyerList: action.payload };
    },
    RsetBillItem: (state, action: PayloadAction<any>) => {
      return { ...state, billItem: action?.payload };
    },
    RsetIsReqStepsInput: (state, action: PayloadAction<boolean>) => {
      return { ...state, isReqStepsInput: action.payload };
    },
    RsetIsReqStepsDate: (state, action: PayloadAction<boolean>) => {
      return { ...state, isReqStepsDate: action.payload };
    },
    RsetIsReqStepCombo: (state, action: PayloadAction<boolean>) => {
      return { ...state, isReqStepsCombo: action.payload };
    },
    RsetIsDisable: (state, action: PayloadAction<boolean>) => {
      return { ...state, isDisable: action.payload };
    },
    RsetIsReqSteps: (state, action: PayloadAction<boolean>) => {
      return { ...state, isReqSteps: action.payload };
    },
    RsetPerStatusFields: (state, action: PayloadAction<FieldsReq[]>) => {
      return { ...state, perStatusFields: action.payload };
    },
    RsetStepsInfoList: (state, action: PayloadAction<any>) => {
      return { ...state, stepsInfoList: action.payload };
    },
    RsetMultiCode: (state, action: PayloadAction<string | number>) => {
      return { ...state, multiCode: action.payload };
    },
    RsetDesGoods: (state, action: PayloadAction<string>) => {
      return { ...state, desGoods: action.payload };
    },
    RsetInfoBuyer: (state, action: PayloadAction<boolean>) => {
      return { ...state, infoBuyer: action.payload };
    },
    RsetWeigthGoods: (state, action: PayloadAction<string>) => {
      return { ...state, weigthGoods: action.payload };
    },
    RsetExpensesGoods: (state, action: PayloadAction<string>) => {
      return { ...state, expensesGoods: action.payload };
    },
    RsetProductList: (state, actions: PayloadAction<any>) => {
      return { ...state, productList: actions.payload };
    },

    RsetListPay: (state, actions: PayloadAction<any[]>) => {
      return { ...state, listPay: actions.payload };
    },
    RsetPersonBuyer: (state, actions: PayloadAction<SelectOption | null>) => {
      return { ...state, personBuyer: actions.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        handleGetInvoiceTemp.fulfilled,
        (state, action: PayloadAction<any>) => {
          try {
            if (action.payload.code === 0) {
              return { ...state, stepsInfoList: action?.payload?.result };
            }
          } catch (error) {
            console.log(error);
            throw Error;
          }
        },
      )
      .addCase(
        handleGetBillsList.fulfilled,
        (state, action: PayloadAction<AllServiceMaster>) => {
          try {
            if (action.payload.code === 0) {
              return { ...state, allBillList: action?.payload?.result };
            }
          } catch (error) {
            console.log(error);
            throw Error;
          }
        },
      )
      // .addCase(handleGetBill.fulfilled, (state, action: PayloadAction<any>) => {

      //   return { ...state, billItem: action?.payload?.result }

      // })
      .addCase(
        handlePrintBill.fulfilled,
        (state, action: PayloadAction<any>) => {
          // return { ...state, printBill: { ...action?.payload?.result, counter: (state?.printBill || 0) + 1 } }
          return { ...state, printBill: action?.payload?.result };
        },
      );
    // .addCase(handleGetBillsList.pending, () => {
    //   console.log("pending handleGetBillsList");
    // })
    // .addCase(handleGetBillsList.rejected, () => {
    //   console.log("warning:rejected handleGetBillsList");
    // }).addCase(handleGetBill.pending, () => {
    //   console.log("pending handleGetBill");
    // })
    // .addCase(handleGetBill.rejected, () => {
    //   console.log("warning:rejected handleGetBill");
    // })
    // .addCase(handleGetInvoiceTemp.pending, () => {
    //   console.log("pending handleGetInvoiceTemp");
    // })
    // .addCase(handleGetInvoiceTemp.rejected, () => {
    //   console.log("warning:rejected handleGetInvoiceTemp");
    // })
  },
});

export const {
  RsetBillItem,
  RsetDisableFields,
  RsetPriceBeforeDiscount,
  RsetDisableSaveBtn,
  RsetPersonTypeId,
  RsetSettlementTable,
  RsetAllFieldSteps,
  RsetIsReqStepsInput,
  RsetPersonBuyerList,
  RsetIsReqStepCombo,
  RsetIsDisable,
  RsetIsReqStepsDate,
  RsetPerStatusFields,
  RsetStepsInfoList,
  RsetMultiCode,
  RsetDesGoods,
  RsetPersonBuyer,
  RsetListPay,
  RsetExpensesGoods,
  RsetWeigthGoods,
  RsetInfoBuyer,
  RsetPatternTypeId,
  RsetProductList,
  RsetPattern,
} = taxSlice.actions;

export const selectInfoBuyer = (state: RootState) => state.tax.infoBuyer;
export const selectDesGoods = (state: RootState) => state.tax.desGoods;
export const selectExpensesGoods = (state: RootState) =>
  state.tax.expensesGoods;
export const selectWeigthGoods = (state: RootState) => state.tax.weigthGoods;
export const selectListPay = (state: RootState) => state.tax.listPay;
export const selectPersonBuyer = (state: RootState) => state.tax.personBuyer;
export const selectMultiCode = (state: RootState) => state.tax.multiCode;
export const selectStepsInfoList = (state: RootState) =>
  state.tax.stepsInfoList;
export const selectAllinvoiceTempOptions = (state: RootState) =>
  state.tax.allinvoiceTempOptions;
export const selectPerStatusFields = (state: RootState) =>
  state.tax.perStatusFields;
export const selectIsDisable = (state: RootState) => state.tax.isDisable;

// req steps
export const selectIsReqStepsDate = (state: RootState) =>
  state.tax.isReqStepsDate;
export const selectIsReqStepsInput = (state: RootState) =>
  state.tax.isReqStepsInput;
export const selectIsReqStepCombo = (state: RootState) =>
  state.tax.isReqStepsCombo;

export default taxSlice.reducer;
