export type BaseResponseType<T> = {
  result: T;
  code: number;
  message: string;
};

export type PatternListType = {
  id: number;
  title: string;
};
