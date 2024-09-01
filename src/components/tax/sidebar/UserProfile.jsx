import React, { useState } from 'react'
import photo from '../../../assets/img/avatar-1.webp'
import { Col } from 'react-bootstrap';

const UserProfile = () => {

    return (
        <Col className='BgImageSide' >
            {/* <img className='rounded-pill imageSide cursorPointer' width={90} height={90} src={photo} /> */}
            <i className="d-flex textPrimaryWhite font80 imageSide cursorPointer rounded-pill bi bi-person-circle" />
            {/* <h1 className='text-white' > 5645 035 0903 </h1>     */}
        </Col>
    )
};

export default UserProfile;