import { LOCAL_STORAGE_TODOS } from '../constants/constants';
import { toJS } from 'mobx'

export default class LocalStorage {
    static getItem() {
        const resFromLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_TODOS);
        return resFromLocalStorage
            ? JSON.parse(resFromLocalStorage)
            : null;
    }

    static setItem(key, value) {
        const jsData = toJS(value);
        const data = JSON.stringify(jsData);
        window.localStorage.setItem(key, data);
    }
}