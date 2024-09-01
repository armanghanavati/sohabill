import React from 'react'
import { Col, Dropdown, DropdownButton, Row } from 'react-bootstrap'

const PageSize = () => {
    return (
        <>
            <Row>
                <Col xs="3" md="2" xl="1" className="">
                    {/* <DropdownButton style={{ direction: "ltr" }} variant="light" className="shadow rounded-pill" id="dropdown-basic-button" title={tax?.settlementTable?.pageSize}> */}
                    {/* <Dropdown.Item onClick={() => dispatch(handleGetServiceProductList({ pageSize: 10 }))} className="d-flex border-bottom border-sucsess justify-content-center" >10</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(handleGetServiceProductList({ pageSize: 25 }))} className="d-flex border-bottom border-sucsess justify-content-center" >25</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(handleGetServiceProductList({ pageSize: 50 }))} className="d-flex border-bottom border-sucsess justify-content-center" >50</Dropdown.Item> */}
                    {/* </DropdownButton> */}
                </Col>
            </Row>
        </>
    )
}

export default PageSize