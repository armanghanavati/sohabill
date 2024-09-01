import React, { ElementType, useMemo } from "react";
import {
  Tabs as UiTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../common/ui/tabs";

interface TabsItemsType {
  key: string;
  Component: ElementType;
  label: string;
}

interface TabsProps {
  items: TabsItemsType[];
  onChange: (key: string | number) => void;
  value: string | undefined;
  errors?: { [key: string]: string };
}

const TabsComponent: React.FC<TabsProps> = ({ items, onChange, value }) => {
  return (
    <div>
      <UiTabs dir="rtl" defaultValue="1">
        <TabsList className="tw-mb-4 tw-flex-wrap tw-justify-start tw-gap-3 tw-pb-0 md:tw-flex lg:tw-mb-8 lg:tw-gap-7">
          {items?.map(({ label, key }, index) => (
            <TabsTrigger
              className={`${value === key || (!value && index === 0) ? "data-[state=active]:bg-primary tw-bg-primary tw-text-white focus-visible:tw-bg-primary" : "tw-bg-gray-200 tw-text-white data-[state=active]:tw-bg-gray-200"}`}
              value={key}
              onClick={() => onChange(key)}
              key={label}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {items?.map(({ Component, key }) => {
          return (
            <TabsContent key={key} value={key}>
              <Component />
            </TabsContent>
          );
        })}
      </UiTabs>
    </div>
  );
};

const Tabs: React.FC<TabsProps> = ({ items = [], onChange, value, errors }) => {
  const tabs = useMemo(() => {
    return <TabsComponent items={items} onChange={onChange} value={value} />;
  }, [value, errors]);
  return <>{tabs}</>;
};

export { Tabs };
export type { TabsItemsType };
