import React, { useEffect, useState } from "react";
import { Tabs, TabsItemsType } from "../../components/Tabs";
import AddSingle from "./AddSingle";
import AddBatch from "./AddBatch";
import { SerGetBillInitializeData, ValidSteps } from "src/models/AllData.model";
import { getBillInitializeData } from "src/services/masterServices";
import asyncWrapper from "src/utils/asyncWrapper";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import linkArrow from "src/assets/icons/arrowLeft.svg";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button";

const AddGoods: React.FC = () => {
  const {
    formState: { errors },

    setValue,
  } = useForm<ValidSteps>({ reValidateMode: "onChange", mode: "onChange" });
  const [selectedTab, setSelectedTab] = useState<string | number>();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 780px)" });
  const { state } = useLocation();
  const [billInitializeData, setBillInitializeData] =
    useState<SerGetBillInitializeData>();

  const getBillInitialize = asyncWrapper(async () => {
    const response = await getBillInitializeData();
    setBillInitializeData(response.data?.result);
    setSelectedTab("1");
    const subject = response.data?.result?.subjectTypes?.find(
      (item: { title: string }) => item?.title === "اصلی",
    )?.title;

    setValue("subjectType", subject);
  });

  useEffect(() => {
    getBillInitialize();
  }, []);

  const handleTabChange = (newValue: string | number) => {
    setSelectedTab(newValue);
  };

  const tabsItems: TabsItemsType[] = [
    {
      key: "1",
      Component: () => <AddBatch billInitializeData={billInitializeData} />,
      label: "افزودن دسته ای کالا",
    },
    {
      key: "2",
      Component: () => <AddSingle billInitializeData={billInitializeData} />,
      label: "افزودن از لیست مالیات",
    },
  ];

  function handleContinueBilling() {
    if (state.subjectTypeId && state.id) {
      navigate(
        `/users/editBill/${state.id}/${state.subjectTypeId}/${state.taxId}`,
        {
          state: state,
        },
      );
    } else {
      navigate(`/users/billing`, { state: state });
    }
  }
  return (
    <div>
      {!!isSmallScreen && (
        <div className="tw-mb-[25px] tw-flex tw-w-full tw-justify-center">
          <h3 className="tw-m-0 tw-w-full tw-text-center tw-text-xss md:tw-text-right">
            افزودن کالا / خدمت جدید
          </h3>
          <div
            onClick={() => {
              if (state) {
                handleContinueBilling();
              } else {
                navigate("/users/goodsList");
              }
            }}
          >
            <img src={linkArrow} alt="link" />
          </div>
        </div>
      )}
      <div className="tw-flex tw-justify-end	">
        {!isSmallScreen && state ? (
          <Button
            title={
              <>
                ادامه ثبت صورتحساب <img src={linkArrow} alt="link" />{" "}
              </>
            }
            variant="gray"
            onClick={handleContinueBilling}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <Tabs
          items={tabsItems}
          onChange={handleTabChange}
          value={selectedTab}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default AddGoods;
