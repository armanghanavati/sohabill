import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Col, OverlayTrigger, Row } from "react-bootstrap";
import { selectInfoBuyer } from "../../../common/slices/taxSlice";
import { useAppSelector } from "../../../hooks/hook";

const MultiStepProgressBar = ({ currentSteps, setCurrentSteps }) => {
  const buyerValue = useAppSelector(selectInfoBuyer);

  return (
    <Row className="d-flex d-flex flex-row-reverse">
      <ProgressBar
        percent={currentSteps}
        filledBackground="#0AC974"
        height="8px"
      >
        <Step transition="scale">
          {({ accomplished, index }) => (
            <>
              <div className="">
                <div
                  onClick={() => setCurrentSteps(1)}
                  style={{
                    backgroundColor: `${accomplished ? "#0AC974" : "#505050"}`,
                  }}
                  className={`step stepMaster  ${
                    accomplished ? " completed p-3" : "bg-danger"
                  }`}
                >
                  <i className=" bi bi-calendar2-check-fill" />
                  <span className=" fixTextSteps text-secondary d-none d-lg-block font11 justify-content-center ps-4 row">
                    {" "}
                    مشخصات صورتحساب{" "}
                  </span>
                </div>
              </div>
            </>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-title="Tooltip on top"
              onClick={() => buyerValue === true && setCurrentSteps(20)}
              style={{
                backgroundColor: `${accomplished ? "#0AC974 " : "#505050"}`,
              }}
              className={` step stepMaster ${
                accomplished
                  ? " text-success  text-white completed p-3"
                  : "pStep"
              }`}
            >
              <i className=" bi bi-person-fill-gear" />
              <span className=" fixTextSteps text-secondary d-none d-lg-block font11 justify-content-center ps-4 row">
                اطلاعات خریدار
              </span>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              onClick={() => setCurrentSteps(40)}
              style={{
                backgroundColor: `${accomplished ? "#0AC974" : "#505050"}`,
              }}
              className={`step stepMaster ${
                accomplished ? "completed p-3" : "pStep"
              }`}
            >
              <i className="bi bi-box-fill"></i>
              <span className=" fixTextSteps text-secondary d-none d-lg-block font11 justify-content-center ps-4 row">
                {" "}
                اطلاعات کالا{" "}
              </span>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              onClick={() => setCurrentSteps(60)}
              style={{
                backgroundColor: `${accomplished ? "#0AC974" : "#505050"}`,
              }}
              className={`step stepMaster ${
                accomplished ? "completed p-3" : "pStep"
              }`}
            >
              <i className="bi bi-cash-stack"></i>
              <span className=" fixTextSteps text-secondary d-none d-lg-block font11 justify-content-center ps-4 row">
                {" "}
                اطلاعات پرداخت{" "}
              </span>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              onClick={() => setCurrentSteps(80)}
              style={{
                backgroundColor: `${accomplished ? "#0AC974" : "#505050"}`,
              }}
              className={`step stepMaster ${
                accomplished ? "completed p-3" : "pStep"
              }`}
            >
              <i className="bi bi-database-fill-check"></i>
              <span className=" fixTextSteps text-secondary d-none d-lg-block font11 justify-content-center ps-4 row">
                اطلاعات تکمیلی
              </span>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div
              onClick={() => setCurrentSteps(100)}
              style={{
                backgroundColor: `${accomplished ? "#0AC974" : "#505050"}`,
              }}
              className={`step stepMaster ${
                accomplished ? "completed p-3" : "pStep"
              }`}
            >
              <i className="bi bi-check-lg"></i>
              <span className=" fixTextSteps text-secondary d-none d-lg-block font11 justify-content-center ps-4 row">
                تایید نهایی
              </span>
            </div>
          )}
        </Step>
      </ProgressBar>
    </Row>
  );
};

export default MultiStepProgressBar;
