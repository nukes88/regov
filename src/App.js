import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	Link
} from 'react-router-dom';

import './App.css';

import { UserContainer } from './Containers/UserContainer';

import Main from './Screens/Main';
import Login from './Screens/Login';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Inside from './Screens/Inside';
import Register from './Screens/Register';

import logo from './Assets/regov.jpg';

function AuthRoute({ children, ...props }) {

	const user = UserContainer.useContainer();

	return (
		user.isAuth === true ? <Route {...props}>
			{children}
		</Route> : <Redirect to="/login" />
	)
}

function AppWithRouter() {

	const user = UserContainer.useContainer();

	return (
		<Container>
			<Router>
				<Navbar expand="lg">
					<Navbar.Brand>
						<img 
							src={logo}
							alt=""
							className="navbar-brand-logo"
						/>
						<span className="navbar-brand-name">Regov Demo</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link as={Link} to="/main">Main</Nav.Link>
							{
								user.isAuth === true ? <Nav.Link as={Link} to="/inside">
									Inside
								</Nav.Link> : null
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<AuthRoute path="/inside">
						<Inside />
					</AuthRoute>
					<Route path="/">
						<Main />
					</Route>
				</Switch>
			</Router>
		</Container>
	)
}

function App() {
	return (
		<UserContainer.Provider>
			<AppWithRouter />
		</UserContainer.Provider>
	);
}

export default App;
