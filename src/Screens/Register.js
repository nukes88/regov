import React, { useState } from 'react';
import { Form, Spinner, Alert } from 'react-bootstrap';
import FileDragDropBox from '../Components/FileDragDropBox';
import BoldedButtons from '../Components/BoldedButtons';
import { UserContainer } from '../Containers/UserContainer';
import { Link } from 'react-router-dom';

export default function Register() {

    const user = UserContainer.useContainer();

    let [username, setUsername] = useState('');
    let [callsign, setCallsign] = useState('');
    let [icpassportFile, setIcpassportFile] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    let [formValidated, setFormValidated] = useState(null);
    let [error, setError] = useState(false)
    let [success, setSuccess] = useState(false);

    function handleUsernameChange(evt) {
        // only allow letters
        let _username = evt.target.value.replace(/[^a-zA-Z ]/, '');
        setUsername(_username);
    }

    function handleCallSignChange(evt) {
        setCallsign(evt.target.value)
    }

    function createPhotoObjectUrl(file) {
        console.log(file);

        setIcpassportFile(URL.createObjectURL(file))
    }

    function checkFormOK() {
        setFormValidated(true);
        if (!username ||
            !callsign ||
            !icpassportFile) {
            return false;
        }
        return true;
    }

    async function handleRegister() {
        if (!checkFormOK()) {
            return false;
        }
        setIsLoading(true);
        setSuccess(false);
        setError(false);
        let info = {
            username,
            callsign,
            icpassport: icpassportFile
        }
        if (await user.register(info)) {
            setSuccess(true);
        } else {
            setError(true);
        }
        setIsLoading(false);
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
                        isInvalid={formValidated && username === ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a username!
                    </Form.Control.Feedback>
                    <Form.Text>
                        Only letters allowed
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Callsign</Form.Label>
                    <Form.Control
                        type="text"
                        value={callsign}
                        onChange={handleCallSignChange}
                        placeholder="What your mates call you"
                        isInvalid={formValidated && callsign === ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a callsign!
                    </Form.Control.Feedback>
                    <Form.Text>
                        You can put whatever here
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>IC/Passport photo</Form.Label>
                    <FileDragDropBox
                        multiFile={false}
                        acceptedFileTypes={['image/gif', 'image/jpeg', 'image/png']}
                        setFilteredFiles={createPhotoObjectUrl}
                    />
                    {
                        icpassportFile ? <div className="icpassport-preview">
                            <img
                                src={icpassportFile}
                                alt="Placeholder"
                            />
                        </div> : null
                    }
                    <Form.Control
                        type="text"
                        value={icpassportFile}
                        style={{ display: 'none' }}
                        isInvalid={formValidated && icpassportFile === null}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a IC/Passport photo!
                    </Form.Control.Feedback>
                    <Form.Text>Please make sure any letters or images are clearly seen in the photo</Form.Text>
                </Form.Group>
                {
                    error ? <Alert variant="danger" className="center">You could not register!</Alert> : null
                }
                {
                    success ? <>
                        <Alert variant="success" className="center">
                            You have successfully registered! <Link to="/inside">Lets go inside!</Link>
                        </Alert>
                    </> : null
                }
                {
                    isLoading ? <Spinner animation="border" />
                        : success ? null
                            : <BoldedButtons
                                text="register"
                                toUpper={true}
                                clickFunc={handleRegister}
                            />
                }

            </Form>

        </>
    )
}
