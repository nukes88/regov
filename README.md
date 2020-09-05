# Regov Demo
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Used [react-router](https://reactrouter.com/) for routing
* Used [unstated-next](https://github.com/jamiebuilds/unstated-next) for state management
* Used [react-bootstrap](https://react-bootstrap.github.io/) for layout components
* Used [font-awesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react) for some icons

## Instructions
Run `yarn` to install dependencies then `yarn start`

OR

Go to [hosted-site](https://regov.hostman.site/), the site is hosted here for free. Used [hostman](https://hostman.com/)

## Notes
The app uses sessionStorage instead of localStorage. Data should persist through page refreshes but not on page closing.

# Design Doc
## Overview
This Regov demo is to allow a user to register themselves. Login/logout based on the username chosen. Once logged in, the user will be able to see their registration details.

## Scenarios
* User lands on the main page, seeing the description will be guided to the Login screen. Once there, the user can enter a username (no password is necessary) to login. However, the site will check for a similar username in their storage before allowing authentication. So, the user will have to register. A link to the registration page will be available. The user will enter the details required on the registration page including their IC/Passport photo. A preview will be displayed for any image file uploaded (only the typical 3 image files: jpeg, png and gif are allowed). Once registered, the user will be prompted with a notification to a link to the Inside page, where it loads the user's submission.

* User navigates to the Inside page, but as the user has yet to login, the site will direct the user to the Login screen instead, where they are able to Login or Register themselves following the scenario detailed before.

## Non Goals
* The site will only support 1 submission
* The site will only support 1 user

## Screens
### Main
This screen details some information on what to do depending on whether the user is logged in. Main purpose is to guide the user to click the Login button.

### Login
This screen displays a Username field to allow users to enter their username for authentication (no password is necessary). If the username is not recognised, an error will show, suggesting the user to register. There will be a text and link to the Registration page. 

### Register
This page will have a form to fill with several fields, namely the Username and the IC/Passport photo. All fields will be validated for values. The IC/Passport photo field will be a click or drag & drop component for file uploads. Only 3 image file types will be accepted. A preview of the image will be displayed. Once registered, a notification/message will display a success and a link to the Inside page will be displayed.

### Inside
This page is only accessible if the user is logged in. It will display the details of the registration submission.

### Other
Only the Main and Inside screen will have the user login/logout card on the right of the page header.

Every screen will have a navbar on top with the Regov logo and links to the Main and Inside screens. The Inside screen will only display if the user is authenticated.

## Notes
* Actions that should in reality require a fetch action/communication to the server will be simulated with a 1 second wait. 

