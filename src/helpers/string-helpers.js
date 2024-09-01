import persian_en from "react-date-object/locales/persian_en";
import persian from "react-date-object/calendars/persian";
export default class StringHelpers {
    static convertNumbersToLatin(input) {
        if (!input) {
            return;
        }
        return input
            .replace(/۰/g, '0')
            .replace(/۱/g, '1')
            .replace(/۲/g, '2')
            .replace(/۳/g, '3')
            .replace(/۴/g, '4')
            .replace(/۵/g, '5')
            .replace(/۶/g, '6')
            .replace(/۷/g, '7')
            .replace(/۸/g, '8')
            .replace(/۹/g, '9')
            .replace(/٠/g, '0')
            .replace(/١/g, '1')
            .replace(/٢/g, '2')
            .replace(/٣/g, '3')
            .replace(/٤/g, '4')
            .replace(/٥/g, '5')
            .replace(/٦/g, '6')
            .replace(/٧/g, '7')
            .replace(/٨/g, '8')
            .replace(/٩/g, '9');
    }

    static formatNumber(value) {
        return (value && value != 0) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
    }

    static isNullOrWhitespace(input) {
        if (typeof input === 'undefined' || input == null) return true;
        return input.replace(/\s/g, '').length < 1;
    }

    static unFormatMoney(separatedValue) {
        return separatedValue.toString().replaceAll(',', '');
    }

    // operation Remove Sep
    static operationRemoveSep(data) {
        return data?.toString()?.replace(/,/g, "") || 0
    }

    // -> id random
    static generateRanHex(size) {
        let result = [];
        let hexRef = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
        ];
        for (let n = 0; n < size; n++) {
            result.push(hexRef[Math.floor(Math.random() * 16)]);
        }
        return result.join("");
    };

    static convertDatePer(date) {
        return date?.convert(persian, persian_en)?.format("YYYY/MM/DD")
    }
}
