import axios from 'axios';
import { baseURL, loginURL, signupURL, refreshTokenURL } from './ServiceConstants';

export async function signUpService(username) {
    const localStorage = window.localStorage;
    try {
        const res = await axios({
            method: 'post',
            url: new URL(signupURL, baseURL),
            data: {
                username,
            },
        });
        if (res.headers.authentication) localStorage.setItem('AuthKey', res.headers.authentication);
        console.log(localStorage.getItem('AuthKey'));
        return { status: 'succ' };
    } catch (error) {
        console.log(error.response);
        return { status: 'error' };
    }
}

export async function loginService(username, password) {
    const localStorage = window.localStorage;
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
        if (res.headers.authentication) {
            localStorage.setItem('AuthKey', res.headers.authentication);
            localStorage.setItem('username', res.data.userData.username);
        }
        return { status: 'success', data: res.data };
    } catch (error) {
        localStorage.setItem('AuthKey', null);
        try {
            return { status: 'error', errorCode: error.response.data.errorCode };
        } catch (error) {
            return { status: 'error', errorCode: 0 };
        }
    }
}

export async function refreshToken() {
    try {
        const localStorage = window.localStorage;
        const token = localStorage.getItem('AuthKey');
        const username = localStorage.getItem('username');
        console.log('token', token);
        console.log('username', username);
        let res;
        if (token && username) {
            res = await axios({
                method: 'post',
                url: new URL(refreshTokenURL, baseURL),
                headers: {
                    authentication: token,
                },
                data: {
                    username,
                },
            });
            if (res.headers.authentication) localStorage.setItem('AuthKey', res.headers.authentication);
            return { status: 'success', data: res.data };
        }
    } catch (error) {
        console.log(error);
        localStorage.setItem('AuthKey', null);
        try {
            return { status: 'error', errorCode: error.response.data.errorCode };
        } catch (error) {
            console.log(error);
            return { status: 'error', errorCode: 0 };
        }
    }
}
