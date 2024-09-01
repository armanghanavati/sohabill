import { DropDownDataType } from "src/components/DropDown";
import DropDownComponent from "src/components/DropDown";
import CancelIcon from "src/assets/icons/CancelIcon";
import { PropsDropDownBuyers } from "../types";
import CorrectionIcon from "src/assets/icons/CorrectionIcon";

const DropDown: React.FC<PropsDropDownBuyers> = ({
  item,
  setEditFieldAddBuyer,
  handleDeleteBuyer,
}) => {
  const handleEditBuyer = () => {
    console.log(item);
    setEditFieldAddBuyer(item);
  };

  const data: DropDownDataType[] = [
    {
      key: "cancel",
      children: (
        <div
          className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
          onClick={() => handleDeleteBuyer(item?.id)}
        >
          <span className="tw-me-3">حذف</span>
          <CancelIcon />
        </div>
      ),
    },
    {
      key: "edit",
      children: (
        <div
          className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
          onClick={handleEditBuyer}
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
