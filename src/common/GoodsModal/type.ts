import { Dispatch, SetStateAction } from "react";
import { UseFormGetValues, UseFormReset } from "react-hook-form";
import { SelectedItems } from "src/components/LiveSearch";
import {
  SelectOption,
  SerGetBillInitializeData,
  ValidSteps,
} from "src/models/AllData.model";

export interface AddGoodsInputModel {
  id?: number | string;
  stuffCode?: string;
  internalCode?: number | string;
  vat?: number | string;
  unitPrice?: number | string;
  discount?: number | string;
  otherTaxRate?: number | string;
  otherTaxSubject?: string;
  otherLegalFundsRate?: number | string;
  otherLegalFundsSubject?: string;
  stuffDesc?: string;
  currency?: any;
  currencyObject?: null | string;
  measurementUnit?: any;
  measurementUnitObject?: null | string;
  count?: null | number; // Corrected line
  vatCustomPurposes?: number;
  constructionFee?: string | null;
  sellerProfit?: string | null;
  commission?: string | null;
  carat?: string | null;
  equivalentWithRial?:string | null;
  rialValue?:string | null;
  netWeight?:string | null;
  currencyValue?:string | null;

}
export interface AddGoodsInterFace {
  inputModel: AddGoodsInputModel;
}

export interface GoodsModalsProps {
  openModal?: boolean;
  rowData?: any;
  setOpenModal: Dispatch<SetStateAction<any>>;
  setSelectedItem?: Dispatch<SetStateAction<any>>;
  setEditFlag?: any;
  type?: {
    editMode?: boolean;
    taxAdditionMode?: boolean;
    singleAdditionMode?: boolean;
    singleEditMode?: boolean;
  };
  billInitializeData?: SerGetBillInitializeData;
  editData?: AddGoodsInputModel;
  refreshTable?: boolean;
  setRefreshTable?: any;
  getSelectedItem?: (data: AddGoodsInputModel) => void;
  checkStatus?: any;
  subjectTypeId?: SelectOption;
  getValues?: UseFormGetValues<ValidSteps>;
  reset?: UseFormReset<ValidSteps>;
  selectedItemBuyer?: SelectedItems;
  setSelectedItemBuyer?: React.Dispatch<React.SetStateAction<SelectedItems>>;
  salesPattern?: SelectOption;
}

export interface SelectedItemGoods {
  result: string | AddGoodsInputModel[] | { [key: string]: string | null };
  isShowSearchResult: boolean;
}

export interface PropsGoodsInformation {
  selectedItem?: SelectedItemGoods;
  billInitializeData?: SerGetBillInitializeData;
  setSelectedItem?: React.Dispatch<React.SetStateAction<SelectedItemGoods>>;
  checkStatus?: any;
  subjectTypeId?: SelectOption;
  getValues?: UseFormGetValues<ValidSteps>;
  reset?: UseFormReset<ValidSteps>;
  selectedItemBuyer?: SelectedItems;
  setSelectedItemBuyer?: React.Dispatch<React.SetStateAction<SelectedItems>>;
  salesPattern?: SelectOption;
}
