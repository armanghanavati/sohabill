import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import mainPicture from "../../../assets/img/macbook-pro-16-mockup.png";
import heroVector from "../../../assets/vectors/hero-vector.svg";
import { Button } from "../../../common/Button";

const HeroSection: FC = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <>
      <div className="tw-container tw-flex tw-h-2/3 tw-flex-col tw-items-center tw-justify-center tw-gap-20 tw-pt-8 lg:tw-flex-row lg:tw-pt-[88px]">
        <div className="tw-flex tw-w-full tw-flex-col tw-gap-6 tw-py-4 lg:tw-w-1/2 lg:tw-gap-16">
          <div className="tw-flex tw-flex-col tw-gap-4">
            <h1 className="tw-text-md tw-font-semibold md:tw-text-balance md:tw-text-3xl lg:tw-text-4xl lg:tw-leading-loose xl:tw-text-5xl xl:tw-leading-loose ">
              ارسال سریع صورتحساب به سامانه مودیان مالیاتی
            </h1>
            <p className="tw-text-base tw-text-mainBlack md:tw-text-lg lg:tw-text-lg xl:tw-text-xl">
              با وب سرویس سها بدون نگرانی، با کم‌ترین هزینه و سریع‌ترین راه
              صورتحساب‌ خود را به مالیات ارسال کنید!
            </p>
          </div>
          <Button
            title="شروع"
            variant="secondary"
            className="tw-max-w-fit"
            size={isSmallScreen ? "md" : "xxl"}
          />
        </div>
        <div className="tw-h-full tw-w-full lg:tw-w-1/2">
          <div className="tw-relative tw-flex tw-h-full tw-items-center tw-justify-center">
            <img
              className="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
              src={heroVector}
            />
            <img
              className="tw-z-10 tw-translate-x-2 tw-scale-100 tw-object-cover tw-transition-all lg:tw-scale-90"
              src={mainPicture}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
