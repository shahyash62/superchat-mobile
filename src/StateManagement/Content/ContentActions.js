import ChatSocket from '../../Services/SocketServices';
import MessageStore from '../../Database/MessageStore';

export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const setInitialState = () => async (dispatch) => {
    const allIds = await MessageStore.getAllKeys();
    const byId = {};
    for (const id of allIds) {
        byId[id] = await MessageStore.get(id);
    }
    console.log('allIDS: ', allIds, 'byID: ', byId);
    dispatch({
        type: SET_INITIAL_STATE,
        payload: {
            allIds,
            byId,
        },
    });
};

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (message, messageId) => async (dispatch, getState) => {
    // Change this to get user name from user reducer
    const { userData, content } = getState();
    const { username } = userData;
    const toUsername = content[userData.selectedProfile].selectedGroup;
    try {
        const id = await MessageStore.add({
            text: message,
            status: '...',
            type: 'sent',
            name: username,
            group: content[userData.selectedProfile].selectedGroup,
        });

        dispatch({
            type: `${SEND_MESSAGE}_PENDING`,
            payload: {
                message,
                messageId: id,
                status: '...',
                type: 'sent',
                name: username,
                selectedProfile: userData.selectedProfile,
            },
        });
        const data = { username, toUsername, message };
        ChatSocket.sendMessage(data, function (serverReply) {
            if (!serverReply.errorCode)
                dispatch({
                    type: `${SEND_MESSAGE}_FULFILLED`,
                    payload: {
                        messageId: id,
                        status: 'S',
                    },
                });
            else
                dispatch({
                    type: `${SEND_MESSAGE}_REJECTED`,
                    payload: {
                        messageId: id,
                        status: 'F',
                    },
                });
        });
    } catch (error) {
        console.log(error);
    }
};

export const RECIEVED_MESSAGE = 'RECIEVED_MESSAGE';
export const recieveMessage = (data) => async (dispatch, getState) => {
    // Change this to get user name from user reducer
    try {
        const { message, fromUsername } = data;
        const selectedProfile = getState().userData.selectedProfile;
        console.log(data);
        const id = await MessageStore.add({
            text: message,
            type: 'received',
            name: fromUsername,
            group: fromUsername,
        });
        dispatch({
            type: RECIEVED_MESSAGE,
            payload: {
                text: message,
                type: 'received',
                name: fromUsername,
                selectedProfile,
                messageId: id,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const SELECT_GROUP = 'SELECT_GROUP';
export const selectGroup = (selectedGroup) => (dispatch, getState) => {
    dispatch({
        type: SELECT_GROUP,
        payload: {
            selectedGroup,
            profile: getState().userData.selectedProfile,
        },
    });
};

export const UPDATE_GROUPS = 'UPDATE_GROUPS';
export const updateGroups = (globalContactList) => {
    return {
        type: UPDATE_GROUPS,
        payload: {
            globalContactList,
        },
    };
};
// NEEDS TO BE CHANGED
// export const USER_JOINED = 'USER_JOINED';
// export const addUserJoined = (username) => (dispatch, getState) => {
//     const { userData } = getState();
//     if (username !== userData.username)
//         dispatch({
//             type: USER_JOINED,
//             payload: {
//                 username,
//             },
//         });
// };
// export const USER_LEFT = 'USER_LEFT';
// export const removeUserLeft = (username) => {
//     return {
//         type: USER_LEFT,
//         payload: {
//             username,
//         },
//     };
// };

// export const USER_LIST = 'USER_LIST';
// export const addUserList = (userList) => (dispatch) => {
//     userList.forEach((username) => dispatch(addUserJoined(username)));
// };
