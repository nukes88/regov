import React from 'react';
import { UserContainer } from '../Containers/UserContainer';
import { Row, Col } from 'react-bootstrap';
import HeaderWithUser from '../Components/HeaderWithUser';

export default function Main() {

    const user = UserContainer.useContainer();

    return (
        <>
            <HeaderWithUser
                title="Main"
            />
        </>

    )
}