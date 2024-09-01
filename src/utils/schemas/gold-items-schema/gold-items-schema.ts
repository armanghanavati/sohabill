import { z } from "zod";
import { ItemsSchemaKeys, itemsBaseSchema, itemsIndexes } from "../itemsSchema";

const typeOneItemsIndexesToAdd = [
  "ConstructionFee",
  "SellerProfit",
  "Commission",
];

export type GoldItemsSchemaKeys = (keyof GoldItemsType)[];

function checkIsNan(val: string) {
  const n = Number(val);
  return !isNaN(n) && val?.length > 0 && !val?.includes(".");
}

export const goldItemsSchema = itemsBaseSchema.extend({
  ConstructionFee: z
    .string({ coerce: true })
    .max(15, { message: "حداکثر 15 رقم وارد کنید" })
    .refine(
      (val) => {
        const numValue = Number(val);
        return checkIsNan(val) && numValue >= 0 && Number.isInteger(numValue);
      },
      { message: "لطفا عدد صحیح بدون اعشار وارد کنید." },
    ),
  SellerProfit: z
    .string({ coerce: true })
    .max(15, { message: "حداکثر 15 رقم وارد کنید" })
    .refine(
      (val) => {
        const numValue = Number(val);
        return checkIsNan(val) && numValue >= 0 && Number.isInteger(numValue);
      },
      { message: "لطفا عدد صحیح بدون اعشار وارد کنید." },
    ),
  Commission: z
    .string({ coerce: true })
    .max(15, { message: "حداکثر 15 رقم وارد کنید" })
    .refine(
      (val) => {
        const numValue = Number(val);
        return checkIsNan(val) && numValue >= 0 && Number.isInteger(numValue);
      },
      { message: "لطفا عدد صحیح بدون اعشار وارد کنید." },
    ),
});

export const goldItemsBaseSchema = goldItemsSchema.superRefine((data, ctx) => {
  const sumPrices =
    Number(data.Commission) +
    Number(data.SellerProfit) +
    Number(data.ConstructionFee);

  const priceBeforeDiscount = Number(data.Count) * Number(data.UnitPrice);

  if (Number(data.ConstructionFee) >= priceBeforeDiscount) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "اجرت ساخت باید از مبلغ قبل از تخفیف  کوچکتر باشد",
      path: ["ConstructionFee"],
    });
  }
  if (Number(data.Commission) >= sumPrices) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "حق العمل باید کوچکتر از مجموع اجرت ساخت، حق العمل و سود فروشنده باشد",
      path: ["Commission"],
    });
  }
  if (Number(data.SellerProfit) >= sumPrices) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "سود فروشنده باید کوچکتر از مجموع اجرت ساخت، حق العمل و سود فروشنده باشد",
      path: ["SellerProfit"],
    });
  }
  if (Number(data.ConstructionFee) >= sumPrices) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "اجرت ساخت باید کوچکتر از مجموع اجرت ساخت، حق العمل و سود فروشنده باشد",
      path: ["ConstructionFee"],
    });
  }
});

export type GoldItemsType = z.infer<typeof goldItemsBaseSchema>;

export const goldItemsIndexes: GoldItemsSchemaKeys = [
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
  "ConstructionFee",
  "SellerProfit",
  "Commission",
  "OtherTaxRate",
  "OtherTaxPrice",
  "OtherTaxSubject",
  "OtherLegalFundsRate",
  "OtherLegalFundsPrice",
  "OtherLegalFundsSubject",
  "RegisterContractId",
  "Description",
];
