import StringHelpers from "../../helpers/string-helpers";

export const validation = {
  legalNationalCode: (value: any) => {
    if (!value) {
      return true;
    }

    const L = value.length;

    if (L < 11 || parseInt(value, 10) === 0) {
      return "شناسه ملی وارد شده صحیح نمی باشد";
    }

    if (parseInt(value.substr(3, 6), 10) === 0) {
      return "شناسه ملی وارد شده صحیح نمی باشد";
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
  legalNationalCodeOrNationalCode: (value: any) => {
    if (!value) {
      return false;
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
    const nationalCode = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";
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
      return "کد/شناسه ملی وارد شده صحیح نمی باشد";
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
      "کد/شناسه ملی وارد شده صحیح نمی باشد"
    );
  },
  postCode: (value: any) => {
    const postCode = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (postCode === "") {
      return "کد پستی وارد شده صحیح نمی باشد";
    }

    if (postCode.length !== 10 || !RegExp(/^\d+$/).test(postCode)) {
      return "کد پستی وارد شده صحیح نمی باشد";
    }

    const firstFiveDigits = postCode.substring(0, 5);

    if (
      firstFiveDigits.indexOf("0") > -1 ||
      firstFiveDigits.indexOf("2") > -1 ||
      postCode[4] === "5" ||
      postCode[5] === "0" ||
      postCode.substring(6, 10) === "0000"
    ) {
      return "کد پستی وارد شده صحیح نمی باشد";
    }

    return true;
  },
};
