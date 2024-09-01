import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import AngleRight from "../../../assets/icons/AngleRight";
import Input from "../../../components/Input";
import PersonIcon from "../../../assets/icons/PersonIcon";
import { useForm } from "react-hook-form";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import EnvelopeIcon from "../../../assets/icons/EnvelopeIcon";
import LocationIcon from "../../../assets/icons/LocationIcon";
import GoogleMapLocation from "./GoogleMapLocation";
import Textarea from "../../../components/Textarea";
import MessageIcon from "../../../assets/icons/MessageIcon";
import { ContactUsType } from "../../../models/AllData.model";

const ContactUs: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactUsType>({
    mode: "onChange",
  });

  const onSubmit = async (data: ContactUsType): Promise<void> => {
    console.log(data, errors);
  };

  return (
    <div className=" tw-flex tw-flex-col  tw-justify-center tw-font-vazir tw-text-mainBlack	md:tw-flex-row">
      <div className="md:bump tw-flex tw-grow tw-basis-1/2 tw-flex-row tw-items-center tw-justify-center tw-bg-gray-100  tw-py-6 md:tw-bg-white md:tw-py-0 ">
        <div className="tw-basis-12/12 tw-flex tw-flex-col tw-gap-5 tw-px-8 md:tw-basis-11/12 lg:tw-px-32 ">
          <div className="tw-flex tw-flex-col tw-gap-3 md:tw-gap-6">
            <h1 className="tw-font-vazir  tw-text-2lg tw-text-mainBlack lg:tw-text-3xl">
              تماس با ما
            </h1>
            <h3 className="tw-font-vazir tw-text-base lg:tw-text-xl">
              در صورت وجود مشکل یا سوالی از طریق ایمیل یا تماس با ما در ارتباط
              باشید.
            </h3>
          </div>
          <div>
            <div className="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3	">
              <div className="tw-pb-2">
                <LocationIcon />
              </div>
              <h2 className="tw-font-vazir tw-text-sm tw-font-semibold lg:tw-text-xl	">
                دفتر مرکزی : تهران، خیابان ولیعصر، بالاتر از پارک ساعی، کوچه
                مهرگان، پلاک 1، طبقه دوم، واحد ۵ - info@diba.tax
              </h2>
            </div>
            <div className="tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3	">
              <div className="tw-pb-2">
                <PhoneIcon
                  id="linear_green_blue"
                  gradient={
                    <linearGradient
                      id="linear_green_blue"
                      x1="17.873"
                      y1="2.5"
                      x2="17.873"
                      y2="9.532"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="var(--color-blue)" />
                      <stop offset="1" stop-color="var(--color-green)" />
                    </linearGradient>
                  }
                />
              </div>
              <h2 className="tw-font-vazir tw-text-sm tw-font-semibold lg:tw-text-xl">
                88781681-90
              </h2>
            </div>
          </div>
          <GoogleMapLocation />
        </div>
        <div className="tw-relative tw-inline-flex tw-hidden tw-basis-1/12 tw-justify-end tw-pl-4 md:tw-flex">
          <AngleRight />
        </div>
      </div>
      <div className=" tw-grow tw-basis-1/2 tw-px-8 tw-pt-20 md:tw-py-20 lg:tw-px-32 lg:tw-py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="tw-flex tw-flex-col tw-gap-5 tw-rounded-xl	tw-p-8 tw-font-semibold tw-shadow-xl lg:tw-gap-8 lg:tw-px-8  lg:tw-py-10"
        >
          <Input
            control={control}
            name="name"
            label="نام و نام خانوادگی"
            Icon={PersonIcon}
            placeholder="نام و نام خانوادگی"
            errors={errors?.name}
            rules={{
              required: "لطفا نام و نام خانوادگی را وارد کنید",
            }}
          />
          <Input
            control={control}
            name="phoneNumber"
            label="شماره تلفن همراه"
            Icon={() => (
              <PhoneIcon className="tw-h-5 tw-w-5 tw-stroke-gray-200" />
            )}
            placeholder="شماره تلفن همراه"
            errors={errors?.phoneNumber}
            rules={{
              required: "لطفا شماره تلفن همراه را وارد کنید",
            }}
          />
          <Input
            control={control}
            name="email"
            label="پست الکترونیکی"
            Icon={EnvelopeIcon}
            placeholder="پست الکترونیکی"
            errors={errors?.email}
            rules={{
              required: "لطفا پست الکترونیکی را وارد کنید",
            }}
          />
          <Textarea
            control={control}
            name="message"
            label="پیام"
            Icon={MessageIcon}
            placeholder="پیام خود را بنویسید ..."
            errors={errors?.message}
            rules={{
              required: "لطفا پیام را وارد کنید",
            }}
          />
          <Button title="ارسال" size="full" type="submit" className="tw-mt-5" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
