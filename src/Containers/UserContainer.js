import { createContainer } from 'unstated-next';
import { useState } from 'react';
import {
    keyStore_isAuth,
    keyStore_username,
    defaultUsername,
    keyStore_registrationDetails,
    keyStore_callsign,
    keyStore_icpassport
} from '../Config/User';

function useUser(initialState) {

    let [isAuth, setIsAuth] = useState((initialState && initialState.isAuth) || sessionStorage.getItem(keyStore_isAuth) || false);
    let [username, setUsername] = useState(sessionStorage.getItem(keyStore_username) || defaultUsername);
    let [callsign, setCallsign] = useState(sessionStorage.getItem(keyStore_callsign) || '');
    let [icpassport, setIcpassport] = useState(sessionStorage.getItem(keyStore_icpassport) || null);
    let [registrationDetails, setRegistrationDetails] = useState(JSON.parse(sessionStorage.getItem(keyStore_registrationDetails)) || null);

    async function waitFor(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    ok: true
                })
            }, ms)
        });
    }

    async function login(_username) {
        try {
            // simulate some fetch action
            let res = await waitFor(1000);
            if (res.ok) {
                if (username === _username) {
                    hydrate();
                    setIsAuth(true);
                } else {
                    throw new Error('User not found!')
                }
            } else {
                throw new Error(res.statusText)
            }
        } catch (e) {
            console.error(e.message)
            return false;
        }
    }

    function hydrate() {
        if (registrationDetails !== null) {
            setUsername(registrationDetails.username);
            setCallsign(registrationDetails.callsign);
            setIcpassport(registrationDetails.icpassport);
        }
    }

    function logout() {
        sessionStorage.setItem(keyStore_isAuth, false);
        setIsAuth(false);
    }

    async function convertPhotoBase64(photo) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onloadend = function() {
                resolve(reader.result);
            }
        })
        
    }

    async function register(info) {
        try {
            // simulate some fetch action
            let res = await waitFor(1000);
            if (res.ok) {
                let photoBase64 = await convertPhotoBase64(info.icpassport);
                let newRegDetails = JSON.stringify({
                    ...info,
                    icpassport: photoBase64
                })

                setIsAuth(true);
                setUsername(info.username);
                setCallsign(info.callsign);
                setIcpassport(photoBase64);
                setRegistrationDetails(newRegDetails);

                sessionStorage.setItem(keyStore_isAuth, true);
                sessionStorage.setItem(keyStore_username, info.username);
                sessionStorage.setItem(keyStore_callsign, info.callsign);
                sessionStorage.setItem(keyStore_icpassport, photoBase64);
                sessionStorage.setItem(keyStore_registrationDetails, newRegDetails);
                return true;
            } else {
                console.log(res);
                throw new Error(res.statusText)
            }
        } catch (e) {
            console.error(e.message)
            return false;
        }
    }

    async function getRegistration() {
        try {
            let res = await waitFor(1000);
            if (res.ok) {
                return JSON.parse(sessionStorage.getItem(keyStore_registrationDetails));
            } else {
                throw new Error(res.statusText)
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
        
    }

    function isUserAuthenticated() {
        if (isAuth === true) {
            return true;
        }
        return false;
    }

    return {
        isUserAuthenticated,
        login, logout,
        username,
        register,
        registrationDetails,
        callsign,
        icpassport,
        getRegistration
    }
}

export const UserContainer = createContainer(useUser);