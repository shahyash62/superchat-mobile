import { combineReducers } from 'redux';
import ContentReducer from './Content/ContentReducer';
import EditReducer from './EditContent/EditReducer';
import UserReducer from './User/UserReducer';
import StatusCodes from './StatusCodes/StatusCodes';

const allReducers = {
    content: ContentReducer,
    contentToBe: EditReducer,
    userData: UserReducer,
    statusCodes: StatusCodes,
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
