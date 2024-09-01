import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "src/components/Button";
import ComboBox from "src/components/ComboBox";
import Input from "src/components/Input";
import Modal from "src/components/Modal";
import asyncWrapper from "src/utils/asyncWrapper";
import {
  RsetMessageModal,
  handleLoading,
  RsetShowToast,
} from "../slices/mainSlice";
import { useEffect } from "react";
import { addGoods, editGoods, stuffDetail } from "src/services/masterServices";
import {
  AddGoodsInputModel,
  AddGoodsInterFace,
  GoodsModalsProps,
} from "./type";
import { useMediaQuery } from "react-responsive";
import Attention from "src/components/Attention";

// main component function--------------------------------------
function GoodsModals({
  openModal,
  setOpenModal,
  type = {
    editMode: false,
    taxAdditionMode: false,
    singleAdditionMode: false,
    singleEditMode: false,
  },
  billInitializeData,
  editData,
  refreshTable,
  setRefreshTable,
  getSelectedItem,
  checkStatus,
  subjectTypeId,
  salesPattern,
}: GoodsModalsProps) {
  // states--------------------------------------------------------
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  // this const for add default values for inputs in editMode----------------------
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
    trigger,
    setValue,
  } = useForm<AddGoodsInputModel>({
    reValidateMode: "onChange",
    mode: "onChange",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const defaultValues =
      type?.editMode || (type?.singleEditMode && editData)
        ? {
            stuffCode: editData?.stuffCode,
            internalCode: editData?.internalCode,
            vat: editData?.vat,
            unitPrice: editData?.unitPrice,
            discount: editData?.discount,
            otherTaxRate: editData?.otherTaxRate,
            otherTaxSubject: editData?.otherTaxSubject,
            otherLegalFundsRate: editData?.otherLegalFundsRate,
            otherLegalFundsSubject: editData?.otherLegalFundsSubject,
            stuffDesc: editData?.stuffDesc,
            currency: editData?.currencyObject,
            measurementUnit: editData?.measurementUnitObject,
            count: editData?.count,
            constructionFee: editData?.constructionFee,
            sellerProfit: editData?.sellerProfit,
            commission: editData?.commission,
            carat: editData?.carat,
            equivalentWithRial: editData?.equivalentWithRial,
            rialValue: editData?.rialValue,
            netWeight: editData?.netWeight,
            currencyValue: editData?.currencyValue,
          }
        : {
            stuffCode: editData?.stuffCode || undefined,
            internalCode:
              type.singleAdditionMode || type.singleEditMode
                ? editData?.internalCode || undefined
                : "",
            vat: type.taxAdditionMode ? editData?.vat : "",
            otherTaxRate: type.taxAdditionMode
              ? editData?.vatCustomPurposes
              : "",
          };

    reset(defaultValues);
  }, [openModal, editData]);

  //  function for get detail goods----------------------------------
  const getDetailGoods = asyncWrapper(async (id: number) => {
    dispatch(handleLoading({ loading: true }));
    const detailGoods = await stuffDetail(id);
    dispatch(handleLoading({ loading: false }));
    if (detailGoods?.data.code === 0) {
      reset(
        {
          ...detailGoods?.data?.result,
          currency: detailGoods?.data?.result?.currencyObject,
          measurementUnit: detailGoods?.data?.result?.measurementUnitObject,
        } || {},
      );
    } else {
      dispatch(
        RsetMessageModal({
          show: true,
          title:
            detailGoods?.data.codemessage || "مشکلی در سرور به وجود آمده است.",
        }),
      );
    }
    dispatch(handleLoading({ loading: false }));
  });

  useEffect(() => {
    if (
      openModal &&
      editData?.id &&
      (type?.editMode || type?.singleAdditionMode)
    ) {
      getDetailGoods(editData?.id);
    }
  }, [openModal]);
  // submit form----------------------------------------------------

  const addGoodsFunction = asyncWrapper(async (obj: AddGoodsInputModel) => {
    if (!type?.singleAdditionMode && !type?.singleEditMode) {
      dispatch(handleLoading({ value: true }));
      const postData: AddGoodsInterFace = {
        inputModel: {
          id: type.editMode ? editData?.id : 0,
          stuffCode: obj?.stuffCode || "",
          internalCode: obj?.internalCode || 0,
          vat: obj?.vat || 0,
          unitPrice: obj?.unitPrice || 0,
          discount: obj?.discount || 0,
          otherTaxRate: obj?.otherTaxRate || 0,
          otherTaxSubject: obj?.otherTaxSubject || "",
          otherLegalFundsRate: obj?.otherLegalFundsRate || 0,
          otherLegalFundsSubject: obj?.otherLegalFundsSubject || "",
          stuffDesc: obj?.stuffDesc || "",
          currency: watch("currency")?.id as number,
          currencyObject: null,
          measurementUnit: watch("measurementUnit")?.id as string,
          measurementUnitObject: null,
          constructionFee: obj?.constructionFee || null,
          sellerProfit: obj?.sellerProfit || null,
          commission: obj?.commission || null,
          carat: obj?.carat || null,
          equivalentWithRial: obj?.equivalentWithRial || null,
          rialValue: obj?.rialValue || null,
          netWeight: obj?.netWeight || null,
          currencyValue: obj?.currencyValue || null,
        },
      };

      const response = await (type.editMode
        ? editGoods(postData)
        : addGoods(postData)); // Conditional API call
      dispatch(handleLoading({ value: false }));
      if (response.data.code === 0) {
        dispatch(
          RsetShowToast({
            show: true,
            title: response?.data?.message,
            bg: "success",
          }),
        );
        type.editMode && setRefreshTable(!refreshTable);
        resetForm();
        setOpenModal(false);
      }
    } else {
      // Set selectedItem with form data when in additionMode

      const defaultObject = {
        ...obj, // Spread obj first to include all its properties
        id: editData?.id,
        currencyObject: obj.currency,
        equivalentWithRial: obj?.equivalentWithRial,
        currency: watch("currency")?.id as number, // Define currency after spreading obj
        measurementUnit: watch("measurementUnit")?.id as string, // Define measurementUnit after spreading obj
        measurementUnitObject: obj.measurementUnit,
      };
      getSelectedItem!(defaultObject);
      resetForm();
      setOpenModal(false);
    }
  });
  // reset function for form ---------------------------
  function resetForm() {
    reset({
      internalCode: "",
      vat: "",
      unitPrice: "",
      discount: "",
      otherTaxRate: "",
      otherTaxSubject: "",
      otherLegalFundsRate: "",
      otherLegalFundsSubject: "",
      stuffDesc: "",
      currency: {},
      currencyObject: "",
      measurementUnit: {},
      measurementUnitObject: "",
    });
  }

  // function for get status from server-------------------------------------
  const getFieldStatus = (name: string) => {
    const field = checkStatus.find((item: any) => item.name === name);
    return field ? field.status : null;
  };
  // Function to trigger validation for all fields

  // return--------------------------------------
  return (
    <Modal
      isOpen={openModal}
      title="اطلاعات کالا"
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <form onSubmit={handleSubmit(() => addGoodsFunction(getValues()))}>
        {type.taxAdditionMode && (
          <Attention title="این موارد صرفا برای تسهیل فرآیند ثبت کالا می‌باشد و در مرحله ثبت صورتحساب قابل تغییر می‌باشند." />
        )}{" "}
        <div className="tw-mb-8 ">
          <Input
            maxLength={150}
            control={control}
            name="stuffDesc"
            label="شرح کالا:"
            errors={errors?.stuffDesc}
            rules={{
              required:
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("stuffDesc") === 3
                    ? "وارد کردن شرح کالا اجباری است"
                    : false
                  : "وارد کردن شرح کالا اجباری است",
            }}
            disabled={
              type.singleAdditionMode || type.singleEditMode
                ? getFieldStatus("stuffDesc") === 1
                : false
            }
          />
        </div>
        <div className="gap-4 tw-flex tw-w-full tw-flex-col  lg:tw-flex-row lg:tw-gap-[96px] ">
          <div className="tw-flex tw-w-full tw-flex-col tw-gap-[32px] lg:tw-w-[50%]">
            <Input
              control={control}
              maxLength={13}
              name="stuffCode"
              label="شناسه یکتا"
              errors={errors?.stuffCode}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("stuffCode") === 3
                      ? "وارد کردن شناسه یکتا اجباری است"
                      : false
                    : "وارد کردن شناسه یکتا اجباری است",

                minLength: {
                  message: "شناسه یکتا باید 13 رقم باشد",
                  value: 13,
                },
                pattern: {
                  value: /^\d{13}$/, // تنها اعداد صحیح بدون اعشار
                  message: "شناسه یکتا باید 13 رقم بدون اعشار باشد",
                },
              }}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("stuffCode") === 1
                  : true
              }
            />
            <Input
              control={control}
              name="internalCode"
              label="شناسه داخلی :"
              errors={errors?.internalCode}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("internalCode") === 3
                      ? "وارد کردن شناسه داخلی اجباری است"
                      : false
                    : "وارد کردن شناسه داخلی اجباری است",

                minLength: {
                  message: " شناسه داخلی حداقل باید 6 حرف باشد",
                  value: 6,
                },
              }}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("internalCode") === 1
                  : false
              }
            />
            <ComboBox
              control={control}
              name="currency"
              label="نوع ارز :"
              errors={errors?.currency}
              options={billInitializeData?.currencies}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("currency") === 3
                      ? "وارد کردن نوع ارز اجباری است"
                      : false
                    : undefined,
                onChange: () => {
                  if (getValues("currency")?.id === "IRR") {
                    setValue("equivalentWithRial", "1");
                  } else {
                    setValue("equivalentWithRial", "");
                  }
                  trigger(["equivalentWithRial"]);
                },
              }}
              isDisabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("currency") === 1
                  : false
              }
            />

            <Input
              control={control}
              name="otherLegalFundsSubject"
              label="موضوع سایر وجوه قانونی"
              errors={errors?.otherLegalFundsSubject}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("otherLegalFundsSubject") === 3
                      ? "وارد کردن موضوع سایر وجوه قانونی اجباری است"
                      : false
                    : undefined,
              }}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("otherLegalFundsSubject") === 1
                  : false
              }
            />
            <Input
              control={control}
              name="otherTaxSubject"
              label="موضوع سایر مالیات و عوارض :"
              errors={errors.otherTaxSubject}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("otherTaxSubject") === 3
                      ? "وارد کردن موضوع سایر مالیات و عوارض اجباری است"
                      : false
                    : undefined,
              }}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("otherTaxSubject") === 1
                  : false
              }
            />
            <Input
              maxLength={19}
              control={control}
              name="discount"
              label="مبلغ تخفیف کالا :"
              errors={errors?.discount}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("discount") === 3
                      ? "وارد کردن مبلغ تخفیف اجباری است"
                      : false
                    : undefined,
                pattern: {
                  value: /^\d+$/,
                  message: "مبلغ تخفیف باید فقط شامل اعداد صحیح باشد",
                },

                validate: (value: any) => {
                  if (type?.singleAdditionMode || type?.singleEditMode) {
                    const { unitPrice, count } = getValues() as {
                      unitPrice: number;
                      count: number;
                    };
                    if (salesPattern?.id == 7) {
                      return true;
                    } else {
                      return (
                        value < unitPrice * count ||
                        "مبلغ تخفیف باید کمتر از (تعداد * مبلغ واحد) باشد"
                      );
                    }
                  }
                  return true;
                },
                onChange: () => {
                  trigger(["unitPrice", "count"]);
                },
              }}
              hasNumberSeparator={true}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("discount") === 1
                  : false
              }
            />
          </div>
          <div className="tw-flex tw-w-full tw-flex-col tw-gap-[32px] lg:tw-w-[50%]">
            <Input
              maxLength={19}
              control={control}
              name="unitPrice"
              label="مبلغ واحد"
              errors={errors?.unitPrice}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("unitPrice") === 3
                      ? "وارد کردن مبلغ واحداجباری است"
                      : false
                    : undefined,
                pattern: {
                  value: /^\d+$/,
                  message: "مبلغ واحد باید فقط شامل اعداد صحیح باشد",
                },
                min: {
                  value: 0.01,
                  message: "مبلغ واحد نمی‌تواند کمتر از صفر و صفر  باشد",
                },
                onChange: () => {
                  trigger(["count", "rialValue", "discount"]);
                },
                validate: (value: any) => {
                  const { rialValue, count } = watch();

                  if (
                    value !== "" && // افزودن این شرط
                    value != Number(rialValue) / Number(count) &&
                    salesPattern?.id == 7
                  ) {
                    return " در الگوی صادرات مبلغ واحد باید برابر با تقسیم ارزش ریالی کالا بر مقدار باشد";
                  }

                  return true;
                },
              }}
              hasNumberSeparator={true}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("unitPrice") === 1
                  : false
              }
            />

            <ComboBox
              control={control}
              name="measurementUnit"
              label="واحداندازه گیری :"
              errors={errors?.measurementUnit}
              options={billInitializeData?.unitTypes}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("measurementUnit") === 3
                      ? "وارد کردن واحد اندازه گیری اجباری است"
                      : false
                    : undefined,
              }}
              isDisabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("measurementUnit") === 1
                  : false
              }
            />
            <Input
              maxLength={19}
              control={control}
              name="equivalentWithRial"
              label="نرخ برابری ارز با (ریال)"
              errors={errors?.equivalentWithRial}
              rules={{
                required:
                  getValues("currency")?.id !== "IRR"
                    ? "وارد کردن نرخ برابری ارز اجباری است"
                    : false,

                pattern: {
                  value: /^[1-9]\d*$/, // فقط اعداد بدون اعشار و بزرگ‌تر از صفر
                  message: "نرخ برابری فقط  عدد صحیح بزرگ‌تر از صفر میگیرد",
                },
                onChange: () => {
                  trigger(["currency"]);
                },
              }}
              disabled={watch("currency")?.id === "IRR" || type?.editMode || type?.taxAdditionMode ||  getFieldStatus("equivalentWithRial") === 1 }
              hasNumberSeparator={true}
            />

            <Input
              control={control}
              name="otherLegalFundsRate"
              label="نرخ سایر وجوه قانونی"
              errors={errors.otherLegalFundsRate}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("otherLegalFundsRate") === 3
                      ? "وارد کردن نرخ سایر وجوه قانونی اجباری است"
                      : false
                    : undefined,
                pattern: {
                  value: /^(100(\.00?)?|\d{1,2}(\.\d{1,2})?)$/,
                  message: "نرخ باید بین 0 و 100 و حداکثر 2 رقم اعشار باشد",
                },
                min: {
                  value: 0.01,
                  message: "نرخ نمی‌تواند کمتر از صفر و صفر  باشد",
                },
                max: {
                  value: 100,
                  message: "نرخ نمی‌تواند بیشتر از 100 باشد",
                },
              }}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("otherLegalFundsRate") === 1
                  : false
              }
            />
            <Input
              control={control}
              name="otherTaxRate"
              label="نرخ سایر مالیات و عوارض "
              errors={errors.otherTaxRate}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("otherTaxRate") === 3
                      ? "وارد کردن نرخ سایرمالیات و عوارض اجباری است"
                      : false
                    : undefined,
                pattern: {
                  value: /^(100(\.00?)?|\d{1,2}(\.\d{1,2})?)$/,

                  message: "نرخ باید بین 0 و 100 و حداکثر 2 رقم اعشار باشد",
                },

                max: {
                  value: 100,
                  message: "نرخ نمی‌تواند بیشتر از 100 باشد",
                },
              }}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("otherTaxRate") === 1
                  : false
              }
            />
            <Input
              control={control}
              name="vat"
              label="نرخ مالیات بر ارزش افزوده"
              errors={errors?.vat}
              rules={{
                required:
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("vat") === 3
                      ? "وارد کردن نرخ مالیات بر ارزش افزوده اجباری است"
                      : false
                    : undefined,

                pattern: {
                  value: /^(100(\.00?)?|\d{1,2}(\.\d{1,2})?)$/,
                  message: "نرخ باید بین 0 و 100 و حداکثر 2 رقم اعشار باشد",
                },
                max: {
                  value: 100,
                  message: "نرخ نمی‌تواند بیشتر از 100 باشد",
                },
                validate: (value: number) => {
                  const parsedValue = value; // value is already a number
                  const parsedEditDataVat = parseFloat(
                    editData?.vat?.toString() || "0",
                  );
                  if (salesPattern?.id == 7) {
                    return parsedValue == 0
                      ? true
                      : "در الگوی صادرات فقط صفر میتوانید وارد کنید";
                  }

                  if (type?.taxAdditionMode) {
                    // اگر حالت taxAdditionMode فعال باشد، صفر قابل قبول است
                    return parsedValue == 0 || parsedValue == parsedEditDataVat
                      ? true
                      : "فقط میتوانید مقدار ثبت شده در صورتحساب و صفر را وارد کنید";
                  }
                },
              }}
              disabled={
                type.singleAdditionMode || type.singleEditMode
                  ? getFieldStatus("vat") === 1
                  : false
              }
            />
          </div>
        </div>
        {/* این قسمت برای الگو طلا و جواهر است  */}
        {salesPattern?.id == 3 ? (
          <div className="gap-4 mt-4 tw-flex tw-w-full tw-flex-col lg:tw-flex-row lg:tw-gap-[96px]  ">
            <div className="tw-flex tw-w-full tw-flex-col tw-gap-[32px] lg:tw-w-[50%]">
              <Input
                maxLength={19}
                control={control}
                name="constructionFee"
                label="اجرت ساخت"
                errors={errors?.constructionFee}
                rules={{
                  required:
                    getFieldStatus("constructionFee") === 3
                      ? "وارد کردن اجرت ساخت اجباری است"
                      : false,
                  pattern: {
                    value: /^\d+$/,
                    message: "اجرت ساخت  باید فقط شامل اعداد صحیح باشد",
                  },

                  validate: (value: any) => {
                    const {
                      unitPrice,
                      count,
                      sellerProfit,
                      constructionFee,
                      commission,
                    } = watch();

                    if (value >= Number(unitPrice) * Number(count)) {
                      return "مبلغ اجرت ساخت باید کمتر از (تعداد * مبلغ واحد) باشد";
                    }
                    if (
                      value >=
                      Number(sellerProfit) +
                        Number(constructionFee) +
                        Number(commission)
                    ) {
                      return " اجرت ساخت باید کوچکتر از مجموع اجرت ساخت، حق العمل و سود فروشنده باشد";
                    }
                    return true;
                  },
                  onChange: () => {
                    trigger([
                      "unitPrice",
                      "count",
                      "sellerProfit",
                      "constructionFee",
                      "commission",
                    ]);
                  },
                }}
                hasNumberSeparator={true}
                disabled={getFieldStatus("constructionFee") === 1}
              />
              <Input
                maxLength={19}
                control={control}
                name="sellerProfit"
                label="سود فروشنده"
                errors={errors?.sellerProfit}
                rules={{
                  required:
                    getFieldStatus("sellerProfit") === 3
                      ? "وارد کردن سود فروشنده اجباری است"
                      : false,
                  pattern: {
                    value: /^\d+$/,
                    message: "سود فروشنده باید فقط شامل اعداد صحیح باشد",
                  },
                  validate: (value: any) => {
                    const { sellerProfit, constructionFee, commission } =
                      watch();
                    if (
                      value >=
                      Number(sellerProfit) +
                        Number(constructionFee) +
                        Number(commission)
                    ) {
                      return "سود فروشنده باید کوچکتر از مجموع اجرت ساخت، حق العمل و سود فروشنده باشد";
                    }

                    return true;
                  },
                  onChange: () => {
                    trigger(["sellerProfit", "constructionFee", "commission"]);
                  },
                }}
                hasNumberSeparator={true}
                disabled={getFieldStatus("sellerProfit") === 1}
              />
            </div>
            <div className="tw-flex tw-w-full tw-flex-col tw-gap-[32px] lg:tw-w-[50%]">
              <Input
                maxLength={19}
                control={control}
                name="commission"
                label="حق العمل"
                errors={errors?.commission}
                rules={{
                  required:
                    getFieldStatus("commission") === 3
                      ? "وارد کردن حق العمل اجباری است"
                      : false,
                  pattern: {
                    value: /^\d+$/,
                    message: "سود فروشنده باید فقط شامل اعداد صحیح باشد",
                  },
                  validate: (value: any) => {
                    const { sellerProfit, constructionFee, commission } =
                      watch();

                    if (
                      value >=
                      Number(sellerProfit) +
                        Number(constructionFee) +
                        Number(commission)
                    ) {
                      return " حق العمل باید کوچکتر از مجموع اجرت ساخت، حق العمل و سود فروشنده باشد";
                    }

                    return true;
                  },
                  onChange: () => {
                    trigger(["sellerProfit", "constructionFee", "commission"]);
                  },
                }}
                hasNumberSeparator={true}
                disabled={getFieldStatus("commission") === 1}
              />
              <Input
                control={control}
                name="carat"
                label="عیار"
                errors={errors?.carat}
                rules={{
                  required:
                    getFieldStatus("carat") === 3
                      ? "وارد کردن سود فروشنده اجباری است"
                      : false,
                  validate: {
                    positive: (value: number) =>
                      !value
                        ? true
                        : value > 0.1 || "عیار باید بیشتر از 0 باشد",

                    max: (value: number) =>
                      !value
                        ? true
                        : value <= 1000 || "عیار باید کمتر یا مساوی 1000 باشد",
                  },
                  pattern: {
                    value: /^\d{1,4}(\.\d{0,2})?$/,
                    message: "حداکثر 4 رقم صحیح و 2 رقم اعشار",
                  },
                }}
                disabled={getFieldStatus("carat") === 1}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* این قسمت برای صادرات  است  */}
        <div className="gap-4 mt-4 tw-flex tw-w-full tw-flex-col lg:tw-flex-row lg:tw-gap-[96px]  ">
          {salesPattern?.id == 7 && (
            <div className="tw-flex tw-w-full tw-flex-col tw-gap-[32px] lg:tw-w-[50%]">
              <Input
                maxLength={19}
                control={control}
                name="rialValue"
                label=" ارزش ریالی کالا"
                errors={errors?.rialValue}
                rules={{
                  required:
                    getFieldStatus("rialValue") === 3
                      ? "وارد کردن ارزش ریالی کالا اجباری است"
                      : false,
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "ارزش ریالی کالا باید بزرگتر از صفر باشد",
                  },
                  onChange: () => {
                    trigger(["count", "unitPrice"]);
                  },
                }}
                hasNumberSeparator={true}
                disabled={getFieldStatus("rialValue") === 1}
              />
              <Input
                control={control}
                name="netWeight"
                label=" وزن خالص"
                errors={errors?.netWeight}
                rules={{
                  required:
                    getFieldStatus("netWeight") === 3
                      ? "وارد کردن وزن خالص اجباری است"
                      : false,
                  pattern: {
                    value: /^(?=.*[1-9])\d{1,15}(?:\.\d{1,8})?$/,

                    message:
                      "وزن خالص باید بزگتر از صفر وحدااکثر 15رقم صحیح و 8 رقم اعشاری",
                  },
                }}
                hasNumberSeparator={true}
                disabled={getFieldStatus("netWeight") === 1}
              />
            </div>
          )}
          <div className="tw-flex tw-w-full tw-flex-col tw-gap-[32px] lg:tw-w-[50%]">
            {salesPattern?.id == 7 && (
              <Input
                control={control}
                name="currencyValue"
                label="ارزش ارزی کالا"
                errors={errors?.currencyValue}
                rules={{
                  required:
                    getFieldStatus("currencyValue") === 3
                      ? "وارد کردن ارزش ارزی کالااجباری است"
                      : false,
                  pattern: {
                    value: /^(?=.*[1-9])\d{1,14}(?:\.\d{1,4})?$/,

                    message:
                      "ارزش ارزی  باید بزگتر از صفر وحدااکثر 14رقم صحیح و4 رقم اعشاری",
                  },
                }}
                disabled={getFieldStatus("currencyValue") === 1}
              />
            )}

            {(type.singleEditMode || type?.singleAdditionMode) && (
              <Input
                control={control}
                name="count"
                label="مقدار"
                errors={errors?.count}
                type="number"
                rules={{
                  required:
                    type.singleAdditionMode || type.singleEditMode
                      ? getFieldStatus("count") === 3
                        ? "وارد کردن مقدار اجباری است"
                        : true
                      : "وارد کردن مقداراجباری است",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "مقدار باید یک عدد بزرگتر از صفر باشد",
                  },
                  maxLength: {
                    value: 15,
                    message: "مقدار نباید بیشتر از 15 رقم باشد",
                  },
                  validate: (value: number) => {
                    // Ensure subjectTypeId is treated as a number for comparison
                    const subjectTypeIdNumber = Number(subjectTypeId);

                    // Check if subjectTypeIdNumber is valid (not NaN) after conversion
                    if (!isNaN(subjectTypeIdNumber)) {
                      if (
                        subjectTypeIdNumber === 4 && // Use strict equality for numbers
                        type?.singleEditMode &&
                        value > (editData?.count ?? 0) // Ensure editData.count has a fallback value of 0
                      ) {
                        return "مقدار وارد شده بیشتر از مقدار وارد شده برای صورتحساب اصلی است";
                      }
                    }

                    return true;
                  },
                  onChange: () => {
                    trigger([
                      "unitPrice",
                      "discount",
                      "constructionFee",
                      "unitPrice",
                    ]);
                  },
                }}
                disabled={
                  type.singleAdditionMode || type.singleEditMode
                    ? getFieldStatus("count") === 1
                    : false
                }
              />
            )}
          </div>
        </div>
        <div
          className="tw-mb-4
       tw-mt-[40px] tw-flex tw-w-full  tw-justify-end"
        >
          <Button
            type="submit"
            size={isSmallScreen ? "full" : "default"} // Set size based on screen size
            variant={"default"}
            title={
              type?.editMode || type?.singleEditMode
                ? "ویرایش"
                : "افزودن کالا به صورتحساب"
            }
          />
        </div>
        ,
      </form>
    </Modal>
  );
}
export default GoodsModals;
