import {
    EDIT_USERNAME,
    EDIT_STATUS,
    SEND_CONTACT_REQ,
    CHANGE_PROFILE_TO_RED,
    CHANGE_PROFILE_TO_BLUE,
    CHANGE_PROFILE_TO_GREEN,
    SIGN_UP_PENDING,
    SIGN_UP_REJECTED,
    SIGN_UP_FULFILLED,
    LOGIN,
    CHAT_SOCKET_CONNECTED,
    CHAT_SOCKET_DISCONNECTED,
    SET_USER_LIST,
    ACCEPT_CONTACT_REQ,
} from './UserActions';
import _ from 'lodash';
const initialState = {
    username: null,
    _id: null,
    // sentPendingContactReqList: {
    //     byId: {},
    //     allIds: [],
    // },
    // contacts: {
    //     byId: {},
    //     allIds: [],
    // },
    // receivedPendingContactReqList: {
    //     byId: {},
    //     allIds: [],
    // },
    selectedProfile: 'red',
    isUserOnline() {
        return this.isUserLoggedIn && !this.isAuthorizationPending && this.isChatSocketConnected;
    },
    authorization: {
        isUserLoggedIn: false,
        isAuthorizationPending: false,
        isUserDataLoaded: false,
        isChatSocketConnected: false,
    },
};
// const friendObj = { username: null, profilePicture: null, status: null, isOnline: false, nickname: null };
function UserReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_USERNAME: {
            const newState = { [state.selectedProfile]: { nickname: action.payload } };
            return _.merge({}, state, newState);
        }
        case EDIT_STATUS: {
            const newState = { [state.selectedProfile]: { status: action.payload } };
            return _.merge({}, state, newState);
        }
        case `${SEND_CONTACT_REQ}_FULFILLED`: {
            const newState = {
                sentPendingContactReqList: [...state.sentPendingContactReqList, action.payload],
            };
            return _.merge({}, state, newState);
        }
        case `${ACCEPT_CONTACT_REQ}_FULFILLED`: {
            console.log('ACCEPT_CONTACT_REQ PAYLOAD: ', action.payload);
            const newState = _.cloneDeep(state);
            newState.receivedPendingContactReqList = _.cloneDeep(action.payload.receivedPendingContactReqList);
            newState.contacts = _.cloneDeep(action.payload.globalContactList);
            newState[action.payload.profile] = _.cloneDeep(action.payload[action.payload.profile]);
            console.log('ACCEPT_CONTACT_REQ newState: ', newState);
            return newState;
        }
        case CHANGE_PROFILE_TO_RED: {
            const newState = {
                selectedProfile: 'red',
            };
            return _.merge({}, state, newState);
        }
        case CHANGE_PROFILE_TO_BLUE: {
            const newState = {
                selectedProfile: 'blue',
            };
            return _.merge({}, state, newState);
        }
        case CHANGE_PROFILE_TO_GREEN: {
            const newState = {
                selectedProfile: 'green',
            };
            return _.merge({}, state, newState);
        }
        case SIGN_UP_PENDING:
        case `${LOGIN}_PENDING`: {
            const newState = {
                authorization: {
                    isAuthorizationPending: true,
                },
            };
            return _.merge({}, state, newState);
        }
        case SIGN_UP_REJECTED:
        case `${LOGIN}_REJECTED`: {
            const newState = {
                authorization: {
                    isAuthorizationPending: false,
                },
            };
            return _.merge({}, state, newState);
        }
        case SIGN_UP_FULFILLED: {
            const newState = {
                authorization: {
                    isAuthorizationPending: false,
                },
            };
            return _.merge({}, state, newState);
        }
        case `${LOGIN}_FULFILLED`: {
            const userData = action.payload.data.userData;
            console.log(userData);
            const newState = {
                _id: userData._id,
                username: userData.username,
                contacts: userData.globalContactList,
                sentPendingContactReqList: userData.sentPendingContactReqList,
                receivedPendingContactReqList: userData.receivedPendingContactReqList,
                authorization: {
                    isUserLoggedIn: true,
                    isUserDataLoaded: true,
                    isAuthorizationPending: false,
                },
            };
            for (const profile of ['red', 'blue', 'green']) {
                newState[profile] = _.cloneDeep(userData[profile]);
            }
            console.log(_.merge({}, state, newState));
            return _.merge({}, state, newState);
        }
        case CHAT_SOCKET_CONNECTED: {
            const newState = {
                authorization: {
                    isChatSocketConnected: true,
                },
            };
            return _.merge({}, state, newState);
        }
        case CHAT_SOCKET_DISCONNECTED: {
            const newState = {
                authorization: {
                    isChatSocketConnected: false,
                },
            };
            return _.merge({}, state, newState);
        }
        case SET_USER_LIST: {
            const newState = {
                red: {
                    contactsOnline: action.payload.userList,
                },
            };
            return _.merge({}, state, newState);
        }
        default: {
            return state;
        }
    }
}

export default UserReducer;
