import { LOCAL_STORAGE_TODOS } from '../constants/constants';
import { toJS } from 'mobx'

/**
 * @class LocalStorage
 * @classdesc methods for localstorage usage
 */
export default class LocalStorage {

    /**
     * @function getItem
     * @desc get item from localstorage
     * @return array of todoitems | null
     */
    static getItem() {
        const resFromLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_TODOS);
        return resFromLocalStorage
            ? JSON.parse(resFromLocalStorage)
            : null;
    }

    /**
     * @function getItem
     * @desc get item from localstorage
     * @param key - key of the value
     * @param value - value to save
     * @return undefined
     */
    static setItem(key, value) {
        const jsData = toJS(value);
        const data = JSON.stringify(jsData);
        window.localStorage.setItem(key, data);
    }
}
