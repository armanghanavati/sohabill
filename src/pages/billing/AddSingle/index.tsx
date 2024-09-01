import { useEffect, useState } from "react";
import BillingInformation from "./BillingInformation";
import {
  HookForm,
  SelectOption,
  SerGetBillInitializeData,
  ValidSteps,
} from "../../../models/AllData.model";
import GoodsInformation from "./GoodsInformation";
import {
  NavigationType,
  useLocation,
  useNavigate,
  useNavigationType,
  useParams,
} from "react-router-dom";
import asyncWrapper from "../../../utils/asyncWrapper";
import { getBill, getFields, tempData } from "../../../services/masterServices";
import AdditionalFilelds from "./AdditionalFields";
import { handleLoading, RsetShowModal } from "../../../common/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import BuyerInformation from "./BuyerInformation";
import { SelectedItems } from "../../../components/LiveSearch";
import SaveAndSendData from "./SaveAndSendData";
import Total from "./Total";
import { useForm } from "react-hook-form";
import StringHelpers from "src/helpers/string-helpers";
import useSendData from "./SaveAndSendData/useSendData";

interface CheckStatusItem {
  name: string;
  status: number;
}

interface AddSinglePropsType {
  billInitializeData?: SerGetBillInitializeData;
  selectedTab?: string;
}

const AddSingle: React.FC<AddSinglePropsType> = ({
  billInitializeData,
  selectedTab,
}) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch,
    handleSubmit,
  } = useForm<ValidSteps>({
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const { main } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const navType: NavigationType = useNavigationType();
  const params = useParams();
  const dispatch = useAppDispatch();
  let { state } = useLocation();

  const [selectedItemGoods, setSelectedItemGoods] = useState<SelectedItems>({
    result: [],
    isShowSearchResult: false,
  });
  const [selectedItemBuyer, setSelectedItemBuyer] = useState<SelectedItems>({
    result: null,
    isShowSearchResult: false,
  });
  const [checkStatus, setCheckStatus] = useState<CheckStatusItem[]>([]);

  const [saveBills] = useSendData({
    getValues,
    reset,
    selectedItemGoods,
    selectedItemBuyer,
    setSelectedItemBuyer,
    setSelectedItemGoods,
    watch,
  });

  const calledGetBill = asyncWrapper(async () => {
    dispatch(handleLoading({ loading: true }));
    const response = await getBill(
      params?.id as unknown as number,
      Number(params?.subjectTypeId),
    );

    if (response?.data?.code === 0) {
      dispatch(handleLoading({ loading: false }));

      const subjectType = billInitializeData?.subjectTypes?.filter(
        (item) => item.id === response.data?.result?.subjectType?.toString(),
      )[0];

      const values: Record<string, unknown> = {
        billPatternId: response.data?.result?.bill?.billPatternId,
        billTypeId: response.data?.result?.bill?.billTypeId,
        billSerial: response.data?.result?.bill?.billSerial,
        issueDate: response.data?.result?.bill?.issueDate,
        subjectType: subjectType?.title,
        subjectTypeId: subjectType?.id,
        sellerBranchCode: response.data?.result?.bill?.sellerBranchCode,
        customsCode: response.data?.result?.bill?.customsCode,
        cotageNumber: response.data?.result?.bill?.cotageNumber,
        customsLicenseNumber: response.data?.result?.bill?.customsLicenseNumber,
        flightType: response.data?.result?.bill?.flightType,
        registrationNumber: response.data?.result?.bill?.registrationNumber,
        buyerBranchCode: response.data?.result?.bill?.buyerBranchCode,
        subscriptionNumber: response.data?.result?.bill?.subscriptionNumber,
        article17TaxPrice: response.data?.result?.bill?.article17TaxPrice,
        cotageDate: response.data?.result?.bill?.cotageDate,
        settlementType: response.data?.result?.bill?.settlementType,
      };
      for (const key in values) {
        const typedKey = key as keyof ValidSteps;
        setValue(typedKey, values[typedKey]);
      }
      setSelectedItemGoods((prevState) => ({
        ...prevState,
        result: response.data?.result?.billItems,
      }));

      setSelectedItemBuyer((prev: SelectedItems) => ({
        ...prev,
        result: response?.data?.result?.bill?.buyerPersonId,
      }));

      getField();
    }
    dispatch(RsetShowModal({ ...main.showModal, showModal2: false }));
  });

  const getField = asyncWrapper(async () => {
    if (!!getValues("billPatternId")?.id && !!getValues("billTypeId")?.id) {
      dispatch(handleLoading({ loading: true }));
      const response = await getFields(
        getValues("billPatternId")?.id,
        getValues("billTypeId")?.id,
        getValues("subjectTypeId"),
      );
      dispatch(handleLoading({ loading: false }));
      setCheckStatus(response?.data?.result);
      dispatch(RsetShowModal({ ...main.showModal, showModal2: false }));
    }
  });

  const getTempData = asyncWrapper(async (idGoods: string) => {
    const tempValue = getValues!();
    dispatch(handleLoading({ loading: true }));
    const allData = {
      selectedItemGoods: selectedItemGoods,
      selectedItemBuyer: selectedItemBuyer,
      inputValue: {
        ...tempValue,
        issueDate: StringHelpers.convertDatePer(getValues!("issueDate")),
        cotageDate: StringHelpers.convertDatePer(getValues!("cotageDate")),
      },
    };
    const postDataJson = JSON.stringify(allData);
    const readData = {
      id: idGoods,
      data: "",
    };

    const postData = {
      id: StringHelpers.randomId(),
      data: postDataJson,
    };
    const response = await tempData(idGoods ? readData : postData);
    dispatch(handleLoading({ loading: false }));
    if (response.data.code === 0) {
      const getId = JSON.parse(response?.config?.data);
      if (idGoods) {
        const responseData = JSON.parse(response?.data?.result);
        const data = JSON.parse(responseData?.Data);
        setSelectedItemGoods!(data?.selectedItemGoods);
        setSelectedItemBuyer!(data?.selectedItemBuyer);
        reset!(data?.inputValue);
      } else {
        if (params?.id && params?.subjectTypeId) {
          navigate(`/users/addGoods`, {
            state: {
              goodsId: getId?.id,
              id: params?.id,
              subjectTypeId: params?.subjectTypeId,
              taxId: params?.taxId,
            },
          });
        } else {
          navigate(`/users/addGoods`, { state: { goodsId: getId?.id } });
        }
      }
    }
  });

  const handleOnMount = () => {
    if (navType === "POP") {
      // DO SOMETHING HERE
      state = "";
    }
    if (state?.goodsId && state?.goodsId?.match(/^[0-9a-zA-Z]{20}$/)) {
      getTempData(state?.goodsId);
    } else if (!!billInitializeData && params["*"]?.includes("editBill")) {
      calledGetBill();
    }

    const subject = billInitializeData?.subjectTypes?.find(
      (item: SelectOption) => item?.title === "اصلی",
    )?.title;
    setValue("subjectType", subject);
  };

  useEffect(() => {
    if (selectedTab === "1" || params["*"] !== "billing") handleOnMount();
  }, []);

  const handleCheckStatus = (nameField: string) => {
    if (checkStatus?.length) {
      const filter = checkStatus?.find(
        (item) => item.name === nameField,
      )?.status;
      return filter;
    }
  };

  function compareShamsiDates(cotageDate: string, issueDate: string) {
    const date1Time = new Date(cotageDate).getTime();
    const date2Time = new Date(issueDate).getTime();
    return date1Time < date2Time ? true : false;
  }

  const childProps = {
    control,
    errors,
    getValues,
    setValue,
  };

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <BillingInformation
        billInitializeData={billInitializeData}
        {...childProps}
        handleCheckStatus={handleCheckStatus}
        getField={getField}
        compareShamsiDates={compareShamsiDates}
      />
      <div className="tw-flex tw-flex-col tw-gap-8">
        {getValues("billPatternId")?.id !== "7" && (
          <BuyerInformation
            selectedItem={selectedItemBuyer}
            setSelectedItem={setSelectedItemBuyer}
            billInitializeData={billInitializeData}
            getValues={getValues}
          />
        )}
        <GoodsInformation
          selectedItem={selectedItemGoods}
          setSelectedItem={setSelectedItemGoods}
          billInitializeData={billInitializeData}
          checkStatus={checkStatus}
          subjectTypeIdGoods={getValues("subjectTypeId")}
          salesPattern={getValues("billPatternId")}
          getValues={getValues}
          reset={reset}
          selectedItemBuyer={selectedItemBuyer}
          setSelectedItemBuyer={setSelectedItemBuyer}
          getTempData={getTempData}
        />
        <AdditionalFilelds
          billInitializeData={billInitializeData}
          {...childProps}
          compareShamsiDates={compareShamsiDates}
        />
        <Total selectedItemGoods={selectedItemGoods} />
        <SaveAndSendData saveBills={saveBills} handleSubmit={handleSubmit} />
      </div>
    </form>
  );
};

export default AddSingle;
