import _ from 'lodash';
import { SEND_MESSAGE, RECIEVED_MESSAGE, SELECT_GROUP, UPDATE_GROUPS, SET_INITIAL_STATE } from './ContentActions';

const initialState = {
    messages: {
        byId: {},
        allIds: [],
        nextId() {
            return this.allIds.length;
        },
    },
    groups: {
        byId: {},
        allIds: [],
        nextId() {
            return this.allIds.length;
        },
    },
    red: { selectedGroup: null },
    blue: { selectedGroup: null },
    green: { selectedGroup: null },
};

function ContentReducer(state = initialState, action) {
    switch (action.type) {
        case SET_INITIAL_STATE: {
            console.log('Setting initial state with payload: ', action.payload);
            console.log('Setting initial state with state: ', state);
            const { byId, allIds } = action.payload;
            const newState = _.cloneDeep(state);
            newState.messages.allIds = [...allIds];
            newState.messages.byId = _.cloneDeep(byId);
            for (const id of allIds) {
                newState.groups.byId[byId[id].group].messageIdList.push(id);
            }
            return newState;
        }
        case `${SEND_MESSAGE}_PENDING`: {
            console.log('ContentReducer Full State: ', state);
            const newState = _.cloneDeep(state);
            const newId = action.payload.messageId;
            newState.messages.allIds.push(newId);
            newState.messages.byId[newId] = {
                text: action.payload.message,
                status: action.payload.status,
                type: action.payload.type,
                name: action.payload.name,
            };
            newState.groups.byId[state[action.payload.selectedProfile].selectedGroup].messageIdList.push(newId);
            return newState;
        }
        case `${SEND_MESSAGE}_FULFILLED`: {
            const newState = _.cloneDeep(state);
            newState.messages.byId[action.payload.messageId].status = action.payload.status;
            return newState;
        }
        case `${SEND_MESSAGE}_REJECTED`: {
            const newState = _.cloneDeep(state);
            newState.messages.byId[action.payload.messageId].status = action.payload.status;
            return newState;
        }
        case RECIEVED_MESSAGE: {
            const newState = _.cloneDeep(state);
            const newId = action.payload.messageId;
            newState.messages.allIds.push(newId);
            newState.messages.byId[newId] = {
                text: action.payload.text,
                type: action.payload.type,
                name: action.payload.name,
            };
            newState.groups.byId[action.payload.name].messageIdList.push(newId);
            if (newState[action.payload.selectedProfile].selectedGroup !== action.payload.name) {
                newState.groups.byId[action.payload.name].unread += 1;
            }
            return newState;
        }
        case SELECT_GROUP: {
            const newState = _.cloneDeep(state);
            newState[action.payload.profile].selectedGroup = action.payload.selectedGroup;
            newState.groups.byId[action.payload.selectedGroup].unread = null;
            return newState;
        }
        case UPDATE_GROUPS: {
            const newState = _.cloneDeep(state);
            for (const contact of action.payload.globalContactList) {
                newState.groups.byId[contact.username] = {
                    groupName: contact.username,
                    messageIdList: [],
                    unread: null,
                    members: [],
                };
                newState.groups.allIds.push(contact.username);
            }
            return newState;
        }
        // case USER_LEFT: {
        //     const newState = _.cloneDeep(state);
        //     const newAllIds = newState.groups.allIds.filter((id) => id !== action.payload.username);
        //     delete newState.groups.byId[action.payload.username];
        //     newState.groups.allIds = newAllIds;
        //     return newState;
        // }
        default:
            return state;
    }
}

export default ContentReducer;
