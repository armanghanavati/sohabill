import { ReactNode } from "react";
import { Button } from "../../../common/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../common/ui/sheet";
import burgerIcon from "../../../assets/icons/Icon.svg";

type HamburgerMenuProps = {
  children: ReactNode;
};

const HamburgerMenu = ({ children }: HamburgerMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          icon={<img className="" src={burgerIcon} alt="منو" />}
          variant="ghost"
          className="tw-z-20"
          size="icon"
        ></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription>{children}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
