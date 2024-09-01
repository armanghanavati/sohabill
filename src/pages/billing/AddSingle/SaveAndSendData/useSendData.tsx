import { Checkout, SelectOption } from "../../../../models/AllData.model";
import {
  handleLoading,
  RsetShowToast,
} from "../../../../common/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hook";
import {
  saveBill,
  updateBill,
  upsert,
} from "../../../../services/masterServices";
import asyncWrapper from "../../../../utils/asyncWrapper";
import { useNavigate, useParams } from "react-router-dom";
import StringHelpers from "../../../../helpers/string-helpers";
import { SelectedItems } from "src/components/LiveSearch";

interface ResultType {
  id?: number;
  stuffCode?: string;
  internalCode?: string;
  stuffDesc?: string;
  count?: number;
  unitPrice?: number;
  vat?: number;
  otherTaxRate?: number;
  otherTaxPrice?: number;
  otherTaxSubject?: string;
  otherLegalFundsRate?: number;
  otherLegalFundsPrice?: number;
  otherLegalFundsSubject?: string;
  registerContractId?: string;
  constructionFee?: number;
  sellerProfit?: number;
  commission?: number;
  carat?: number;
  currency?: SelectOption;
  totalItemsPrice?: number;
  discount?: number;
  measurementUnit?: { id: string };
  equivalentWithRial?: number;
  rialValue?: number;
  netWeight?: number;
  currencyValue?: number;
}

interface SaveAndSendDataPropsType {
  getValues: any;
  watch: any;
  reset: any;
  selectedItemGoods: SelectedItems;
  selectedItemBuyer: SelectedItems;
  setSelectedItemGoods: React.Dispatch<React.SetStateAction<SelectedItems>>;
  setSelectedItemBuyer: React.Dispatch<React.SetStateAction<SelectedItems>>;
}

const useSendData = ({
  getValues,
  reset,
  selectedItemGoods,
  selectedItemBuyer,
  setSelectedItemBuyer,
  setSelectedItemGoods,
  watch,
}: SaveAndSendDataPropsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  const saveBills = asyncWrapper(async (data: string) => {
    const tempBillItems = selectedItemGoods?.result?.map((item: ResultType) => {
      return {
        serviceOrProductId: item.stuffCode || null,
        internalCode: item.internalCode || null,
        description: item.stuffDesc || null,
        count: item.count || null,
        measurementUnitCode:
          typeof item.measurementUnit === "string"
            ? item.measurementUnit
            : item.measurementUnit?.id || null,
        unitPrice: item.unitPrice || null,
        currencyCode:
          typeof item.currency === "string"
            ? item.currency
            : item.currency?.id || null,
        priceBeforeDiscount: 0,
        discount: item.discount || null,
        priceAfterDiscount: 0,
        equivalentWithRial:
          watch("billPatternId")?.id === "7" ? item?.equivalentWithRial : null,
        rialValue: watch("billPatternId")?.id === "7" ? item?.rialValue : null,
        netWeight: watch("billPatternId")?.id === "7" ? item?.netWeight : null,
        currencyValue:
          watch("billPatternId")?.id === "7" ? item?.currencyValue : null,
          valueIncreasedTaxRate:!!item?.vat || item?.vat === 0 ? item?.vat : null,
        itemValueIncreasedTaxPrice: 0,
        otherTaxRate: item.otherTaxRate || null,
        otherTaxPrice: null,
        otherTaxSubject: item.otherTaxSubject || null,
        otherLegalFundsRate: item.otherLegalFundsRate || null,
        otherLegalFundsPrice: null,
        otherLegalFundsSubject: item.otherLegalFundsSubject || null,
        registerContractId: "",
        constructionFee:
          watch("billPatternId")?.id === "3" ? item.constructionFee : null,
        sellerProfit:
          watch("billPatternId")?.id === "3" ? item.sellerProfit : null,
        commission: watch("billPatternId")?.id === "3" ? item.commission : null,
        carat: watch("billPatternId")?.id === "3" ? item.carat : null,
        totalItemsPrice: 0,
      };
    });
    const getDatas = getValues();
    dispatch(handleLoading({ loading: true }));
    const postData: Checkout = {
      inputModel: {
        bill: {
          id: 0,
          issueDate:
            typeof getDatas?.issueDate === "string"
              ? getDatas?.issueDate
              : StringHelpers.convertDatePer(getDatas?.issueDate),
          billPatternId: getDatas?.billPatternId?.id,
          billTypeId: getDatas?.billTypeId?.id,
          buyerPersonId: selectedItemBuyer?.result?.id,
          flightType: getDatas?.flightType?.id || null,
          customsLicenseNumber: getDatas?.customsLicenseNumber,
          customsCode: getDatas?.customsCode,
          cotageNumber: getDatas?.cotageNumber,
          cotageDate:
            typeof getDatas?.cotageDate === "string"
              ? getDatas?.cotageDate
              : StringHelpers.convertDatePer(getDatas?.cotageDate),
          subjectType: getDatas?.subjectTypeId | 1,
          registrationNumber: getDatas?.registrationNumber,
          subscriptionNumber: getDatas?.subscriptionNumber,
          settlementType: getDatas?.settlementType?.id,
          creditPrice: 0,
          personTypeId: 0,
          sellerBranchCode: getDatas?.sellerBranchCode,
          buyerBranchCode: getDatas?.buyerBranchCode,
          article17TaxPrice: getDatas?.article17TaxPrice || null,
          billSerial: getDatas?.billSerial,
          referenceTaxId:
            getDatas?.subjectTypeId === "1" ? null : params?.taxId,
          buyerPerson: {
            id: 0,
            personTypeId: 0,
            personTypeDescription: "",
            personCode: "",
            economicCode: "",
            postCode: "",
            passportNumber: "",
            firstName: "",
            lastName: "",
            companyName: "",
          },
        },
        billItems: tempBillItems,
        billPayments: [],
      },
    };

    const response = await (data === "send"
      ? upsert(postData)
      : data === "update"
        ? updateBill(postData)
        : saveBill(postData));
    dispatch(handleLoading({ loading: false }));
    if (response.data.code === 0) {
      dispatch(
        RsetShowToast({
          show: true,
          title: response?.data?.message,
          bg: "success",
        }),
      );
      reset({
        billSerial: "",
        issueDate: "",
        billTypeId: "",
        billPatternId: "",
        settlementType: "",
        sellerBranchCode: "",
        customsCode: "",
        cotageNumber: "",
        customsLicenseNumber: "",
        cotageDate: "",
        flightType: "",
        registrationNumber: "",
        buyerBranchCode: "",
        subscriptionNumber: "",
        article17TaxPrice: "",
        measurementUnitCode: "",
      });
      setSelectedItemBuyer({
        result: null,
        isShowSearchResult: false,
      });
      setSelectedItemGoods({
        result: [],
        isShowSearchResult: false,
      });
      navigate("/users/billsList");
    }
  });

  return [saveBills] as const;
};

export default useSendData;
