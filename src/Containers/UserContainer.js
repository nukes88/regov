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

function useUser() {

    let [isAuth, setIsAuth] = useState(sessionStorage.getItem(keyStore_isAuth) || false);
    let [username, setUsername] = useState(sessionStorage.getItem(keyStore_username) || defaultUsername);
    let [callsign, setCallsign] = useState(sessionStorage.getItem(keyStore_callsign) || '');
    let [icpassport, setIcpassport] = useState(sessionStorage.getItem(keyStore_icpassport) || null);
    let [registrationDetails, setRegistrationDetails] = useState(sessionStorage.getItem(keyStore_registrationDetails) || null);

    async function login(_username) {
        try {
            // simulate some fetch action
            let res = await new Promise((resolve, reject) => {
                // Success
                setTimeout(() => {
                    resolve({
                        ok: true
                    })
                }, (1000));

                // Fail
                // setTimeout(() => {
                //     resolve({
                //         status: 400,
                //         statusText: 'Bad request'
                //     })
                // })
            })
            if (res.ok) {
                sessionStorage.setItem(keyStore_username, _username);
                sessionStorage.setItem(keyStore_isAuth, true);
                setUsername(_username);
                setIsAuth(true);
            } else {
                console.log(res);
                throw new Error(res.statusText)
            }
        } catch (e) {
            console.error(e.message)
            return false;
        }
    }

    function logout() {
        sessionStorage.setItem(keyStore_isAuth, false);
        sessionStorage.setItem(keyStore_username, null);
        setUsername(defaultUsername);
        setIsAuth(false);
    }

    async function register(info) {
        try {
            // simulate some fetch action
            let res = await new Promise((resolve, reject) => {
                // Success
                setTimeout(() => {
                    resolve({
                        ok: true
                    })
                }, (1000));
            })
            if (res.ok) {
                setIsAuth(true);
                setUsername(info.username);
                setCallsign(info.callsign);
                setIcpassport(info.icpassport);
                setRegistrationDetails(info);
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

    return {
        isAuth,
        login, logout,
        username,
        register,
        registrationDetails,
        callsign,
        icpassport
    }
}

export const UserContainer = createContainer(useUser);