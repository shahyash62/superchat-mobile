export const baseURL = process.env.NODE_ENV === 'production' ? 'https://superchat62.herokuapp.com/' : process.env.REACT_APP_BASE_URL;
// export const baseURL = 'http://localhost:5000/';
export const chatSocketURL = '/chat';
export const loginURL = '/login';
export const signupURL = '/signup';
export const refreshTokenURL = '/refreshtoken';
export const sendContactReqURL = '/addcontact/sendcontactreq';
export const acceptContactReqURL = '/addcontact/acceptcontactreq';
