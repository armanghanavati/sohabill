import { z } from "zod";

//* [info]
//* لیست فیلدهای این شیت
//* Serial;
//* IssueDate;
//* BillTypeId;
//* BillPatternId;
//* SubjectType;
//* ReferenceTaxId;
//* BuyerFirstName;
//* BuyerLastName;
//* BuyerPersonType;
//* BuyerPersonCode;
//* BuyerEconomicCode;
//* BuyerPostCode;
//* SettlementType;
//* CreditPrice;
//* CustomsLicenseNumber;
//* CustomsCode;
//* RegistrationNumber;
//* SellerBranchCode;
//* BuyerBranchCode;
//* Article17TaxPrice;
//* description;

//* FlightType
//* CotageNumber
//* CotageDate
//* SubscriptionNumber

export type BillsSchemaKeys = (keyof BillsType)[];

export const patternTypes = [
  {
    title: "sellTypeOne",
    id: 1,
    helpUrl: "Excel/Help/pattern1type1.xlsx",
    exampleUrl: "Excel/Sample/pattern1type1.xlsx",
  },
  {
    title: "sellTypeTwo",
    id: 8,
    helpUrl: "Excel/Help/pattern1type2.xlsx",
    exampleUrl: "Excel/Sample/pattern1type2.xlsx",
  },
];

export const stringOfNumbers = (num: number) => {
  return Array.from({ length: num }, (_, index) => String(index + 1));
};

function checkIsNan(val: string) {
  const n = Number(val);
  return !isNaN(n) && val?.length > 0 && !val?.includes(".");
}

export const billsBaseSchema = z.object({
  Serial: z
    .string({ required_error: "پر کردن این فیلد اجباری است.", coerce: true })
    .refine((val) => val !== "undefined", { message: "این فیلد اجباری است" }),
  IssueDate: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, {
      message: "تاریخ با فرمت 1402/01/01 وارد شود.",
    }),
  SubjectType: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .refine((val) => stringOfNumbers(4).includes(val), {
      message: " یک عدد از 1 تا 4 انتخاب کنید",
    }),

  //* میتواند عدد یا کاراکتر شامل شود
  ReferenceTaxId: z.coerce.string().optional(),
  BuyerFirstName: z
    .string({ invalid_type_error: "لطفا نام را درست وارد کنید" })
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
      { message: "لطفا حروف وارد کنید" }
    )
    .optional(),
  BuyerLastName: z
    .string({ invalid_type_error: "لطفا نام خانوادگی را درست وارد کنید" })
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
      { message: "لطفا حروف وارد کنید" }
    )
    .optional(),
  BuyerPersonType: z.coerce
    .string()
    .refine((val) => stringOfNumbers(4).includes(val), {
      message: "برای  نوع خریدار اعداد 1 تا 4 مورد قبول است",
    })
    .optional(),
  BuyerPersonCode: z.coerce
    .string()
    .refine(
      (val) => {
        return checkIsNan(val);
      },
      { message: "لطفا عدد صحیح وارد کنید" }
    )
    .optional(),
  BuyerEconomicCode: z.coerce
    .string()
    .min(11, { message: "باید حداقل 11 رقم باشد" })
    .max(14, { message: "باید حداکثر 14 رقم باشد" })
    .refine(
      (val) => {
        return checkIsNan(val);
      },
      { message: "لطفا عدد صحیح وارد کنید" }
    )
    .optional(),
  BuyerPostCode: z.coerce
    .string()
    .length(10, { message: "کد پستی باید 10 رقمی باشد" })
    .refine(
      (val) => {
        return checkIsNan(val);
      },
      { message: "لطفا عدد صحیح وارد کنید" }
    )
    .optional(),
  SettlementType: z.coerce
    .string({ required_error: "پر کردن این فیلد اجباری است." })
    .refine((val) => stringOfNumbers(3).includes(val), {
      message: "یک عدد از 1 تا 3 وارد کنید",
    }),

  CashPrice: z.coerce
    .string()
    .max(18, { message: "حداکثر 18 رقمی وارد کنید" })
    .refine(
      (val) => {
        const numValue = Number(val);
        return checkIsNan(val) && numValue > 0 && Number.isInteger(numValue);
      },
      { message: "لطفا عدد بزرگتر از 0 بدون اعشار وارد کنید." }
    )
    .optional(),
  CustomsLicenseNumber: z.coerce
    .string()
    .max(14, { message: "لطفا حداکثر عدد 14 رقمی وارد کنید" })
    .refine(
      (val) => {
        return checkIsNan(val);
      },
      { message: "لطفا عدد وارد کنید." }
    )
    .optional(),
  CustomsCode: z.coerce
    .string()
    .length(5, { message: "کد گمرک محل اظهار فروشنده 5 رقمی باشد" })
    .refine(
      (val) => {
        return checkIsNan(val);
      },
      { message: "لطفا عدد وارد کنید." }
    )
    .optional(),
  FlightType: z.coerce
    .string()
    .refine((val) => stringOfNumbers(2).includes(val))
    .optional(),
  CotageNumber: z.coerce
    .string()
    .length(5, { message: "کد گمرک محل اظهار فروشنده 5 رقمی باشد" })
    .optional(),
  CotageDate: z.coerce
    .string()
    .regex(/^\d{4}\/\d{2}\/\d{2}$/, {
      message: "تاریخ با فرمت 1402/01/01 وارد شود.",
    })
    .optional(),
  SubscriptionNumber: z.coerce
    .string()
    .max(19, { message: "حداکثر 19 کاراکتر" })
    .optional(),
  RegistrationNumber: z.coerce
    .string()
    .max(12, { message: "حداکثر 12 رقم وارد کنید" })
    .refine(
      (val) => {
        return checkIsNan(val);
      },
      { message: "لطفا عدد وارد کنید." }
    )
    .optional(),
  SellerBranchCode: z.coerce
    .string()
    .length(4, { message: "کد شعبه فروشنده 4 رقم باشد" })
    .refine(
      (val) => {
        return checkIsNan(val);
      },
      { message: "لطفا عدد وارد کنید." }
    )
    .optional(),
  BuyerBranchCode: z.coerce
    .string()
    .length(4, { message: "کد شعبه خریدار 4 رقم باشد" })
    .refine(
      (val) => {
        return checkIsNan(val);
      },
      { message: "عدد وارد کنید" }
    )
    .optional(),
  Article17TaxPrice: z.coerce
    .string()
    .max(18, { message: "حداکثر 18 رقم وارد کنید" })
    .refine(
      (val) => {
        return checkIsNan(val) && Number.isInteger(Number(val));
      },
      { message: "عدد صحیح بدون اعشار وارد کنید" }
    )
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue < 60000000;
      },
      {
        message: "موضوع ماده ۱۷ کوچک تر از 60000000 باشد",
      }
    )
    .optional(),
});

export const billsRowSchema = billsBaseSchema.superRefine((data, ctx) => {
  if (data.BuyerPersonType === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "زمانی که نوع صورتحساب 1 باشد، نوع خریدار ضروری است",
      path: ["BuyerPersonType"],
    });
  } else {
    let length: number;
    switch (data.BuyerPersonType) {
      case "1":
        length = 10;
        break;
      case "2":
      case "3":
        length = 11;
        break;
      case "4":
        length = 12;
        break;
      default:
        return false;
    }
    if (data.BuyerPersonCode && data.BuyerPersonCode.length !== length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "شماره ملی خریدار درست نیست",
        path: ["BuyerPersonCode"],
      });
    }
  }
  if (!data.BuyerEconomicCode) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "زمانی که نوع صورتحساب 1 باشد، کد اقتصادی خریدار ضروری است",
      path: ["BuyerEconomicCode"],
    });
  }
  if (!data.BuyerPostCode) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "زمانی که نوع صورتحساب 1 باشد، کد پستی خریدار ضروری است",
      path: ["BuyerPostCode"],
    });
  }
  if (data.SettlementType === "3") {
    if (!data.CashPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "برای روش پرداخت 3، مبلغ نقدی اجباری است",
        path: ["CashPrice"],
      });
    }
  }

  if (data.SubjectType !== "1") {
    if (!!data.ReferenceTaxId === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "شماره منحصر به فرد مالیاتی صورتحساب مرجع در صورتی که موضوع صورتحساب مخالف 1 باشد اجباری است",
        path: ["ReferenceTaxId"],
      });
      return;
    }
  }
});

export type BillsType = z.infer<typeof billsBaseSchema>;

export const billsIndexes: BillsSchemaKeys = [
  "Serial",
  "IssueDate",
  "SubjectType",
  "ReferenceTaxId",
  "BuyerFirstName",
  "BuyerLastName",
  "BuyerPersonType",
  "BuyerPersonCode",
  "BuyerEconomicCode",
  "BuyerPostCode",
  "SettlementType",
  "CashPrice",
  "CustomsLicenseNumber",
  "CustomsCode",
  "RegistrationNumber",
  "SellerBranchCode",
  "BuyerBranchCode",
  "Article17TaxPrice",
  "FlightType",
  "CotageNumber",
  "CotageDate",
  "SubscriptionNumber",
];

// export const billsHeader: string[] = [
//   "سریال صورتحساب",
//   "تاریخ صورتحساب",
//   "نوع صورتحساب",
//   "الگوی صورتحساب",
//   "موضوع صورتحساب",
//   "شماره منحصر به فرد مالیاتی صورتحساب مرجع",
//   "نام خریدار",
//   "نام خانوادگی خریدار",
//   "نوع خریدار",
//   "شناسه/شماره ملی خریدار",
//   "کد اقتصادی خریدار",
//   "کدپستی خریدار",
//   "روش تسویه",
//   "مبلغ نسیه",
//   "شماره پروانه گمرکی فروشنده",
//   "کد گمرک محل اظهار فروشنده",
//   "شناسه یکتای ثبت قرارداد فروشنده",
//   "کد  شعبه فروشنده",
//   "کد شعبه خریدار",
//   "مالیات موضوع ماده 17",
//   "توضیحات",
// ];
