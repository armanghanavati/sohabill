import { useMediaQuery } from "react-responsive";
import ersalMobile from "../../../assets/icons/mobile-ersal.svg";
import hazineMobile from "../../../assets/icons/mobile-hazine.svg";
import noteMobile from "../../../assets/icons/mobile-question.svg";
import poshtibaniMobile from "../../../assets/icons/mobile-sohoolat.svg";
import ersal from "../../../assets/vectors/ersal.svg";
import hazine from "../../../assets/vectors/hazine.svg";
import note from "../../../assets/vectors/note.svg";
import poshtibani from "../../../assets/vectors/poshtibani.svg";

const HeroCards = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div className="">
      <div className="tw-container tw-flex tw-w-full tw-translate-y-1/3 tw-flex-col tw-gap-4 md:tw-flex-row md:tw-gap-8">
        <HeroCard
          title="با کم ترین هزینه"
          icon={isSmallScreen ? hazineMobile : hazine}
        />
        <HeroCard
          title="پشتیبانی اختصاصی"
          icon={isSmallScreen ? noteMobile : poshtibani}
        />
        <HeroCard
          title="ارسال آنی صورتحساب"
          icon={isSmallScreen ? ersalMobile : ersal}
        />
        <HeroCard
          title="سهولت در ثبت صورتحساب الکترونیک"
          icon={isSmallScreen ? poshtibaniMobile : note}
        />
      </div>
    </div>
  );
};

const HeroCard = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <div className="tw-w-full tw-rounded-xl tw-bg-white tw-p-0 tw-shadow-card md:tw-aspect-[3/2] md:tw-px-4 md:tw-pb-6 md:tw-pt-4">
      <div className="p tw-flex tw-flex-row tw-items-center tw-gap-4 md:tw-flex-col md:tw-justify-between ">
        <div className="tw-flex tw-items-center tw-justify-center tw-bg-no-repeat md:tw-mx-2 md:tw-my-1 md:tw-h-[60px] md:tw-bg-card-blob md:tw-bg-contain md:tw-p-2">
          <img
            className="tw-z-10 tw-scale-100 md:tw-scale-90"
            src={icon}
            alt=""
          />
        </div>
        <h3 className="tw-m-0 tw-text-center tw-text-base tw-font-semibold md:tw-text-sm md:tw-font-semibold lg:tw-text-md">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default HeroCards;
