import React, { useEffect, useState } from "react";
import { Tabs, TabsItemsType } from "../../components/Tabs";
import BuyerData from "../../common/BuyerData";
import AddBatch from "./AddBatch";
import { SerGetBillInitializeData } from "src/models/AllData.model";
import { getBillInitializeData } from "src/services/masterServices";
import asyncWrapper from "src/utils/asyncWrapper";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import linkArrow from "/src/assets/icons/arrowLeft.svg";
type PropsAddBuyer = {
  handleSaveBuyerInformation?: React.Dispatch<React.SetStateAction<any>>;
};
const AddBuyer: React.FC<PropsAddBuyer> = () => {
  const [selectedTab, setSelectedTab] = useState<string>();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 780px)" });
  const [billInitializeData, setBillInitializeData] =
    useState<SerGetBillInitializeData>();

  const getBillInitialize = asyncWrapper(async () => {
    const response = await getBillInitializeData();
    setBillInitializeData(response.data?.result);
    setSelectedTab("1");
  });

  useEffect(() => {
    getBillInitialize();
  }, []);

  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue);
  };

  const tabsItems: TabsItemsType[] = [
    {
      key: "1",
      Component: () => <BuyerData billInitializeData={billInitializeData} />,
      label: "افزودن تکی خریدار",
    },
    {
      key: "2",
      Component: AddBatch,
      label: "افزودن دسته ای خریدار",
    },
  ];

  return (
    <>
      {!!isSmallScreen && (
        <div className="tw-mb-7 tw-flex tw-items-center">
          <h3 className="tw-m-0 tw-w-full tw-text-center tw-text-xss md:tw-text-right lg:tw-text-xll">
            افزودن خریدار جدید
          </h3>

          <Link to="/users/buyerslist">
            <div className="tw-w-full">
              <img src={linkArrow} alt="link" />
            </div>
          </Link>
        </div>
      )}

      <Tabs items={tabsItems} onChange={handleTabChange} value={selectedTab} />
    </>
  );
};

export default AddBuyer;
