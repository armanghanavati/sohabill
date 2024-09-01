import { z } from "zod";

export type GoodsSchemaKeys = (keyof GoodsType)[];

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

export const goodsBaseSchema = z.object({
  StuffCode: z.coerce
    .string({
      required_error: "پر کردن این فیلد اجباری است.",
    })
    .length(13, { message: "تعداد کاراکتر مجاز 13 رقم میباشد" })
    .refine((val) => val !== "undefined", {
      message: "پر کردن این فیلد اجباری است",
    }),
  InternalCode: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است.", coerce: true })
    .min(3, { message: "حداقل 3 کاراکتر" })
    .max(15, { message: "حداکثر 15 کاراکتر" })
    .refine((val) => val !== "undefined", {
      message: "پر کردن این فیلد اجباری است",
    }),
  Description: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است.", coerce: true })
    .min(3, { message: "حداقل 3 کاراکتر" })
    .max(150, { message: "حداکثر 150 کاراکتر" })
    .refine((val) => val !== "undefined", {
      message: "پر کردن این فیلد اجباری است",
    }),
  UnitPrice: z.coerce
    .string()
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0;
      },
      { message: "مبلغ بزرگتر یا مساوی ۰ است" },
    )
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 15, 0);
      },
      { message: "حداکثر عدد صحیح 15 و حداکثر عدد اعشاری 0 است" },
    )
    .optional(),
  ValueIncreasedTaxRate: z.coerce
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
        return numValue >= 0 && numValue <= 100;
      },
      { message: "اعدادی بین بازه 0 تا 100 وارد کنید." },
    )
    .optional(),
  unitTypes: z.coerce.string().optional(),
  currencies: z.coerce.string().optional(),
  Discount: z.coerce
    .string()
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 15, 0);
      },
      { message: "حداکثر عدد صحیح 15 و حداکثر عدد اعشاری 0 است" },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0;
      },
      { message: "تخفیف بزرگتر یا مساوی ۰ است" },
    )
    .optional(),
  OtherTaxRate: z.coerce
    .string()
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0 && numValue <= 100;
      },
      { message: "اعدادی بین بازه 0 تا 100 وارد کنید." },
    )
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 3, 2);
      },
      { message: "حداکثر عدد صحیح 3 و حداکثر عدد اعشاری 2 است" },
    )
    .optional(),
  OtherTaxSubject: z.coerce.string().optional(),
  OtherLegalFundsRate: z.coerce
    .string()
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue >= 0 && numValue <= 100;
      },
      { message: "اعدادی بین بازه 0 تا 100 وارد کنید." },
    )
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 3, 2);
      },
      { message: "حداکثر عدد صحیح 3 و حداکثر عدد اعشاری 2 است" },
    )
    .optional(),
  OtherLegalFundsSubject: z.coerce.string().optional(),
});

export const goodsRowSchema = goodsBaseSchema;
export type GoodsType = z.infer<typeof goodsRowSchema>;

export const goodsIndexes: GoodsSchemaKeys = [
  "StuffCode",
  "InternalCode",
  "Description",
  "UnitPrice",
  "ValueIncreasedTaxRate",
  "currencies",
  "unitTypes",
  "Discount",
  "OtherTaxRate",
  "OtherTaxSubject",
  "OtherLegalFundsRate",
  "OtherLegalFundsSubject",

  // export const goodssHeader: string[] = [
  // شناسه کالا/خدمت عمومی/اختصاصی
  // شناسه کالا/خدمت داخلی
  // شرح کالا/خدمت
  // "مبلغ واحد (فی)",
  // "مبلغ تخفیف",
  // "نرخ مالیات برارزش افزوده",
  // "نرخ سایر مالیات",
  // نرخ سایر عوارض و وجوه قانونی
  // موضوع سایر مالیات
  // موضوع سایر عوارض و وجوه قانونی
];
