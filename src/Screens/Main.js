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
            <Row>
                <Col>
                    Welcome!<br />
                    {
                        user.isAuth ? `You've logged in! Check out Inside from the menu!` : <>Click on LOGIN to begin!<br />If you've already registered, you can login using the username you've chosen.</>
                    }
                </Col>
            </Row>
        </>

    )
}