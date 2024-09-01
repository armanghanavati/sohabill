export interface BuyersListType {
  id?: number;
  loadingName?: string;
  postCode?: string;
  buyerBranchCode?: string;
  passportNumber?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  BuyerPersonCode?: string | number;
  personCode?: string;
  economicCode?: string;
  pageNumber?: number;
  pageSize?: number;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  personTypeId?:any ;
}

export interface PropsDropDownBuyers {
  item: BuyersListType
  setEditFieldAddBuyer: React.Dispatch<React.SetStateAction<BuyersListType>>;
  handleDeleteBuyer: () => void
}