import { AllCurrencyType, CurrencyType } from "../models/AllData.model";

export default class TaxHelpers {
    static fixCurrencyType(state: any): AllCurrencyType[] {
        let fixCurrencyOptionType: AllCurrencyType[] = [];
        state?.map((item: CurrencyType, index: number) => {
            const fixTitleByContry = item?.country;
            const fixTitleByCurrency = item?.nameFa;
            const fixAll = `${fixTitleByCurrency} (${fixTitleByContry})`;
            return fixCurrencyOptionType.push({
                id: item?.abbreviation,
                title: fixAll,
            });
        });
        return fixCurrencyOptionType;
    }

}
