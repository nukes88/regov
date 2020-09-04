import { createContainer } from 'unstated-next';
import { useState } from 'react';
import {
    keyStore_isAuth,
    keyStore_username,
    defaultUsername
} from '../Config/User';

function useUser() {

    let [isAuth, setIsAuth] = useState(sessionStorage.getItem(keyStore_isAuth) || false);
    let [username, setUsername] = useState(sessionStorage.getItem(keyStore_username) || defaultUsername);

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

    return {
        isAuth,
        login, logout,
        username
    }
}

export const UserContainer = createContainer(useUser);