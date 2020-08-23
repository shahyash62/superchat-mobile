import axios from 'axios';
import { baseURL, loginURL, signupURL } from './ServiceConstants';

export async function signUpService(username) {
    const sessionStorage = window.sessionStorage;
    try {
        const res = await axios({
            method: 'post',
            url: new URL(signupURL, baseURL),
            data: {
                username,
            },
        });
        if (res.headers.authentication) sessionStorage.setItem('AuthKey', res.headers.authentication);
        console.log(sessionStorage.getItem('AuthKey'));
        return { status: 'succ' };
    } catch (error) {
        console.log(error.response);
        return { status: 'error' };
    }
}

export async function loginService(username, password) {
    const sessionStorage = window.sessionStorage;
    try {
        const res = await axios({
            method: 'post',
            url: new URL(loginURL, baseURL),
            data: {
                username,
                password,
            },
            onDownloadProgress: function (progressEvent) {
                console.log(Math.floor(progressEvent.loaded / progressEvent.total));
            },
        });
        if (res.headers.authentication) sessionStorage.setItem('AuthKey', res.headers.authentication);
        return { status: 'success', data: res.data };
    } catch (error) {
        sessionStorage.setItem('AuthKey', null);
        try {
            return { status: 'error', errorCode: error.response.data.errorCode };
        } catch (error) {
            return { status: 'error', errorCode: 0 };
        }
    }
}
