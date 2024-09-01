import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import barcodeImg from "../../../assets/img/qrCode.png";
import phoneImg from "../../../assets/img/position-2-veed-remove-background.png";

const Barcode: React.FC = () => {
  return (
    <>
      <Container className="rounded-4 bgGray p-4 ">
        <Row className="rounded-4  align-items-center d-flex justify-content-center">
          <Col sm="12" md="12" xl="6" className="justify-content-center">
            <h1 className="fs-1 py-4 fw-bold d-flex justify-content-center">
              ما را راحت تر دنبال کنید
            </h1>
          </Col>
          <Col className="d-flex justify-content-center" sm="12" md="12" xl="2">
            <img width={150} height={150} src={String(barcodeImg)} />
          </Col>
          <Col
            className="d-flex  justify-content-center"
            sm="12"
            md="12"
            xl="2"
          >
            <img width={350} height={350} src={String(phoneImg)} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Barcode;
