export const EDIT_TEXT_MESSAGE = 'EDIT_TEXT_MESSAGE';
export const editTextMessage = (message) => {
    return {
        type: EDIT_TEXT_MESSAGE,
        payload: message,
    };
};
