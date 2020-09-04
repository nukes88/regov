import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import ImagePlaceholder from '../Components/ImagePlaceholder';

export default function Register() {

    let [username, setUsername] = useState('');
    let [icpassportFile, setIcpassportFile] = useState(null);

    function handleUsernameChange(evt) {
        // only allow letters
        let _username = evt.target.value.replace(/[^a-zA-Z]/, '');
        setUsername(_username);
    }

    return (
        <>
            <h1>Register</h1>
            <h5>Please provide your details below</h5>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter your desired username"
                    />
                    <Form.Text>
                        Only letters allowed
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.File custom>
                        <Form.File.Label>IC/Passport Photo</Form.File.Label>
                        <ImagePlaceholder
                            img={icpassportFile}
                        />
                        <Form.File.Input />
                    </Form.File>
                    <Form.Text>Please make sure any letters or images are clearly seen in the photo</Form.Text>
                </Form.Group>
            </Form>

        </>
    )
}
