import { z } from "zod";

export type BuyerSchemaKeys = (keyof BuyerType)[];

export const stringOfNumbers = (num: number) => {
  return Array.from({ length: num }, (_, index) => String(index + 1));
};

function checkIsNan(val: string) {
  const n = Number(val);
  return !isNaN(n) && val?.length > 0 && !val?.includes(".");
}

export const buyerSchema = z
  .object({
    firstName: z
      .string({
        invalid_type_error: "لطفا نام را درست وارد کنید",
        required_error: "لطفا نام را وارد کنید",
      })
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
        {
          message: "لطفا حروف وارد کنید",
        },
      ),
    lastName: z
      .string({
        invalid_type_error: "لطفا نام خانوادگی را درست وارد کنید",
        required_error: "لطفا نام خانوادگی را وارد کنید",
      })
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
    personTypeId: z.coerce
      .string({ required_error: "لطفا نوع شخص را وارد کنید" })
      .refine((val) => stringOfNumbers(4).includes(val), {
        message: "برای  نوع خریدار اعداد 1 تا 4 مورد قبول است",
      }),
    personCode: z.coerce
      .string()
      .min(10, { message: "باید حداقل 10 رقم باشد" })
      .max(12, { message: "باید حداکثر 12 رقم باشد" })
      .refine(
        (val) => {
          return checkIsNan(val);
        },
        { message: "لطفا عدد صحیح وارد کنید" },
      )
      .optional(),
    economicCode: z.coerce
      .string()
      .min(11, { message: "باید حداقل 11 رقم باشد" })
      .max(14, { message: "باید حداکثر 14 رقم باشد" })
      .refine(
        (val) => {
          return checkIsNan(val);
        },
        { message: "لطفا عدد صحیح وارد کنید" },
      )
      .optional(),
    postCode: z.coerce
      .string()
      .length(10, { message: "کد پستی باید 10 رقمی باشد" })
      .refine(
        (val) => {
          return checkIsNan(val);
        },
        { message: "لطفا عدد صحیح وارد کنید" },
      )
      .optional(),
    passportNumber: z.coerce
      .string()
      .length(9, { message: "شماره پاسپورت 9 رقمی است." })
      .optional(),
    companyName: z.coerce.string().optional(),
  })
  .superRefine((data, ctx) => {
    let length: number[];
    let buyerEcoCode: number;
    switch (data.personTypeId) {
      case "1":
        length = [10];
        buyerEcoCode = 14;
        if (!data.economicCode && !data.postCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "اگر نوع شخص حقیقی(1) باشد یا کد اقتصادی یا (کد پستی و کد ملی) الزامی است",
            path: ["economicCode"],
          });
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "اگر نوع شخص حقیقی(1) باشد یا کد اقتصادی یا (کد پستی و کد ملی) الزامی است",
            path: ["postCode"],
          });
        }
        break;
      case "2":
        length = [11];
        buyerEcoCode = 11;
        if (!data.economicCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "اگر نوع شخص حقوقی(2) و یا مشارکت مدنی(3) باشد کد اقتصادی الزامی است",
            path: ["economicCode"],
          });
        }
        break;
      case "3":
        length = [11];
        buyerEcoCode = 11;
        if (!data.economicCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "اگر نوع شخص حقوقی(2) و یا مشارکت مدنی(3) باشد کد اقتصادی الزامی است",
            path: ["economicCode"],
          });
        }
        break;
      case "4":
        length = [12];
        buyerEcoCode = 14;

        if (!data.economicCode && !data.postCode) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "اگر نوع شخص اتباع خارجی(4) باشد یا کد اقتصادی یا (کد پستی و کد ملی) الزامی است",
            path: ["economicCode"],
          });
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "اگر نوع شخص اتباع خارجی(4) باشد یا کد اقتصادی یا (کد پستی و کد ملی) الزامی است",
            path: ["postCode"],
          });
        }
        break;
      default:
        return false;
    }

    if (!length.some((code) => code === data.personCode?.length)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `شماره ملی خریدار برای این نوع خریدار باید ${length} رقمی باشد`,
        path: ["personCode"],
      });
    }
    if (data.economicCode && data.economicCode?.length !== buyerEcoCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `اگر نوع خریدار ${data.personTypeId} باشد کد اقتصادی خریدار ${buyerEcoCode} رقمی است`,
        path: ["economicCode"],
      });
    }
  });

export type BuyerType = z.infer<typeof buyerSchema>;

export const buyerIndexes: BuyerSchemaKeys = [
  "firstName",
  "lastName",
  "personTypeId",
  "economicCode",
  "personCode",
  "postCode",
  "passportNumber",
  "companyName",
];
