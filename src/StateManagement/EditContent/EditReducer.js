import { EDIT_TEXT_MESSAGE } from './EditContentActions';

const initialState = {
    message: {
        text: '',
    },
};

function EditReducer(state = initialState, action) {
    switch (action.type) {
        case EDIT_TEXT_MESSAGE: {
            const newState = {
                message: {
                    text: action.payload,
                },
            };
            return Object.assign({}, state, newState);
        }
        default: {
            return state;
        }
    }
}

export default EditReducer;
