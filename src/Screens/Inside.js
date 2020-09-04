import React from 'react';
import HeaderWithUser from '../Components/HeaderWithUser';
import { Row, Col } from 'react-bootstrap';

export default function Inside() {
    return (
        <>
            <HeaderWithUser
                title="Inside"
            />
            <Row>
                <Col>
                    You're inside now!
                </Col>
            </Row>
        </>
    )
}