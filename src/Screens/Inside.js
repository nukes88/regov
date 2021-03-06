import React, { useEffect, useState } from 'react';
import HeaderWithUser from '../Components/HeaderWithUser';
import { Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import { UserContainer } from '../Containers/UserContainer';
import RegistrationDetails from '../Components/RegistrationDetails';

export default function Inside() {

    const user = UserContainer.useContainer();

    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState('');

    let [regDetails, setRegDetails] = useState(null);

    useEffect(() => {
        async function getReg() {
            try {
                setIsLoading(true);
                let reg = await user.getRegistration();
                if (reg !== false) {
                    setRegDetails(reg);
                } else {
                    throw new Error(true)
                }
            } catch (e) {   
                setError(`Couldn't get registrations!`)
            } finally {
                setIsLoading(false);
            }
        }

        getReg();
    }, [])

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
            <h3>Your Submission</h3>
            {
                error ? <Alert variant="danger">{error}</Alert> : null
            }
            {
                isLoading ? <Spinner animation="border" />
                : <Row>
                    <Col>
                        <Form.Group>
                            {
                                regDetails ? <RegistrationDetails
                                    {...regDetails}
                                /> : 'You have no submissions.'
                            }
                        </Form.Group>
                    </Col>
                </Row> 
            }
        </>
    )
}