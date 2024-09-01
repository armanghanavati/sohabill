import { TabsContent } from "@radix-ui/react-tabs";
import { Link } from "react-router-dom";
import dashedArrow from "../../../assets/icons/dashed-arrow.svg";
import linkArrow from "../../../assets/icons/arrow-icon.svg";
import questionBubble from "../../../assets/icons/chat-bubble-question.svg";
import phone from "../../../assets/img/iPhone 12 Pro mockup.png";
import phoneBackground from "../../../assets/vectors/phone-background-vector.svg";
import whiteWave from "../../../assets/vectors/white-wave.svg";
import whiteWaveTop from "../../../assets/vectors/white-wave-top.svg";
import waveBottom from "../../../assets/vectors/wave-bottom.svg";
import blurredBg from "../../../assets/vectors/info-blurred-bg.svg";
import { Button } from "../../Button";
import { Tabs, TabsList, TabsTrigger } from "../../../common/ui/tabs";
import { cn } from "../../../utils/tailwind-utils";

const taxTabContent: {
  title: string;
  description: string;
  linkTitle: string;
  linkUrl: string;
}[] = [
  {
    title: "ثبت‌نام در سایت",
    description: "ابتدا در سایت دیبا اطلاعات خود را وارد و ثبت‌نام نمایید.",
    linkTitle: "ثبت‌نام در سایت",
    linkUrl: "",
  },
  {
    title: "دریافت کلید عمومی و خصوصی",
    description: " مراجعه  به قسمت ویرایش پروفایل و دانلود کلید عمومی .",
    linkTitle: "دریافت کلید عمومی و خصوصی",
    linkUrl: "",
  },
  {
    title: "اخذ کد حافظه مالیاتی",
    description:
      "مراجعه به سایت سازمان امور مالیاتی و گرفتن کد حافظه مالیاتی با اسفاده از کلیدی عمومی دریافتی از مرحله قبل .",
    linkTitle: "اخذ شناسه یکتا",
    linkUrl: "",
  },
  {
    title: "ذخیره کد حافظه مالیاتی در دیبا",
    description: "ذخیره کد حافظه مالیاتی در دیبا در قسمت پروفایل کاربری .",
    linkTitle: "ذخیره کد حافظه مالیاتی در دیبا",
    linkUrl: "",
  },
  {
    title: "ارسال صورتحساب",
    description:
      "وارد کردن اطلاعات در ویزارهای صورت حساب و ثبت نهایی صورت حساب .",
    linkTitle: "ارسال صورتحساب",
    linkUrl: "/users/Billing",
  },
];

const trustedTabContent: {
  title: string;
  description: string;
  linkTitle: string;
  linkUrl: string;
}[] = [
  {
    title: "ثبت‌نام در سایت",
    description: "ابتدا در سایت دیبا اطلاعات خود را وارد و ثبت‌نام نمایید.",
    linkTitle: "ثبت‌نام در سایت",
    linkUrl: "",
  },
  {
    title: "اخذ کد حافظه مالیاتی",
    description:
      "مراجعه به سایت سازمان امور مالیاتی و گرفتن کد حافظه مالیاتی با اسفاده از کلیدی عمومی دریافتی از مرحله قبل .",
    linkTitle: "اخذ شناسه یکتا",
    linkUrl: "",
  },
  {
    title: "ذخیره کد حافظه مالیاتی در دیبا",
    description: "ذخیره کد حافظه مالیاتی در دیبا در قسمت پروفایل کاربری .",
    linkTitle: "ذخیره کد حافظه مالیاتی در دیبا",
    linkUrl: "",
  },
  {
    title: "ارسال صورتحساب",
    description:
      "وارد کردن اطلاعات در ویزارهای صورت حساب و ثبت نهایی صورت حساب .",
    linkTitle: "ارسال صورتحساب",
    linkUrl: "",
  },
];

const tabsArrays = [
  {
    value: "tax",
    title: "ارسال مستقیم به مالیات",
    array: taxTabContent,
  },
  {
    value: "trusted",
    title: "ارسال از طریق شرکت معتمد",
    array: trustedTabContent,
  },
];

const Information = () => {
  return (
    <div className="tw-pt-12 md:tw-pt-44">
      <div className="tw-h-full tw-w-full tw-bg-white tw-bg-cover tw-bg-no-repeat tw-pt-32 md:tw-bg-wavy"></div>
      <div className="tw-relative tw-h-full tw-w-full tw-bg-white md:tw-bg-primary-ghost ">
        <div className="tw-container tw-flex tw-flex-col tw-gap-6 md:tw-py-8">
          <h2 className="tw-pt-12 tw-text-center tw-text-3xl">
            راهنمای گام‌به‌گام کار با سایت و ارسال صورتحساب
          </h2>
          <div className="tw-flex tw-w-full tw-items-center tw-justify-center ">
            <Tabs
              dir="rtl"
              defaultValue="tax"
              className="tw-bg-pri tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-9 md:tw-gap-28"
            >
              <TabsList className="tw-flex tw-gap-2 tw-rounded-lg tw-bg-gray-100 md:tw-grid-cols-4 md:tw-rounded-full md:tw-bg-white ">
                <TabsTrigger className="tw-col-span-2" value="tax">
                  ارسال مستقیم به مالیات
                </TabsTrigger>
                <TabsTrigger className="tw-col-span-2" value="trusted">
                  ارسال از طریق شرکت معتمد
                </TabsTrigger>
              </TabsList>
              {tabsArrays.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="tw-bg-danger tw-z-0 tw-flex tw-w-full tw-flex-col tw-justify-center tw-gap-y-6 md:tw-gap-x-8 md:tw-gap-y-24 lg:tw-flex-row lg:tw-flex-wrap lg:tw-gap-x-0"
                >
                  {tab.array.map(
                    (
                      { title, description, linkTitle, linkUrl },
                      index,
                      tabArray,
                    ) => (
                      <div
                        key={title}
                        className="tw-group tw-flex tw-h-full tw-items-center tw-justify-center md:tw-flex-col lg:tw-flex-row "
                      >
                        <img
                          className={cn(
                            "tw-hidden md:tw-flex md:-tw-translate-y-12 md:-tw-rotate-90 md:tw-items-center md:tw-justify-center md:tw-px-1 lg:tw-translate-y-0 lg:tw-rotate-0",
                            tabArray.length === 4
                              ? "group-first:tw-hidden group-last:tw-hidden md:group-last:tw-flex lg:group-last:tw-hidden "
                              : "group-first:tw-hidden lg:group-odd:tw-hidden",
                          )}
                          src={dashedArrow}
                          alt=""
                        />
                        <InfoCard
                          key={title}
                          title={title}
                          description={description}
                          linkTitle={linkTitle}
                          linkUrl={linkUrl}
                          number={index + 1}
                        />

                        <img
                          className={cn(
                            "tw-hidden md:tw-hidden md:tw-translate-y-12 md:-tw-rotate-90 md:tw-items-center md:tw-justify-center md:tw-px-1 lg:tw-hidden lg:tw-translate-y-0 lg:tw-rotate-0 2xl:tw-flex",
                            tabArray.length === 4
                              ? "group-first:tw-hidden group-last:tw-hidden lg:tw-flex"
                              : "lg:group-odd:tw-hidden",
                          )}
                          src={dashedArrow}
                          alt=""
                        />
                      </div>
                    ),
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        <div>
          <img className="tw-w-full tw-object-cover" src={whiteWave} alt="" />
        </div>
      </div>
      <div className="tw-container tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-[76px] tw-pb-12 md:tw-gap-[88px]">
        <div className="tw-z-0 tw-h-full tw-w-full md:tw-w-full">
          <div className="tw-relative tw-flex tw-h-full tw-items-center tw-justify-center">
            <img
              className="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
              src={phoneBackground}
            />
            <img
              className="tw-z-10  tw-scale-[.65] tw-object-cover tw-transition-all sm:tw-scale-75 md:tw-scale-90"
              src={phone}
              alt=""
            />
          </div>
        </div>
        <div className="tw-flex tw-flex-col tw-gap-7 md:tw-gap-16 ">
          <div className="tw-text-center md:tw-text-right">
            <h2 className="tw-text-md md:tw-text-3xl">
              چه مدارکی برای ارسال صورتحساب لازم است؟
            </h2>
            <p className="tw-max-w-[570px] tw-text-md tw-font-normal md:tw-text-lg">
              برای ارسال صورتحساب احتیاج به مدارکی دارید مانند شناسه
              اقتصادی،شناسنامه، کارت ملی و ....
            </p>
          </div>
          <Button title="مشاهده" className="tw-mx-auto" size="xl" />
        </div>
      </div>
      <section className="tw-relative md:tw-bg-paleYellow">
        <img
          className="tw-absolute tw-right-0 tw-top-0 -tw-z-10 tw-w-full md:tw-hidden"
          src={blurredBg}
          alt="bg"
        />
        <img
          className="tw-hidden tw-w-full tw-object-cover md:tw-block"
          src={whiteWaveTop}
          alt="bg"
        />
        <div className="tw-container tw-flex tw-flex-col tw-gap-7 tw-pb-12 tw-pt-8 md:tw-pt-52">
          <h2 className="tw-m-0 tw-text-pretty tw-text-lg tw-text-mainBlack-dark md:tw-text-center md:tw-text-3xl">
            تکالیف مالیاتی مؤدیان با توجه به قانون پایانه‌های فروشگاهی و سامانه
            مؤدیان
          </h2>
          <p className="tw-m-0 tw-text-sm tw-text-mainBlack md:tw-text-2lg md:tw-font-normal">
            با وب سرویس دیبا بدون نگرانی، با کم‌ترین هزینه و سریع‌ترین راه
            صورتحساب‌ خود را به مالیات ارسال کنید!با وب سرویس دیبا بدون نگرانی،
            با کم‌ترین هزینه و سریع‌ترین راه صورتحساب‌ خود را به مالیات ارسال
            کنید!با وب سرویس دیبا بدون نگرانی، با کم‌ترین هزینه و سریع‌ترین راه
            صورتحساب‌ خود را به مالیات ارسال کنید!
          </p>
          <Button
            title="مشاهده"
            className="tw-mx-auto"
            variant="secondary"
            size="xl"
          />
        </div>
      </section>
      <img
        className="tw-hidden tw-w-full tw-object-cover md:tw-block"
        src={waveBottom}
        alt="bg"
      />
    </div>
  );
};

export default Information;

const InfoCard = ({
  number,
  title,
  description,
  linkTitle,
  linkUrl,
}: {
  number: number;
  title: string;
  description: string;
  linkTitle: string;
  linkUrl: string;
}) => {
  return (
    <div
      dir="rtl"
      className="tw-relative tw-flex tw-max-h-60 tw-min-h-fit tw-w-full tw-flex-col tw-items-center tw-gap-6 tw-rounded-md tw-bg-white  md:tw-aspect-[3/2] md:tw-gap-6 md:tw-p-4 md:tw-transition-shadow hover:md:tw-shadow-card"
    >
      <span className="tw-absolute tw-right-5 tw-top-5 tw-z-10 tw-h-full tw-border-r-2 tw-border-dotted tw-border-mainGray-dark md:tw-hidden"></span>
      <div className="tw-z-20 tw-flex tw-w-full tw-items-center tw-justify-between  tw-rounded-md tw-bg-mainGray-light tw-p-[5px]">
        <div className="tw-flex tw-items-center tw-gap-2">
          <div className=" tw-flex tw-aspect-square tw-size-8 tw-items-center tw-justify-center tw-rounded-md tw-bg-mainGray tw-font-semibold">
            {number}
          </div>
          <h3 className="tw-m-0 tw-text-sm tw-font-semibold tw-text-mainBlack-dark">
            {title}
          </h3>
        </div>
        <img
          className="group-first:tw-hidden"
          src={questionBubble}
          alt="question bubble"
        />
      </div>
      <div className="tw-flex tw-w-full tw-flex-grow tw-flex-col tw-justify-between tw-px-10">
        <p className="tw-m-0 tw-w-full tw-text-sm tw-text-mainBlack">
          {description}
        </p>
        <Link
          className="tw-group/link tw-flex tw-gap-2 tw-pt-[10px] tw-text-sm tw-font-semibold tw-text-primary tw-no-underline hover:tw-text-primary-hover"
          to={linkUrl}
        >
          {linkTitle}
          <img
            className="tw-transition-transform tw-ease-in-out group-hover/link:-tw-translate-x-1"
            src={linkArrow}
            alt="link"
          />
        </Link>
      </div>
    </div>
  );
};
