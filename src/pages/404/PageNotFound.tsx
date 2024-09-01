import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const PageNotFound = () => {
  return (
    <>
      <Container className='vh-100'>
        <Row className='baseBtn vh-100' >
          <Col className='d-flex font45 align-items-center justify-content-center text-white'>
            404
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageNotFound;