import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './StateManagement/rootReducer';

const initialState = {};
const middleware = [thunkMiddleware];
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
