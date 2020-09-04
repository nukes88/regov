import React from 'react';
import HeaderWithUser from '../Components/HeaderWithUser';
import { Row, Col, Form } from 'react-bootstrap';
import { UserContainer } from '../Containers/UserContainer';
import RegistrationDetails from '../Components/RegistrationDetails';

export default function Inside() {

    const user = UserContainer.useContainer();

    // let { username , callsign, icpassportFile } = user.registrationDetails;

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
            <hr />
            <h3>Your Submissions</h3>
            <Row>
                <Col>
                    <Form.Group>
                        {
                            user.registrationDetails === null ? 'You have no submissions.' :
                                <RegistrationDetails
                                    {...user.registrationDetails}
                                />
                        }
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}