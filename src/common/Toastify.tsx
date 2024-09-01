import React from 'react'
import { Button, Col, Row, Toast } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import { RsetShowToast, selectShowToast } from './slices/mainSlice';

type Props = {
    showToast?: object,
    type?: string,
    title?: string,
}

const Toastify: React.FC<Props> = ({ }) => {
    const showToast = useAppSelector(selectShowToast)
    const dispatch = useAppDispatch()

    const oparationIcons = () => {
        if (showToast.bg === "danger") {
            return <i className="font20 text-danger bi bi-exclamation-triangle-fill" />
        }
        if (showToast.bg === "success") {
            return <i className="font20 text-success bi bi-check-circle-fill" />
        }
        if (showToast.bg === "warning") {
            return <i className="font20 text-dark bi bi-exclamation-triangle-fill" />
        }
    }

    return (
        <>
            <Row className='d-flex toastContainer'>
                <Col xs="10" sm="10" xl="12" className='d-flex'>
                    <Toast
                        bg={showToast.bg}
                        onClose={() => dispatch(RsetShowToast({ show: false }))} show={showToast.show} delay={3000} autohide
                    >
                        <Toast.Header style={{ transform: "scale(-1, 1)", direction: "ltr" }} className='d-flex bgSuccessWhite text-white justify-content-center' closeButton>
                            <strong style={{ transform: "scale(-1, 1)", direction: "ltr" }} className="justify-content-center me-auto">
                                {oparationIcons()}
                            </strong>
                        </Toast.Header>
                        <Toast.Body className={`d-flex py-4 text-end justify-content-end ${showToast.bg === "warning" ? "text-dark" : "text-white"}`}>{showToast.title}</Toast.Body>
                    </Toast>
                </Col>
            </Row >
        </>
    )
}

export default Toastify;
