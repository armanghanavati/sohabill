import { Button } from "../../Button";
import selectMotamedImage from "../../../assets/img/selectMotamedImage.png";
import sabteMaliatImage from "../../../assets/img/sabtMaliatImage.png";
import sabteGharardadImage from "../../../assets/img/sabtGharardadImage.png";
import ReactPlayer from "react-player";
import { useState } from "react";
import Modal from "src/components/Modal";

const Tutorial = () => {
  return (
    <section className="tw-py-30 tw-container tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-12">
      <h2 className="md:tw-text-3xl">
        آموزش‌های لازم برای تکمیل مراحل ارسال صورتحساب
      </h2>
      <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-6">
        <VideoCard
          coverImage={selectMotamedImage}
          title="انتخاب شرکت معتمد"
          videoSrc={`${import.meta.env.VITE_URL}/Video/Mainpage/motamed_hafeze.mp4`}
          duration="1 دقیقه"
        />
        <VideoCard
          coverImage={sabteMaliatImage}
          title="ثبت حافظه مالیاتی در سامانه شرکت معتمد کیسان"
          videoSrc={`${import.meta.env.VITE_URL}/Video/Mainpage/sabte_shenase_dar_site_motamed.mp4`}
          duration="43 ثانیه"
        />
        <VideoCard
          coverImage={sabteGharardadImage}
          title="ثبت قرارداد در سامانه شرکت معتمد کیسان"
          videoSrc={`${import.meta.env.VITE_URL}/Video/Mainpage/sabte_qarardad_keysun.mp4`}
          duration="1 دقیقه و 15 ثانیه"
        />
      </div>
    </section>
  );
};

export default Tutorial;

type VideoCardProps = {
  coverImage: string;
  title: string;
  videoSrc: string;
  duration: string;
};
const VideoCard = ({
  coverImage,
  title,
  videoSrc,
  duration,
}: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="tw-flex tw-flex-col tw-rounded-xl tw-bg-white tw-px-4 tw-pb-7 tw-pt-4 tw-shadow-card">
        <div className="tw-relative tw-h-[198px] tw-w-[344px] tw-rounded-xl tw-bg-mainGray-light">
          <img src={coverImage} alt="" />
          <div
            onClick={() => setIsOpen(true)}
            className="tw-group tw-absolute tw-bottom-0 tw-right-0 tw-flex tw-size-12 -tw-translate-x-2 tw-translate-y-1/2 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-shadow-play tw-transition-all hover:tw-shadow-md"
          >
            <div className="tw-translate-x-[2px] tw-border-b-[9px] tw-border-l-[14px] tw-border-t-[9px] tw-border-b-transparent tw-border-l-secondary tw-border-t-transparent tw-transition-all tw-duration-300 tw-ease-in-out group-hover:tw-scale-110"></div>
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-3 tw-pb-6 tw-pt-[53px]">
          <span className="tw-text-mainGray-dark">{duration}</span>
          <h3 className="tw-text-base tw-font-semibold tw-text-gray-800">
            {title}
          </h3>
        </div>

        <Button
          title="مشاهده ویدئو"
          size="md"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <PlayerDialog
        videoSrc={videoSrc}
        title={title}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

const PlayerDialog = ({
  title,
  videoSrc,
  isOpen,
  setIsOpen,
}: {
  title: string;
  videoSrc: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
      <ReactPlayer width="100%" height="100%" url={videoSrc} controls />
    </Modal>
  );
};
