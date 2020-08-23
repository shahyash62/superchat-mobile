import axios from 'axios';
import { baseURL, sendContactReqURL, acceptContactReqURL } from './ServiceConstants';

export async function sendContactReqService(username, contactUsername, profile) {
    try {
        const res = await axios({
            method: 'put',
            url: new URL(sendContactReqURL, baseURL),
            data: {
                username,
                contactUsername,
                profile,
            },
        });
        if (res.status === 200) return { status: 'success' };
        else return { status: 'error', errorCode: 0 };
    } catch (error) {
        try {
            return { status: 'error', errorCode: error.response.data.errorCode };
        } catch (error) {
            return { status: 'error', errorCode: 0 };
        }
    }
}

export async function acceptContactReqService(username, contactUsername, profile) {
    try {
        const res = await axios({
            method: 'put',
            url: new URL(acceptContactReqURL, baseURL),
            data: {
                username,
                contactUsername,
                profile,
            },
        });
        console.log('acceptContactReqService RES:', res);
        if (res.status === 200) return { status: 'success', data: res.data };
        else return { status: 'error', errorCode: 0 };
    } catch (error) {
        try {
            return { status: 'error', errorCode: error.response.data.errorCode };
        } catch (error) {
            return { status: 'error', errorCode: 0 };
        }
    }
}
