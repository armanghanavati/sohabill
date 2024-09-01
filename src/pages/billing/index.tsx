import React, { useEffect, useState } from "react";
import { Tabs, TabsItemsType } from "../../components/Tabs";
import AddBatch from "./AddBatch";
import { getBillInitializeData } from "src/services/masterServices";
import asyncWrapper from "src/utils/asyncWrapper";
import { Link, useParams } from "react-router-dom";
import AddSingle from "./AddSingle";
import { useMediaQuery } from "react-responsive";
import linkArrow from "src/assets/icons/arrowLeft.svg";

const BaseBilling: React.FC = () => {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState<string>();
  const [billInitializeData, setBillInitializeData] = useState();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const getBillInitialize = asyncWrapper(async () => {
    const response = await getBillInitializeData();
    setBillInitializeData(response.data?.result);
    setSelectedTab("1");
  });

  useEffect(() => {
    getBillInitialize();
  }, []);

  const handleTabChange = (newValue: string | number) => {
    setSelectedTab(String(newValue));
  };

  const tabsItems: TabsItemsType[] = [
    {
      key: "1",
      Component: () => (
        <AddSingle
          selectedTab={selectedTab}
          billInitializeData={billInitializeData}
        />
      ),
      label: "افزودن تکی صورتحساب",
    },
    {
      key: "2",
      Component: () => <AddBatch billInitializeData={billInitializeData} />,
      label: "افزودن دسته ای صورتحساب",
    },
  ];

  return (
    <div>
      <div className="tw-flex tw-items-center">
        {!!isSmallScreen && (
          <>
            <h3 className="tw-m-0 tw-w-full tw-text-center tw-text-xss md:tw-text-right lg:tw-text-xll">
              افزودن صورتحساب جدید
            </h3>
            <Link to="/users/billsList">
              <div className="tw-w-full">
                <img src={linkArrow} alt="link" />
              </div>
            </Link>
          </>
        )}
      </div>
      {params["*"]?.includes("editBill") &&
      !!billInitializeData &&
      selectedTab === "1" ? (
        <AddSingle billInitializeData={billInitializeData} />
      ) : (
        <Tabs
          items={tabsItems}
          onChange={handleTabChange}
          value={selectedTab}
        />
      )}
    </div>
  );
};

export default BaseBilling;
