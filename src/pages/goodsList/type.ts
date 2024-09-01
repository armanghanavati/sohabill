export interface InputModelPersonalizedGoods {
    id?:any;
    internalCode?: string;
    stuffCode?: string;
    stuffDesc?: string;
  page: number;
  size: number;
}

export interface PersonalizedGoodsType {
  inputModel: InputModelPersonalizedGoods;
}
