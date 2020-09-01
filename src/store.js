import { createStore, applyMiddleware } from 'redux';
import { openDB } from 'idb';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './StateManagement/rootReducer';

const initialState = {};
const middleware = [thunkMiddleware];
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export const dbPromise = openDB('db', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('MessageStore')) {
            db.createObjectStore('MessageStore', { keyPath: 'id', autoIncrement: true });
        }
    },
});

export default store;
