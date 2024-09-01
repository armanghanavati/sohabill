import Modal from "src/components/Modal";
import { BillsPrintType, errorsItems } from "../../types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Input from "src/components/Input";

type ErrorsListProps = {
  isOpenErrorsList: boolean;
  inputsData?: BillsPrintType | undefined;
  setIsOpenErrorsList: React.Dispatch<React.SetStateAction<boolean>>;
};
const ViewBillErrorsListModal = ({
  isOpenErrorsList,
  setIsOpenErrorsList,
  inputsData,
}: ErrorsListProps) => {
  const { control, reset } = useForm();

  useEffect(() => {
    const values = {};
    inputsData?.errors?.map((item: errorsItems, index: number) => {
      values[`error-${index}`] = item?.detail;
    });
    reset(values);
  }, []);
  return (
    <Modal
      isOpen={isOpenErrorsList}
      setIsOpen={setIsOpenErrorsList}
      title="نمایش خطا"
      width="1000px"
    >
      {inputsData?.errors?.map((item: errorsItems, index: number) => (
        <div className="tw-mb-8">
          <Input
            name={`error-${index}`}
            control={control}
            disabled
            label={`کد خطا: ${item?.code}`}
          />
        </div>
      ))}
    </Modal>
  );
};
export default ViewBillErrorsListModal;
