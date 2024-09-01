import { SelectOption } from "src/models/AllData.model";

export interface BillsListType {
  id: number | string;
  status?: string;
  taxId?: string;
  serial?: string;
  issueDate?: string;
  createDate?: string;
  buyerPerson?: string;
  billPattern?: string;
  subject?: string;
  patternId?: number;
  typeId?: number;
  isEditable?: boolean;
  isCorrectable?: boolean;
  isCancellable?: boolean;
  isReturnable?: boolean;
  isRemovable?: boolean;
  hasError?: boolean;
  statusId?: number | string;
}

export interface BillsListFiltersType {
  status?: SelectOption;
  statusId?: number | string;
  BillStatuses?: number | string;
  taxId?: string;
  issueDate?: Date;
  createDate?: Date;
  serial: string;
  buyerPersonCode: number | string;
  page?: number;
  size?: number;
}

export interface billItems {
  count?: string | undefined;
  currencyTyp?: string | undefined;
  description?: string | undefined;
  discount?: string | undefined;
  measurementUnit?: string | undefined;
  otherLegalFundsPrice?: string | undefined;
  otherLegalFundsSubject?: string | undefined;
  otherTaxPrice?: string | undefined;
  otherTaxSubject?: string | undefined;
  serviceOrProductId?: string | undefined;
  totalItemPrice?: string | undefined;
  unitPrice?: string | undefined;
  valueIncreasedTaxPrice?: string | undefined;
  valueIncreasedTaxRate?: string | undefined;
  currencyType?: string | undefined;
  totalValueIncreasedTaxPrice?: string | undefined;
  stuffCode: string;
  totoalAminternalCodeount: string;
  constructionFee: string;
  sellerProfit: string;
  totoalAmount: string;
  commission: string;
  internalCode: string;
  otherLegalFundsRate: string;
  otherTaxRate: string;
  vat: string;
  carat: string;
}

export interface errorsItems {
  code?: string;
  detail?: string;
}

export interface BillsPrintType {
  billItems?: billItems[];
  subscriptionNumber?: string | undefined;
  flightTypes?: string | undefined;
  buyerBranchCode?: string | undefined;
  article17TaxPrice?: string | undefined;
  cotageDate?: string | undefined;
  flightType?: string | undefined;
  cotageNumber?: string | undefined;
  billPaternType?: string | undefined;
  billSerial?: string | undefined;
  buyerCompanyName?: string | undefined;
  buyerPersonBranchCode?: string | undefined;
  buyerPersonEconomicCode?: string | undefined;
  buyerPersonFullName: string | undefined;
  buyerPersonNationalId: string | undefined;
  buyerPersonPostalCode?: string | undefined;
  cashPrice?: string | undefined;
  companyName?: string | undefined;
  createDate?: string | undefined;
  creditPrice?: string | undefined;
  customsCode?: string | undefined;
  customsLicenseNumber?: string | undefined;
  economicCode?: string | undefined;
  fullname?: string | undefined;
  issueDate?: string | undefined;
  memoryId?: string | undefined;
  nationalCode?: string | undefined;
  referenceTaxId?: string | undefined;
  registrationNumber?: string | undefined;
  sellerBranchCode?: string | undefined;
  serial?: string | undefined;
  settelmentType?: string | undefined;
  subject?: string | undefined;
  taxArticle17?: string | undefined;
  taxId?: string | undefined;
  totalCost?: string | undefined;
  totalCostPersianWord?: string | undefined;
  totalDiscount?: string | undefined;
  statusColor?: string | undefined;
  statusDescription?: string | undefined;
  billList?: string | undefined;
  totalValueIncreasedTaxPrice?: string | undefined;
  errors?: errorsItems[] | undefined;
}
