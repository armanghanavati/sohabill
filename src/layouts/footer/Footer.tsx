import React from "react";
import logo from "../../assets/img/dibajadid.png";
import instagram from "../../assets/img/instagram.svg";
import telegram from "../../assets/img/telegram.svg";
import { Link } from "react-router-dom";
import { buttonVariants } from "src/components/Button";
import { cn } from "src/utils/tailwind-utils";
import { useMediaQuery } from "react-responsive";

const Footer: React.FC = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="tw-mb-16 tw-justify-between tw-bg-primary-ghost tw-px-6 tw-py-5 lg:tw-flex lg:tw-px-16 lg:tw-py-24">
      <div className="tw-flex tw-flex-col lg:tw-w-[45%] lg:tw-pl-16">
        <div className="tw-gap-1 lg:tw-flex lg:tw-w-80 lg:tw-gap-2">
          <img src={logo} alt="logo" />
          <p className="tw-m-0 tw-text-smm lg:tw-text-lg">
            سامانه ارسال صورت حساب
          </p>
        </div>
        <p className="tw-mb-0 tw-mt-3 tw-text-justify tw-text-sm lg:tw-mt-7 lg:tw-w-80 lg:tw-text-base">
          با وب سرویس دیبا بدون نگرانی، با کم‌ترین هزینه و سریع‌ترین راه
          صورتحساب‌ خود را به مالیات ارسال کنید!با وب سرویس دیبا بدون نگرانی، با
          کم‌ترین هزینه و سریع‌ترین راه صورتحساب‌ خود را به مالیات ارسال کنید!{" "}
        </p>
      </div>
      <div className="tw-mb-16 tw-mt-5 tw-justify-between md:tw-mb-0 lg:tw-mb-0 lg:tw-mt-0 lg:tw-flex lg:tw-w-[55%]">
        <div className="tw-flex tw-gap-y-7  lg:tw-w-[70%] lg:tw-gap-16">
          <ul className="tw-mb-0 tw-flex tw-flex-col tw-gap-1 tw-px-0 tw-text-xss lg:tw-text-lg">
            <li>ثبت‌نام</li>
            <li>ورود</li>
            <li>ارسال صورتحساب</li>
            <li>اخذ کلید عمومی</li>
          </ul>
          <ul className="tw-mb-0 tw-flex tw-flex-col tw-gap-y-1 tw-px-0 tw-text-xss lg:tw-text-lg">
            <li>مالیات</li>
            <li>علمی</li>
            <li>سیاسی اجتماعی</li>
            <li>آموزش دریافت کلید عمومی و </li>
          </ul>
        </div>
        <div className="tw-mt-8 tw-flex tw-items-center tw-justify-between lg:tw-flex-col lg:tw-justify-normal lg:tw-gap-y-7">
          <div className="tw-flex tw-gap-6 tw-text-xs lg:tw-justify-end lg:tw-text-lg">
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  size: "link",
                }),
                isSmallScreen ? "!tw-text-xs" : "",
              )}
              //  TO DO to="/"
            >
              درباره ما
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "link",
                  size: "link",
                }),
                isSmallScreen ? "!tw-text-xs" : "",
              )}
              to="/aboutUs"
            >
              تماس با ما
            </Link>
          </div>
          <div className="tw-flex tw-gap-2 lg:tw-w-full lg:tw-justify-end">
            <img
              className="tw-h-7 tw-w-7 lg:tw-h-8 lg:tw-w-8"
              src={instagram}
              alt="instagram"
            />
            <img
              className="tw-h-7 tw-w-7 lg:tw-h-8 lg:tw-w-8"
              src={telegram}
              alt="telegram"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
