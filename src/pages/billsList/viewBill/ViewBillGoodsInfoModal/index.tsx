import Modal from "src/components/Modal";
import { BillsPrintType } from "../../types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "src/components/Input";

type GoodsInfoProps = {
  isOpenGoodsInfo: boolean;
  inputsData?: BillsPrintType;
  setIsOpenGoodsInfo: React.Dispatch<React.SetStateAction<boolean>>;
};
const ViewBillGoodsInfoModal = ({
  isOpenGoodsInfo,
  setIsOpenGoodsInfo,
  inputsData,
}: GoodsInfoProps) => {
  const { control, reset, getValues } = useForm();

  useEffect(() => {
    reset({
      ...inputsData?.billItems?.[0],
    });
  }, []);
  return (
    <Modal
      isOpen={isOpenGoodsInfo}
      setIsOpen={setIsOpenGoodsInfo}
      title="اطلاعات کالا"
      width="1000px"
    >
      <form>
        <div className="tw-mb-8 ">
          <Input
            name="description"
            label="شرح کالا"
            disabled
            control={control}
          />
        </div>
        <div className="gap-4 tw-flex tw-w-full tw-flex-col  lg:tw-flex-row lg:tw-gap-[96px] ">
          <div className="tw-flex tw-w-full tw-flex-col tw-gap-[32px] lg:tw-w-[50%]">
            <Input
              control={control}
              name="serviceOrProductId"
              label="شناسه یکتا"
              disabled
            />
            <Input
              control={control}
              name="internalCode"
              label="شناسه داخلی "
              disabled
            />

            <Input
              control={control}
              name="currencyType"
              label="نوع ارز "
              disabled
            />
            <Input
              control={control}
              name="EquivalentWithRial"
              label="نرخ برابری ارز با ریال "
              disabled
            />
            <Input
              control={control}
              name="currencyValue"
              label="ارزش ارزی"
              disabled
            />
            <Input
              control={control}
              name="discount"
              label="مبلغ تخفیف کالا"
              disabled
            />
            <Input
              control={control}
              name="OtherLegalFundsSubject"
              label="موضوع سایر وجوه قانونی"
              disabled
            />

            {getValues("BillPatternId") === 3 && (
              <Input
                control={control}
                name="constructionFee"
                label="اجرت ساخت"
                disabled
              />
            )}
            <Input
              control={control}
              name="count"
              label="تعداد/ مقدار"
              disabled
            />
          </div>
          <div className="tw-flex tw-w-full tw-flex-col tw-gap-[32px] lg:tw-w-[50%]">
            <Input
              control={control}
              name="unitPrice"
              label="مبلغ واحد"
              disabled
            />
            <Input
              control={control}
              name="totalItemPrice"
              label="مبلغ کل "
              disabled
            />
            <Input
              control={control}
              name="measurementUnit"
              label="واحداندازه گیری "
              disabled
            />
            <Input
              control={control}
              name="OtherTaxSubject"
              label="موضوع سایر مالیات و عوارض "
              disabled
            />
            <Input
              control={control}
              name="OtherLegalFundsPrice"
              label="نرخ سایر وجوه قانونی"
              disabled
            />
            <Input
              control={control}
              name="OtherTaxPrice"
              label="نرخ سایر مالیات و عوارض "
              disabled
            />
            <Input
              control={control}
              name="totalValueIncreasedTaxPrice"
              label="نرخ مالیات بر ارزش افزوده"
              disabled
            />
            {getValues("BillPatternId") === 3 && (
              <>
                <Input
                  control={control}
                  name="sellerProfit"
                  label="سود فروشنده"
                  disabled
                />
                <Input
                  control={control}
                  name="commission"
                  label="حق العمل"
                  disabled
                />
                <Input control={control} name="carat" label="عیار" disabled />
              </>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default ViewBillGoodsInfoModal;
