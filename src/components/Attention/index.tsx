export interface AttentionProp {
  title?: string;
}

function Attention({ title }: AttentionProp) {
  return (
    <div
      className={`tw-mb-[40px] tw-mt-[24px] tw-flex tw-w-fit
    tw-items-center tw-justify-center tw-rounded-xl tw-bg-[#FFEAC0] tw-px-[16px] tw-pt-[4px]`}
    >
      <p className="tw-text-base tw-text-gray-800">{title}</p>
    </div>
  );
}
export default Attention;
