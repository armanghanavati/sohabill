import DeleteIcon from "src/assets/icons/DeleteIcon";
import { DropDownDataType } from "src/components/DropDown";
import DropDownComponent from "src/components/DropDown";
import CorrectionIcon from "src/assets/icons/CorrectionIcon";
import { AddGoodsInputModel } from "src/common/GoodsModal/type";
interface DropDownProps {
  handleDeleteFunction?: (id?: number) => void;
  handleEditFunction?: (data?:any) => void;
  id?: any;
  editData?:AddGoodsInputModel
}
// this function for dropdown for PersonalizedGoods-------------------
const DropDown: React.FC<DropDownProps> = ({
  handleDeleteFunction,
  handleEditFunction,
  id,
  editData
}) => {
  const data: DropDownDataType[] = [
    {
      key: "remove",
      children: (
        <div
          className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
          onClick={() => {
            if (typeof handleDeleteFunction === 'function') {
                handleDeleteFunction(id);
              }
          }}
        >
          <span className="tw-me-3">حذف</span>
          <DeleteIcon />
        </div>
      ),
    },

    {
      key: "edit",
      children: (
        <div
          className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
          onClick={() => {
            if (typeof handleEditFunction === 'function') {
                handleEditFunction(editData);
              }
          }}
        >
          <span className="tw-me-3">ویرایش</span>
          <CorrectionIcon />
        </div>
      ),
    },
  ];
  return <DropDownComponent data={data} />;
};

export default DropDown;
