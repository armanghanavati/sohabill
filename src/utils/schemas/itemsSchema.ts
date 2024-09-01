import { Refinement, number, z } from "zod";
import { stringOfNumbers } from "./billsSchema";
import { store } from "../../common/store/store";

//* [info]
//* لیست فیلدهای این شیت
//* Serial
//* IssueDate
//* ServiceOrProductId
//* MeasurementUnitCode
//* Count
//* CurrencyCode
//* EquivalentWithRial
//* UnitPrice
//* Discount
//* ValueIncreasedTaxRate
//* OtherTaxRate
//* OtherTaxPrice
//* OtherTaxSubject
//* OtherLegalFundsRate
//* OtherLegalFundsPrice
//* OtherLegalFundsSubject
//* RegisterContractId
//* Description

const { tax } = store.getState();

export type ItemsSchemaKeys = (keyof ItemsType)[];

export const validateIntAndFloat = (
  val: string,
  maxInt: number,
  maxFloat: number,
) => {
  if (!val.search(".")) {
    const intPart = val.split(".")[0];
    const floatPart = val.split(".")[1];
    if (!val) return false;
    if (intPart?.length > maxInt || floatPart?.length > maxFloat) {
      return false;
    } else return true;
  } else {
    return val?.length >= maxInt;
  }
};

function checkIsNan(val: string) {
  const n = Number(val);
  return !isNaN(n) && val?.length > 0;
}

export const itemsBaseSchema = z.object({
  Serial: z
    .string({ required_error: "پر کردن این فیلد اجباری است.", coerce: true })
    .refine((val) => val !== "undefined", { message: "این فیلد اجباری است" }),
  IssueDate: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, {
      message: "تاریخ با فرمت 1402/01/01 وارد شود.",
    }),
  ServiceOrProductId: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .length(13, { message: "شناسه کالا / خدمت 13 رقمی است" })
    .refine((val) => checkIsNan(val), { message: "لطفا عدد وارد کنید" }),
  MeasurementUnitCode: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .max(8, { message: "حداکثر 8 رقم وارد کنید" })
    .refine((val) => checkIsNan(val), { message: "لطفا عدد وارد کنید" }),
  Count: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 18, 8);
      },
      { message: "حداکثر عدد صحیح 18 و حداکثر عدد اعشاری 8 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue > 0;
      },
      { message: "تعداد مقدار بزرگ تر از ۰ است" },
    ),
  CurrencyCode: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .length(3, { message: "کد نوع ارز 3 کاراکتر است" })
    .refine(
      (val) => {
        const n = Number(val);
        return (
          isNaN(n) &&
          val?.length > 0 &&
          !stringOfNumbers(9)
            .concat(["0"])
            .some((num) => val.includes(num))
        );
      },
      { message: "لطفا حروف وارد کنید" },
    ),
  EquivalentWithRial: z.coerce
    .string()
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 18, 0);
      },
      { message: "حداکثر عدد صحیح 18 و حداکثر عدد اعشاری 0 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue > 0;
      },
      { message: "نرخ برابری ارز با ریال بزرگ تر از ۰ باشد" },
    )
    .optional(),
  UnitPrice: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 18, 8);
      },
      { message: "حداکثر عدد صحیح 18 و حداکثر عدد اعشاری 8 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue > 0;
      },
      { message: "مبلغ واحد بزرگتر از ۰ باشد" },
    ),
  Discount: z
    .string({ coerce: true, required_error: "پر کردن این فیلد اجباری است." })
    .min(1, { message: "پر کردن این فیلد اجباری است." })
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 18, 0);
      },
      { message: "حداکثر عدد صحیح 18 و حداکثر عدد اعشاری 0 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0;
      },
      { message: "تخفیف بزرگتر یا مساوی ۰ است" },
    ),
  ValueIncreasedTaxRate: z
    .string({ coerce: true, required_error: "پر کردن این فیلد اجباری است." })
    .min(1, { message: "پر کردن این فیلد اجباری است." })
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 3, 2);
      },
      { message: "حداکثر عدد صحیح 3 و حداکثر عدد اعشاری 2 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue <= 100 && numValue >= 0;
      },
      { message: "مقدار بزرگ‌تر مساوی 0 و کوچک‌تر از 100 وارد کنید." },
    ),
  OtherTaxRate: z.coerce
    .string()
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 3, 2);
      },
      { message: "حداکثر عدد صحیح 3 و حداکثر عدد اعشاری 2 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0;
      },
      { message: "مقدار بزرگتر مساوی 0 وارد کنید." },
    )
    .optional(),
  OtherTaxPrice: z.coerce
    .string()
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 18, 0);
      },
      { message: "حداکثر عدد صحیح 18 و حداکثر عدد اعشاری 0 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0;
      },
      { message: "مقدار بزرگتر مساوی 0 وارد کنید." },
    )
    .optional(),
  OtherTaxSubject: z.coerce
    .string()
    .max(255, { message: "حداکثر 255 کاراکتر" })
    .optional(),
  OtherLegalFundsRate: z.coerce
    .string()
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 3, 2);
      },
      { message: "حداکثر عدد صحیح 3 و حداکثر عدد اعشاری 2 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0;
      },
      { message: "مقدار بزرگتر مساوی 0 وارد کنید." },
    )
    .optional(),
  OtherLegalFundsPrice: z.coerce
    .string()
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 18, 0);
      },
      { message: "حداکثر عدد صحیح 18 و حداکثر عدد اعشاری 0 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0;
      },
      { message: "مقدار بزرگتر مساوی 0 وارد کنید." },
    )
    .optional(),
  OtherLegalFundsSubject: z.coerce
    .string()
    .max(255, { message: "حداکثر 255 کاراکتر" })
    .optional(),
  RegisterContractId: z.coerce
    .string()
    .length(12, { message: "عدد 12 رقمی وارد کنید." })
    .refine(
      (val) => {
        return checkIsNan(val) && !val.includes(".");
      },
      { message: "لطفا عدد وارد کنید" },
    )
    .optional(),
  Description: z.coerce
    .string()
    .max(400, { message: "حداکثر 400 کاراکتر" })
    .optional(),
});

export const itemsRowSchema = itemsBaseSchema.superRefine((data, ctx) => {
  if (data.CurrencyCode.toLowerCase() !== "irr") {
    if (!data.EquivalentWithRial && data.EquivalentWithRial !== "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "در صورت انتخاب ارزی غیر از ریال این فیلد اجباری است.",
        path: ["EquivalentWithRial"],
      });
    }
  }
  const priceAfterDiscount =
    Number(data.Count) * Number(data.UnitPrice) - Number(data.Discount);

  if (!!data.OtherTaxRate && !!data.OtherTaxPrice) {
    if (
      Math.floor((priceAfterDiscount * Number(data.OtherTaxRate)) / 100) !==
      Number(data.OtherTaxPrice)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "نرخ و مبلغ سایر مالیات و عوارض باید با هم همخوانی از نظر محاسبات و مقدار داشته باشد",
        path: ["OtherTaxRate"],
      });
    }
  }

  if (!!data.OtherLegalFundsRate && !!data.OtherLegalFundsPrice) {
    if (
      Math.floor(
        (priceAfterDiscount * Number(data.OtherLegalFundsRate)) / 100,
      ) !== Number(data.OtherLegalFundsPrice)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "نرخ و مبلغ سایر مالیات و عوارض باید با هم همخوانی از نظر محاسبات و مقدار داشته باشد",
        path: ["OtherLegalFundsRate"],
      });
    }
  }
});

export type ItemsType = z.infer<typeof itemsRowSchema>;

export const itemsIndexes: ItemsSchemaKeys = [
  "Serial",
  "IssueDate",
  "ServiceOrProductId",
  "MeasurementUnitCode",
  "Count",
  "CurrencyCode",
  "EquivalentWithRial",
  "UnitPrice",
  "Discount",
  "ValueIncreasedTaxRate",
  "OtherTaxRate",
  "OtherTaxPrice",
  "OtherTaxSubject",
  "OtherLegalFundsRate",
  "OtherLegalFundsPrice",
  "OtherLegalFundsSubject",
  "RegisterContractId",
  "Description",
];

// export const itemsHeader: string[] = [
//   "سریال صورتحساب",
//   "تاریخ صورتحساب",
//   "شناسه کالا / خدمت",
//   "واحد اندازه گیري و سنجش",
//   "مقدار / تعداد",
//   "نوع ارز",
//   "نرخ برابری ارز به ریال",
//   "مبلغ واحد (فی)",
//   "مبلغ تخفیف",
//   "نرخ مالیات برارزش افزوده",
//   "نرخ سایر عوارض و مالیات",
//   "مبلغ سایر عوارض و مالیات",
//   "موضوع سایر عوارض و مالیات",
//   "نرخ سایر وجوهات قانونی",
//   "مبلغ سایر وجوهات قانونی",
//   "موضوع سایر وجوهات قانونی",
//   "شناسه یکتای ثبت قرارداد حق العملکاری",
//   "شرح اضافی کالا / خدمت",
// ];
