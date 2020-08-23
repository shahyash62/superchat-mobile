import { signUpService, loginService } from '../../Services/Auth';
import ChatSocket from '../../Services/SocketServices';
import { sendContactReqService, acceptContactReqService } from '../../Services/UserServices';
import { updateGroups, recieveMessage } from '../Content/ContentActions';

export const EDIT_USERNAME = 'EDIT_USERNAME';
export const editUsername = (username) => {
    return {
        type: EDIT_USERNAME,
        payload: username,
    };
};
export const EDIT_STATUS = 'EDIT_STATUS';
export const editStatus = (status) => {
    return {
        type: EDIT_STATUS,
        payload: status,
    };
};

export const ADD_CONTACT = 'ADD_CONTACT';
export const addContact = (username) => {
    return {
        type: ADD_CONTACT,
        payload: username,
    };
};

export const SEND_CONTACT_REQ = 'SEND_CONTACT_REQ';
export const sendContactReq = (contactUsername) => async (dispatch, getState) => {
    const username = getState().userData.username;
    const profile = getState().userData.selectedProfile;
    const { statusCodes } = getState();
    const sendContactReqServiceRes = await sendContactReqService(username, contactUsername, profile);
    if (sendContactReqServiceRes.status === 'success') {
        dispatch({
            type: `${SEND_CONTACT_REQ}_FULFILLED`,
            payload: {
                contactUsername,
            },
        });
        return { type: 'success', message: statusCodes[800].message };
    } else {
        return { type: 'error', message: statusCodes[sendContactReqServiceRes.errorCode].message };
    }
};

export const ACCEPT_CONTACT_REQ = 'ACCEPT_CONTACT_REQ';
export const acceptContactReq = (contactUsername) => async (dispatch, getState) => {
    const username = getState().userData.username;
    const profile = getState().userData.selectedProfile;
    const { statusCodes } = getState();
    const acceptContactReqServiceRes = await acceptContactReqService(username, contactUsername, profile);
    if (acceptContactReqServiceRes.status === 'success') {
        console.log('acceptContactReqServiceRes: ', acceptContactReqServiceRes);
        await dispatch(updateGroups(acceptContactReqServiceRes.data.globalContactList));
        dispatch({
            type: `${ACCEPT_CONTACT_REQ}_FULFILLED`,
            payload: {
                ...acceptContactReqServiceRes.data,
                profile,
            },
        });
        return { type: 'success', message: statusCodes };
    } else {
        return { type: 'error', message: statusCodes[acceptContactReqServiceRes.errorCode].message };
    }
};

export const CHANGE_PROFILE_TO_RED = 'CHANGE_PROFILE_TO_RED';
export const changeProfileToRed = () => {
    return {
        type: CHANGE_PROFILE_TO_RED,
        payload: 'red',
    };
};
export const CHANGE_PROFILE_TO_BLUE = 'CHANGE_PROFILE_TO_BLUE';
export const changeProfileToBlue = () => {
    return {
        type: CHANGE_PROFILE_TO_BLUE,
        payload: 'blue',
    };
};
export const CHANGE_PROFILE_TO_GREEN = 'CHANGE_PROFILE_TO_GREEN';
export const changeProfileToGreen = () => {
    return {
        type: CHANGE_PROFILE_TO_GREEN,
        payload: 'green',
    };
};

export const SIGN_UP_PENDING = 'SIGN_UP_PENDING';
const signUpPending = () => ({
    type: SIGN_UP_PENDING,
});

export const SIGN_UP_REJECTED = 'SIGN_UP_REJECTED';
const signUpRejected = () => ({
    type: SIGN_UP_REJECTED,
    payload: {
        errorMessage: 'Get FUCKED!',
    },
});

export const SIGN_UP_FULFILLED = 'SIGN_UP_FULFILLED';
const signUpFulfilled = () => ({
    type: SIGN_UP_FULFILLED,
});

export const SIGN_UP = 'SIGN_UP';
export const signUp = (username) => async (dispatch) => {
    dispatch(signUpPending());
    try {
        const signUpResponse = await signUpService(username);
        if (signUpResponse.status === 'succ') {
            dispatch(signUpFulfilled());
        } else {
            dispatch(signUpRejected());
        }
    } catch (error) {
        console.log(error);
        dispatch(signUpRejected());
    }
};

export const LOGIN = 'LOGIN';
export const login = (username, password) => async (dispatch, getState) => {
    const { statusCodes } = getState();
    dispatch({
        type: `${LOGIN}_PENDING`,
    });
    try {
        const loginResponse = await loginService(username, password);
        if (loginResponse.status === 'success') {
            console.log(loginResponse.data);
            new ChatSocket(username, dispatch);
            await dispatch(updateGroups(loginResponse.data.userData.globalContactList));
            if (loginResponse.data.userMessageQueue && loginResponse.data.userMessageQueue.queue) {
                for (const fromUsername of Object.keys(loginResponse.data.userMessageQueue.queue)) {
                    for (const message of loginResponse.data.userMessageQueue.queue[fromUsername]) {
                        dispatch(
                            recieveMessage({
                                message,
                                fromUsername,
                            })
                        );
                    }
                }
            }
            dispatch({
                type: `${LOGIN}_FULFILLED`,
                payload: { data: loginResponse.data },
            });
        } else {
            dispatch({
                type: `${LOGIN}_REJECTED`,
            });
            return statusCodes[loginResponse.errorCode].message;
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: `${LOGIN}_REJECTED`,
        });
        return statusCodes[0].message;
    }
};

export const CHAT_SOCKET_CONNECTED = 'CHAT_SOCKET_CONNECTED';
export const chatSocketConnected = () => {
    return {
        type: CHAT_SOCKET_CONNECTED,
    };
};

export const CHAT_SOCKET_DISCONNECTED = 'CHAT_SOCKET_DISCONNECTED';
export const chatSocketDisconnected = () => {
    return {
        type: CHAT_SOCKET_DISCONNECTED,
    };
};

export const SET_USER_LIST = 'SET_USER_LIST';
export const setUserList = (userList) => {
    return {
        type: SET_USER_LIST,
        payload: {
            userList,
        },
    };
};
