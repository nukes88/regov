import React from 'react';
import {
    Form
} from 'react-bootstrap'


export default function RegistrationDetails({ username, callsign, icpassport }) {

    return (
        <Form>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Callsign</Form.Label>
                <Form.Control
                    type="text"
                    value={callsign}
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>IC/Passport photo</Form.Label>
                <div className="icpassport-preview">
                    <img
                        src={icpassport}
                        alt="Placeholder"
                    />
                </div>
            </Form.Group>
        </Form>
    )
}