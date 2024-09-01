import React from 'react'
import { Col, Row } from 'react-bootstrap'

interface Props {
    label?: string;
}

const MainTitle: React.FC<Props> = ({ label = "" }) => {
    return (
        <Row className="mt-4">
            <Col xs="11" sm="9" md="8" lg="6" xl="4" className="d-flex fw-bold justify-content-center rounded-start-pill bgSuccessWhite text-white p-4">
                {label}
            </Col>
        </Row>
    )
}

export default MainTitle