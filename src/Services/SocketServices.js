import io from 'socket.io-client';
import { chatSocketURL, baseURL } from './ServiceConstants';
import { chatSocketConnected, chatSocketDisconnected } from '../StateManagement/User/UserActions';
import { recieveMessage } from '../StateManagement/Content/ContentActions';

class ChatSocket {
    static chatSocket;
    static username;
    static dispatch;
    static token;
    constructor(username, dispatch) {
        ChatSocket.token = localStorage.getItem('AuthKey');
        console.log('Creating socket with token: ', ChatSocket.token);
        if (!ChatSocket.chatSocket) {
            const socketURL = new URL(chatSocketURL, baseURL);
            ChatSocket.dispatch = dispatch;
            ChatSocket.username = username;
            ChatSocket.chatSocket = io(socketURL.toString(), { query: { username: ChatSocket.username, token: ChatSocket.token } });
            ChatSocket.chatSocket.on('connect', this.onChatSocketConnect);
            ChatSocket.chatSocket.on('reconnect_attempt', this.onReconnectAttempt);
            ChatSocket.chatSocket.on('disconnect', this.onChatSocketDisconnect);
            ChatSocket.chatSocket.on('reconnect_failed', this.onReconnectFailure);
            ChatSocket.chatSocket.on('recieveMessage', this.onRecieveMessage);
        }
    }

    static isSocketConnected() {
        if (ChatSocket.chatSocket && ChatSocket.chatSocket.connected) {
            return true;
        }
        return false;
    }

    static connectSocket() {
        if (!ChatSocket.chatSocket) {
            const socketURL = new URL(chatSocketURL, baseURL);
            ChatSocket.chatSocket = io(socketURL.toString(), { query: { username: ChatSocket.username, token: ChatSocket.token } });
        }
        ChatSocket.chatSocket.connect();
    }

    onChatSocketConnect() {
        ChatSocket.dispatch(chatSocketConnected);
    }
    onChatSocketDisconnect() {
        ChatSocket.dispatch(chatSocketDisconnected);
    }
    onReconnectAttempt() {
        if (!ChatSocket.token) ChatSocket.token = sessionStorage.getItem('AuthKey');
        ChatSocket.chatSocket.io.opts.query = { username: ChatSocket.username, token: ChatSocket.token };
    }
    onReconnectFailure() {
        ChatSocket.dispatch(chatSocketDisconnected);
    }

    static sendMessage(data, callBack) {
        ChatSocket.chatSocket.emit('forwardMessage', data, callBack);
    }

    onRecieveMessage(data) {
        ChatSocket.dispatch(recieveMessage(data));
    }
}

export default ChatSocket;
