import { z } from "zod";
import { BillsSchemaKeys, billsBaseSchema, billsIndexes } from "../billsSchema";

const typeOneBillsIndexesToRemove = [
  "FlightType",
  "CotageNumber",
  "CotageDate",
  "SubscriptionNumber",
];

export const typeOneBillsIndexes: BillsSchemaKeys = billsIndexes.filter(
  (key) => typeOneBillsIndexesToRemove.includes(key) === false,
);

export const typeOneBillsSchema = billsBaseSchema
  .omit({
    FlightType: true,
    CotageNumber: true,
    CotageDate: true,
    SubscriptionNumber: true,
  })
  .superRefine((data, ctx) => {
    if (data.BuyerPersonType === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "زمانی که نوع صورتحساب 1 باشد، نوع خریدار ضروری است",
        path: ["BuyerPersonType"],
      });
      return;
    } else if (!data.BuyerPersonCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "کد ملی خریدار ضروری است",
        path: ["BuyerPersonCode"],
      });
      return;
    } else {
      let length: number[];
      let buyerEcoCode: number;
      switch (data.BuyerPersonType) {
        case "1":
          length = [10];
          buyerEcoCode = 14;
          if (!data.BuyerEconomicCode && !data.BuyerPostCode) {
            console.log(
              "🚀 ~ .superRefine ~ data.BuyerEconomicCode || data.BuyerPostCode:",
              data.BuyerEconomicCode,
              data.BuyerPostCode,
            );
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "اگر نوع شخص حقیقی(1) باشد یا کد اقتصادی یا کد پستی الزامی است",
              path: ["BuyerEconomicCode"],
            });
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "اگر نوع شخص حقیقی(1) باشد یا کد اقتصادی یا کد پستی الزامی است",
              path: ["BuyerPostCode"],
            });
          }
          break;
        case "2":
          length = [11];
          buyerEcoCode = 11;
          if (!data.BuyerEconomicCode) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "اگر نوع شخص حقوقی(2) و یا مشارکت مدنی(3) باشد کد اقتصادی الزامی است",
              path: ["BuyerEconomicCode"],
            });
          }
          break;
        case "3":
          length = [10, 11];
          buyerEcoCode = 11;
          if (!data.BuyerEconomicCode) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "اگر نوع شخص حقوقی(2) و یا مشارکت مدنی(3) باشد کد اقتصادی الزامی است",
              path: ["BuyerEconomicCode"],
            });
          }
          break;
        case "4":
          length = [12];
          buyerEcoCode = 14;
          if (!data.BuyerEconomicCode && !data.BuyerPostCode) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "اگر نوع شخص اتباع خارجی(4) باشد یا کد اقتصادی یا کد پستی الزامی است",
              path: ["BuyerEconomicCode"],
            });
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "اگر نوع شخص اتباع خارجی(4) باشد یا کد اقتصادی یا کد پستی الزامی است",
              path: ["BuyerPostCode"],
            });
          }
          break;
        default:
          return false;
      }

      if (!length.some((code) => code === data.BuyerPersonCode?.length)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `شماره ملی خریدار برای این نوع خریدار باید ${length} رقمی باشد`,
          path: ["BuyerPersonCode"],
        });
      }
      if (
        data.BuyerEconomicCode &&
        data.BuyerEconomicCode?.length !== buyerEcoCode
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `اگر نوع خریدار ${data.BuyerPersonType} باشد کد اقتصادی خریدار ${buyerEcoCode} رقمی است`,
          path: ["BuyerEconomicCode"],
        });
      }
    }
    // if (!data.BuyerEconomicCode) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "زمانی که نوع صورتحساب 1 باشد، کد اقتصادی خریدار ضروری است",
    //     path: ["BuyerEconomicCode"],
    //   });
    // }
    // if (!data.BuyerPostCode) {
    //   ctx.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     message: "زمانی که نوع صورتحساب 1 باشد، کد پستی خریدار ضروری است",
    //     path: ["BuyerPostCode"],
    //   });
    // }
    if (data.SettlementType === "3" || data.SettlementType === "1") {
      if (!data.CashPrice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `برای روش پرداخت ${data.SettlementType}، مبلغ نقدی اجباری است`,
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
      if (data.ReferenceTaxId?.length !== 22) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "شماره منحصر به فرد مالیاتی صورتحساب مرجع باید 22 رقمی باشد",
          path: ["ReferenceTaxId"],
        });
        return;
      }
    } else {
      if (!!data.ReferenceTaxId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "اگر موضوع صورتحساب 1 است شماره منحصر به فرد مالیاتی صورتحساب مرجع خالی باشد",
          path: ["ReferenceTaxId"],
        });
        return;
      }
    }
  });
