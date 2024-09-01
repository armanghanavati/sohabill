import { z } from "zod";
import { stringOfNumbers } from "./billsSchema";
// import { validateIntAndFloat } from "./schema-helpers";

//* [info]
//* لیست فیلدهای این شیت
//* Serial
//* IssueDate
//* PaymentType
//* PaidAmount
//* PaymentDate
//* PayerCardNumber
//* PayerCodeNumber

export const validateIntAndFloat = (
  val: string,
  maxInt: number,
  maxFloat: number,
) => {
  if (!val.search(".")) {
    const intPart = val.split(".")[0];
    const floatPart = val.split(".")[1];
    if (!!!val) return;
    if (intPart?.length > maxInt || floatPart?.length > maxFloat) {
      return false;
    } else return true;
  } else {
    return val?.length >= maxInt;
  }
};

function checkIsNumber(val: string) {
  const n = Number(val);
  return !isNaN(n) && val?.length > 0;
}

export type PaymentsSchemaKeys = (keyof PaymentsType)[];

export const paymentsRowSchema = z.object({
  Serial: z
    .string({ required_error: "این فیلد اجباری است", coerce: true })
    .refine((val) => val !== "undefined", { message: "این فیلد اجباری است" }),
  IssueDate: z
    .string({ required_error: "این فیلد اجباری است", coerce: true })
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, {
      message: "تاریخ با فرمت 1402/01/01 وارد شود.",
    }),
  PaymentType: z
    .string({ required_error: "پر کردن این فیلد اجباری است.", coerce: true })
    .refine((val) => checkIsNumber(val) && stringOfNumbers(8).includes(val), {
      message: "یک عدد صحیح بین 1 تا 8 انتخاب کنید",
    }),
  PaidAmount: z
    .string({ required_error: "این فیلد اجباری است", coerce: true })
    .refine(
      (val) => {
        return checkIsNumber(val) && validateIntAndFloat(val, 18, 0);
      },
      {
        message:
          "این فیلد اجباری است و حداکثر رقم صحیح 18 و حداکثر رقم اعشاری 0 است",
      },
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue > 0;
      },
      { message: "مبلغ بزرگتر از ۰ است" },
    ),
  PaymentDate: z
    .string({ coerce: true })
    .min(1, { message: "پر کردن این فیلد اجباری است" })
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, {
      message: "تاریخ با فرمت 1402/01/01 وارد شود.",
    })
    .refine((val) => val !== "undefined"),

  PayerCardNumber: z.coerce
    .string()
    .length(16, { message: "شماره کارت 16 رقمی وارد کنید" })
    .refine((val) => checkIsNumber(val), { message: "لطفا رقم وارد کنید" })
    .optional(),
  PayerCodeNumber: z.coerce
    .string()
    .max(12, { message: "حداکثر 12 رقم وارد کنید" })
    .refine((val) => checkIsNumber(val), { message: "لطفا رقم وارد کنید" })
    .optional(),
});
export type PaymentsType = z.infer<typeof paymentsRowSchema>;

export const paymentsIndexes: PaymentsSchemaKeys = [
  "Serial",
  "IssueDate",
  "PaymentType",
  "PaidAmount",
  "PaymentDate",
  "PayerCardNumber",
  "PayerCodeNumber",
];

// export const paymentsHeader: string[] = [
//   "سریال صورتحساب",
//   "تاریخ صورتحساب",
//   "روش پرداخت",
//   "مبلغ پرداخت",
//   "تاریخ پرداخت",
//   "شماره کارت پرداخت کننده",
//   "شماره ملی / کد فراگیر پرداخت کننده",
// ];
