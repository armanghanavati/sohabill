import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Form,
  Container,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import ComboBox from "../../../common/ComboBox";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import { RsetAllFieldSteps } from "../../../common/slices/taxSlice";
import { Controller, useForm } from "react-hook-form";
import InputText from "../../../common/InputText";
import { RsetShowModal } from "../../../common/slices/mainSlice";
import { goodsNounItems, goodsTypeItems } from "../../../utils/Options";
import {
  AddTableGoodsType,
  CurrencyType,
  HookForm,
  SelectOption,
  StyleTypeOperation,
  ValidSteps,
} from "../../../models/AllData.model";
import SettlementTypeMod from "./SettlementTypeMod";
import Btn from "../../../common/Btn";
import { useLocation } from "react-router-dom";
import StringHelpers from "../../../helpers/string-helpers";
import FieldsAddTableGoods from "./FieldsAddTableGoods";

type Props = AddTableGoodsType & HookForm;
const AddTableGoods: React.FC<Props> = ({
  currIR,
  styleOprationRow,
  fixCurrencyOptionType,
  editRowGoods,
  watch,
  clearErrors,
  setError,
  control,
  reset,
  getValues,
  errors,
  setValue,
  handleAddItems,
  handleSubmit,
}) => {
  let rowTable: any = {};
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { main, tax } = useAppSelector((state) => state);
  const [showSettlementMod, setShowSettlementMod] = useState<boolean>(false);
  const [disableOtherTax, setDisableOtherTax] = useState<boolean>(false);
  const [disableOtherLegalFunds, setDisableOtherLegalFunds] =
    useState<boolean>(false);

  const tooltip = (
    <Tooltip id="tooltip">
      با اعمال این گزینه شما میتوانید بجای وارد کردن نرخ ، مبلغ را وارد کنید!
    </Tooltip>
  );

  const currency = {
    id: editRowGoods?.currencyCode?.abbreviation,
    title: editRowGoods?.currencyCode?.nameFa,
  };

  const handleRowGoodsReset = (): void => {
    console.log(editRowGoods);
    reset({
      ...editRowGoods,
      currencyCode: !editRowGoods?.id
        ? currIR
        : editRowGoods?.templateGoods
          ? editRowGoods?.currencyCode
          : currency,
      valueIncreasedTaxRate: editRowGoods?.valueIncreasedTaxRate,
    });
    if (editRowGoods?.serviceOrProductDescription !== undefined) {
      setValue("settlementType", editRowGoods?.serviceOrProductDescription);
      setValue("valueIncreasedTaxRate", editRowGoods?.valueIncreasedTaxRate);
    }
  };

  useEffect(() => {
    handleRowGoodsReset();
  }, [editRowGoods]);

  const handleAddItemToStep = (item: any) => {
    dispatch(
      RsetAllFieldSteps({ ...tax.allFieldSteps, rowProductGoods: item }),
    );
  };

  const unitPriceValue = StringHelpers.operationRemoveSep(watch("unitPrice"));
  const countValue = watch("count");
  const discountValue = StringHelpers.operationRemoveSep(watch("discount"));
  const otherLegalFundsRateValue = Number(watch("otherLegalFundsRate") || 0);
  const increasedTaxRateValue = Number(watch("valueIncreasedTaxRate") || 0);
  const otherTaxPriceValue = StringHelpers.operationRemoveSep(
    watch("otherTaxPrice"),
  );

  const itemValueIncreasedTaxPriceValue = StringHelpers.operationRemoveSep(
    watch("itemValueIncreasedTaxPrice"),
  );
  const otherLegalFundsPriceValue = StringHelpers.operationRemoveSep(
    watch("otherLegalFundsPrice"),
  );

  const priceAfterDiscountValue = unitPriceValue * countValue - discountValue;
  // const setUnitPrice = StringHelpers.operationRemoveSep(watch("unitPrice"));

  //  مبلغ سایر وجوه قانونی:
  const setOtherLegalFundsPrice = (): void => {
    if (!disableOtherLegalFunds) {
      setValue(
        "otherLegalFundsPrice",
        StringHelpers.formatNumber(
          (StringHelpers.operationRemoveSep(priceAfterDiscountValue) *
            otherLegalFundsRateValue) /
            100,
        ),
      );
    }
  };

  // مبلغ پس از تخفیف:
  const setPriceAfterDiscount = (): void => {
    setValue(
      "priceAfterDiscount",
      StringHelpers.formatNumber(priceAfterDiscountValue),
    );
  };

  // نرخ سایر وجوه قانونی:
  const setOtherLegalFundsRate = (): void => {
    if (disableOtherLegalFunds) {
      return setValue(
        "otherLegalFundsRate",
        (otherLegalFundsPriceValue * 100) / priceAfterDiscountValue,
      );
    }
  };

  // مبلغ سایر مالیات و عوارض:
  const setOtherTaxPrice = (): void => {
    if (disableOtherTax === false) {
      return setValue(
        "otherTaxPrice",
        (
          (Number(watch("otherTaxRate") || 0) *
            Number(
              watch("priceAfterDiscount")?.toString().replace(/,/g, "") || 0,
            )) /
          100
        )
          ?.toFixed(0)
          ?.toString()
          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      );
    }
  };

  // نرخ سایر مالیات و عوارض:
  const setOtherTaxRate = (): void => {
    if (disableOtherTax) {
      return setValue(
        "otherTaxRate",
        (otherTaxPriceValue * 100) / priceAfterDiscountValue,
      );
    }
  };

  const set_PriceBeforeDiscount_TotalItemsPrice_ItemValueIncreasedTaxPrice =
    (): void => {
      // مبلغ کل کالا
      setValue(
        "totalItemsPrice",
        StringHelpers.formatNumber(
          Number(
            watch("otherLegalFundsPrice")?.toString().replace(/,/g, "") || 0,
          ) +
            Number(watch("otherTaxPrice")?.toString().replace(/,/g, "") || 0) +
            Number(
              watch("itemValueIncreasedTaxPrice")
                ?.toString()
                .replace(/,/g, "") || 0,
            ) +
            Number(
              watch("priceAfterDiscount")?.toString().replace(/,/g, "") || 0,
            ),
        ),
      );

      // مبلغ مالیات بر ارزش افزوده
      setValue(
        "itemValueIncreasedTaxPrice",
        StringHelpers.formatNumber(
          Number(
            (StringHelpers.operationRemoveSep(priceAfterDiscountValue) *
              increasedTaxRateValue) /
              100,
          ).toFixed(0),
        ),
      );
    };

  // مبلغ کل کالا
  useEffect(() => {
    setOtherLegalFundsRate();
    setOtherLegalFundsPrice();
    setOtherTaxPrice();
    setPriceAfterDiscount();
    setOtherTaxRate();
    set_PriceBeforeDiscount_TotalItemsPrice_ItemValueIncreasedTaxPrice();
  }, [
    watch("otherLegalFundsRate"),
    watch("priceAfterDiscount"),
    watch("priceBeforeDiscount"),
    watch("discount"),
    unitPriceValue,
    watch("count"),
    watch("otherLegalFundsPrice"),
    watch("otherTaxPrice"),
    watch("itemValueIncreasedTaxPrice"),
    watch("otherTaxRate"),
    watch("valueIncreasedTaxRate"),
  ]);

  return (
    <>
      <Modal
        size="xl"
        keyboard={true}
        backdrop="static"
        centered
        show={main.showModal.showModal}
        onHide={() => dispatch(RsetShowModal({ showModal: false }))}
      >
        <Modal.Header
          style={{ transform: "scale(-1, 1)", direction: "ltr" }}
          className="bgSuccessWhite text-white d-flex justify-content-center"
          closeButton
        >
          <span style={{ transform: "scale(-1,1)" }} className="fw-bold">
            افزودن کالا
          </span>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <FieldsAddTableGoods
              setShowSettlementMod={setShowSettlementMod}
              setValue={setValue}
              styleOprationRow={styleOprationRow}
              errors={errors}
              control={control}
              fixCurrencyOptionType={fixCurrencyOptionType}
              watch={watch}
              disableOtherTax={disableOtherTax}
              setDisableOtherTax={setDisableOtherTax}
              tooltip={tooltip}
              disableOtherLegalFunds={disableOtherLegalFunds}
              setDisableOtherLegalFunds={setDisableOtherLegalFunds}
              state={state}
            />
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Btn
            title="لغو"
            variant="outline-danger"
            className=""
            onClick={() =>
              dispatch(RsetShowModal({ showModal: false, typeModal: 1 }))
            }
          />
          <Btn
            title="افزودن"
            variant="success"
            onClick={handleSubmit((data: ValidSteps) => {
              handleAddItems(data);
              dispatch(
                RsetAllFieldSteps({ ...tax.allFieldSteps, step3: getValues() }),
              );
            })}
          />
        </Modal.Footer>
      </Modal>
      {showSettlementMod && (
        <SettlementTypeMod
          control={control}
          clearErrors={clearErrors}
          setValue={setValue}
          getValues={getValues}
          rowTable={rowTable}
          setShowSettlementMod={setShowSettlementMod}
          showSettlementMod={showSettlementMod}
          handleAddItemToStep={handleAddItemToStep}
        />
      )}
    </>
  );
};

export default AddTableGoods;
