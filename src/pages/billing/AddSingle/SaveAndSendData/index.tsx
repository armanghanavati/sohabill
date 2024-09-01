import { useParams } from "react-router-dom";
import { Button } from "../../../../components/Button";
import { useMediaQuery } from "react-responsive";

interface SaveAndSendDataPropsType {
  handleSubmit?: any;
  saveBills?: any;
}

const SaveAndSendData: React.FC<SaveAndSendDataPropsType> = ({
  saveBills,
  handleSubmit,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const params = useParams();

  return (
    <div
      className={`tw-mb-8 tw-mt-8 tw-flex tw-justify-end tw-gap-5 lg:tw-mb-11 lg:tw-mt-0`}
    >
      <Button
        size={`${isSmallScreen ? "full" : "smm"}`}
        variant={"outLine_secondary"}
        title="فقط ذخیره"
        onClick={handleSubmit(() => saveBills(null))}
      />
      <Button
        onClick={handleSubmit(() =>
          params?.subjectTypeId === "1"
            ? saveBills("update")
            : saveBills("send"),
        )}
        size={`${isSmallScreen ? "full" : "sm"}`}
        variant={"secondary"}
        title="ذخیره و ارسال صورتحساب"
      />
      <input type="submit" className="tw-hidden" />
    </div>
  );
};

export default SaveAndSendData;
