const initialState = {
    // UNDEFINED ERROR
    0: { status: 'Undefined Error', message: 'Something went wrong, no idea what.' },

    // OK STATUSES
    200: { status: 'Ok', message: null },

    251: { status: 'Sent', message: null },

    // CLIENT ERROR
    401: {
        status: 'Unauthorized',
        message: 'You are unauthorized to access this route.',
    },

    408: {
        status: 'Request Timeout',
        message: 'Your request is fucking timing out.',
    },

    // SERVER ERROR
    500: {
        status: 'Server Error',
        message: 'Goddamn it, John spilled soda all over the severs again.',
    },

    // USER SUCCESS
    800: {
        status: 'Contact request sent.',
        message: 'Your request is sent.',
    },

    // USER ERRORS
    900: {
        status: 'Username not found',
        message: "This username is like my dad, I can't find either.",
    },
    901: {
        status: 'Incorrect password',
        message: "You've made a mistake or you're the worst hacker ever.",
    },
    902: {
        status: 'User Already Exists',
        message: 'Things already in use: Your mom and this username.',
    },
    920: {
        status: 'Already Contacts',
        message: 'Already in your contact/pending request list you high motherfucker.',
    },
};

function StatusCodesReducer(state = initialState) {
    return state;
}

export default StatusCodesReducer;
