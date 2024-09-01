import StringHelpers from '../../helpers/string-helpers';
import { FC } from 'react'
// توابع با تایپ‌های اصطلاحی TypeScript تغییر داده می‌شوند
type ValidationFunction = (value: string, fileName?: string) => true | string;

interface ValidationFunctions {
    [key: string]: ValidationFunction;
}

// توابع با تایپ‌های اصطلاحی TypeScript تغییر داده می‌شوند
// type ValidationFunction = (...args: any[]) => true | string;

export const Validators = {
    required(value?: string | number, message: string | null = null): true | string {
        return value === 0 || !!value || message || "پرکردن این فیلد الزامی است";
    }
    ,
    requiredForeign(value: any, message: string | null = null): true | string {
        return value === 0 || !!value || message || "filling this field is mandatory";
    },

    digits(value: string, length: number): true | string {
        if (!value) {
            return true;
        }
        return value.length === length || ` یک مقدار عددی ${length} رقمی وارد کنید`;
    },

    // decimal(value: number, decimalLength: number): true | string {
    //     if (isNaN(value)) {
    //         return "ورودی عددی نامعتبر است";
    //     }

    //     if (!value) {
    //         return true;
    //     }

    //     return (
    //         (value >= 0 && (Number(value) * Math.pow(10, Number(decimalLength))).toFixed(8) % 1 === 0) || (decimalLength === 0
    //             ? "عدد صحیح نامنفی وارد نمایید"
    //             : `عدد صحیح نامنفی یا اعشاری (تا ${decimalLength} رقم اعشار) وارد نمایید.`)
    //     );
    // },

    minLength(value: string, length: number): true | string {
        if (!value) {
            return true;
        }
        return (
            (value ? value.trim() : "").length >= length ||
            `حداقل ${length} کاراکتر وارد نمایید`
        );
    },

    minLengthForeign(value: string, length: number): true | string {
        if (!value) {
            return true;
        }
        return (
            (value ? value.trim() : "").length >= length ||
            `حداقل ${length} کاراکتر وارد نمایید`
        );
    },

    maxLength(value: string, length: number): true | string {
        if (!value) {
            return true;
        }
        return (
            (value ? value.trim() : "").length <= length ||
            `حداکثر ${length} کاراکتر وارد نمایید`
        );
    },

    numberValue(value: string): true | string {
        if (!value) {
            return true;
        }
        return /^\d+$/.test(value) || `عدد صحیح وارد نمایید`;
    },

    maxValue(value: number, maximumNumber: number, message: string | undefined = undefined): boolean | string {
        return (Number(value) || 0) <= (Number(maximumNumber) || 0) ||
            (message ? message : ` مقدار مجاز کوچکتر از ${maximumNumber + 1} می‌باشد`);
    },

    minValue(value: number, minimumNumber: number, message: string | undefined = undefined): boolean | string {
        return (Number(value) || 0) >= (Number(minimumNumber) || 0) ||
            (message ? message : `حداقل مقدار مجاز ${minimumNumber} می‌باشد`);
    },

    date(value: string): true | string {
        const regex = /^(?:(12|13|14)[0-9]{2})[/.](0[1-9]|1[012])[/.](0[1-9]|[12][0-9]|3[01])$/;
        return regex.test(StringHelpers.convertNumbersToLatin(value)) || "تاریخ وارد شده صحیح نمی‌باشد";
    },

    // افزودن توابع اعتبارسنجی به لیست اعتبارسنجی‌ها
    // validationFunctions["required"] = required;
    // validationFunctions["requiredForeign"] = requiredForeign;
    // validationFunctions["digits"] = digits;
    // validationFunctions["decimal"] = decimal;
    // validationFunctions["minLength"] = minLength;
    // validationFunctions["minLengthForeign"] = minLengthForeign;
    // validationFunctions["maxLength"] = maxLength;
    // validationFunctions["numberValue"] = numberValue;
    // validationFunctions["maxValue"] = maxValue;
    // validationFunctions["minValue"] = minValue;
    // validationFunctions["date"] = date;
    validateEmail(value: string): true | string {
        const email = value ? value.trim() : "";

        if (email === "") {
            return true;
        }

        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "ایمیل وارد شده صحیح نمی‌باشد";
    },

    validateEmailForeign(value: string): true | string {
        const email = value ? value.trim() : "";

        if (email === "") {
            return true;
        }

        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "The entered email is not correct";
    },

    validateSerialNumber(value: string): true | string {
        if (!value) {
            return true;
        }
        const pattern = /^(?=.{8,16}$)[0-9]{5}-[A-Za-z0-9_.]{2,10}$/;
        return pattern.test(value) || "سریال وارد شده صحیح نمی‌باشد";
    },

    validatePasswordNumber(value: string): true | string {
        if (!value) {
            return true;
        }

        const pattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#/^]{8,}$/;
        if (pattern.test(value)) {
            return true;
        } else {
            return "کلمه عبور حداقل بین 8 و 25 کاراکتر، 3 مورد از انواع کاراکتر، اعداد، حروف کوچک، حروف بزرگ و علائم را دارا باشد";
        }
    },

    validateRepeatPasswordNumber(value: string, repeatValue: string): true | string {
        if (!value) {
            return true;
        }
        return value === repeatValue || "لطفاً مقدار یکسان وارد فرمایید";
    },

    validateRepeatPasswordNumberForeign(value: string, repeatValue: string): true | string {
        if (!value) {
            return true;
        }
        return value === repeatValue || "please enter the same amount";
    },

    validatePasswordNumberForeign(value: string): true | string {
        if (!value) {
            return true;
        }

        const pattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#/^]{8,}$/;
        if (pattern.test(value)) {
            return true;
        } else {
            return "the password must contain at least 8 and 25 characters, 3 types of characters - numbers - lowercase letters - uppercase letters and symbols";
        }
    },

    validateLegalNationalCode(value: string): boolean | string {
        if (!value) {
            return true;
        }
        const L = value.length;

        if (L < 11 || parseInt(value, 10) === 0) {
            return "شناسه ملی وارد شده صحیح نمی‌باشد";
        }

        if (parseInt(value.substr(3, 6), 10) === 0) {
            return "شناسه ملی وارد شده صحیح نمی‌باشد";
        }

        const c = parseInt(value.substr(10, 1), 10);
        const d = parseInt(value.substr(9, 1), 10) + 2;
        const z = new Array(29, 27, 23, 19, 17);
        let s = 0;
        for (let i = 0; i < 10; i++) {
            s += (d + parseInt(value.substr(i, 1), 10)) * z[i % 5];
        }
        s = s % 11;
        if (s === 10) {
            s = 0;
        }
        return c === s;
    },

    validateLegalNationalCodeOrNationalCode(value: string): true | string {
        if (!value) {
            return true;
        }
        // شناسه ملی
        const c = parseInt(value.substr(10, 1), 10);
        const d = parseInt(value.substr(9, 1), 10) + 2;
        const z = new Array(29, 27, 23, 19, 17);
        let s = 0;
        for (let i = 0; i < 10; i++) {
            s += (d + parseInt(value.substr(i, 1), 10)) * z[i % 5];
        }
        s = s % 11;
        if (s === 10) {
            s = 0;
        }
        // کدملی
        const nationalCode = value ? value.trim() : "";
        const allDigitsAreEqual = [
            "0000000000",
            "1111111111",
            "2222222222",
            "3333333333",
            "4444444444",
            "5555555555",
            "6666666666",
            "7777777777",
            "8888888888",
            "9999999999",
        ];

        if (allDigitsAreEqual.indexOf(nationalCode) >= 0) {
            return "کد/شناسه ملی وارد شده صحیح نمی‌باشد";
        }
        const num0 = parseInt(nationalCode[0], 10) * 10;
        const num2 = parseInt(nationalCode[1], 10) * 9;
        const num3 = parseInt(nationalCode[2], 10) * 8;
        const num4 = parseInt(nationalCode[3], 10) * 7;
        const num5 = parseInt(nationalCode[4], 10) * 6;
        const num6 = parseInt(nationalCode[5], 10) * 5;
        const num7 = parseInt(nationalCode[6], 10) * 4;
        const num8 = parseInt(nationalCode[7], 10) * 3;
        const num9 = parseInt(nationalCode[8], 10) * 2;
        const a = parseInt(nationalCode[9], 10);

        const b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
        const cc = b % 11;

        return (
            c === s ||
            (cc < 2 && a === cc) ||
            (cc >= 2 && 11 - cc === a) ||
            "کد/شناسه ملی وارد شده صحیح نمی‌باشد"
        );
    },
    convertNumbersToLatin(value: string): string {
        // الگوریتم تبدیل اعداد فارسی به اعداد لاتین را اضافه کنید
        // به عنوان مثال:
        // return value.replace(/۰/g, '0').replace(/۱/g, '1').replace(/۲/g, '2').replace(/۳/g, '3').replace(/۴/g, '4').replace(/۵/g, '5').replace(/۶/g, '6').replace(/۷/g, '7').replace(/۸/g, '8').replace(/۹/g, '9');
        return value;
    },

    validatePhoneNumber(value: string): true | string {
        const phoneNumber = value ? StringHelpers.convertNumbersToLatin(value.trim()) : "";

        if (phoneNumber === "") {
            return true;
        }

        if (
            phoneNumber.length !== 11 ||
            !RegExp(/^\d+$/).test(phoneNumber) ||
            phoneNumber[0] !== "0" ||
            phoneNumber[1] !== "9"
        ) {
            return "شماره تلفن همراه وارد شده صحیح نمی‌باشد";
        }

        return true;
    },

    validatePhoneNumberForeign(value: string): true | string {
        const phoneNumber = value ? StringHelpers.convertNumbersToLatin(value.trim()) : "";

        if (phoneNumber === "") {
            return true;
        }

        if (
            phoneNumber.length !== 11 ||
            !RegExp(/^\d+$/).test(phoneNumber) ||
            phoneNumber[0] !== "0" ||
            phoneNumber[1] !== "9"
        ) {
            return "the mobile phone number entered is not correct";
        }

        return true;
    },

    validateCheckNumber(value: string): true | string {
        const phoneNumber = value ? StringHelpers.convertNumbersToLatin(value.trim()) : "";

        if (phoneNumber === "") {
            return true;
        }

        if (
            phoneNumber.length !== 11 ||
            !RegExp(/^[\u06F0-\u06F90-9]+$/).test(phoneNumber) ||
            phoneNumber[0] !== "0"
        ) {
            return "شماره تلفن وارد شده صحیح نمی‌باشد";
        }

        return true;
    },

    validateCheckNumberForeign(value: string): true | string {
        const phoneNumber = value ? StringHelpers.convertNumbersToLatin(value.trim()) : "";

        if (phoneNumber === "") {
            return true;
        }

        if (
            phoneNumber.length !== 11 ||
            !RegExp(/^[\u06F0-\u06F90-9]+$/).test(phoneNumber) ||
            phoneNumber[0] !== "0"
        ) {
            return "the phone number entered is not correct";
        }

        return true;
    },

    isFileRequired(value: any, fileName: string): true | string {
        if (!fileName && !value) {
            return "پرکردن این فیلد الزامی است";
        }
        return true;
    },


    // const validationFunctions: ValidationFunctions = {
    //     phoneNumber: validatePhoneNumber,
    //     phoneNumberForeign: validatePhoneNumberForeign,
    //     checkNumber: validateCheckNumber,
    //     checkNumberForeign: validateCheckNumberForeign,
    //     isFileRequired: isFileRequired,
    // }

    validateFileSize(value: any, maxFileSizeInKB: number): true | string {
        if (!value) {
            return true;
        }

        if (Array.isArray(value)) {
            for (const file of value) {
                if (file?.size > maxFileSizeInKB * 1000) {
                    return `حداکثر حجم فایل باید ${maxFileSizeInKB} کیلوبایت باشد`;
                }
            }
        } else if (value?.size > maxFileSizeInKB * 1000) {
            return `حداکثر حجم فایل باید ${maxFileSizeInKB} کیلوبایت باشد`;
        }

        return true;
    },

    validateFileSizeImage(value: any, maxFileSizeInKB: number): true | string {
        if (!value) {
            return true;
        }
        let resulteValue = parseInt(value?.size || "0") / 1024;
        if (Array.isArray(value)) {
            for (const file of value) {
                let resulteFile = parseInt(file?.size || "0") / 1024;
                if (file?.size > maxFileSizeInKB * 1000) {
                    return `اندازه تصویر انتخابی شما ${resulteFile >= 1000 ? "کیلوبایت" : "بایت"
                        } می‌باشد`;
                } else if (file?.size < maxFileSizeInKB * 1000) {
                    return `اندازه تصویر انتخابی شما ${Math.ceil(resulteFile)} ${resulteFile >= 1000 ? "کیلوبایت" : "بایت"
                        } می‌باشد`;
                }
            }
        } else if (value?.size > maxFileSizeInKB * 1000) {
            return `اندازه تصویر انتخابی شما ${Math.ceil(resulteValue)} ${resulteValue >= 1000 ? "کیلوبایت" : "بایت"
                } می‌باشد`;
        } else if (value?.size < maxFileSizeInKB * 1000) {
            return `اندازه تصویر انتخابی شما ${Math.ceil(resulteValue)} ${resulteValue >= 1000 ? "کیلوبایت" : "بایت"
                } می‌باشد`;
        }
        return true;
    },

    validateFileSizeImageForeign(value: any, maxFileSizeInKB: number): true | string {
        if (!value) {
            return true;
        }
        let resulteValue = parseInt(value?.size || "0") / 1024;
        if (Array.isArray(value)) {
            for (const file of value) {
                let resulteFile = parseInt(file?.size || "0") / 1024;
                if (file?.size > maxFileSizeInKB * 1000) {
                    return `your chosen image size is ${Math.ceil(resulteFile)} ${resulteFile >= 1000 ? "KB" : "Bit"
                        }`;
                } else if (file?.size < maxFileSizeInKB * 1000) {
                    return `your chosen image size is ${Math.ceil(resulteFile)} ${resulteFile >= 1000 ? "KB" : "Bit"
                        }`;
                }
            }
        } else if (value?.size > maxFileSizeInKB * 1000) {
            return `your chosen image size is ${Math.ceil(resulteValue)} ${resulteValue >= 1000 ? "KB" : "Bit"
                }`;
        } else if (value?.size < maxFileSizeInKB * 1000) {
            return `your chosen image size is ${Math.ceil(resulteValue)} ${resulteValue >= 1000 ? "KB" : "Bit"
                }`;
        }
        return true;
    },

    validateMaxValue(value: string, maximumNumber: number, message?: string): true | string {
        return (Number(value) || 0) <= (Number(maximumNumber) || 0) ||
            (message ? message : ` مقدار مجاز کوچکتر از ${maximumNumber + 1} می‌باشد`);
    },

    validateFileFormat(file: File, formats: string[], validFormats: string): true | string {
        return formats?.includes(file?.type) || ` فرمت مجاز ${validFormats} می‌باشد`;
    },

    validateFileFormatForeign(file: File, formats: string[], validFormats: string): true | string {
        return formats?.includes(file?.type) || ` allowed format is ${validFormats} `;
    },

    validatePostCode(value: string): true | string {
        const postCode = value ? StringHelpers.convertNumbersToLatin(value.trim()) : "";

        if (postCode === "") {
            return "کد پستی وارد شده صحیح نمی‌باشد";
        }

        if (postCode.length !== 10 || !RegExp(/^\d+$/).test(postCode)) {
            return "کد پستی وارد شده صحیح نمی‌باشد";
        }

        const firstFiveDigits = postCode.substring(0, 5);

        if (
            firstFiveDigits.indexOf("0") > -1 ||
            firstFiveDigits.indexOf("2") > -1 ||
            postCode[4] === "5" ||
            postCode[5] === "0" ||
            postCode.substring(6, 10) === "0000"
        ) {
            return "کد پستی وارد شده صحیح نمی‌باشد";
        }

        return true;
    },

    validatePostCodeForeign(value: string): true | string {
        const postCode = value ? StringHelpers.convertNumbersToLatin(value.trim()) : "";

        if (postCode === "") {
            return "the postal code entered is not correct";
        }

        if (postCode.length !== 10 || !RegExp(/^\d+$/).test(postCode)) {
            return "the postal code entered is not correct";
        }

        const firstFiveDigits = postCode.substring(0, 5);

        if (
            firstFiveDigits.indexOf("0") > -1 ||
            firstFiveDigits.indexOf("2") > -1 ||
            postCode[4] === "5" ||
            postCode[5] === "0" ||
            postCode.substring(6, 10) === "0000"
        ) {
            return "the postal code entered is not correct";
        }

        return true;
    },


    // const validationFunctions: ValidationFunctions = {
    //     fileSize: validateFileSize,
    //     fileSizeImage: validateFileSizeImage,
    //     fileSizeImageForeign: validateFileSizeImageForeign,
    //     maxValue: validateMaxValue,
    //     fileFormat: validateFileFormat,
    //     fileFormatForeign: validateFileFormatForeign,
    //     postCode: validatePostCode,
    //     postCodeForeign: validatePostCodeForeign,
    // };

    validateNationalCode(value: string): true | string {
        const nationalCode = value ? StringHelpers.convertNumbersToLatin(value.trim()) : "";

        if (nationalCode === "") {
            return true;
        }

        if (
            nationalCode === "" ||
            nationalCode.length !== 10 ||
            isNaN(parseInt(nationalCode, 10))
        ) {
            return "کد ملی وارد شده صحیح نمی‌باشد";
        }

        const allDigitsAreEqual = [
            "0000000000",
            "1111111111",
            "2222222222",
            "3333333333",
            "4444444444",
            "5555555555",
            "6666666666",
            "7777777777",
            "8888888888",
            "9999999999",
        ];

        if (allDigitsAreEqual.indexOf(nationalCode) >= 0) {
            return "کد ملی وارد شده صحیح نمی‌باشد";
        }

        const num0 = parseInt(nationalCode[0], 10) * 10;
        const num2 = parseInt(nationalCode[1], 10) * 9;
        const num3 = parseInt(nationalCode[2], 10) * 8;
        const num4 = parseInt(nationalCode[3], 10) * 7;
        const num5 = parseInt(nationalCode[4], 10) * 6;
        const num6 = parseInt(nationalCode[5], 10) * 5;
        const num7 = parseInt(nationalCode[6], 10) * 4;
        const num8 = parseInt(nationalCode[7], 10) * 3;
        const num9 = parseInt(nationalCode[8], 10) * 2;
        const a = parseInt(nationalCode[9], 10);

        const b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
        const c = b % 11;

        return (
            (c < 2 && a === c) ||
            (c >= 2 && 11 - c === a) ||
            "کد ملی وارد شده صحیح نمی‌باشد"
        );
    },

    validateNationalCodeForeign(value: string): true | string {
        const nationalCode = value ? StringHelpers.convertNumbersToLatin(value.trim()) : "";

        if (nationalCode === "") {
            return true;
        }

        if (
            nationalCode === "" ||
            nationalCode.length !== 10 ||
            isNaN(parseInt(nationalCode, 10))
        ) {
            return "the entered national code is not correct";
        }

        const allDigitsAreEqual = [
            "0000000000",
            "1111111111",
            "2222222222",
            "3333333333",
            "4444444444",
            "5555555555",
            "6666666666",
            "7777777777",
            "8888888888",
            "9999999999",
        ];

        if (allDigitsAreEqual.indexOf(nationalCode) >= 0) {
            return "the entered national code is not correct";
        }

        const num0 = parseInt(nationalCode[0], 10) * 10;
        const num2 = parseInt(nationalCode[1], 10) * 9;
        const num3 = parseInt(nationalCode[2], 10) * 8;
        const num4 = parseInt(nationalCode[3], 10) * 7;
        const num5 = parseInt(nationalCode[4], 10) * 6;
        const num6 = parseInt(nationalCode[5], 10) * 5;
        const num7 = parseInt(nationalCode[6], 10) * 4;
        const num8 = parseInt(nationalCode[7], 10) * 3;
        const num9 = parseInt(nationalCode[8], 10) * 2;
        const a = parseInt(nationalCode[9], 10);

        const b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
        const c = b % 11;

        return (
            (c < 2 && a === c) ||
            (c >= 2 && 11 - c === a) ||
            "the entered national code is not correct"
        );
    },

    // افزودن توابع اعتبارسنجی به لیست اعتبارسنجی‌ها
    // validationFunctions["nationalCode"] = validateNationalCode;
    // validationFunctions["nationalCodeForeign"] = validateNationalCodeForeign;


}

const validationFunctions: ValidationFunctions = {
    phoneNumber: Validators.validatePhoneNumber,
    phoneNumberForeign: Validators.validatePhoneNumberForeign,
    checkNumber: Validators.validateCheckNumber,
    checkNumberForeign: Validators.validateCheckNumberForeign,
    // isFileRequired: Validators.isFileRequired,
}
