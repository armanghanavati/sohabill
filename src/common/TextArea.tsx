import React from 'react'
import { Col, Form } from 'react-bootstrap'

interface Props {
    onChange?: () => void
    value?: any;
    rows?: number;
}

const TextArea: React.FC<Props> = ({
    onChange,
    value,
    rows = 5
}) => {

    return (
        <>
            <Col xl="12" >
                <Form.Label className="ms-3 align-items-center"> شرح کالا:</Form.Label>
                <textarea
                    name='description'
                    value={value}
                    // onChange={(e) => dispatch(RsetDesGoods(e.target.value))}
                    rows={rows}
                    className="form-control"
                />
            </Col>
        </>
    )
}

export default TextArea