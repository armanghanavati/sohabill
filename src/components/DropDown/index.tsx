import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { ReactNode, useState } from "react";
import TableOption from "src/assets/icons/TableOption";

export interface DropDownDataType {
  key: string | number;
  children: ReactNode;
}

interface DropDownProps {
  data: DropDownDataType[];
  position?: "bottom" | "top";
  disabled?: boolean;
}

const DropDown: React.FC<DropDownProps> = ({
  data = [],
  position = "bottom",
  disabled,
}) => {
  return (
    <>
      {disabled ? (
        <TableOption color="#CAC9C9" className="tw-cursor-not-allowed " />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="tw-cursor-pointer">
            <span>
              <TableOption color="#4cc19e" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="tw-w-56 tw-rounded-lg tw-bg-white tw-p-4 tw-shadow-md">
            <DropdownMenuRadioGroup value={position}>
              {data?.length > 0 &&
                data.map(({ key, children }: any) => (
                  <DropdownMenuRadioItem
                    className="tw-flex tw-justify-end tw-text-center tw-outline-none	"
                    value="bottom"
                    key={key}
                  >
                    {children}
                  </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default DropDown;
