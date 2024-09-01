import DeleteIcon from "src/assets/icons/DeleteIcon";
import EditIcon from "src/assets/icons/EditIcon";
import RepeatIcon from "src/assets/icons/RepeatIcon";
import { DropDownDataType } from "src/components/DropDown";
import DropDownComponent from "src/components/DropDown";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/hook";
import CancelIcon from "src/assets/icons/CancelIcon";
import asyncWrapper from "src/utils/asyncWrapper";
import { removeBill } from "src/services/masterServices";
import {
  RsetMessageModal,
  handleLoading,
  RsetShowToast,
} from "src/common/slices/mainSlice";
import { BillsListType } from "../types";
import CorrectionIcon from "src/assets/icons/CorrectionIcon";

interface DropDownProps extends BillsListType {
  getBillsList: any;
}
const DropDown: React.FC<DropDownProps> = ({
  isCorrectable,
  isEditable,
  isCancellable,
  isRemovable,
  isReturnable,
  id,
  getBillsList,
  taxId,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEditBill = (subjectTypeId: string | null) => {
    navigate(`/users/editBill/${id}/${subjectTypeId}/${taxId}`);
  };

  const handleRemovable = asyncWrapper(async () => {
    dispatch(handleLoading({ loading: true }));
    const {
      data: { code, message },
    } = await removeBill(id);
    if (code === 0) {
      getBillsList();
      dispatch(
        RsetShowToast({
          show: true,
          title: message,
          bg: "success",
        }),
      );
    } else {
      dispatch(
        RsetMessageModal({
          show: true,
          title: message || "مشکلی در سرور به وجود آمده است.",
        }),
      );
    }
    dispatch(handleLoading({ loading: false }));
  });

  const data: DropDownDataType[] = [
    ...(isCancellable
      ? [
          {
            key: "cancel",
            children: (
              <div
                className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
                onClick={() => handleEditBill("3")}
              >
                <span className="tw-me-3">ابطال</span>
                <CancelIcon />
              </div>
            ),
          },
        ]
      : []),
    ...(isReturnable
      ? [
          {
            key: "return-from-sale",
            children: (
              <div
                className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
                onClick={() => handleEditBill("4")}
              >
                <span className="tw-me-3">بازگشت از فروش</span>
                <RepeatIcon />
              </div>
            ),
          },
        ]
      : []),
    ...(isRemovable
      ? [
          {
            key: "remove",
            children: (
              <div
                className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
                onClick={handleRemovable}
              >
                <span className="tw-me-3">حذف</span>
                <DeleteIcon />
              </div>
            ),
          },
        ]
      : []),
    ...(isCorrectable
      ? [
          {
            key: "edit",
            children: (
              <div
                className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
                onClick={() => handleEditBill("2")}
              >
                <span className="tw-me-3">اصلاح</span>
                <EditIcon />
              </div>
            ),
          },
        ]
      : []),
    ...(isEditable
      ? [
          {
            key: "edit",
            children: (
              <div
                className="tw-flex tw-min-w-40 tw-cursor-pointer tw-items-center tw-justify-end"
                onClick={() => handleEditBill("1")}
              >
                <span className="tw-me-3">ویرایش</span>
                <CorrectionIcon />
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <DropDownComponent
      data={data}
      disabled={
        !(
          isCorrectable ||
          isCancellable ||
          isEditable ||
          isRemovable ||
          isReturnable
        )
      }
    />
  );
};

export default DropDown;
