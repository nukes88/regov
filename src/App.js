import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import './App.css';

import { UserContainer } from './Containers/UserContainer';

import Main from './Screens/Main';
import Login from './Screens/Login';
import { Container } from 'react-bootstrap';
import Inside from './Screens/Inside';
import Register from './Screens/Register';

function AuthRoute({ children, ...props }) {

	const user = UserContainer.useContainer();

	return (
		user.isAuth ? <Route {...props}>
			{children}
		</Route> : <Redirect to="/login" />
	)
}

function AppWithRouter() {

	return (
		<Container>
			<Router>
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
