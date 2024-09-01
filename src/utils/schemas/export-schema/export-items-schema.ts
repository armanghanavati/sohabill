import { z } from "zod";
import { ItemsSchemaKeys, itemsBaseSchema, itemsIndexes } from "../itemsSchema";

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
export type ExportItemsSchemaKeys = (keyof ExportItemsType)[];

function checkIsNan(val: string) {
  const n = Number(val);
  return !isNaN(n) && val?.length > 0 && !val?.includes(".");
}

export const exportItemsSchema = itemsBaseSchema.extend({
  RialValue: z
    .string({ coerce: true })
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue > 0;
      },
      { message: "ارزش ریالی بزرگتر از ۰ است" },
    )
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 15, 0);
      },
      { message: "حداکثر عدد صحیح 15 و حداکثر عدد اعشاری 0 است" },
    ),
  CurrencyValue: z
    .string({ coerce: true })
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue > 0;
      },
      { message: "ارزش ارزی بزرگتر از ۰ است" },
    )
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 14, 4);
      },
      { message: "حداکثر عدد صحیح 14 و حداکثر عدد اعشاری 4 است" },
    ),
  NetWeight: z
    .string({ coerce: true })
    .refine(
      (val) => {
        const numValue = Number(val);
        return numValue > 0;
      },
      { message: "وزن خالص بزرگتر از ۰ است" },
    )
    .refine(
      (val) => {
        return checkIsNan(val) && validateIntAndFloat(val, 15, 8);
      },
      { message: "حداکثر عدد صحیح 15 و حداکثر عدد اعشاری 8 است" },
    )
    .optional(),
});

export const exportItemsBaseSchema = exportItemsSchema.superRefine(
  (val, ctx) => {
    if (val.ValueIncreasedTaxRate && Number(val.ValueIncreasedTaxRate) !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "در الگوی صادرات نرخ مالیات بر ارزش افزوده 0 است",
        path: ["ValueIncreasedTaxRate"],
      });
    }
  },
);

export type ExportItemsType = z.infer<typeof exportItemsBaseSchema>;

export const exportItemsIndexes: ExportItemsSchemaKeys = [
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
  "RialValue",
  "CurrencyValue",
  "NetWeight",
  "OtherTaxRate",
  "OtherTaxPrice",
  "OtherTaxSubject",
  "OtherLegalFundsRate",
  "OtherLegalFundsPrice",
  "OtherLegalFundsSubject",
  "RegisterContractId",
  "Description",
];
