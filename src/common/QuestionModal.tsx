import React, { FormEvent, useRef } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
  RsetQuestionModal,
  RsetShowModal,
  selectQuseTionModal,
} from "./slices/mainSlice";

type Props = {
  title?: string;
};

const QuestionModal: React.FC<Props> = ({ title = "" }) => {
  const dispatch = useAppDispatch();
  const { main } = useAppSelector((state) => state);

  return (
    <>
      <Modal
        // size='lg'
        keyboard={true}
        backdrop="static"
        centered
        show={main.showQuestionModal.show}
        onHide={() => dispatch(RsetQuestionModal({ show: false }))}
      >
        <Modal.Body>{title}</Modal.Body>
        <Modal.Footer className="d-flex">
          <Col xl="2">
            <Button
              variant="danger"
              className="border border-none"
              onClick={() => dispatch(RsetQuestionModal({ show: false }))}
            >
              خیر
            </Button>
          </Col>
          <Col xl="2">
            <Button
              variant="success"
              onClick={() =>
                dispatch(RsetQuestionModal({ show: false, answer: true }))
              }
            >
              بله
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuestionModal;
