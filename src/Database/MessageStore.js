import { dbPromise } from '../store';

const MessageStore = {
    async get(key) {
        return (await dbPromise).get('MessageStore', key);
    },
    async add(data) {
        return (await dbPromise).add('MessageStore', data);
    },
    async getAllKeys() {
        return (await dbPromise).getAllKeys('MessageStore');
    },
};

export default MessageStore;
