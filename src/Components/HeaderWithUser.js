import React from 'react';
import UserLoginCard from './UserLoginCard';
import { Row, Col } from 'react-bootstrap';

export default function HeaderWithUser({ title }) {
    return (
        <Row className="header">
            <Col>
                <h1>{title}</h1>
            </Col>
            <Col>
                <UserLoginCard />
            </Col>
        </Row>
    )
}