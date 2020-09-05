import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { UserContainer } from './Containers/UserContainer';
import Register from './Screens/Register';

test('renders login component on app load', () => {
  const { getByTestId } = render(<App />);
  const loginComponent = getByTestId('login-card');
  expect(loginComponent).toBeInTheDocument();
});

test('registration page to have username and file upload fields', () => {
  const {getByTestId} = render(
    <UserContainer.Provider>
      <Register />
    </UserContainer.Provider>
  );

  const usernameField = getByTestId('username-field');
  const fileField = getByTestId('file-field');
  expect(usernameField).toBeInTheDocument();
  expect(fileField).toBeInTheDocument();
});

test('navbar link to inside only available on authentication', () => {
  const {getByTestId} = render(<App initialUserState={{isAuth: true}} />);
  
  const insideLink = getByTestId('link-to-inside');
  expect(insideLink).toBeInTheDocument();
});

test('will call URL.createObjectURL when file is uploaded', async () => {
  // when a file is uploaded
  // useEffect will call URL.createObjectURL to be passed to an img as src

  const {getByTestId} = render(
    <UserContainer.Provider>
      <Register />
    </UserContainer.Provider>
  );

  // drop test isnt working
  // const dropBox = getByTestId('file-drop-box');
  // fireEvent.drop(dropBox, {
  //   dataTransfer: {
  //     files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
  //   },
  // });

  URL.createObjectURL = jest.fn();
  const fileField = getByTestId('file-field');
  fireEvent.change(fileField, {
    target: {
      files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })],
    },
  });

  expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
});


