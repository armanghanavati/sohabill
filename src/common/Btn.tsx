import React from "react";
import { Button, Col, Spinner } from "react-bootstrap";
import { useAppSelector } from "../hooks/hook";

interface Props {
  title?:
  | string
  | React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  variant?: string;
  normal?: boolean;
  className?: string;
  icon?: any;
  onClick?: any;
  loadingName?: string;
  xl?: number;
  md?: number;
  xs?: number;
  sm?: number;
  lg?: number;
  name?: string;
}

const Btn: React.FC<Props> = ({
  title = "",
  name = "",
  loadingName = null,
  xl = 2,
  lg = 3,
  md = 4,
  sm = 5,
  xs = 6,
  className = "",
  icon,
  onClick,
  variant,
}) => {
  const { main } = useAppSelector((state) => state);

  return (
    <>
      <Col lg={lg} sm={sm} xs={xs} md={md} xl={xl}>
        {variant ? (
          <Button
            name={name}
            className={`${className} d-flex w-100  px-4 py-2 justify-content-center`}
            variant={variant}
            onClick={onClick}
          >
            {icon}
            {main.showLoading?.btnName === loadingName ? (
              <Spinner
                className="my-1"
                animation="border"
                size="sm"
                role="status"
              />
            ) : (
              title
            )}
          </Button>
        ) : (
          <button
            name={name}
            className={`${className} d-flex w-100  px-4 py-2 justify-content-center`}
            onClick={onClick}
          >
            {icon}
            {main.showLoading?.btnName === loadingName ? (
              <Spinner
                className="my-1"
                animation="border"
                size="sm"
                role="status"
              />
            ) : (
              title
            )}
          </button>
        )}
      </Col>
    </>
  );
};

export default Btn;