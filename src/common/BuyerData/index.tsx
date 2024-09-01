import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "src/components/Input";
import { PersonBuyerTable, ValidSteps } from "../../models/AllData.model";
import { Button } from "src/components/Button";
import { useAppDispatch, useAppSelector } from "src/hooks/hook";
import { validation } from "src/common/validations/personCodeValid";
import ComboBox from "../../components/ComboBox/index";
import asyncWrapper from "src/utils/asyncWrapper";
import { serBuyerUpdate, upsertBuyerPerson } from "src/services/masterServices";
import {
  handleLoading,
  RsetShowModal,
  RsetShowToast,
} from "src/common/slices/mainSlice";
import { useMediaQuery } from "react-responsive";
import ComboboxHelpers from "src/helpers/ComboBoxHelper";
import { BuyersListType } from "src/pages/buyersList/types";
type PropsAddSingle = {
  billInitializeData?: PersonBuyerTable;
  handleSaveBuyerInformation?: React.Dispatch<React.SetStateAction<any>>;
  prevData?: BuyersListType;
};
const BuyerData: React.FC<PropsAddSingle> = ({
  billInitializeData,
  handleSaveBuyerInformation = undefined,
  prevData = undefined,
}) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useForm<ValidSteps>({ reValidateMode: "onChange", mode: "onChange" });
  const { main } = useAppSelector((state) => state);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const getBillTypeId = asyncWrapper(async (obj: PersonBuyerTable) => {
    dispatch(handleLoading({ loading: true }));
    const postData: PersonBuyerTable = {
      id: !!prevData ? prevData?.id : undefined,
      personTypeId:
        (watch("personTypeId")?.id as number) || prevData?.personTypeId,
      personCode: obj?.personCode,
      economicCode: obj?.economicCode,
      postCode: obj?.postCode,
      buyerBranchCode: obj?.buyerBranchCode,
      passportNumber: obj?.passportNumber,
      firstName: obj?.firstName,
      lastName: obj?.lastName,
      companyName: obj?.companyName,
    };
    const response = await (!!prevData
      ? serBuyerUpdate(postData)
      : upsertBuyerPerson(postData));
    dispatch(handleLoading({ loading: false }));
    if (response.data.code === 0) {
      dispatch(
        RsetShowToast({
          show: true,
          title: response?.data?.message,
          bg: "success",
        }),
      );

      if (!!handleSaveBuyerInformation) {
        handleSaveBuyerInformation(response?.data?.result);
      }
      dispatch(RsetShowModal({ ...main.showModal, showModal2: false }));
      reset({
        personTypeId: {},
        personCode: "",
        economicCode: "",
        postCode: "",
        passportNumber: "",
        firstName: "",
        lastName: "",
        companyName: "",
      });
    }
  });

  useEffect(() => {
    reset({
      ...prevData,
      personTypeId: ComboboxHelpers?.getSelectedOptionFromId(
        prevData?.personTypeId,
        billInitializeData?.personTypes,
      ),
    });
  }, [prevData]);

  return (
    <form onSubmit={handleSubmit(() => getBillTypeId(getValues()))}>
      <div
        className={`${!!handleSaveBuyerInformation && "tw-mt-10"} tw-grid tw-grid-cols-2 tw-gap-x-7 tw-gap-y-7 lg:tw-grid-cols-3 lg:tw-gap-y-8`}
      >
        <Input
          maxLength={20}
          control={control}
          name="firstName"
          label="نام:"
          errors={errors.firstName}
          rules={{
            required: "لطفا نام را وارد کنید",
            minLength: {
              message: "نام حداقل باید 3 حرف باشد",
              value: 3,
            },
          }}
        />
        <Input
          control={control}
          maxLength={20}
          name="lastName"
          label="نام خانوادگی:"
          errors={errors.lastName}
          rules={{
            required: "لطفا نام خانوادگی را وارد کنید",
            minLength: {
              message: "نام خانوادگی حداقل باید 3 حرف باشد",
              value: 3,
            },
          }}
        />
        <div>
          <ComboBox
            control={control}
            name="personTypeId"
            label="نوع شخص خریدار:"
            errors={errors?.personTypeId}
            options={billInitializeData?.personTypes}
            rules={{
              required: "لطفا نوع شخص خریدار را تعیین کنید",
            }}
          />
        </div>
        <Input
          maxLength={12}
          control={control}
          name="personCode"
          label="شناسه/شماره ملی:"
          errors={errors.personCode}
          rules={{
            minLength: {
              message: "شناسه/شماره ملی حداقل باید 10 حرف باشد",
              value: 10,
            },
            validate: (value: number | string) => {
              const personType = watch("personTypeId")?.id;
              const economicCode = watch("economicCode");
              if (
                (personType === 1 && !!!economicCode && !!!value) ||
                (personType === 4 && !!!economicCode && !!!value)
              ) {
                return "لطفا شناسه/ شماره ملی را وارد کنیدِ";
              }
              if (
                watch("personCode")?.length !== 0 &&
                watch("personCode") !== undefined
              ) {
                if (
                  validation.legalNationalCodeOrNationalCode(
                    getValues()?.personCode,
                  ) !== true
                ) {
                  return "کد/شناسه ملی وارد شده صحیح نمی باشد";
                }
              }
              return true;
            },
          }}
        />
        <Input
          maxLength={14}
          control={control}
          name="economicCode"
          type="number"
          label="شماره اقتصادی:"
          errors={errors.economicCode}
          rules={{
            minLength: {
              message: "شماره اقتصادی حداقل باید 11 حرف باشد",
              value: 11,
            },
            validate: (value: number | string) => {
              const personType = watch("personTypeId")?.id;
              const economic = watch("economicCode");
              const personCode = watch("personCode");
              const postCode = watch("postCode");
              if (
                (personType === 1 &&
                  (!!!personCode || !!!postCode) &&
                  !!!value) ||
                (personType === 2 && !!!economic && !!!value) ||
                (personType === 3 && !!!economic && !!!value) ||
                (personType === 4 && (!!!personCode || !!!postCode) && !!!value)
              ) {
                return "لطفا شماره اقتصادی را وارد کنید";
              }
              return true;
            },
          }}
        />
        <Input
          maxLength={10}
          name="postCode"
          control={control}
          type="number"
          label="کد پستی:"
          errors={errors.postCode}
          rules={{
            minLength: {
              message: "کد پستی باید 10 حرف باشد",
              value: 10,
            },
            validate: {
              required: (value: number | string) => {
                const personType = watch("personTypeId")?.id;
                const economic = watch("economicCode");
                if (
                  (personType === 1 && !!!economic && !!!value) ||
                  (personType === 4 && !!!economic && !!!value)
                ) {
                  return "لطفا کد پستی را وارد کنیدِ";
                }
                return true;
              },
            },
          }}
        />
        <Input
          maxLength={9}
          control={control}
          name="passportNumber"
          label="شماره گذرنامه:"
          errors={errors.passportNumber}
          rules={{
            minLength: {
              message: "شماره گذرنامه باید 9 حرف باشد",
              value: 9,
            },
          }}
        />
        <Input control={control} name="companyName" label="نام شرکت:" />
      </div>
      <div
        className={`tw-float-end tw-mb-28 tw-mt-24 tw-flex tw-w-full tw-justify-end tw-gap-7 lg:tw-mb-4 lg:tw-mt-64 lg:tw-w-full`}
      >
        {!!handleSaveBuyerInformation && (
          <Button
            type="button"
            onClick={() => handleSaveBuyerInformation(null)}
            variant={`${isSmallScreen ? "gray" : "outLine_secondary"}`}
            size={`${isSmallScreen ? "full" : "sm"}`}
            title="لغو"
          />
        )}
        <Button
          type="submit"
          variant={"secondary"}
          size={`${isSmallScreen ? "full" : "sm"}`}
          title="ذخیره خریدار"
        />
      </div>
    </form>
  );
};

export default BuyerData;
