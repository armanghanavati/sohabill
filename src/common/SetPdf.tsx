import React, { useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import Sixth from "../components/tax/submitTaxReq/Sixth";
import { createRef, PureComponent } from "react";
import { forwardRef, ReactNode, Ref } from "react";
import { HookForm } from "../models/AllData.model";

interface Props extends HookForm {
  children?: ReactNode;
  type?: "submit" | "button";
  getValues?: any;
}

export const PrintPage: React.FC<Props> = ({ getValues }) => {
  const componentRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "paymentResult",
    copyStyles: true,
    onBeforeGetContent: () => {
      // اعمال تنظیمات CSS برای چاپ از راست به چپ
      const style = document.createElement("style");
      style.innerHTML = `
              body {
                direction: rtl; /* تنظیم جهت متن به راست به چپ */
              }
            `;
      document.head.appendChild(style);
    },
  });

  return (
    <>
      <Sixth getValues={getValues} myRef={componentRef} />
      <Row className="d-flex justify-content-center text-right">
        <Col
          onClick={handlePrint}
          xl="1"
          md="3"
          xs="6"
          className="bgPrimary cursorPointer rounded-pill  text-white d-flex align-items-center justify-content-center "
        >
          <i className="bi  bi-cloud-arrow-down-fill font25  d-flex align-items-center p-2 justify-content-center" />
          چاپ رسید
        </Col>
      </Row>
    </>
  );
};

// export const FancyButton = forwardRef(
//     (
//         props: Props,
//         ref: Ref<HTMLButtonElement> // <-- here!
//     ) => (
//         <button ref={ref} className="MyClassName" type={props.type}>
//             {props.children}
//         </button>
//     )
// )
