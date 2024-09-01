import React, { useState } from "react";
import { FAQType } from "../../models/AllData.model";
import FAQCard from "./FAQCard";

const FAQSection: React.FC = () => {
  const [idForShowAnswer, setIdForShowAnswer] = useState<number>();

  const toggle = (id: number | undefined): void => {
    if (id === idForShowAnswer) {
      setIdForShowAnswer(undefined);
    } else {
      setIdForShowAnswer(id);
    }
  };

  const questionsList: FAQType[] = [
    {
      question: "آیا دریافت شناسه حافظه الزامی است؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صورتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question: "نحوه دریافت حافظه مالیاتی به چه صورت است؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صودتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question:
        "آیا شناسه کالا/ خدمت الزاما باید در صورتحساب الکترونیکی ثبت شود؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صودتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question: "تفاوت شناسه عمومی و اختصاصی چیست؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صودتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question: "آیا لزومی به دریافت گواهی امضا یا امضای دیجیتال وجود دارد؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صودتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question:
        "آیا می‌توان در استفاده از خدمات سها، همچنان از طریق شرکت معتمد صدرتحساب ارسال کرد؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صودتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question:
        "آیا امکان صدور صورتحساب ارجاعی (اصلاحی، برگشت از فروش و ابطال) از طریق سها وجود دارد؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صودتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question: "شماره منحصر به فرد مالیاتی چیست؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صودتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question: "مزیت سها نسبت به سایر بسترهای ارسال صورتحساب چیست؟",
      answer:
        "بله، هر مودی برای هر کسب وکار خود باید حداقل یک حافظه مالیاتی دریافت کند؛ در این صورت صودتحساب‌های صادره او در این حافظه قرار می‌گیرد.",
    },
    {
      question: "آیا  بستن قرارداد با شرکت معتمد الزامی است؟",
      answer:
        "خیر، کاربر می‌تواند بدون قرارداد با معتمد از طریق سها و با واسطه شرکت معتمد صورتحساب ارسال کند. علاوه بر این کاربر می‌تواند از روش ارسال مستقیم از طریق سها نیز استفاده کند.",
    },
  ];

  return (
    <div className="tw-flex tw-flex-col tw-gap-3 lg:tw-gap-5">
      <h2 className="tw-text-center	tw-font-vazir	tw-text-md tw-font-semibold tw-text-gray-900 lg:tw-text-3xl lg:!tw-font-normal">
        سوالات متداول
      </h2>
      <h2 className=" tw-pb-0	tw-text-center tw-font-vazir tw-text-sm tw-text-gray-800 lg:tw-pb-8 lg:tw-text-2xl">
        هر آنچه باید در مورد سهابیل و ارسال صورتحساب از طریق آن را بدانید.
      </h2>
      <div className="tw-flex	tw-flex-col">
        {questionsList.map(({ question, answer }: FAQType, index: number) => (
          <FAQCard
            question={question}
            answer={answer}
            id={index}
            toggle={toggle}
            isShowAnswer={index === idForShowAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
