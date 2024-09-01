export interface InputModelGoodsList {
    page: number;
    size: number;
    stuffCode: string;
    type: string;
    specialOrGeneral: string;
    taxableOrFree: string;
    vat: number;
    vatCustomPurposes: number;
    descriptionOfID: string;
   }
   
  export  interface GoodsListType {
    inputModel: InputModelGoodsList;
   }
   export interface GoodsListFiltersType {
    stuffCode?:string,
descriptionOfID?:string
  }