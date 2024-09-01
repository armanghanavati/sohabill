import { z } from "zod";
import { BillsSchemaKeys, billsBaseSchema, billsIndexes } from "../billsSchema";

const typeTwoBillsIndexesToRemove = [
  "FlightType",
  "CotageNumber",
  "CotageDate",
  "SubscriptionNumber",
  "BuyerFirstName",
  "BuyerLastName",
  "BuyerPersonType",
  "BuyerPersonCode",
  "BuyerEconomicCode",
  "BuyerPostCode",
];

export const typeTwoBillsIndexes: BillsSchemaKeys = billsIndexes.filter(
  (key) => typeTwoBillsIndexesToRemove.includes(key) === false
);

export const typeTwoBillsSchema = billsBaseSchema
  .omit({
    FlightType: true,
    CotageNumber: true,
    CotageDate: true,
    SubscriptionNumber: true,
    BuyerFirstName: true,
    BuyerLastName: true,
    BuyerPersonType: true,
    BuyerPersonCode: true,
    BuyerEconomicCode: true,
    BuyerPostCode: true,
  })
  .superRefine((data, ctx) => {
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
